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
from pathlib import Path

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
# ## 階層ベイズモデル
#
# ### データ準備
#
# %%
N = 100
mu_ind = 0.5
sd_ind = 3
z = rng.normal(mu_ind, sd_ind, size=N)
p = expit(z)
y = rng.binomial(8, p)
od_data = {
    "N": N,
    "y": y,
}
df_od = pd.DataFrame(dict(z=z, p=p, y=y))

# %%
model = CmdStanModel(stan_file="glmm.stan")

# %% [markdown]
# ### MCMCサンプル
# %%
fit = model.sample(od_data, chains=4, iter_sampling=2000)

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
stan_data = az.from_cmdstanpy(fit, observed_data=od_data)
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
print(post_mean)

# %%
# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
