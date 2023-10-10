+++
title = "Hands-on Introduction to R 2023"
date = 2023-11-27T16:00:00+09:00
draft = false
+++

🚧 Translation in progress 🚧

## Summary

-   Lecturer: Watal M Iwasaki, PhD
-   Date: 2023-11-27 to 2023-12-06
-   Time: 16:00+JST, 90 minutes a day
-   Place: Zoom.us + Biology bldg., Aobayama, Tohoku University
-   Website: <https://heavywatal.github.io/slides/english2023r/><br>
    Links to the slides are [at the bottom](<javascript:document.getElementById('slides').scrollIntoView({behavior: 'smooth'});>):
-   Abstract:<br>
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
-   Prerequisite
    - Basic computer skills: browsing webpages, handling files and folders, etc.
    - Preparation of computing environment (described later)
-   Textbook
    - None
-   References
    - [Hadley Wickham et al. "R for Data Science"](https://r4ds.hadley.nz/)
    - [江崎貴裕「分析者のためのデータ解釈学入門」](https://amzn.to/3uznzCK) 2020
    - [本橋智光「前処理大全」](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)


## 実習環境の設定

途中まででもいいので、できるかぎり実習前に済ませてもらえると助かります。

1.  OSのソフトウェア・アップデートを基本的に全て適用して再起動。
    - Windows 11 (≥22H2)
    - macOS Ventura (≥13.6)
1.  ファイル名の末尾(`.pdf` とか `.png` とか)の[拡張子を常時表示する](https://duckduckgo.com/?q=拡張子+表示)ようにOSを設定。
1.  <https://cran.r-project.org/>
    から最新版の **R本体(≥4.3.1)** をダウンロードしてインストール。
    OK連打のデフォルト設定で。
    古いものが既に入っている場合は念のため削除してから。
    - [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.*.*-win.exe`
    - [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.*.*-arm64.pkg` (Apple Silicon) or `R-4.*.*.pkg` (Intel)
1.  <https://posit.co/download/rstudio-desktop/>
    から最新版の **RStudio(≥2023.09.0)** をダウンロードしてインストール。
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
    ── Attaching core tidyverse packages ───────────────── tidyverse 2.0.0 ──
    ✔ dplyr     1.1.3     ✔ readr     2.1.4
    ✔ forcats   1.0.0     ✔ stringr   1.5.0
    ✔ ggplot2   3.4.3     ✔ tibble    3.2.1
    ✔ lubridate 1.9.3     ✔ tidyr     1.3.0
    ✔ purrr     1.0.2
    ```

### エラーや警告が出たら

1.  実習当日に教員やTAに相談。全員の環境を確認してから進みます。
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
    - <https://ryotamugiyama.com/2020/08/03/rinstall/>
    - <https://okumuralab.org/~okumura/stat/R-win.html>
    - <https://yukiyanai.github.io/jp/resources/>


## Slides

🚧 Translation in progress 🚧

<kbd>←</kbd><kbd>→</kbd> keys to go back and forth.
