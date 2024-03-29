+++
title = "Rによるデータ前処理実習 2022 東京医科歯科大"
date = 2022-09-24T13:00:00+09:00
draft = false
+++

- 講師: 岩嵜航 (東北大学生命科学研究科)
- 日程: 2022年9月24日から3週
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
    - 講義資料は公開予定: <https://heavywatal.github.io/slides/tmd2022/>


## 実習環境の設定 (遠隔参加者、自習)

参考:
[R初心者の館 by das_Kinoさん](https://das-kino.hatenablog.com/entry/2019/11/07/125044),
[矢内勇生さん](https://yukiyanai.github.io/jp/resources/)

1.  手元のコンピューターの **ユーザー名（ホームフォルダの名前）** を確認。
    半角アルファベットじゃない文字(日本語とか記号とか空白とか)が含まれている場合、不具合の原因になりがちです。
    たぶん変更できない？ので新しいユーザーを作って引っ越すのがいいと思います。
    **半角アルファベット小文字のみ**で短いものを推奨。
    - ✅ Good: `watal`, `tamakino`
    - ❌ Bad: `岩嵜航`, `Watal Iwasaki`, `heavy.watal`
1.  OSのソフトウェア・アップデートをすべて適用して再起動。
1.  OSの設定で、ファイル名の末尾の拡張子(`.pdf` とか `.png` とか)を常時表示する。
1.  Windowsの場合、
    [矢内勇生さん](https://yukiyanai.github.io/jp/resources/)
    の情報を参照しつつOneDrive問題に対処する。
1.  <https://cran.r-project.org/>
    から最新版の **R本体(≥4.2.1)** をダウンロードしてインストール。
    既にインストールしてある場合はバージョンを確認。
1.  <https://rstudio.com/products/rstudio/download/#download>
    から最新版の **RStudio(≥2022.07.1)** をダウンロードしてインストール。
    既にインストールしてある場合はバージョンを確認。
1.  Windowsの場合、念のため **Rtools** をインストール。
    バージョンに注意。次のページに従って設定:<br>
    <https://cran.r-project.org/bin/windows/Rtools/>

    Macの場合、念のため次のソフトウェアをインストール:
    - **Command Line Tools**: `xcode-select --install` (Xcode本体は不要)
    - **XQuartz**: [手動ダウンロード](https://www.xquartz.org/) or `brew install xquartz`

1.  RStudioを起動し、左側のConsoleで `install.packages("tidyverse", type = "binary")` を実行。
    何か訊かれたら `yes` と回答。
    パッケージがたくさんインストールされます。
1.  Consoleに `update.packages(type = "binary")` と打ち込んで全パッケージ更新。
1.  Consoleに `library(tidyverse)` と打ち込んでパッケージを読み込み、
    以下のようなメッセージと共に読み込まれるのを確認:

    ```r
    > library(tidyverse)
    ── Attaching packages ───────────────────────────── tidyverse 1.3.2 ──
    ✔ ggplot2 3.3.6      ✔ purrr   0.3.4
    ✔ tibble  3.1.8      ✔ dplyr   1.0.10
    ✔ tidyr   1.2.0      ✔ stringr 1.4.1
    ✔ readr   2.1.2      ✔ forcats 0.5.2
    ── Conflicts ──────────────────────────────── tidyverse_conflicts() ──
    ✖ dplyr::filter() masks stats::filter()
    ✖ dplyr::lag()    masks stats::lag()
    ```


## 講義資料

全6回。リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。

