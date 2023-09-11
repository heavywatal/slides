# %% [markdown]
# # 統計モデリング概論 DSHC 2023
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2023-08-30 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2023/
#
# # Stanで階層ベイズモデル(HBM)

# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```py
# %pip install 'matplotlib>=3.1' 'seaborn>=0.11' 'statsmodels'
# %pip install 'arviz>=0.12.1' 'cmdstanpy>=1.0.4'
# import cmdstanpy
# cmdstanpy.install_cmdstan()
# ```

# %%
# %matplotlib inline

import arviz as az
import numpy as np
import pandas as pd
import seaborn as sns
from cmdstanpy import CmdStanModel
from scipy import special, stats

rng = np.random.default_rng(seed=24601)

# %% [markdown]
# ## 階層ベイズモデル
#
# ### データ準備
#
# %%
sample_size = 100
mu_ind = 0.5
sd_ind = 3
z = rng.normal(mu_ind, sd_ind, size=sample_size)
p = special.expit(z)
y = rng.binomial(8, p)
mydata = {
    "N": sample_size,
    "y": y,
}
df_obs = pd.DataFrame({"z": z, "p": p, "y": y})
# %%
sns.countplot(x="y", data=df_obs, color="#333")

# %%
model = CmdStanModel(stan_file="stan/glmm.stan")

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(mydata)

# %% [markdown]
# ### 推定結果の要約と収束診断
# %%
fit.summary()
# %%
print(fit.diagnose())

# %% [markdown]
# ### トレースプロット・事後分布確認
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=mydata)
az.plot_trace(stan_data)
# az.plot_posterior(stan_data)

# %% [markdown]
# 事後分布の平均を使って予測値を描いてみる。
# %%
df_p = fit.draws_pd("p")
p = np.ravel(df_p)

y = np.arange(0, 9)
count_exp = []
for y_i in y:
    freqs = stats.binom.pmf(y_i, 8, p)
    count_exp.append(sample_size * np.mean(freqs))

df_exp = pd.DataFrame({"y": y, "count": count_exp})
sns.countplot(x="y", data=df_obs, color="#333")
sns.scatterplot(x="y", y="count", data=df_exp, color="#56B4E9", s=120)
# %% [markdown]
# 事後予測分布を描いてみる。
# %%
draws = fit.draws_pd("yrep")
yrep = draws.apply(np.bincount, 1)
yrep[0:200].apply(sns.scatterplot, color="#56B4E9", alpha=0.05)
sns.scatterplot(np.bincount(df_obs["y"]), color="black")

# %% [markdown]
# <hr>
#
# ### ビール注文数の過分散をStanで
#
# まずデータ生成
# %%
samplesize = 300
lambda_ = 3
overdisp = 4
n_ = lambda_ / (overdisp - 1)
p_ = 1 / overdisp
X = rng.negative_binomial(n_, p_, size=samplesize)
df_beer_od = pd.DataFrame({"X": X})
data_beer_od = {"X": X, "N": samplesize}
sns.countplot(x="X", data=df_beer_od, color="#333")

# %% [markdown]
# Stanでモデルを記述し、コンパイルして、MCMCサンプリング
# %%
model = CmdStanModel(stan_file="stan/beer-od.stan")
fit = model.sample(data_beer_od)

# %% [markdown]
# 結果を確認
# %%
fit.summary()
# %%
print(fit.diagnose())
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=data_beer_od)
# %%
az.plot_trace(stan_data)
#az.plot_posterior(stan_data)
# %% [markdown]
# 事後予測分布を描いてみる。
# %%
draws = fit.draws_pd("yrep")
yrep = draws.apply(np.bincount, 1)
yrep[0:200].apply(sns.scatterplot, color="#56B4E9", alpha=0.05)
sns.scatterplot(np.bincount(X), color="black")
# %%
# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
