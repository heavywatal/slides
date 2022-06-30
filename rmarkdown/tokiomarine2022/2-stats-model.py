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
import statsmodels.api as sm
import seaborn as sns
rng = np.random.default_rng(seed=24601)
sys.version

# %% [markdown]
# ## 直線あてはめ

# %%
penguins = sm.datasets.get_rdataset('penguins', 'palmerpenguins', True).data

sns.set_theme()
ax = sns.regplot(x="body_mass_g", y="flipper_length_mm", data=penguins)


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
