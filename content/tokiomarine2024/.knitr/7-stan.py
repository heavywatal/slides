# %% [markdown]
# # 統計モデリング概論 DSHC 2024
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2024-08-28 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2024/
#
# # PythonからStanを使ってみる
#
# おおまかな流れ:
#
# - データ準備
# - Stan言語でモデルを書く
# - それをコンパイルして機械語に翻訳→実行ファイル
# - 実行ファイルにデータを渡してMCMCサンプリング
# - 結果を見る
#
# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```py
# %pip install 'matplotlib>=3.9' 'seaborn>=0.13' 'statsmodels>=0.14'
# %pip install 'arviz>=0.19' 'cmdstanpy>=1.2.4'
# import cmdstanpy
# cmdstanpy.install_cmdstan()
# ```

# %%
# %matplotlib inline

from pathlib import Path

import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from cmdstanpy import CmdStanModel
from scipy import special

# %% [markdown]
# ## 説明変数なしのベイズ推定
#
# ### データ準備
#
# 表が出る確率70%のイカサマコインをN回投げたデータを作る。
#
# %%
rng = np.random.default_rng(seed=24601)
true_p = 0.7
sample_size = 40
coin_data = {"N": sample_size, "x": rng.binomial(1, true_p, sample_size)}
print(coin_data)
# %%
sns.countplot(x="x", data=coin_data)

# %% [markdown]
# ### モデルの定義
# スライドにあるコードを `coin.stan` というファイルに保存しておき、読み込む。
# ここでは `stan/` ディレクトリにまとめるが、それはお好みで。
# %%
stan_dir = Path("stan")
stan_dir.mkdir(0o755, exist_ok=True)
stan_file = stan_dir / "coin.stan"

# Create and edit `stan_file` (see below).

# Then, read it:
model = CmdStanModel(stan_file=stan_file)

# %% [markdown]
# Colabではipynb以外のファイルを直接編集することができないので、
# 手元のエディタで書いてからアップロードするか、
# 次のようなコードを実行して文字列からファイルに書き出す。
# ```py
# stan_code = """
# data {
#   int<lower=0> N;
#   array[N] int x;
# }
# parameters {
#   real<lower=0,upper=1> p;
# }
# model {
#   x ~ binomial(1, p);
# }
# """
#
# with stan_file.open("wt") as fout:
#     fout.write(stan_code)
# ```

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(coin_data, chains=4, iter_sampling=2000)

# %% [markdown]
# 結果はchainごとにファイル出力されているらしい。
# %%
print(fit)

# %% [markdown]
# `numpy.ndarray` 型か `pandas.DataFrame` 型で全部参照できる。
# が、生の値を見たところであまりよくわからない。
# %%
print(fit.draws().shape)  # Array
# %%
print(fit.draws_pd())  # DataFrame

# %% [markdown]
# ### 推定結果の要約と収束診断
# %%
fit.summary()
# %%
print(fit.diagnose())

# %% [markdown]
# ### トレースプロット確認
# 分布はきれいなひと山、軌跡はきれいな毛虫
# %%
stan_data = az.from_cmdstanpy(fit)
az.plot_trace(stan_data)

# %% [markdown]
#
# ### 推定結果の事後分布を確認
# - 点推定: 事後分布平均
# - 区間推定: HDI(Highest Density Interval)
# %%
az.plot_posterior(stan_data)

# %%
stan_data.posterior.mean()


# %% [markdown]
# ---
# # StanでベイジアンGLM
#
# ## Stanで直線回帰
#
# %%
rng = np.random.default_rng(seed=24601)
sample_size = 300
true_intercept = -3
true_coef = 3
x = rng.uniform(0.4, 1.7, sample_size)
lambda_ = np.exp(true_intercept + true_coef * x)
y = rng.poisson(lambda_)
df_pois = pd.DataFrame({"x": x, "y": y})
print(df_pois)
# %%
grid = sns.FacetGrid(df_pois)
grid.map(sns.scatterplot, "x", "y")
# %% [markdown]
# stanに渡せるdict形式に加工
# %%
mydata = {"N": sample_size}
mydata.update(df_pois.to_dict("list"))
# print(mydata)
# %% [markdown]
# ### モデルのコンパイル
# スライドにあるコードを `lm.stan` というファイルに保存しておき、読み込む。
# %%
model = CmdStanModel(stan_file="stan/lm.stan")

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(mydata, chains=4, iter_sampling=2000)

# %% [markdown]
# ### 結果の確認
# 結果はchainごとにファイル出力されているらしい。
# %%
print(fit)

# %% [markdown]
# `numpy.ndarray` 型か `pandas.DataFrame` 型で全部参照できる。
# が、生の値を見たところであまりよくわからない。
# %%
print(fit.draws().shape)  # Array
# %%
print(fit.draws_pd())  # DataFrame

# %% [markdown]
# 推定結果の要約と収束診断
# %%
fit.summary()
# %%
print(fit.diagnose())

# %% [markdown]
# トレースプロット確認
# %%
stan_data = az.from_cmdstanpy(fit)
az.plot_trace(stan_data)

