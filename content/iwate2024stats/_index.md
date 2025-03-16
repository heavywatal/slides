+++
title = "統計モデリング入門 2024 岩手連大"
date = 2024-07-05T18:00:00+09:00
draft = false
+++

- 講師: 岩嵜航 (東北大学 生命科学研究科)
- 日程: 2024年7月5, 9, 11日
- 場所: 岩手大学 [連合農学研究科](https://ugas.agr.iwate-u.ac.jp/) Webex


## 概要

-   授業内容<br>
    何らかの現象を理解・説明しようとするとき、その全てをあるがままに捉えることはできません。
    扱いやすいように単純化・理想化したモデルを作り、限られたデータを通して統計的に解釈するのが科学のやり方です。
    本実習ではその基礎として回帰モデルの考え方を身に着けましょう。
-   受講するうえで必要になる前提知識
    - ファイル、フォルダ、クリックなど一般的なパソコンの基礎知識と経験
-   教科書
    - [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
-   参考書
    - Rによるデータ前処理・可視化: <https://heavywatal.github.io/slides/tohoku2024r/>
    - Hands-on Introduction to R (English): <https://heavywatal.github.io/slides/english2023r/>
    - [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
    - [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
    - [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
    - [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
-   その他 (注意事項等)
    - 講義資料は公開予定: <https://heavywatal.github.io/slides/iwate2024stats/>


## 実行環境の設定





実習ではなく講義がメインなので必須ではありませんが、
以下のような環境構築を済ませておくと、
コピーアンドペーストでコードを実行しながら受講することができます。

1.  OSのソフトウェア・アップデートを基本的に全て適用して再起動。
    - <iconify-icon icon="mdi:microsoft"></iconify-icon>
      Windows 11 (≥23H2)
    - <iconify-icon icon="mdi:apple"></iconify-icon>
      macOS Sonoma (≥14.5)
1.  ファイル名の末尾(`.pdf` とか `.png` とか)の[拡張子を常時表示する](https://duckduckgo.com/?q=拡張子+表示)ようにOSを設定。
1.  <https://cran.r-project.org/>
    から最新版の **R本体(≥ 4.4.1)** をダウンロードしてインストール。
    OK連打のデフォルト設定で。
    古いものが既に入っている場合は念のため削除してから。
    - <iconify-icon icon="mdi:microsoft"></iconify-icon>
      [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.*.*-win.exe`
    - <iconify-icon icon="mdi:apple"></iconify-icon>
      [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.*.*-arm64.pkg` (Apple Silicon) or `R-4.*.*.pkg` (Intel)
1.  <https://posit.co/download/rstudio-desktop/>
    から最新版の **RStudio (≥ 2024.04.2)** をダウンロードしてインストール。
    古いものが既に入っている場合は念のため削除してから。
1.  開発者ツールをインストール。
    ここでは必須ではないけどいずれ使うことになる。
    - <iconify-icon icon="mdi:microsoft"></iconify-icon>
      Windows: [**Rtools**](https://cran.r-project.org/bin/windows/Rtools/)
      (R本体のバージョンに合わせる)
    - <iconify-icon icon="mdi:apple"></iconify-icon>
      Mac: [**Command Line Tools**](https://duckduckgo.com/?q=command+line+tools):
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

1.  **バージョン確認**。OS、R、RStudioなどのソフトウェアが古すぎるかも。
    それらが十分に新しければ、次に挙げる日本語やOneDriveの問題は対処済みのはず。
1.  手元のコンピューターの**ホームフォルダ**(Windowsの場合 `%USERPROFILE%`)を確認。
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
1.  実習当日チャット欄に投げてください。時間の許す限り対処します。


## 講義資料

全3回。リンク先では<kbd>←</kbd><kbd>→</kbd>キーで戻る・進む。
