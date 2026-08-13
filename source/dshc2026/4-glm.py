# %% [markdown]
# # 統計モデリング概論 DSHC 2026
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2026-09-02 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/dshc2026/
#
# # GLM with Python statsmodels

# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```py
# !uv pip install 'matplotlib>=3.11' 'seaborn>=0.13' 'statsmodels>=0.14'
# ```

# %%
# %matplotlib inline

import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy import special
from statsmodels.stats.outliers_influence import variance_inflation_factor

rng = np.random.default_rng(seed=24601)
print(sys.version)

# %% [markdown]
# ## OLS (復習)
# まず、OLSによる直線当てはめの復習。

# %%
sample_size = 300
true_intercept = -3
true_coef = 3
x = rng.uniform(0.4, 1.7, sample_size)
lambda_ = np.exp(true_intercept + true_coef * x)
y = rng.poisson(lambda_)
df_pois = pd.DataFrame({"x": x, "y": y})
print(df_pois)
# %%
model = smf.ols("y ~ x", df_pois)
result = model.fit()
df_pred = df_pois.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")

# %% [markdown]
# ## GLMで直線回帰
# `glm()` を使う以外の操作は共通。

# %%
model = smf.glm("y ~ x", df_pois)
result = model.fit()
df_pred = df_pois.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")
# %%
print(result.params)

# %% [markdown]
# デフォルトでは正規分布・恒等リンクなのでOLSと同じ結果になった。

# 次に、確率分布とリンク関数を変えてみよう。
# 大本命、ポアソン分布・指数リンクを試す。

# ## ポアソン回帰
# `family` の指定以外はさっきと全く同じ。
# `Poisson()` の `link` はデフォルトで `Log()` なので省略可能。
# なぜか小文字の `log()` にしないと動かない環境もあるらしい。
# %%
poisson = sm.families.Poisson(link=sm.families.links.Log())
model = smf.glm("y ~ x", df_pois, family=poisson)
result = model.fit()
df_pred = df_pois.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")
# %%
print(result.params)

# %% [markdown]
# いい感じにできた。

# ## 重回帰: 複数の説明変数を同時に扱う
# ビールの注文数が気温と湿度の両方に依存して増加するデータを作る。
# %%
sample_size = 200
true_intercept = 3
true_coefs = {"temperature": 0.05, "humidity": 0.006}
temperature = rng.uniform(8, 32, sample_size)
humidity = rng.uniform(20, 80, sample_size)
lambda_ = np.exp(
    true_intercept
    + true_coefs["temperature"] * temperature
    + true_coefs["humidity"] * humidity
)
beer_sales = rng.poisson(lambda_)
_dic = {
    "temperature": temperature,
    "humidity": humidity,
    "beer_sales": beer_sales,
}
df_mul = pd.DataFrame(_dic)
print(df_mul)
variance_inflation_factor(df_mul.drop("beer_sales", axis=1), 0)
# %%
fig, ax = plt.subplots(ncols=2)
sns.scatterplot(df_mul, x="temperature", y="beer_sales", hue="humidity", ax=ax[0])
sns.scatterplot(df_mul, x="humidity", y="beer_sales", hue="temperature", ax=ax[1])
# %% [markdown]
# 縦軸は上限が無さそうなカウントデータで、x軸に対して指数的な増加。
# %%
poisson = sm.families.Poisson(link=sm.families.links.Log())
model = smf.glm("beer_sales ~ temperature + humidity", df_mul, family=poisson)
result = model.fit()
print(result.params)
# %%
from itertools import product

it = product(range(8, 33, 4), range(20, 90, 10))
df_pred = pd.DataFrame(list(it), columns=["temperature", "humidity"])
df_pred = df_pred.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots(ncols=2)
sns.scatterplot(df_mul, y="beer_sales", x="temperature", hue="humidity", ax=ax[0])
sns.scatterplot(df_mul, y="beer_sales", x="humidity", hue="temperature", ax=ax[1])
sns.lineplot(df_pred, y="pred", x="temperature", hue="humidity", ax=ax[0])
sns.lineplot(df_pred, y="pred", x="humidity", hue="temperature", ax=ax[1])

# %% [markdown]
# ## ロジスティック回帰
# 客10人中y人がビールを注文した。
# その日の気温xによって割合が変化した。

