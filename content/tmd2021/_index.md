+++
title = "Rによるデータ前処理実習 2020 東京医科歯科大"
date = 2021-10-02T13:00:00+09:00
draft = false
+++

- 講師: 岩嵜航 (東北大学生命科学研究科)
- 日程: 2021年10月2, 9, 16日
- 場所: 東京医科歯科大学 M&Dタワー 情報検索室1


## 概要

1.  授業内容 (100--150字程度)<br>
    データを元に可視化や検定・予測を行うためのソフトウェアは華々しく発展していますが、
    それらを利用するためにはまず入力データを整える必要があり、
    「データ分析に費やす労力の8割は前処理」などとも言われています。
    その地味ながら重要な作業をなるべく楽に行うためにRを使う方法を学びましょう。
1.  授業タイトル
    1. 入門1: 前処理とは。Rを使うメリット。Rの基本。
    2. 入門2: データ可視化の重要性と方法。
    3. データ構造の処理1: 抽出、集約など。
    4. データ構造の処理2: 結合、変形など。
    5. データ内容の処理: 数値、文字列、日時など。
    6. 実践: 現実の問題に対処してみる。
1.  受講するうえで必要になる前提知識
    - ファイル、フォルダ、クリックなど一般的なパソコンの基礎知識と経験
1.  教科書
    - なし
1.  参考書
    - [Hadley Wickham, Garrett Grolemund "R for Data Science"](https://r4ds.had.co.nz/)
    - [本橋智光「前処理大全」](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)
1.  その他 (注意事項等)
    - 講義資料は公開予定: <https://heavywatal.github.io/slides/tmd2021/>


## 実習環境の設定 (遠隔参加者、自習)

参考: R初心者の館 by das_Kinoさん<br>
<https://das-kino.hatenablog.com/entry/2019/11/07/125044>

1.  手元のコンピューターのユーザー名（ホームフォルダの名前）を確認。
    半角アルファベットじゃない文字(日本語とか記号とか)が含まれている場合、不具合の原因になりがちです。
    たぶん変更できない？ので新しいユーザーを作って引っ越すのがいいと思います。
1.  OSのソフトウェア・アップデートをすべて適用して再起動。
1.  <https://cran.r-project.org/>
    から最新版のR本体(≥4.1.0)をダウンロードしてインストール。
    既にインストールしてある場合はバージョンを確認。
1.  <https://rstudio.com/products/rstudio/download/#download>
    から最新版のRStudio(≥1.4.1717)をダウンロードしてインストール。
    既にインストールしてある場合はバージョンを確認。
1.  Windowsの場合はRtoolsも必要かも。次のページに従って設定:<br>
    <https://cran.r-project.org/bin/windows/Rtools/>
1.  RStudioを起動し、左側のConsoleで `install.packages("tidyverse", type = "binary")` を実行。
    何か訊かれたら `yes` と回答。
    パッケージがたくさんインストールされます。
1.  Consoleに `update.packages(type = "binary")` と打ち込んで全パッケージ更新。
1.  Consoleに `library(tidyverse)` と打ち込んでパッケージを読み込み、
    以下のようなメッセージと共に読み込まれるのを確認:

    ```r
    > library(tidyverse)
    ── Attaching packages ───────────────────────────── tidyverse 1.3.1 ──
    ✔ ggplot2 3.3.5     ✔ purrr   0.3.4
    ✔ tibble  3.1.3     ✔ dplyr   1.0.7
    ✔ tidyr   1.1.3     ✔ stringr 1.4.0
    ✔ readr   2.0.1     ✔ forcats 0.5.1
    ── Conflicts ──────────────────────────────── tidyverse_conflicts() ──
    x dplyr::filter() masks stats::filter()
    x dplyr::lag()    masks stats::lag()
    ```


## 講義資料

全6回。リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。

