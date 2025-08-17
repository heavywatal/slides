+++
url = "makino2019r/1-basic-r.html"
title = "R basics — Hands-on R Lecture for Makino Lab"
linktitle = "R basics"
date = 2019-10-09T14:20:00+09:00
type = "reveal"
draft = false
+++

# [Hands-on R Lecture for Makino Lab](.)


<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野
</div>

<ol start="0">
<li><a href="0-why-r.html">Why do we use R?</a>
<li class="current-deck"><a href="1-basic-r.html">R basics</a>
<li><a href="2-ggplot.html">Visualization with R</a>
<li><a href="3-tidy-data.html">Tidying and transforming data with R</a>
<li><a href="4-statistics.html">Statistical analysis with R</a>
<li><a href="5-git.html">File management with Git+GitHub</a>
</ol>

<div class="footnote">
資料作成協力: 石川由希 (名古屋大学 理学研究科 脳回路構造学 講師)<br>
2019-10-09 生物棟大会議室
</div>





---
## R basics: Index

- Setup Mac and R environment
- Conversation with R
- Create a "project" and "script"
- Read and write table files
- Package
- Errors and questions

---
## Mac keyboard shortcuts

Action | Command
------ | -------
Switch apps | <kbd>command</kbd><kbd>tab</kbd>
Quit apps | <kbd>command</kbd><kbd>q</kbd>
Spotlight | <kbd>command</kbd><kbd>space</kbd>
Cut, Copy, Paste | <kbd>command</kbd><kbd>x</kbd>, -<kbd>c</kbd>, -<kbd>v</kbd>
Select all | <kbd>command</kbd><kbd>a</kbd>
Undo | <kbd>command</kbd><kbd>z</kbd>
Find | <kbd>command</kbd><kbd>f</kbd>
Save | <kbd>command</kbd><kbd>s</kbd>

See https://support.apple.com/HT201236

---
## Setup Mac environment

- Set OS language to English (System Preferences → Language & Region)
- Install **Command Line Tools** via **Terminal.app**:

    ```sh
    xcode-select --install
    ```

    Full Xcode is not necessary, but you can have it if you like.

