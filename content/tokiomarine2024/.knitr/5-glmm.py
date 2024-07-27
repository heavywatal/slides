# %% [markdown]
# # 統計モデリング概論 DSHC 2023
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2023-08-23 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2023/
#
# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```
# %pip install 'matplotlib>=3.1' 'seaborn>=0.11' 'statsmodels'
# ```

# %%
# %matplotlib inline

import sys

import numpy as np
import seaborn as sns

rng = np.random.default_rng(seed=24601)
print(sys.version)

# %% [markdown]
# # 乱数生成で混合分布を実感してみよう
#
# 1. 100個体の能力値zを正規乱数で生成。分布を描く。

# %%

sample_size = 100
mu = 0
sigma = 1
z = rng.normal(mu, sigma, sample_size)
sns.histplot(x=z, bins=20)

# %% [markdown]
#
# 2. 各個体の種子生存率pをシグモイド関数で計算。分布を描く。

# %%

# dfz = pd.DataFrame(z=z)
# print(dfz)
def sigmoid(x, gain=1):
    return 1 / (1 + np.exp(-gain * x))

p = sigmoid(z)
sns.histplot(x=p, bins=20)

# %% [markdown]
#
# 3. そのpを使って実際の生存種子数を二項分布(n = 8)から生成。分布を描く。

# %%

n = 8
y = rng.binomial(n, p)
sns.countplot(x=y)

# %% [markdown]
#
# 4. 能力の平均や分散の値を変えたらどうなるか見てみる。

# %%



# %%

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingParameterType=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownParameterType=false
# pyright: reportUnknownVariableType=false
