+++
title = "Hands-on Introduction to R 2023"
date = 2023-11-27T16:00:00+09:00
draft = false
+++

## Summary

-   Lecturer: Watal M Iwasaki, PhD
-   Date: 2023-11-27 to 2023-12-06
-   Time: 16:00+JST, 90 minutes a day
-   Place: Zoom.us + Biology bldg., Aobayama, Tohoku University
-   Website: <https://heavywatal.github.io/slides/english2023r/><br>
    Links to the slides are [at the bottom](<javascript:document.getElementById('slides').scrollIntoView({behavior: 'smooth'});>):
-   Abstract:<br>
    Biological research is, roughly speaking, to collect data from organisms and decipher the rule behind them.
    Data analysis and visualization are therefore essential skills for any researcher in this field.
    But don't even think about manual works in Excel because they are cumbersome, error-prone, and above all, unreproducible.
    Let machines do repetitive and boring tasks.
    Here, we learn how to use R language/environment effectively to prepare and analyze data.
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
1.  Configure OS to [always show file extensions](https://duckduckgo.com/?q=show+file+extensions) (suffixes of file names such as `.pdf` and `.png`)
1.  Download the latest **R (≥4.3.2)** from <https://cran.r-project.org/>.
    Install it with the default settings by pressing OK/Proceed.
    If you have old versions installed, remove them before new installation just in case.
    - [Windows → base](https://cran.r-project.org/bin/windows/base) → `R-4.*.*-win.exe`
    - [Mac](https://cran.r-project.org/bin/macosx/)
      → `R-4.*.*-arm64.pkg` (Apple Silicon) or `R-4.*.*.pkg` (Intel)
1.  Download the latest **RStudio (≥2023.09.0)** from
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

<kbd>←</kbd><kbd>→</kbd> keys to go back and forth.
