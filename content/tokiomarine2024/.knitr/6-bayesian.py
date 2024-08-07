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

import arviz as az
import numpy as np
import seaborn as sns
from cmdstanpy import CmdStanModel

rng = np.random.default_rng(seed=24601)

# %% [markdown]
# ## 説明変数なしのベイズ推定
#
# ### データ準備
#
# 表が出る確率70%のイカサマコインをN回投げたデータを作る。
#
# %%
true_p = 0.7
sample_size = 40
coin_data = {"N": sample_size, "x": rng.binomial(1, true_p, sample_size)}
print(coin_data)
# %%
sns.countplot(x="x", data=coin_data)

# %% [markdown]
# ### モデルの定義
# スライドにあるコードを `coin.stan` というファイルに保存しておき、読み込む。
# %%
model = CmdStanModel(stan_file="stan/coin.stan")

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

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
