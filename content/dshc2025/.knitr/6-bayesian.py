# %% [markdown]
# # 統計モデリング概論 DSHC 2025
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2025-09-03 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/dshc2025/
#
# ## 環境セットアップ

# Google Colab の場合はインストールから:
# ```py
# !uv pip install 'matplotlib>=3.10' 'seaborn>=0.13' 'statsmodels>=0.15'
# !uv pip install 'arviz>=0.22' 'cmdstanpy>=1.2.5'
# import cmdstanpy
# cmdstanpy.install_cmdstan()
# ```

# %%
# %matplotlib inline

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
