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

# %%
import numpy as np
import seaborn as sns
import arviz as az
try:
    import stan
except:
    # %pip install 'pystan>=3.3'
    import stan

is_notebook = True
if is_notebook:
    import nest_asyncio
    nest_asyncio.apply()


# %matplotlib inline

rng = np.random.default_rng(seed=24601)

# %% [markdown]
#
# ## おおまか流れ
#
# ```python
# # データ準備
# mydata
#
# # Stan言語で書いたモデルをコンパイル
# model_code = open('model1.stan', 'rt').read()
# model = stan.build(model_code, data=mydata)
#
# # MCMCサンプリング
# fit = model.sample(num_chains=4, num_samples=1000)
#
# # 結果を眺める
# df = fit.to_frame()
# print(df.describe().T)
# stan_data = az.from_pystan(posterior=fit)
# az.plot_trace(stan_data)
# az.plot_posterior(stan_data)
# ```
#
# ## 説明変数なしのベイズ推定
#
# ### データ準備
#
# 表が出る確率70%のイカサマコインをN回投げたデータを作る。
#
# %%
data = {"N": 40}
data["x"] = rng.binomial(1, 0.7, data["N"])
sns.countplot(x='x', data=data)

# %% [markdown]
#
# ### モデルの定義
# %%
model_code = """
data {
  int<lower=0> N;
  int x[N];
}
parameters {
  real<lower=0,upper=1> p;
}
model {
  x ~ binomial(1, p);
}
"""

posterior = stan.build(model_code, data=data)

# %% [markdown]
#
# ### MCMCサンプル
# %%
fit = posterior.sample(num_chains=4, num_samples=1000)
df = fit.to_frame()
print(df.describe().T)

# %% [markdown]
#
# ### トレースプロット確認
# %%
stan_data = az.from_pystan(posterior=fit)
az.plot_trace(stan_data)

# %% [markdown]
#
# ### 推定結果確認
# %%
az.plot_posterior(stan_data)

# %% [markdown]
#
# ## 単回帰のベイズ推定
#
# 講義資料に沿って `penguins` データセットでStanを動かしてみよう
#
# %%
penguins = sns.load_dataset('penguins')
palette = {"Adelie": "#ff6600", "Chinstrap": "#c35bcc", "Gentoo": "#007174"}
sns.lmplot(data=penguins, x='body_mass_g', y='flipper_length_mm', hue='species', palette=palette)

# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
# pyright: reportUnknownArgumentType=false
