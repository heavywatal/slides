# %% [markdown]
# # 統計モデリング概論 DSHC 2024
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2024-08-21 東京海上 Data Science Hill Climb<br>
# https://heavywatal.github.io/slides/tokiomarine2024/
#
# ## 方針
# ほかの講義で使っている環境をなるべくそのまま使う。

# ### Google Colab (Python 3.10) を使っている場合
# 各ipynbファイルの頭に `%pip install` コマンドを置いておくので、事前準備は不要。
# 念のため、このファイルが最後まで問題なく動くことを確認する。

# ### ローカルのPythonを使っている場合
# 以下の手順でパッケージをいくつか追加する。

# ほかの講義で入れたパッケージのバージョンを上げてしまうかもしれないので、
# 本講義が終わったら、ほかの講義に参加する前に再び
# `pip3 install -r requirements.txt` を実行して指定バージョンに戻してください。

# %%
import sys

print(sys.version)

# %% [markdown]
# ## パッケージのインストールと動作確認

# ほかの講義でインストール済みだが古すぎるものを更新:
# %%
# %pip install -U 'seaborn>=0.13'
# %pip install -U 'matplotlib>=3.9'

# %% [markdown]
# ### [statsmodels](https://www.statsmodels.org)

# %%
# %pip install 'statsmodels>=0.14'
import statsmodels.api as sm

sm.show_versions()

# %% [markdown]
# ### [CmdStanPy](https://cmdstanpy.readthedocs.io)

# %%
# %pip install 'cmdstanpy>=1.2.4'
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
fit = model.sample(chains=4, data=data_file)

# summarize the results (wraps CmdStan `bin/stansummary`):
fit.summary()


# %% [markdown]
# ### [ArviZ](https://python.arviz.org/)

# %%
# %pip install 'arviz>=0.19'
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
