+++
title = "Hands-on Introduction to R 2020"
date = 2020-05-27T13:00:00+09:00
draft = false
+++

**これから研究を始める大学生**を主な対象としたR入門です。<br>
英語スライドも混じっていますが**今回は日本語で話します**。

## Prerequisite 前準備

**"Windows + 日本語ユーザー名" だと不具合が生じがち**なので、
英語名ユーザーを作りなおして引っ越してください。
OSの言語設定も英語にするのがオススメです。
<span style="color: #999999;">できればMacを使うのが無難だと思います。</span>

Install **R** (≥3.6) and **RStudio** (≥1.3).
That's all.

The easiest way is to follow [the instruction of RStudio.com](https://rstudio.com/products/rstudio/download/#download).
But I recommend using [Homebrew](https://brew.sh/) for Mac users because it is also useful to install other tools.

1.  Set OS language to **English** (System Preferences → Language & Region).
1.  Install **Command Line Tools** via **Terminal.app**:

    ```sh
    xcode-select --install
    ```

    Full Xcode is not necessary, but you can have it if you like.

1.  Install [Homebrew](https://brew.sh/) (software manager):

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```

    Restart Terminal.app (or shell: `exec $SHELL -l`)

1.  Install R and RStudio with Homebrew

    ```sh
    brew update
    brew cask install r rstudio
    ```


## Index

2時間2回の予定。
5/27はggplotの基本コンセプトを説明したところで時間切れになってしまったので、
6/3はその続きを30分ほどやってからデータ整形に進みます。
最後の統計解析パートは未完成ですが置いておきます。
