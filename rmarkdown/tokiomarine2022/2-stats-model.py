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

# %%
import sys

import matplotlib.pyplot as plt
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

fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df, ax=ax)

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

fig, ax = plt.subplots()
sns.scatterplot(x="x", y="y", data=df_pred, ax=ax)
sns.lineplot(x="x", y="pred", data=df_pred, ax=ax)

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
sns.countplot(x=x)    # for discrete values

# %% [markdown]
# ## 一様分布 (実数・連続値)
# %%
x = rng.uniform(low=0, high=1, size=100)
print(x)
sns.histplot(x=x)   # for continuous values

# %% [markdown]
# ## 幾何分布
# %%
x = rng.geometric(p=0.3, size=100)
print(x)
sns.histplot(x=x)   # for continuous values

# %% [markdown]
# ## 二項分布
# %%
x = rng.binomial(n=3, p=0.5, size=100)
print(x)
sns.countplot(x=x)    # for discrete values

# %% [markdown]
# ## ポアソン分布
# %%
x = rng.poisson(lam=3, size=100)
print(x)
sns.countplot(x=x)    # for discrete values

# %% [markdown]
# ## 正規分布
# %%
x = rng.normal(loc=50, scale=10, size=100)
print(x)
sns.histplot(x=x)   # for continuous values

# %% [markdown]
# ## 🔰 自由課題

# 1%の当たりを狙って10連ガチャを回した10万人の結果

# %%

# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownLambdaType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