# %% [markdown]
# 推定結果の事後分布を確認
# %%
az.plot_posterior(stan_data)

# %% [markdown]
# 推定結果を使って回帰直線を作図
# %%
post_mean = stan_data.posterior.mean().to_pandas()
print(post_mean)
# %%
df_pred = df_pois.assign(pred=post_mean["intercept"] + post_mean["slope"] * df_pois.x)
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")

# %% [markdown]
# 95%確信区間などを得たい場合は
# `generated quantities` ブロックにサンプリング文を書き、
# できあがりの `draws` から抜き出す。
#
# ----
#
# ## Stanでポアソン回帰

# %%
model = CmdStanModel(stan_file="stan/poisson.stan")
# %%
fit = model.sample(mydata, chains=4, iter_sampling=2000)
# %%
fit.summary()
# %%
print(fit.diagnose())
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=mydata)
az.plot_trace(stan_data)
# %%
az.plot_posterior(stan_data)
# %%
post_mean = stan_data.posterior.mean().to_pandas()
print(post_mean)
# %%
linear = post_mean["intercept"] + post_mean["slope"] * df_pois.x
df_pred = df_pois.assign(pred=np.exp(linear))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")
grid.add_legend()


# %% [markdown]
# ----
# ## Stanでロジスティック回帰
#
# %%
rng = np.random.default_rng(seed=24601)
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
df_logistic = pd.DataFrame(_dic)
print(df_logistic)
# %%
grid = sns.FacetGrid(df_logistic)
grid.map(sns.scatterplot, "temperature", "beer_sales")
# %%
logistic_data = {"N": sample_size, "n_trials": n_trials}
logistic_data.update(df_logistic.to_dict("list"))
# %%
model = CmdStanModel(stan_file="stan/logistic.stan")

# %%
fit = model.sample(logistic_data, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())

# %%
stan_data = az.from_cmdstanpy(fit, observed_data=logistic_data)
# %%
az.plot_trace(stan_data)
# %%
az.plot_posterior(stan_data)
# %%
post_mean = stan_data.posterior.mean().to_pandas()
linear = post_mean["intercept"] + post_mean["slope"] * df_logistic["temperature"]
df_pred = df_logistic.assign(pred=n_trials * special.expit(linear))
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "temperature", "beer_sales")
grid.map(sns.lineplot, "temperature", "pred")
grid.add_legend()

# %% [markdown]
# ---
# ## 重回帰: 複数の説明変数を同時に扱う
# ビールの注文数が気温と湿度の両方に依存して増加するデータを作る。
# %%
rng = np.random.default_rng(seed=24601)
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
# %%
fig, ax = plt.subplots(ncols=2)
sns.scatterplot(x="temperature", y="beer_sales", hue="humidity", data=df_mul, ax=ax[0])
sns.scatterplot(x="humidity", y="beer_sales", hue="temperature", data=df_mul, ax=ax[1])
# %%
multiple_data = {"N": sample_size}
multiple_data.update(df_mul.to_dict("list"))
# %%
model = CmdStanModel(stan_file="stan/multiple.stan")
# %%
fit = model.sample(multiple_data, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=multiple_data)
# %%
az.plot_trace(stan_data)
# %%
az.plot_posterior(stan_data)
# %%
from itertools import product

post_mean = stan_data.posterior.mean().to_pandas()
it = product(range(8, 33, 4), range(20, 90, 10))
df_pred = pd.DataFrame(list(it), columns=["temperature", "humidity"])
df_pred = df_pred.assign(
    pred=np.exp(
        post_mean["intercept"]
        + post_mean["coef_t"] * df_pred["temperature"]
        + post_mean["coef_h"] * df_pred["humidity"]
    )
)
fig, ax = plt.subplots(ncols=2)
sns.scatterplot(x="temperature", y="beer_sales", hue="humidity", data=df_mul, ax=ax[0])
sns.lineplot(x="temperature", y="pred", hue="humidity", data=df_pred, ax=ax[0])
sns.scatterplot(x="humidity", y="beer_sales", hue="temperature", data=df_mul, ax=ax[1])
sns.lineplot(x="humidity", y="pred", hue="temperature", data=df_pred, ax=ax[1])

# %% [markdown]
# ---
# ## 分散分析: GLM with 質的(カテゴリカル)変数
#
# %% Parameters
rng = np.random.default_rng(seed=24601)
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
    _df.join(pd.get_dummies(_df["weather"], dtype=int))
    .drop("cloudy", axis=1)
    .assign(
        mu=lambda _: true_intercept
        + true_coefs["temp"] * _["temperature"]
        + true_coefs["sunny"] * _["sunny"]
        + true_coefs["rainy"] * _["rainy"]
    )
    .assign(beer_sales=lambda _: rng.normal(_["mu"], sd))
)
print(df_aov)
# %%
grid = sns.FacetGrid(df_aov, hue="weather")
grid.map(sns.scatterplot, "weather", "beer_sales", alpha=0.6)
# %%
mydata = {"N": sample_size}
mydata.update(df_aov.to_dict("list"))
del mydata["weather"]
# %%
model = CmdStanModel(stan_file="stan/anova.stan")
# %%
fit = model.sample(mydata, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=mydata)
# %%
az.plot_trace(stan_data)
# %%
az.plot_posterior(stan_data)

