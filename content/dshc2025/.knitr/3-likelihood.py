# %% [markdown]
# # 統計モデリング概論 DSHC 2024
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2024-08-21 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2024/
#
# # 直線回帰、確率分布、擬似乱数生成

# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```
# %pip install 'matplotlib>=3.9' 'seaborn>=0.13' 'statsmodels>=0.14'
# ```

# %%
# %matplotlib inline

import sys

import numpy as np
import pandas as pd
import seaborn as sns

print(sys.version)

# %% [markdown]
# ---
# ## 🔰 尤度の練習問題
# サイコロを10回振ったら6の目が3回出た。
#
# 1. 6の目の出る確率が1/6だとした場合の尤度は?
# 1. 6の目の出る確率が0.2だとした場合の尤度は?
# 1. 横軸を6の目の出る確率、縦軸を対数尤度とするグラフを描こう。
# 1. このサイコロで6の目が出る確率を最尤推定しよう。<br>
#    数学で解ければ**優**。Pythonで見つければ**良**。目分量・勘で**可**。
#
# ヒント: 次のような部品を使って `get_likelihood()` 関数を作るとか。
# %%
from scipy import special

n = 5
k = 2
combination = special.comb(n, k)
print(combination)

vector = np.linspace(0, 1, 11)
print(vector)


def cubic(x):
    return x**3


vec3 = cubic(vector)
sns.lineplot(x=vector, y=vec3)


# %% tags=["remove_cell"]
def get_likelihood(k, n, p):
    return special.comb(n, k) * (p**k) * (1 - p) ** (n - k)


n = 10
k = 3
get_likelihood(k, n, 1 / 6)
get_likelihood(k, n, 0.2)
p = np.linspace(0, 1, 101)
lik = get_likelihood(k, n, p)
sns.lineplot(x=p, y=lik)


# %% tags=["remove_cell"]
from scipy import stats

lik = stats.binom.pmf(k, n, p)
sns.lineplot(x=p, y=lik)

# %% [markdown]
# ---
# ## 🔰 分布を当てはめる練習問題
#
# 植物25個体から8個ずつ種をとって植え、生き残ったものを数えた。
#
# 1. データの分布を描いてみて、当てはまりそうな確率分布を検討する
# 1. 理論分布を適当なパラメータで描いてみる
# 1. パラメータや分布を変えてみて、データの分布にすり寄せる
# 1. 対数尤度の変化を可視化し、パラメータを最尤推定する

# %%
# Observation (read the data on the slide or generate new one)
sample_size = 25
trials = 8
true_p = 0.8
rng = np.random.default_rng(seed=24601)
_y = rng.binomial(trials, true_p, sample_size)
df_seeds = pd.DataFrame({"trials": trials, "survived": _y})
print(df_seeds)

# %%
# Plot data distribution

# %%
# Plot theoretical distribution

# %%
# Plot loglik and perform MLE

# %%
# pyright: reportMissingTypeStubs=false
# pyright: reportMissingParameterType=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownParameterType=false
# pyright: reportUnknownVariableType=false
# ruff: noqa: E402 ANN001 ANN201
