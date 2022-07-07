# %% [markdown]
# # 統計モデリング概論 DSHC 2022
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2022-08-24 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2022/
#
# ## 環境セットアップ

# %% active="py"
# %pip install 'matplotlib>=3.1' 'seaborn>=0.11' 'statsmodels'
# %pip install 'arviz>=0.12.1' 'cmdstanpy>=1.0.4'

# %%
import arviz as az
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import statsmodels.api as sm
from cmdstanpy import CmdStanModel
from scipy.special import expit

rng = np.random.default_rng(seed=24601)

# %% [markdown]
# ## StanでベイジアンGLM
#
# ### Stanで直線回帰
#
# %%
n_samples = 300
true_intercept = -3
true_coef = 3
x = rng.uniform(0.4, 1.7, n_samples)
lambda_ = np.exp(true_intercept + true_coef * x)
y = rng.poisson(lambda_)
df = pd.DataFrame(dict(x=x, y=y))
print(df)
# %%
fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df, ax=ax)

# %% [markdown]
# ### 🔰 直線回帰の練習問題
# TODO

# %%

# %% [markdown]
# ----
#
# ### Stanでポアソン回帰

# %%
n_samples = 300
_x = rng.uniform(0.4, 1.7, n_samples)
_y = rng.poisson(np.exp(3 * _x - 3))
df_poisson = pd.DataFrame(dict(x=_x, y=_y))
poisson_data = {
    "N": n_samples,
    "x": _x,
    "y": _y,
}
# %%
model = CmdStanModel(stan_file="poisson.stan")

# %%
fit = model.sample(poisson_data, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())

# %%
stan_data = az.from_cmdstanpy(fit, observed_data=poisson_data)
az.plot_trace(stan_data)
az.plot_posterior(stan_data)
# %%
post_mean = stan_data.posterior.mean().to_pandas()
df_poisson_pred = df_poisson.assign(
    pred=np.exp(post_mean["intercept"] + post_mean["slope"] * df_poisson.x)
)
grid = sns.FacetGrid(df_poisson_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")
grid.add_legend()

# %% [markdown]
# ### 🔰 ポアソン回帰の練習問題
# TODO

# %%

# %% [markdown]
# ----
# ### Stanでロジスティック回帰
#
# %%
n_samples = 200
_n = 10
temp = rng.uniform(-10, 35, size=n_samples)
logit_p = -3 + np.array(0.3) * temp
p = expit(logit_p)
sales = rng.binomial(_n, p)

df_logistic = pd.DataFrame(dict(temp=temp, sales=sales))
logistic_data = {
    "N": n_samples,
    "temp": temp,
    "sales": sales,
}
# %%
model = CmdStanModel(stan_file="logistic.stan")

# %%
fit = model.sample(logistic_data, chains=4, iter_sampling=2000)
fit.summary()
print(fit.diagnose())

# %%
stan_data = az.from_cmdstanpy(fit, observed_data=logistic_data)
az.plot_trace(stan_data)
az.plot_posterior(stan_data)
# %%
post_mean = stan_data.posterior.mean().to_pandas()
df_logistic_pred = df_logistic.assign(
    pred=10 * expit(post_mean["intercept"] + post_mean["slope"] * df_logistic.temp)
)
grid = sns.FacetGrid(df_logistic_pred)
grid.map(sns.scatterplot, "temp", "sales")
grid.map(sns.lineplot, "temp", "pred")
grid.add_legend()

# %% [markdown]
#
# ### 🔰 ロジスティック回帰の練習問題
# TODO
# %%

# %% [markdown]
# ## Stanでpenguins単回帰
# %%
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", True).data
penguins_dropna = penguins.dropna()
print(penguins_dropna)
pen_data = {
    "N": penguins_dropna.shape[0],
    "body_mass_g": penguins_dropna.body_mass_g,
    "flipper_length_mm": penguins_dropna.flipper_length_mm,
}

# %% [markdown]
# ### モデルの定義
# %%
model = CmdStanModel(stan_file="penguins-lm.stan")

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
penguins_sp = (penguins_dropna
  .assign(sp_Chinstrap=(penguins_dropna.species == "Chinstrap").astype(int))
  .assign(sp_Gentoo=(penguins_dropna.species == "Gentoo").astype(int))
)
pen_sp_data = {
    "N": penguins_sp.shape[0],
    "body_mass_g": penguins_sp.body_mass_g,
    "flipper_length_mm": penguins_sp.flipper_length_mm,
    "sp_Chinstrap": penguins_sp.sp_Chinstrap,
    "sp_Gentoo": penguins_sp.sp_Gentoo,
}

# %% [markdown]
# ### モデルの定義
# %%
model = CmdStanModel(stan_file="penguins-multiple.stan")

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
    pred=post_mean["intercept"] + penguins_sp.body_mass_g * post_mean["slope"] +
         penguins_sp["sp_Chinstrap"] * post_mean["b_chinstrap"] +
         penguins_sp["sp_Gentoo"] * post_mean["b_gentoo"]
)
palette = {"Adelie": "#ff6600", "Gentoo": "#c35bcc", "Chinstrap": "#007174"}
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
grid.add_legend()

# %% [markdown]
#
# ### 🔰 重回帰の練習問題
# TODO
# %%

# %%
# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