# %%
post_mean = stan_data.posterior.mean().to_pandas()
df_pred = df_aov.assign(
    pred=post_mean["intercept"]
    + post_mean["coef_s"] * df_aov["sunny"]
    + post_mean["coef_r"] * df_aov["rainy"]
)
# %%
grid = sns.FacetGrid(df_pred, hue="weather")
grid.map(sns.scatterplot, "weather", "beer_sales", alpha=0.6)
grid.map(sns.scatterplot, "weather", "pred", color="black", marker="x", s=120)

# %% [markdown]
# ## 共分散分析: GLM with 質的変数 + 量的変数
#
# %%
model = CmdStanModel(stan_file="stan/ancova.stan")
# %%
fit = model.sample(mydata, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=mydata)
# %%
az.plot_trace(stan_data)
# %%
az.plot_posterior(stan_data)
# %%
post_mean = stan_data.posterior.mean().to_pandas()
df_pred = df_aov.assign(
    pred=post_mean["intercept"]
    + post_mean["coef_s"] * df_aov["sunny"]
    + post_mean["coef_r"] * df_aov["rainy"]
    + post_mean["coef_t"] * df_aov["temperature"]
)
# %%
grid = sns.FacetGrid(df_pred, hue="weather")
grid.map(sns.scatterplot, "temperature", "beer_sales", alpha=0.6)
grid.map(sns.lineplot, "temperature", "pred")
grid.add_legend()


# %% [markdown]

# ---

# ## Stanでpenguins単回帰
# %%
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", cache=True).data
penguins_dropna = penguins.dropna()
print(penguins_dropna)
pen_data = {
    "N": penguins_dropna.shape[0],
    "body_mass_g": penguins_dropna["body_mass_g"],
    "flipper_length_mm": penguins_dropna["flipper_length_mm"],
}

# %% [markdown]
# ### モデルの定義
# %%
model = CmdStanModel(stan_file="stan/penguins-lm.stan")

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(pen_data, chains=4, iter_sampling=2000)

# %% [markdown]
# ### 推定結果の要約と収束診断
# %%
fit.summary()
# %%
print(fit.diagnose())

# %% [markdown]
# ### トレースプロット確認
# 分布はきれいなひと山、軌跡はきれいな毛虫
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=pen_data)
az.plot_trace(stan_data)

# %% [markdown]
#
# ### 推定結果の事後分布を確認
# - 点推定: 事後分布平均
# - 区間推定: HDI(Highest Density Interval)
# %%
az.plot_posterior(stan_data)

# %% [markdown]
# 事後分布の平均を使って回帰線を引いてみる。
# %%
post_mean = stan_data.posterior.mean().to_pandas()

# %%
pen_pred = penguins.assign(
    pred=post_mean["intercept"] + penguins_dropna.body_mass_g * post_mean["slope"]
)
grid = sns.FacetGrid(pen_pred)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")

# %% [markdown]
# ----
#
# ## Stanでpenguins重回帰
#
# ### データ準備
# %%
penguins_sp = penguins_dropna.assign(
    sp_Chinstrap=(penguins_dropna.species == "Chinstrap").astype(int)
).assign(sp_Gentoo=(penguins_dropna.species == "Gentoo").astype(int))
pen_sp_data = {
    "N": penguins_sp.shape[0],
    "body_mass_g": penguins_sp["body_mass_g"],
    "flipper_length_mm": penguins_sp["flipper_length_mm"],
    "sp_Chinstrap": penguins_sp["sp_Chinstrap"],
    "sp_Gentoo": penguins_sp["sp_Gentoo"],
}

# %% [markdown]
# ### モデルの定義
# %%
model = CmdStanModel(stan_file="stan/penguins-multiple.stan")

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(pen_sp_data, chains=4, iter_sampling=2000)

# %% [markdown]
# ### 推定結果の要約と収束診断
# %%
fit.summary()
# %%
print(fit.diagnose())

# %% [markdown]
# ### トレースプロット確認
# 分布はきれいなひと山、軌跡はきれいな毛虫
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=pen_sp_data)
az.plot_trace(stan_data)

# %% [markdown]
#
# ### 推定結果の事後分布を確認
# - 点推定: 事後分布平均
# - 区間推定: HDI(Highest Density Interval)
# %%
az.plot_posterior(stan_data)

# %% [markdown]
# 事後分布の平均を使って回帰線を引いてみる。
# %%
post_mean = stan_data.posterior.mean().to_pandas()

# %%
pen_pred = penguins_sp.assign(
    pred=post_mean["intercept"]
    + penguins_sp["body_mass_g"] * post_mean["slope"]
    + penguins_sp["sp_Chinstrap"] * post_mean["b_chinstrap"]
    + penguins_sp["sp_Gentoo"] * post_mean["b_gentoo"]
)
palette = {"Adelie": "#ff6600", "Gentoo": "#c35bcc", "Chinstrap": "#007174"}
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
grid.add_legend()

# %%
# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
# ruff: noqa: E402
