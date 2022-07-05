# %% [markdown]
# # 統計モデリング概論 DSHC 2022
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2022-08-17 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2022/
#
# ## 環境セットアップ

# %% active="py"
# %pip install 'matplotlib>=3.1' 'seaborn>=0.11' 'statsmodels'

# %%
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy import special

rng = np.random.default_rng(seed=24601)
sys.version

# %% [markdown]
# ## とにかくGLMを使ってみる練習
# ### OLS (復習)
# まず、OLSによる直線当てはめの復習。

# %%
x = rng.uniform(0.4, 1.7, 300)
y = rng.poisson(np.exp(3 * x - 3))
df = pd.DataFrame(dict(x=x, y=y))
print(df)
# %%
model = smf.ols("y ~ x", df)
result = model.fit()
df_pred = df.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df_pred, ax=ax)
sns.lineplot(x="x", y="pred", data=df_pred, ax=ax)

# %% [markdown]
# ### GLMで直線回帰
# `glm()` を使う以外の操作は共通。

# %%
model = smf.glm("y ~ x", df)
result = model.fit()
df_pred = df.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df_pred, ax=ax)
sns.lineplot(x="x", y="pred", data=df_pred, ax=ax)

# %% [markdown]
# デフォルトでは正規分布・恒等リンクなのでOLSと同じ結果になった。

# 次に、確率分布とリンク関数を変えてみよう。
# 大本命、ポアソン分布・指数リンクを試す。

# ### ポアソン回帰
# `family` の指定以外はさっきと全く同じ。
# `Poinson()` の `link` はデフォルトで `Log()` なので省略可能。
# %%
poisson = sm.families.Poisson(link=sm.families.links.Log())
model = smf.glm("y ~ x", df, family=poisson)
result = model.fit()
df_pred = df.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df_pred, ax=ax)
sns.lineplot(x="x", y="pred", data=df_pred, ax=ax)

# %% [markdown]
# いい感じにできた。
# ### ロジスティック回帰
# 客10人中y人がビールを注文した。
# その日の気温xによって割合が変化した。

# %%
# Parameters
n_traials = 10
true_intercept = -3
true_coef = 0.3
n_samples = 200
# Generate random numbers
temperature = rng.uniform(-10, 35, n_samples)
logit_p = true_intercept + true_coef * temperature
p = special.expit(logit_p)
beer_sales = rng.binomial(n_traials, p, n_samples)
_dic = {
    "temperature": temperature,
    "beer_sales": beer_sales,
    "failures": n_traials - beer_sales,
}
df = pd.DataFrame(_dic)
print(df)
# %%
fig, ax = plt.subplots()
sns.scatterplot(x="temperature", y="beer_sales", data=df, ax=ax)
# %% [markdown]
# 上限10のシグモイド型の曲線でつながりそう。誤差は二項分布。

