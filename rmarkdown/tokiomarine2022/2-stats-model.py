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
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.api as sm
import statsmodels.formula.api as smf
import seaborn as sns
rng = np.random.default_rng(seed=24601)
sys.version

# %% [markdown]
# ## 直線あてはめ
# 架空のデータを作って散布図。
# 擬似乱数生成については後述。

# %%
n = 300
df = (
  pd.DataFrame(dict(x=rng.uniform(0.4, 1.7, n)))
    .assign(y=lambda _: rng.poisson(np.exp(3 * _.x - 3)))
)
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
# ## 擬似乱数生成

# %%
x = rng.integers(1, 7, 100)
# x = rng.binomial(3, 0.5, 100)
# x = rng.poisson(10, 100)
# x = rng.normal(50, 10, 100)

print(x)
# sns.histplot(x)   # for continuous values
sns.countplot(x=x)    # for discrete values

# %%

# %%

# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
