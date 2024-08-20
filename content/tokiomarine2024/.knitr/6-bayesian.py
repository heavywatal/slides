# %% [markdown]
# # 統計モデリング概論 DSHC 2024
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2024-08-28 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2024/
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

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