- Install [Homebrew](/mac/homebrew.html) (software manager):

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```

- Try installing something with Homebrew:

    ```sh
    brew install wget
    wget https://www.lifesci.tohoku.ac.jp/evolgenomics/wp-content/themes/makino/images/logo2.png
    ```

    You may need to restart shell to reload `PATH`

    ```sh
    # command not found: brew
    exec $SHELL -l
    ```

---
## Setup R environment

```sh
brew cask install r rstudio
```

[R](https://cran.rstudio.com/)
: Core software to interpret and execute commands.
: Standard packages and functions are included.

[RStudio Desktop](https://www.rstudio.com/)
: Integrated environment to help users interact with R.
: Not necessary, but many people like it.

<img src="/slides/image/rstudio/rstudio-300x260.png">


---
## Launch RStudio and play with Console

Details will be explained later.

<img src="/slides/image/rstudio/console.png" class="screenshot" width="100%">



---
## Create "Project"

File → New Project... → New Directory → `~/project/r-training-2019`

<img src="/slides/image/rstudio/create-new-project.png" class="screenshot" width="90%">

---
## Write R script, and send it to Console

File → New File → R script

<img src="/slides/image/rstudio/newfile.png" width="100%">

---
## Write R script, and send it to Console

File → New File → R script

<img src="/slides/image/rstudio/script-console.png" width="100%">

---
## Write R script, and send it to Console

Select text with <kbd>shift</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd><br>
Execute them with <kbd>ctrl</kbd><kbd>return</kbd>

<img src="/slides/image/rstudio/101.png" width="100%">

---
## Save R script in the project: <kbd>command</kbd><kbd>s</kbd>

Separate data, scripts, and results, e.g.,

```
r-training-2019/           # プロジェクトの最上階
├── data/                  # 元データを置くところ
│   ├── iris.tsv
│   └── diamonds.xlsx
├── r-training-2019.Rproj  # これダブルクリックでRStudioを起動
├── hello.R
├── output/                # 結果の出力先
│   ├── iris-petal.png
│   └── iris-summary.tsv
├── transform.R            # データ整理・変形のスクリプト
└── visualize.R            # 作図のスクリプト
```

プロジェクト最上階を作業ディレクトリとし、<br>
ファイル読み書きの基準にする。(後で詳しく)

---
## Configure RStudio not to save/load workspace

Open "Preferences" with <kbd>command</kbd><kbd>,</kbd>

<figure>
<a href="https://r4ds.had.co.nz/workflow-projects.html">
<img src="/slides/image/rstudio/rstudio-workspace.png" width="75%"
     style="object-fit: cover; object-position: top; height: 480px;">
<figcaption><small>https://r4ds.had.co.nz/workflow-projects.html</small></figcaption>
</a>
</figure>


---
## Attitude toward programming in R

Don't fear errors
: Even experts cause errors very often.
: An error is a message from R. Try to understand it.

Google it
: Some R users in the world have already solved your problems.
: Queries can be 日本語, Engligh, or whole error message.
: それでも分からなかったら [r-wakalang](https://github.com/tokyor/r-wakalang) で相談しよう。

<figure style="float: right; margin: 0;">
<img src="/slides/image/rstats/error.png" height="300">
</figure>

Copy-and-paste is easier and faster
: 見つけたコードはまずコピペして使ってみよう。
: 動くようなら自分のデータに合わせて改変しよう。
: (ただし、ライセンスには注意...)

---
## Create objects/variables (変数)


```r
x = 42       # Create x
x            # What's in x?
```

```
[1] 42
```

```r
y = "24601"  # Create y
y            # What's in y?
```

```
[1] "24601"
```

```r
x + y        # Error!
```

```
Error in x + y: non-numeric argument to binary operator
```

---
## Object types (型)


```r
class(x)
```

```
[1] "numeric"
```

```r
is.numeric(x)
```

```
[1] TRUE
```

```r
is.character(x)
```

```
[1] FALSE
```

```r
as.character(x)
```

```
[1] "42"
```

Try applying the same functions to `y`.

---
## Object types (型)

- `NULL`: 空っぽ
- vector: 基本型。一次元の配列。
    - logical: 論理値 (`TRUE` or `FALSE`)
    - numeric: 数値 (整数 `42L` or 実数 `3.1416`)
    - character: 文字列 (`"a string"`)
    - factor: 因子 (文字列っぽいけど微妙に違う)
    - ↑それぞれに欠損値 `NA` も定義されてる
- matrix: 二次元の行列。vector同様、全要素が同じ型。
- list: 異なる型でも詰め込める太っ腹ベクトル。
- **data.frame: 同じ長さのベクトルを並べた長方形のテーブル。重要。** <br>
  **tibble** とか **tbl_df** と呼ばれる亜種もあるけどほぼ同じ。

---
## vector: 1-dimensional array

1個の値でもベクトル扱い。<br>
同じ長さ(または長さ1)の相手との計算が得意。


```r
x = c(1, 2, 9)  # 長さ3の数値ベクトル
x + x           # 同じ長さ同士の計算
```

```
[1]  2  4 18
```

```r
y = 10          # 長さ1の数値ベクトル
x + y           # 長さ3 + 長さ1 = 長さ3 (それぞれ足し算)
```

```
[1] 11 12 19
```

```r
sqrt(x)         # square root
```

```
[1] 1.000000 1.414214 3.000000
```

```r
# We don't have to write for-loop like this
z = c(0, 0, 0)
for (i in seq_len(3)) {
  z[i] = sqrt(x[i])
}
```


---
## data.frame: rectangle table (IMPORTANT!)

`iris` はアヤメ属3種150個体に関する測定データ。<br>
Rに最初から入ってて、例としてよく使われる。


```r
print(iris)
```

```
    Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
           <dbl>       <dbl>        <dbl>       <dbl>     <fct>
  1          5.1         3.5          1.4         0.2    setosa
  2          4.9         3.0          1.4         0.2    setosa
  3          4.7         3.2          1.3         0.2    setosa
  4          4.6         3.1          1.5         0.2    setosa
 --                                                            
