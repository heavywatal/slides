# %% [markdown]
# # 環境構築 for 統計モデリング概論 DSHC 2023
#
# 岩嵜 航 (Watal M. Iwasaki, PhD)<br>
# 東北大学 生命科学研究科 進化ゲノミクス分野 特任助教
#
# 2023-08-23 東京海上 Data Science Hill Climb<br>
#
# ## 方針
# ほかの講義で使っている環境をなるべくそのまま使う。

# ### Google Colab (Python 3.7.13) を使っている場合
# 各ipynbファイルの頭に `%pip install` コマンドを置いておくので、事前準備は不要。
# 念のため、このファイルが最後まで問題なく動くことを確認する。

# ### ローカルのPython 3.7.7を使っている場合
# 以下の手順でパッケージをいくつか追加する。

# ほかの講義で入れたいくつかのパッケージのバージョンを上げてしまうので、
# 本講義が終わったら、ほかの講義に参加する前に再び
# `pip3 install -r requirements.txt` を実行して指定バージョンに戻してください。

# %%
import sys
print(sys.version)

# %% [markdown]
# ## パッケージのインストールと動作確認

# ほかの講義でインストール済みだが古すぎるものを更新:
# %%
# %pip install -U 'seaborn>=0.11'
# %pip install -U 'matplotlib>=3.1'

# %% [markdown]
# ### [statsmodels](https://www.statsmodels.org)

# %%
# %pip install 'statsmodels>=0.13.2'
import statsmodels.api as sm  # noqa: E402
sm.show_versions()

# %% [markdown]
# ### [CmdStanPy](https://cmdstanpy.readthedocs.io)

# %%
# %pip install 'cmdstanpy>=1.1.0'
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
from pathlib import Path
from cmdstanpy import cmdstan_path, CmdStanModel

# specify locations of Stan program file and data
stan_file = Path(cmdstan_path(), 'examples', 'bernoulli', 'bernoulli.stan')
data_file = Path(cmdstan_path(), 'examples', 'bernoulli', 'bernoulli.data.json')

# instantiate a model; compiles the Stan program by default
model = CmdStanModel(stan_file=stan_file)

# obtain a posterior sample from the model conditioned on the data
fit = model.sample(chains=4, data=data_file)

# summarize the results (wraps CmdStan `bin/stansummary`):
fit.summary()


# %% [markdown]
# ### [ArviZ](https://python.arviz.org/)

# %%
# %pip install 'arviz>=0.16.0'
import arviz as az  # noqa: E402
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