# 縦軸・応答変数の設定が少し特殊。
# 単にk回成功ではなく **n回のうちk回** 成功したという情報を使うため、
# 成功数と失敗数の両方を左辺に置く必要がある。
# %%
binom = sm.families.Binomial(link=sm.families.links.Logit())
model = smf.glm("beer_sales + failures ~ temperature", df, family=binom)
result = model.fit()
print(result.params)
# %% [markdown]
# `predict()` は割合を返してくるので、
# 作図するときは試行数をかけるか縦軸を割合にする。
# %%
df_pred = df.assign(pred=lambda _: n_traials * result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(x="temperature", y="beer_sales", data=df_pred, ax=ax)
sns.lineplot(x="temperature", y="pred", data=df_pred, ax=ax)

# %% [markdown]
# ### 分散分析: GLM with 質的(カテゴリカル)変数
#
# %% Parameters
n_samples = 200
true_intercept = 70
true_coefs = {"temp": 3, "sunny": 20, "rainy": -20}
sd = 10
weather_levels = ["cloudy", "sunny", "rainy"]
# %%
weather = rng.choice(weather_levels, n_samples, replace=True)
_df = pd.DataFrame(
    {
        "temperature": rng.uniform(8, 32, n_samples),
        "weather": pd.Categorical(weather, categories=weather_levels),
    }
)

df = (
    _df.join(pd.get_dummies(_df["weather"]))
    .drop("cloudy", axis=1)
    .assign(
        mu=lambda _: true_intercept
        + true_coefs["temp"] * _["temperature"]
        + true_coefs["sunny"] * _["sunny"]
        + true_coefs["rainy"] * _["rainy"]
    )
    .assign(beer_sales=lambda _: rng.normal(_["mu"], sd))
)
print(df)
# %%
fig, ax = plt.subplots()
sns.scatterplot(x="weather", y="beer_sales", hue="weather", data=df, ax=ax)
# %%
fam = sm.families.Gaussian()
model = smf.glm("beer_sales ~ weather", df, family=fam)
result = model.fit()
print(result.params)

# %%
df_pred = df.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(
    x="weather", y="beer_sales", hue="weather", alpha=0.6, data=df_pred, ax=ax
)
sns.scatterplot(
    x="weather", y="pred", s=120, color="black", marker="x", data=df_pred, ax=ax
)

# %% [markdown]
# ### 共分散分析: GLM with 質的変数 + 量的変数
#
# %%
fam = sm.families.Gaussian()
model = smf.glm("beer_sales ~ weather + temperature", df, family=fam)
result = model.fit()
print(result.params)
# %%
df_pred = df.assign(pred=lambda _: result.predict(_))
fig, ax = plt.subplots()
sns.scatterplot(
    x="temperature", y="beer_sales", hue="weather", data=df_pred, ax=ax, alpha=0.6
)
sns.lineplot(x="temperature", y="pred", hue="weather", data=df_pred, ax=ax)

# %% [markdown]
# ほかに利用可能な確率分布・リンク関数などはstatsmodels公式サイトを参照:
# <https://www.statsmodels.org/stable/glm.html>

# 一旦ここまで。講義スライドに戻る。

# ----


# %% [markdown]
# ## penguins データで単回帰と重回帰の練習
# まずデータをダウンロード。

# %%
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", True).data
print(penguins)


# %% [markdown]
# ### 単回帰の練習
#
# Step 1. まず作図
#
# どうやら、重いペンギンほど翼長も長い。
# %%
grid = sns.FacetGrid(penguins)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")

# %% [markdown]
# Step 2. モデル作成、フィッティング
#
# とりあえず正規分布・恒等リンクで。
# %%
formula = "flipper_length_mm ~ body_mass_g"
model1 = smf.glm(formula, data=penguins)
results1 = model1.fit()
print(results1.params)
print(results1.llf)
print(results1.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図
# %%
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
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.add_legend()

# %% [markdown]
# Step 2. モデル作成、フィッティング

# Adelieを基準に、ChinstrapとGentooはそれより長め。<br>
# 体重の効果は単回帰のときより小さい。

# %%
formula = "flipper_length_mm ~ body_mass_g + species"
model2 = smf.glm(formula, data=penguins)
results2 = model2.fit()
print(results2.params)
# %%
print(results2.llf)
# %%
print(results2.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図

# %%
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

# %%
formula = "flipper_length_mm ~ body_mass_g + species + body_mass_g:species"
model3 = smf.glm(formula, data=penguins)
results3 = model3.fit()
print(results3.params)
# %%
print(results3.llf)
# %%
print(results3.aic)

# %% [markdown]
# Step 3. フィッティング結果を作図

# %%
pen_pred = penguins.assign(pred=results3.predict(penguins))
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
grid.add_legend()

# %% [markdown]
# ----

# ## GLMの練習
#
# 🔰クチバシの長さと深さで同じ解析をやってみよう。
# %%
sns.lmplot(
    x="bill_length_mm", y="bill_depth_mm", hue="species", palette=palette, data=penguins
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