147          6.3         2.5          5.0         1.9 virginica
148          6.5         3.0          5.2         2.0 virginica
149          6.2         3.4          5.4         2.3 virginica
150          5.9         3.0          5.1         1.8 virginica
```

長さ150の数値ベクトル4本と因子ベクトル1本。

---
## Read and Write data.frame

- You can read `.xlsx` files with readxl package, but
- Prefer plain text format, e.g., `.csv` and `.tsv`.
- Use **relative path** from **working directory**.

    
    ```r
    install.packages("readr") # R標準の read.table() とかは難しいので
    library(readr)            # パッケージのやつを使うよ
    readr::write_tsv(iris, "data/iris.tsv")
    readr::read_tsv("data/iris.tsv")
    ```

- Check your current working directory and its contents:

    
    ```r
    getwd()               # Get working directory
    list.files(".")       # List files in "."
    list.files("data")    # List files in "./data"
    ```


---
## R package

便利な関数やデータセットなどをひとまとめにしたもの。

Standard Packages
: Rの標準機能。何もしなくても使用可能

Contributed Packages
: 有志により開発され、
  [CRAN](https://cran.rstudio.com/web/packages/index.html)
  にまとめて公開されている。
: 要インストール。使う前に読み込むおまじないが必要。


```r
install.packages("readr")  # 一度やればOK
library(readr)             # 読み込みはRを起動するたびに必要
update.packages()          # たまには更新しよう
```

素のRも覚えきってないのにいきなりパッケージ？
: 大丈夫。誰も覚えきってない。
: パッケージを使わないR作業 = 火もナイフも使わない料理

---
## tidyverse

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges.png" width="260" style="float: right;">
</a>

Rでデータを上手に扱うためのパッケージ群


```r
install.packages("tidyverse")
library(tidyverse)
# 関連パッケージが一挙に読み込まれる
```

- 統一的な使い勝手
- 暗黙の処理をなるべくしない安全設計
- シンプルな関数を繋げて使うデザイン

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption><small>https://r4ds.had.co.nz/introduction.html</small></figcaption>
</a>
</figure>

---
## Many other useful packages

<a href="https://readxl.tidyverse.org/">
<img src="/_img/hex-stickers/readxl.webp" width="120" style="float: right;">
</a>
<a href="https://stringr.tidyverse.org/">
<img src="/_img/hex-stickers/stringr.webp" width="120" style="float: right;">
</a>

- [readxl](https://readxl.tidyverse.org/): エクセル形式の読み込み
- [stringr](https://stringr.tidyverse.org/): 文字列の処理
- [Bioconductor](https://www.bioconductor.org/): バイオインフォマティクス関連
- [igraph](https://igraph.org/r/): グラフ(ネットワーク)関連
- [rgl](https://cran.r-project.org/package=rgl): 3Dの作図
- [R Markdown](https://rmarkdown.rstudio.com/):
  Rコマンドと結果を埋め込んだPDFやHTMLを作る。<br>
  この発表スライドもそうやって作った。<br>
  レポート作成や共同研究者への報告にも便利！

たくさんありすぎて選べない？<br>
まずは人気のパッケージを https://awesome-r.com/ で探してみるとか。

---
## How to solve problems

- RStudio内にヘルプを表示: `?sum`, `help.start()`
- 変数の構造を確かめる: `str(iris)`, `attributes(iris)`
- エラー文をちゃんと読む: `No such file or directory`
- パッケージの公式ドキュメントをちゃんと読む
- パッケージ名やエラー文をコピペしてウェブ検索<br>
  → [StackOverflow](https://stackoverflow.com/questions/tagged/r)
  や個人サイトに解決策
- 身近な経験者に訊く
- Slackの
  [r-wakalang](https://github.com/tokyor/r-wakalang)
  で質問を投稿する。<br>
  内容によってチャンネルを選ぶ: `#r_beginners`, `#ggplot2`
- 状況を再現できる小さな例
  [(reprex)](https://reprex.tidyverse.org/)
  を添えて質問すると回答を得やすい。

---
## R basics: Summary

- Install R and RStudio via Homebrew.
- Write R script, and send it to Console.
- Place files in a "Project" structure.
- Variables have types: numeric vector, data.frame, etc.
- Use packages.
- Help is everywhere.

---
## Reference

R for Data Science --- Hadley Wickham and Garrett Grolemund
: https://r4ds.had.co.nz/
: [Book](https://amzn.to/2tbRmVc)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学

<a href="2-ggplot.html" rel="next" class="readmore">
2. Visualization with R
</a>
