# %% [markdown]
# # 統計モデリング概論 DSHC 2025
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2025-08-27 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/dshc2025/
#
# ## 方針
# ほかの講義で使っている環境をなるべくそのまま使う。

# ### Google Colab (Python 3.11) を使っている場合
# 必要なパッケージは既にインストール済みなはず。
# 各ipynbファイルの頭にも `!uv pip install` コマンドを置いておくので、事前準備は不要。
# 念のため、このファイルが最後まで問題なく動くことを確認する。

# ### ローカルのPythonを使っている場合
# 以下の手順でパッケージをいくつか追加する。

# %%
import sys

print(sys.version)
is_interactive = hasattr(sys, "ps1")

# %% [markdown]
# ## パッケージのインストールと動作確認

# インストール済みでも古すぎたら更新:
# %%
# !uv pip install -U 'seaborn>=0.13'
# !uv pip install -U 'matplotlib>=3.10'

# %% [markdown]
# ### [statsmodels](https://www.statsmodels.org)

# %%
# !uv pip install 'statsmodels>=0.14'
import statsmodels.api as sm

sm.show_versions()

# %% [markdown]
# ### [CmdStanPy](https://cmdstanpy.readthedocs.io)

# %%
# !uv pip install 'cmdstanpy>=1.2.5'
import cmdstanpy

print(cmdstanpy.__version__)

# %% [markdown]
# `fbprophet 0.7.1 requires cmdstanpy==0.9.5` だから conflict してるよ、
# というERRORが出るかもしれないけど今回は `fbprophet` を使わないので無視。

# [CmdStan](https://mc-stan.org/users/interfaces/cmdstan)
# 本体をインストール(数分かかるかも):

# %%
cmdstanpy.install_cmdstan()
# cmdstanpy.install_cmdstan(compiler=True)  # Windowsで何かが無いと怒られたら

# %% [markdown]
# [公式example](https://github.com/stan-dev/cmdstanpy#example) が走ることを確認:

# %%
import os

from cmdstanpy import CmdStanModel, cmdstan_path

# specify locations of Stan program file and data
stan_file = os.path.join(cmdstan_path(), "examples", "bernoulli", "bernoulli.stan")
data_file = os.path.join(cmdstan_path(), "examples", "bernoulli", "bernoulli.data.json")

# instantiate a model; compiles the Stan program by default
model = CmdStanModel(stan_file=stan_file)

# obtain a posterior sample from the model conditioned on the data
fit = model.sample(chains=4, data=data_file, show_progress=is_interactive)

# summarize the results (wraps CmdStan `bin/stansummary`):
fit.summary()


# %% [markdown]
# ### [ArviZ](https://python.arviz.org/)

# %%
# !uv pip install 'arviz>=0.22'
import arviz as az

print(az.__version__)

# %% [markdown]
# 上記exampleの可視化:

# %%
cmdstanpy_data = az.from_cmdstanpy(fit)
az.plot_trace(cmdstanpy_data)

# %%
# pyright: reportMissingTypeStubs=false
# pyright: reportPrivateImportUsage=false
# pyright: reportUnknownArgumentType=false
# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
# ruff: noqa: E402
