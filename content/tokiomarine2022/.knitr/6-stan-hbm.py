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
df = pd.DataFrame(dict(z=z, p=p, y=y))
# %%
sns.countplot(x="y", data=df)

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
# ### トレースプロット確認
# %%
stan_data = az.from_cmdstanpy(fit, observed_data=mydata)
az.plot_trace(stan_data)

# %% [markdown]
#
# ### 推定結果の事後分布を確認
# %%
az.plot_posterior(stan_data)

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
sns.countplot(x="y", data=df)
sns.scatterplot(x="y", y="count", data=df_exp, color="black", s=120)

# %%
# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
