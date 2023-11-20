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


## Preparation

1.  Apply all the software updates available and restart the OS:
    - Windows 11 (≥22H2)
    - macOS Ventura (≥13.6)
1.  Configure OS to [always show file extensions](https://duckduckgo.com/?q=show+file+extensions)(suffixes of file names such as `.pdf` and `.png`)
1.  Download the latest **R (≥4.3.2)** from <https://cran.r-project.org/>.
    Install it with the default settings by pressing OK/Proceed.
    If you have old versions installed, remove them before new installation just in case.
    - [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.*.*-win.exe`
    - [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.*.*-arm64.pkg` (Apple Silicon) or `R-4.*.*.pkg` (Intel)
1.  Download the latest **RStudio(≥2023.09.0)** from
    <https://posit.co/download/rstudio-desktop/>
    and install it.
    If you have old versions installed, remove them before new installation just in case.
1.  Install developer tools.
    They are not required here, but you will need them eventually.
    - Windows: [**Rtools**](https://cran.r-project.org/bin/windows/Rtools/)
      (select the version corresponding to the R you installed)
    - Mac: [**Command Line Tools**](https://duckduckgo.com/?q=command+line+tools):
      Execute `xcode-select --install` on Terminal.app.
      Xcode itself is not necessary unless you want to develop iPhone apps.
1.  Launch RStudio, and execute the following line on the left panel called "Console":
    ```r
    install.packages("tidyverse", type = "binary")
    ```
    Answer `yes` if necessary.
    Many packages will be installed.
    If some errors or warnings come up,
    copy them to a text file to show me later.
1.  Execute the following two lines on Console, and check the message:
    ```r
    library(conflicted)
    library(tidyverse)
    ```
    ```
    ── Attaching core tidyverse packages ───────────────── tidyverse 2.0.0 ──
    ✔ dplyr     1.1.4     ✔ readr     2.1.4
    ✔ forcats   1.0.0     ✔ stringr   1.5.1
    ✔ ggplot2   3.4.4     ✔ tibble    3.2.1
    ✔ lubridate 1.9.3     ✔ tidyr     1.3.0
    ✔ purrr     1.0.2
    ```


## Slides

🚧 Translation in progress 🚧

<kbd>←</kbd><kbd>→</kbd> keys to go back and forth.
