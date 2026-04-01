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
# ```

# %%
# %matplotlib inline

# 有病率 Pr(I): この地域の感染者の割合; 事前確率
prevalence = 0.003

# 感度 Pr(P|I): 感染してる人に陽性判定が出る
sensitivity = 0.9

# 特異度 Pr(¬P|¬I): 感染してない人に陰性判定が出る
specificity = 0.99

# 周辺確率 Pr(P)
p_positive = prevalence * sensitivity + (1 - prevalence) * (1 - specificity)

# 陽性適中率 Pr(I|P) (検査陽性の人が実際に感染者である確率)
positive_predictive_value = prevalence * sensitivity / p_positive
print(positive_predictive_value)

# %% [markdown]
#
# 🔰 同様に陰性的中率 Pr(¬I|¬P) を計算してみよう
# %%

# p_negative =
# negative_predictive_value =

# %% [markdown]
#
# 🔰 計算結果が検査性能だけでなく有病率にも依存することを確認しよう

# %%

# %%

# pyright: reportGeneralTypeIssues=false
# pyright: reportMissingTypeStubs=false
# pyright: reportUnknownMemberType=false