# %%
# Parameters
n_trials = 10
true_intercept = -3
true_coef = 0.3
sample_size = 200
# Generate random numbers
temperature = rng.uniform(-10, 35, sample_size)
logit_p = true_intercept + true_coef * temperature
p = special.expit(logit_p)
beer_sales = rng.binomial(n_trials, p, sample_size)
_dic = {
    "temperature": temperature,
    "beer_sales": beer_sales,
    "failures": n_trials - beer_sales,
}
df_binom = pd.DataFrame(_dic)
print(df_binom)
# %%
grid = sns.FacetGrid(df_binom)
grid.map(sns.scatterplot, "temperature", "beer_sales")
# %% [markdown]
# 上限10のシグモイド型の曲線でつながりそう。誤差は二項分布。

# 縦軸・応答変数の設定が少し特殊。
# 単にk回成功ではなく **n回のうちk回** 成功したという情報を使うため、
# 成功数と失敗数の両方を左辺に置く必要がある。
# %%
binom = sm.families.Binomial(link=sm.families.links.Logit())
model = smf.glm("beer_sales + failures ~ temperature", df_binom, family=binom)
result = model.fit()
print(result.params)
# %% [markdown]
# `predict()` は割合を返してくるので、
# 作図するときは試行数をかけるか縦軸を割合にする。
# %%
df_pred = df_binom.assign(pred=lambda _: n_trials * result.predict(_))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "temperature", "beer_sales")
grid.map(sns.lineplot, "temperature", "pred")

# %% [markdown]
# ## 分散分析: GLM with 質的(カテゴリカル)変数
#
# %% Parameters
sample_size = 200
true_intercept = 70
true_coefs = {"temp": 3, "sunny": 20, "rainy": -20}
sd = 10
weather_levels = ["cloudy", "sunny", "rainy"]
# %%
weather = rng.choice(weather_levels, sample_size, replace=True)
_dic = {
    "temperature": rng.uniform(8, 32, sample_size),
    "weather": pd.Categorical(weather, categories=weather_levels),
}
_df = pd.DataFrame(_dic)

df_aov = (
    _df.join(pd.get_dummies(_df["weather"]).reset_index())
    .drop("cloudy", axis=1)
    .assign(
        mu=lambda _: (
            true_intercept
            + true_coefs["temp"] * _["temperature"]
            + true_coefs["sunny"] * _["sunny"]
            + true_coefs["rainy"] * _["rainy"]
        )
    )
    .assign(beer_sales=lambda _: rng.normal(_["mu"], sd))
)
print(df_aov)
# %%
grid = sns.FacetGrid(df_aov, hue="weather")
grid.map(sns.scatterplot, "weather", "beer_sales", alpha=0.6)
# %%
gaussian = sm.families.Gaussian()
model = smf.glm("beer_sales ~ weather", df_aov, family=gaussian)
result = model.fit()
print(result.params)

# %%
df_pred = df_aov.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred, hue="weather")
grid.map(sns.scatterplot, "weather", "beer_sales", alpha=0.6)
grid.map(sns.scatterplot, "weather", "pred", color="black", marker="x", s=120)

# %% [markdown]
# ## 共分散分析: GLM with 質的変数 + 量的変数
#
# %%
grid = sns.FacetGrid(df_aov, hue="weather")
grid.map(sns.scatterplot, "temperature", "beer_sales", alpha=0.6)
grid.add_legend()
# %%
gaussian = sm.families.Gaussian()
model = smf.glm("beer_sales ~ weather + temperature", df_aov, family=gaussian)
result = model.fit()
print(result.params)
# %%
df_pred = df_aov.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred, hue="weather")
grid.map(sns.scatterplot, "temperature", "beer_sales", alpha=0.6)
grid.map(sns.lineplot, "temperature", "pred")
grid.add_legend()

# %% [markdown]
# ## 交互作用
# ビール売上の温度依存性が天気によって異なる。

