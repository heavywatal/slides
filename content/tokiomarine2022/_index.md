+++
title = "統計モデリング概論 DSHC 2022"
date = 2022-08-17T09:30:00+09:00
draft = false
unlisted = false
+++

[東京海上 Data Science Hill Climb](https://tokiomarine-dshc.com/)

- 講師: 岩嵜航 (東北大学生命科学研究科)
- 日程: 2022-08-17&24 09:30--17:30
- 場所: zoom.us

![plot of chunk schedule](figure/schedule-1.svg)

## 実行環境の準備

DSHC 2022 参加者はほかの講義で使っている環境をなるべくそのまま使う。
いくつかのパッケージを追加するため
[`preparation.ipynb`](./preparation.ipynb) をダウンロードして実行。

ほかの講義を受講していない私が追いつくために実行したコマンド
(macOSに講義用の仮想環境を用意する一例として):
```sh
brew install pyenv
env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.7.13
# Rscript -e 'reticulate::install_python("3.7.13")'
$(pyenv prefix 3.7.13)/bin/python3 -m venv ~/.virtualenvs/dshc2022
source ~/.virtualenvs/dshc2022/bin/activate
pip3 install -U setuptools pip wheel
pip3 install -r requirements.txt
# matplotlib==3.0.3 is too old (macosx backend requires Framework)
pip3 install -U "matplotlib>=3.1"
jupyter-notebook preparation.ipynb
```

DSHC 2022 に参加せずこの資料に辿り着いた人はわざわざ古い3.7を入れる必要はない。
最新版(≥3.10)をインストールする。
`requirements.txt` の代わりに個別指定で
`pip3 install -U seaborn scikit-learn jupyter`
を実行する。


## 講義資料

リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。
