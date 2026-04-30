+++
title = "統計モデリング概論 DSHC 2026"
date = 2026-08-27T09:30:00+09:00
draft = false
unlisted = false
[params]
  dpi = 108
+++

[東京海上 Data Science Hill Climb](https://tokiomarine-dshc.com/)

- 講師: 岩嵜航 (東北大学生命科学研究科)
- 日程: 2026 {09-02, 09-09} 09:30--17:30
- 場所: オンライン


![plot of chunk schedule](figure/schedule-1.svg)

## 実行環境の準備

DSHC 2026 参加者は**他の講義と同じ Google Cloud Platform (GCP) 環境**を使う。
下記のリンクから演習資料をダウンロードし、**自分の作業フォルダに保存**しておく。
`preparation.ipynb` が実行できることを確認しておくとなお安心。

[Google Colab](https://colab.research.google.com/?hl=en)
でもローカル環境でも実行できる。
手元のmacOSに講義用の仮想環境を用意する一例
(Colabに合わせて 3.12 を指定してあるが、最新版 ≥3.14 でも大丈夫なはず):
```sh
WORKON_HOME=${HOME}/.virtualenvs
uv_python=3.12
uv python install $uv_python
uv venv -p $uv_python ${WORKON_HOME}/dshc2026
source ${WORKON_HOME}/dshc2026/bin/activate
uv pip install -U jupyterlab seaborn statsmodels cmdstanpy arviz
jupyter lab preparation.ipynb
```


## 演習資料

- 🚧 coming soon 🚧


## 講義資料

リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。