# %%
sample_size = 200
sd = 10
true_intercept = 100
true_coefs = {"sunny": -30, "temp": 3, "sunny:temp": 2}
weather_levels = ["rainy", "sunny"]
temperature = rng.uniform(8, 32, sample_size)
weather = rng.choice(weather_levels, sample_size, replace=True)
_dic = {
    "temperature": rng.uniform(8, 32, sample_size),
    "weather": pd.Categorical(weather, categories=weather_levels),
}
_df = pd.DataFrame(_dic)
df_int = (
    _df.join(pd.get_dummies(_df["weather"]).reset_index())
    .assign(
        mu=lambda _: (
            true_intercept
            + true_coefs["temp"] * _["temperature"]
            + true_coefs["sunny"] * _["sunny"]
            + true_coefs["sunny:temp"] * _["sunny"] * _["temperature"]
        )
    )
    .assign(beer_sales=lambda _: rng.normal(_["mu"], sd))
)
print(df_int)
# %%
grid = sns.FacetGrid(df_int, hue="weather")
grid.map(sns.scatterplot, "temperature", "beer_sales", alpha=0.6)
grid.add_legend()
# %%
gaussian = sm.families.Gaussian()
formula = "beer_sales ~ weather + temperature + weather:temperature"
model = smf.glm(formula, df_int, family=gaussian)
result = model.fit()
print(result.params)
# %%
df_pred = df_int.assign(pred=lambda _: result.predict(_))
grid = sns.FacetGrid(df_pred, hue="weather")
grid.map(sns.scatterplot, "temperature", "beer_sales", alpha=0.6)
grid.map(sns.lineplot, "temperature", "pred")
grid.add_legend()

# %% [markdown]
# ほかに利用可能な確率分布・リンク関数などはstatsmodels公式サイトを参照:
# <https://www.statsmodels.org/stable/glm.html>

# 一旦ここまで。講義スライドに戻る。

# ----

# %% [markdown]
# ## penguins データで単回帰と重回帰の練習
# まずデータをダウンロード。

# %%
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", cache=True).data
print(penguins)


# %% [markdown]
# ### 単回帰の練習
#
# Step 1. まず作図
#
# どうやら、重いペンギンほど翼長も長い。
# %% tags=["remove_cell"]
grid = sns.FacetGrid(penguins)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")

# %% [markdown]
# Step 2. モデル作成、フィッティング
#
# とりあえず正規分布・恒等リンクで。
# %% tags=["remove_cell"]
formula = "flipper_length_mm ~ body_mass_g"
model1 = smf.glm(formula, data=penguins)
results1 = model1.fit()
print(results1.params)
print(results1.llf)
print(results1.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図
# %% tags=["remove_cell"]
pen_pred = penguins.assign(pred=results1.predict(penguins))
grid = sns.FacetGrid(pen_pred)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")


# %% [markdown]
# ### 重回帰の練習
#
# Step 1. まず作図
#
# 種によって色分けしてみると、傾向の違いが見える。
# %%
palette = {"Adelie": "#ff6600", "Gentoo": "#c35bcc", "Chinstrap": "#007174"}

# %% tags=["remove_cell"]
grid = sns.FacetGrid(penguins, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.add_legend()

# %% [markdown]
# Step 2. モデル作成、フィッティング

# Adelieを基準に、ChinstrapとGentooはそれより長め。<br>
# 体重の効果は単回帰のときより小さい。

# %% tags=["remove_cell"]
formula = "flipper_length_mm ~ body_mass_g + species"
model2 = smf.glm(formula, data=penguins)
results2 = model2.fit()
print(results2.params)
print(results2.llf)
print(results2.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図

# %% tags=["remove_cell"]
pen_pred = penguins.assign(pred=results2.predict(penguins))
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
grid.add_legend()

# %% [markdown]
# **傾き**も種によって違うかも。**交互作用**を入れてみたい。

# ### 重回帰+交互作用の練習

# Step 2. モデル作成、フィッティング

# Adelieを基準に、Chinstrapの傾きが結構違う。<br>
# 切片の違いは解釈しにくくなった。

# %% tags=["remove_cell"]
formula = "flipper_length_mm ~ body_mass_g + species + body_mass_g:species"
model3 = smf.glm(formula, data=penguins)
results3 = model3.fit()
print(results3.params)
print(results3.llf)
print(results3.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図

# %% tags=["remove_cell"]
pen_pred = penguins.assign(pred=results3.predict(penguins))
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
grid.add_legend()

# %% [markdown]
# ----

# ## 練習問題
#
# 🔰クチバシの長さと深さで同じ解析をやってみよう。
# %%
sns.lmplot(
    penguins,
    x="bill_length_mm",
    y="bill_depth_mm",
    hue="species",
    palette=palette,
    ci=None,
)

# %%

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingParameterType=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownParameterType=false
# pyright: reportUnknownVariableType=false
# ruff: noqa: E402
