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
import seaborn as sns
import statsmodels.api as sm
import statsmodels.formula.api as smf
rng = np.random.default_rng(seed=24601)
sys.version

# %% [markdown]
# ## GLM


# %%
palette = {"Adelie": "#ff6600", "Gentoo": "#c35bcc", "Chinstrap": "#007174"}

penguins = sm.datasets.get_rdataset('penguins', 'palmerpenguins').data
print(penguins)


# %%
sns.relplot(x='body_mass_g', y='flipper_length_mm', data=penguins)


# %%
formula = 'flipper_length_mm ~ body_mass_g'
model1 = smf.glm(formula, data=penguins)
results1 = model1.fit()
print(results1.summary())

# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
# pyright: reportUnknownArgumentType=false
