+++
title = "Rによるデータ前処理実習 2024 東京医科歯科大"
date = 2024-09-07T13:00:00+09:00
draft = false
+++

-   講師: 岩嵜航 (東北大学生命科学研究科)
-   日程: 2024年9月7日から3週
-   場所: 東京医科歯科大学 M&Dタワー / zoom.us

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
    - [Hadley Wickham et al. "R for Data Science"](https://r4ds.hadley.nz/)
    - [本橋智光「前処理大全」](https://www.amazon.co.jp/dp/4774196479?&linkCode=ll1&tag=heavywatal-22&linkId=71fd11103334f289e47373a7205d8392&language=ja_JP&ref_=as_li_ss_tl)
1.  その他 (注意事項等)
    - 講義資料は公開予定: <https://heavywatal.github.io/slides/tmd2024/>


## 実習環境の設定





1.  OSのソフトウェア・アップデートを基本的に全て適用して再起動。
    - Windows 11 (≥23H2)
    - macOS Sonoma (≥14.6)
1.  ファイル名の末尾(`.pdf` とか `.png` とか)の[拡張子を常時表示する](https://duckduckgo.com/?q=拡張子+表示)ようにOSを設定。
1.  <https://cran.r-project.org/>
    から最新版の **R本体(≥ 4.4.3)** をダウンロードしてインストール。
    OK連打のデフォルト設定で。
    古いものが既に入っている場合は念のため削除してから。
    - [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.*.*-win.exe`
    - [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.*.*-arm64.pkg` (Apple Silicon) or `R-4.*.*.pkg` (Intel)
1.  <https://posit.co/download/rstudio-desktop/>
    から最新版の **RStudio (≥ 2024.12.0)** をダウンロードしてインストール。
    古いものが既に入っている場合は念のため削除してから。
1.  開発者ツールをインストール。
    ここでは必須ではないけどいずれ使うことになる。
    - Windows: [**Rtools**](https://cran.r-project.org/bin/windows/Rtools/)
      (R本体のバージョンに合わせる)
    - Mac: [**Command Line Tools**](https://duckduckgo.com/?q=command+line+tools):
      ターミナルで `xcode-select --install` を実行。
      Xcode環境は不要。
1.  RStudioを起動し、左側のConsoleで次の1行を実行:
    ```r
    install.packages("tidyverse", type = "binary")
    ```
    何か訊かれたら `yes` と回答。
    パッケージがたくさんインストールされる。
    エラーや警告らしきものがあれば全文コピーしておく。
1.  Consoleに次の2行を打ち込んでメッセージを確認:
    ```r
    library(conflicted)
    library(tidyverse)
    ```
    
    ```
    ── Attaching core tidyverse packages ──── tidyverse 2.0.0 ──
    ✔ dplyr     1.1.4     ✔ readr     2.1.5
    ✔ forcats   1.0.0     ✔ stringr   1.5.1
    ✔ ggplot2   3.5.1     ✔ tibble    3.2.1
    ✔ lubridate 1.9.4     ✔ tidyr     1.3.1
    ✔ purrr     1.0.4     
    ```


### エラーや警告が出たら

1.  実習当日に教員に相談。
1.  **バージョン確認**。OS、R、RStudioなどのソフトウェアが古すぎるかも。
    それらが十分に新しければ、次に挙げる日本語やOneDriveの問題は対処済みのはず。
1.  手元のコンピューターの**ホームフォルダ**を確認。
    新しくターミナルを開いて `pwd` コマンドを実行。
    ここに半角アルファベットじゃない文字(日本語とか記号とか空白とか)が含まれている場合、不具合の原因になりがち。
    ここだけ修正するのはかなり難しい
    (ユーザー名のフルネーム表示は変更できるけどそれは無関係)。
    新しいユーザーアカウントを作って引っ越すとか、
    OSをクリーンインストールするとかしてやり直したほうが結局早そう。
    **半角アルファベット小文字のみ**で短いものを推奨。
    - ✅ Good: `watal`, `tamakino`
    - ❌ Bad: `岩嵜航`, `Watal Iwasaki`, `heavy.watal`

    Windowsのホームフォルダ(`%USERPROFILE%`)はログインの仕方で決まるっぽい:
    - ✅ **Microsoftアカウント**(`example@outlook.jp`)でログイン:
      `C:/Users/examp/` (ユーザー名が漢字だろうがなんだろうが、**メールアドレスの最初の5文字**が使われるのでセーフ)
    - Microsoftアカウントを使わず、**ローカルユーザー**としてログイン
      - ✅ 半角英字のみのユーザー名なら問題ない: `C:/Users/goodname/`
      - ❌ 漢字など全角文字を含むアカウント名: `C:/Users/朗軽 遊佐/`<br>
        RとRStudioは既に対応済みだけど、Quarto(あるいはPandoc?)は未対応らしくてエラー。
        他のソフトウェアでも不具合が出る危険あり。
        ローカルユーザーを作ったあとでMicrosoftアカウントと紐付けても直らなそう。
1.  Windowsの場合OneDriveが悪さしているかも。
    参考:
    - <https://ryotamugiyama.com/blog/2020-08-03-Rinstall.html>
    - <https://okumuralab.org/~okumura/stat/R-win.html>
    - <https://yukiyanai.github.io/jp/resources/>


## 講義資料

<kbd>←</kbd><kbd>→</kbd>キーで戻る・進むスライド形式。
