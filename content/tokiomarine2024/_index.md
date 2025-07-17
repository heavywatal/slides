+++
title = "統計モデリング概論 DSHC 2024"
date = 2024-08-21T09:30:00+09:00
draft = false
unlisted = false
+++

[東京海上 Data Science Hill Climb](https://tokiomarine-dshc.com/)

- 講師: 岩嵜航 (東北大学生命科学研究科)
- 日程: 2024-08-21&28 09:30--17:30
- 場所: zoom.us

![plot of chunk schedule](figure/schedule-1.svg)

## 実行環境の準備

DSHC 2024 参加者は
**[Google Colab](https://colab.research.google.com/?hl=en) さえ利用できればOK**。
下記の演習資料のリンクから
`preparation.ipynb` が実行できることを確認しておくとなお安心。

手元のmacOSに講義用の仮想環境を用意する一例
(Colabに合わせて 3.10 を指定してあるが、最新版 ≥3.12 でも大丈夫なはず):
```sh
brew install pyenv
env PYTHON_CONFIGURE_OPTS="--enable-shared" pyenv install 3.10
# Rscript -e 'reticulate::install_python("3.10:latest")'
$(pyenv prefix 3.10)/bin/python3 -m venv ~/.virtualenvs/dshc2024
source ~/.virtualenvs/dshc2024/bin/activate
pip3 install -U setuptools pip
pip3 install -U jupyter seaborn statsmodels cmdstanpy arviz
jupyter-lab preparation.ipynb
```


## 演習資料

- Colab用ipynbリンク:
  <https://drive.google.com/drive/folders/11-Rk-F2ZD0ZlCZlI9HKjz39H4KrZh9vP?usp=sharing>
- ローカル環境向け・予備 (中身は上のと同じ)
  - [`preparation.ipynb`](./preparation.ipynb)
  - [`2-distribution.ipynb`](./2-distribution.ipynb)
  - [`3-likelihood.ipynb`](./3-likelihood.ipynb)
  - [`4-glm.ipynb`](4-glm.ipynb)
  - [`5-glmm.ipynb`](5-glmm.ipynb)
  - [`6-bayesian.ipynb`](6-bayesian.ipynb)
  - [`7-stan.ipynb`](7-stan.ipynb)
  - [`8-hbm.ipynb`](8-hbm.ipynb)


## 講義資料

リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。
