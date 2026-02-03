+++
title = "Rによる統計モデリング入門 2026 栃木県"
date = 2026-02-03T09:30:00+09:00
draft = false
+++

- 講師: 岩嵜航 (東北大学 生命科学研究科)
- 日程: 2026年2月3日
- 場所: 栃木県農業総合研究センター (remote)

## 概要

-   授業内容:\
    何らかの現象を理解・説明しようとするとき、その全てをあるがままに捉えることはできません。
    扱いやすいように単純化・理想化したモデルを作り、限られたデータを通して統計的に解釈するのが科学のやり方です。
    また、正しい結論を導くためには、データをいろいろな角度から可視化して全体の構造を見渡すことが特に重要です。
    しかし作図にせよ統計処理にせよ、
    「エクセルであれをあっちにコピペして、メニューからあれを選択して...」
    といった手作業でやるのは大変ですし、再現性が無いため科学の手続きとしても問題です。
    いつでもだれでも再検証したり使いまわしたりできるように、
    規則性のある退屈な仕事は機械に任せるのが得策です。
    本講義では、近年さらに易しくなったR言語を用いることで、
    生データから効果的な作図まで簡単に辿り着けるということを体験してもらいます。
-   受講するうえで必要になる前提知識
    - ファイル、フォルダ、クリックなど一般的なパソコンの基礎知識と経験
-   参考書
    - [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
    - [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
    - [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
    - [Hadley Wickham et al. "R for Data Science"](https://r4ds.hadley.nz/)
-   講義資料置き場: <https://heavywatal.github.io/slides/tochigi2026/>


## 実習環境の設定





1.  OSのソフトウェア・アップデートを基本的に全て適用して再起動。
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      Windows 11 (≥25H2)
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
      macOS Tahoe (≥26.2)
1.  ファイル名の末尾(`.pdf` とか `.png` とか)の[拡張子を常時表示する](https://duckduckgo.com/?q=拡張子+表示)ようにOSを設定。
1.  <https://cran.r-project.org/>
    から最新版の **R本体 (≥ 4.5.2)** をダウンロードしてインストール。
    OK連打のデフォルト設定で。
    古いものが既に入っている場合は念のため削除してから。
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.5.2-win.exe`
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
      [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.5.2-arm64.pkg` (Apple Silicon) or `R-4.5.2-x86_64.pkg` (Intel)
1.  <https://posit.co/download/rstudio-desktop/>
    から最新版の **RStudio (≥ 2026.01.0)** をダウンロードしてインストール。
    古いものが既に入っている場合は念のため削除してから。
1.  RStudioを起動。初回は「開発元の不明なアプリ」を許可するような操作が必要かも。
1.  次の2行をコピーし、RStudio左側のConsoleにペーストして実行:
    ```r
    options(repos = getOption("repos", c(CRAN = "https://cloud.r-project.org")))
    install.packages("tidyverse", type = "binary")
    ```
    パッケージがたくさんインストールされる。
    何か訊かれたら `yes` と回答。
    エラーや警告らしきものがあれば全文コピーしておく。
1.  Consoleで次の2行を実行してメッセージとバージョンを確認:
    ```r
    library(conflicted)
    library(tidyverse)
    ```
    
    ```
    ── Attaching core tidyverse packages ──── tidyverse 2.0.0 ──
    ✔ dplyr     1.1.4     ✔ readr     2.1.6
    ✔ forcats   1.0.1     ✔ stringr   1.6.0
    ✔ ggplot2   4.0.1     ✔ tibble    3.3.1
    ✔ lubridate 1.9.4     ✔ tidyr     1.3.2
    ✔ purrr     1.2.1     
    ```
1.  過去にインストールした古いものがある場合は更新:
    ```r
    update.packages(type = "binary")
    ```


### エラーや警告が出たら

1.  実習当日に教員やTAに相談。全員の環境を確認してから進みます。
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
      - ❌ 漢字など全角文字を含むアカウント名: `C:/Users/朗軽 遊佐/`\
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
