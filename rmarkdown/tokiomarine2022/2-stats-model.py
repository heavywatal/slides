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

import numpy as np
import pandas as pd
import seaborn as sns
import statsmodels.formula.api as smf

rng = np.random.default_rng(seed=24601)
sys.version

# %% [markdown]
# ## 直線あてはめしてみる
# 架空のデータを作って散布図。
# 擬似乱数生成については後述。

# %%
_x = rng.uniform(0.4, 1.7, 300)
_y = rng.poisson(np.exp(3 * _x - 3))
df = pd.DataFrame(dict(x=_x, y=_y))
print(df)
# %%
grid = sns.FacetGrid(df)
grid.map(sns.scatterplot, "x", "y")

# %% [markdown]
# OLS: ordinary least square

# %%
model = smf.ols("y ~ x", df)
result = model.fit()
result.params

# %% [markdown]
# 推定結果を用いて回帰線のy座標を計算:
# pred = slope * x + intercept

# %%
df_pred = df.assign(pred=lambda _: result.predict(_))
print(df_pred)
# %%
grid = sns.FacetGrid(df_pred)
grid.map(sns.scatterplot, "x", "y")
grid.map(sns.lineplot, "x", "pred")

# %% [markdown]
# 一旦ここまで。講義スライドに戻る。

# ----

# %% [markdown]
# ## 擬似乱数生成
#
# これまでの講義スライドでいろいろな理論分布を見てきた。
# ここでは疑似乱数を生成・可視化して実感をつかもう。
#
# - まずはそのまま実行してみる
# - 次に、パラメータをいろいろいじって可視化してみる。
#     - `size` を増やしたら理論的な分布に近づくか？
#     - `size` を減らしたらその分布の「らしさ」が見えにくくなる？
#     - どういうときに二項分布・ポアソン分布・正規分布が似てくるか？
# - [numpy公式ドキュメント](https://numpy.org/doc/stable/reference/random/generator.html)
#   を見て、ほかにどんな関数やパラメータがあるか眺めてみる。

# %% [markdown]
# ## 一様分布 (整数・離散値)
# %%
x = rng.integers(low=1, high=7, size=100)
print(x)
sns.countplot(x=x)  # for discrete values

# %% [markdown]
# ## 一様分布 (実数・連続値)
# %%
x = rng.uniform(low=0, high=1, size=100)
print(x)
sns.histplot(x=x)  # for continuous values

# %% [markdown]
# ## 幾何分布
# %%
x = rng.geometric(p=0.3, size=100)
print(x)
sns.histplot(x=x)  # for continuous values

# %% [markdown]
# ## 二項分布
# %%
x = rng.binomial(n=3, p=0.5, size=100)
print(x)
sns.countplot(x=x)  # for discrete values

# %% [markdown]
# ## ポアソン分布
# %%
x = rng.poisson(lam=3, size=100)
print(x)
sns.countplot(x=x)  # for discrete values

# %% [markdown]
# ## 正規分布
# %%
x = rng.normal(loc=50, scale=10, size=100)
print(x)
sns.histplot(x=x)  # for continuous values

# %% [markdown]
# ## 🔰 自由課題

# 1%の当たりを狙って10連ガチャを回した10万人の結果

# %%

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
from scipy import special  # noqa: E402

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
from scipy import stats  # noqa: E402

lik = stats.binom.pmf(k, n, p)
sns.lineplot(x=p, y=lik)


# %%
# pyright: reportMissingTypeStubs=false
# pyright: reportMissingParameterType=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownParameterType=false
# pyright: reportUnknownVariableType=false
