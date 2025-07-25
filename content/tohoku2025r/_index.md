+++
title = "進化学実習 2025 牧野研 東北大学"
date = 2025-04-08T12:00:00+09:00
draft = false
+++

## 概要

-   講師: 岩嵜航 (東北大学 生命科学研究科 進化ゲノミクス分野 牧野研)
-   科目: 東北大学 理学部生物学科 進化学実習
-   日程: 2025年4月8, 9, 10, 14, 15日
-   場所: 東北大学理学部合同A棟3階実習室 / zoom.us
-   概要:\
    理学部生物学科における研究とは、大雑把に言うと
    「生物に関するデータを集め、その背後にある理（ことわり）を読み解くこと」です。
    そのため、データの解析と作図はどんな研究をするにもほぼ不可欠となります。
    正しい結論を導くためには、データをいろいろな角度から可視化して全体の構造を見渡すことが特に重要です。
    また、観察・実験・データベースなどから得られるデータは多種多様であり、
    そのまますぐ使えることはめったにありません。
    まずデータを整形するところから始める必要があります。
    この前処理にせよ、作図にせよ、
    「エクセルであれをあっちにコピペして、メニューからあれを選択して...」
    といった手作業でやるのは大変ですし、再現性が無いため科学の手続きとしても問題です。
    いつでもだれでも再検証したり使いまわしたりできるように、
    規則性のある退屈な仕事は機械に任せるのが得策です。
    本実習では、近年さらに易しくなったR言語を用いることで、
    生データから効果的な作図まで簡単に辿り着けるということを体験してもらいます。
-   到達目標:
    生物学研究におけるデータ解釈・解析の重要性を認識する。
    Rを使用してデータの前処理・可視化ができるようになる。
-   授業計画
    1. 導入: データ解析の全体像。Rの基本。
    2. データの可視化。
    3. データ構造の処理1: 抽出、集約など。
    4. データ構造の処理2: 結合、変形など。
    5. データ内容の処理: 数値、文字列など。
    6. データ入力、レポート作成
    7. 統計モデリング1: 確率分布、尤度
    8. 統計モデリング2: 一般化線形モデル
    9. 発表会

    | 時間  | 4/08 Tue | 4/09 Wed | 4/10 Thu | 4/14 Mon | 4/15 Tue  |
    | ----- | -------- | -------- | -------- | -------- | -------- |
    | 13:00 | **導入** | **構造処理1** | **内容処理** | **統計モデル1** | 発表会 |
    | 14:40 | **可視化** | **構造処理2** | **データ入力** | **統計モデル2** | 発表会 |
    | 16:20 | 練習問題 | 練習問題 | 練習問題 | 練習問題 | 予備 |

-   準備学習等
    - ファイル、フォルダ、クリックなど一般的なパソコンの基礎知識と経験
    - 下記のパソコン環境設定
-   教科書
    - なし
-   参考書
    - [江崎貴裕「分析者のためのデータ解釈学入門」](https://www.amazon.co.jp/dp/B08Q7RN6XL?&linkCode=ll1&tag=heavywatal-22&linkId=019f7f04e33c452ca54983b45baa71d1&language=ja_JP&ref_=as_li_ss_tl) 2020
    - [Hadley Wickham et al. "R for Data Science"](https://r4ds.hadley.nz/)
    - [本橋智光「前処理大全」](https://www.amazon.co.jp/dp/4774196479?&linkCode=ll1&tag=heavywatal-22&linkId=71fd11103334f289e47373a7205d8392&language=ja_JP&ref_=as_li_ss_tl)
-   講義資料置き場: <https://heavywatal.github.io/slides/tohoku2025r/>


## 実習環境の設定





途中まででもいいので、できるかぎり実習前に済ませてもらえると助かります。

1.  OSのソフトウェア・アップデートを基本的に全て適用して再起動。
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      Windows 11 (≥24H2)
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
      macOS Sequoia (≥15.4)
1.  ファイル名の末尾(`.pdf` とか `.png` とか)の[拡張子を常時表示する](https://duckduckgo.com/?q=拡張子+表示)ようにOSを設定。
1.  <https://cran.r-project.org/>
    から最新版の **R本体 (≥ 4.4.3)** をダウンロードしてインストール。
    OK連打のデフォルト設定で。
    古いものが既に入っている場合は念のため削除してから。
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.4.3-win.exe`
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
      [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.4.3-arm64.pkg` (Apple Silicon) or `R-4.4.3-x86_64.pkg` (Intel)
1.  <https://posit.co/download/rstudio-desktop/>
    から最新版の **RStudio (≥ 2024.12.1)** をダウンロードしてインストール。
    古いものが既に入っている場合は念のため削除してから。
1.  開発者ツールをインストール。
    ここでは必須ではないけどいずれ使うことになる。
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      Windows: [**Rtools**](https://cran.r-project.org/bin/windows/Rtools/)
      (R本体のバージョンに合わせる)
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
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
    ✔ ggplot2   3.5.2     ✔ tibble    3.2.1
    ✔ lubridate 1.9.4     ✔ tidyr     1.3.1
    ✔ purrr     1.0.4     
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
