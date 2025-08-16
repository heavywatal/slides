+++
url = "tohoku2025r/5-content.html"
linktitle = "データ内容の処理: 数値、文字列など。"
title = "5. データ内容の処理: 数値、文字列など。 — 進化学実習 2025 牧野研 東北大学"
date = 2025-04-10T13:00:00+09:00
draft = false
dpi = 108
+++

# [進化学実習 2025 牧野研 東北大学](.)

<div class="author">
岩嵜 航
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 牧野研 特任助教
</div>

<ol>
<li><a href="1-introduction.html">導入: データ解析の全体像。Rの基本。</a>
<li><a href="2-visualization.html">データの可視化。</a>
<li><a href="3-structure1.html">データ構造の処理1: 抽出、集約など。</a>
<li><a href="4-structure2.html">データ構造の処理2: 結合、変形など。</a>
<li class="current-deck"><a href="5-content.html">データ内容の処理: 数値、文字列など。</a>
<li><a href="6-input.html">データ入力、レポート作成</a>
<li><a href="7-distribution.html">統計モデリング1: 確率分布、尤度</a>
<li><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2025-04-10 東北大学 理学部生物学科 進化学実習<br>
<a href="https://heavywatal.github.io/slides/tohoku2025r/">https://heavywatal.github.io/slides/tohoku2025r/</a>
</div>


---
## 作業再開、出欠確認

1. `r-training-2025.Rproj` をダブルクリック。\
   正しい working directory でRStudioが起動される。
1. [初日と同じ手順](1-introduction.html#/28)で出欠確認。
1. 今日のぶんのスクリプトを新規作成し、好きな名前で保存。
1. [tidyverseの読み込み](2-visualization.html#/23)や[パレット設定](2-visualization.html#/36)など、
   おまじないをまず実行。


---
## 前回までのまとめ

### ✅ Rの基礎

- 調べ方さえわかれば、全部覚えなくても大丈夫
- エラーは日常茶飯事。落ち着いて読み取ろう
- まず**Rスクリプト**に書いてから、**コンソール**で実行
- 便利な**パッケージ**を使おう

### ✅ データ解析全体の流れ。可視化だいじ

### ✅ 一貫性のある文法で合理的に描けるggplot2

### ✅ 使える整然データにするための前処理がたいへん

---
## データ解析のおおまかな流れ

1. コンピュータ環境の整備 ✅
1. データの取得、読み込み ⬜
1. 探索的データ解析
    - **前処理、加工** (地味。意外と重い) ⬜ 👈 今回の主題
    - 可視化、仮説生成 (派手！だいじ！) ✅ 完全に理解した
    - 統計解析、仮説検証 (みんな勉強したがる) ⬜
1. 報告、発表 ⬜ Quarto楽しい

<figure>
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption><small>https://r4ds.hadley.nz/intro</small></figcaption>
</a>
</figure>

---
## 前処理は大きく2つに分けられる

<div style="float: right;">
<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="180">
</a><br>
<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="180">
</a>
</div>

- データ構造を対象とする処理 --- 第3, 4回
    - 使いたい部分だけ抽出 --- `select()`, `filter()`
    - グループごとに特徴を要約 --- `group_by()`, `summarize()`
    - 何かの順に並べ替え --- `arrange()`, `relocate()`
    - 異なるテーブルの結合 --- `*_join()`
    - 変形: 縦長 ↔ 横広 --- `pivot_longer()`, `pivot_wider()`
- **データ内容を対象とする処理** 👈 第5回 本日の話題
    - 数値の変換: 対数、正規化
    - 外れ値・欠損値への対処
    - 型変換: 連続変数、カテゴリカル変数、指示変数、因子、日時
    - 文字列処理: 正規表現によるパターンマッチ

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>

---
## tidyverse: データ科学のためのパッケージ群

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges8.png" width="33%" align="right">
</a>

```r
# install.packages("tidyverse") # 済んでるはず
library(conflicted) # 安全のおまじない
library(tidyverse)  # 一挙に読み込み
```

```
── Attaching core tidyverse packages ──── tidyverse 2.0.0 ──
✔ dplyr     1.1.4     ✔ readr     2.1.5
✔ forcats   1.0.0     ✔ stringr   1.5.1
✔ ggplot2   3.5.2     ✔ tibble    3.2.1
✔ lubridate 1.9.4     ✔ tidyr     1.3.1
✔ purrr     1.0.4     
```

一貫したデザインでデータ解析の様々な工程をカバー

<figure style="margin-block: 0;">
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption><small>https://r4ds.hadley.nz/intro</small></figcaption>
</a>
</figure>

---
## 変数/オブジェクトの型 (復習)

- **`vector`: 基本型。一次元の配列。** (👈今回の主役)
    - `logical`: 論理値 (`TRUE` or `FALSE`)
    - `numeric`: 数値 (整数 `42L` or 実数 `3.1416`)
    - `character`: 文字列 (`"a string"`)
    - `factor`: 因子 (文字列っぽいけど微妙に違う)
- `array`: 多次元配列。`vector`同様、全要素が同じ型。
    - `matrix`: 行列 = 二次元の配列。
- `list`: 異なる型でも詰め込める太っ腹ベクトル。
- **`data.frame`: 同じ長さのベクトルを並べた長方形のテーブル。重要。** \
  `tibble` とか `tbl_df` と呼ばれる亜種もあるけどほぼ同じ。


---
## vector: 一次元の配列 (復習)

1個の値でもベクトル扱い。\
ベクトルの各要素に一気に計算を適用できる。


``` r
x = c(1, 2, 9)  # 長さ3の数値ベクトル
x + x           # 同じ長さ同士の計算
```

```
[1]  2  4 18
```

``` r
y = 10          # 長さ1の数値ベクトル
x + y           # 長さ3 + 長さ1 = 長さ3 (それぞれ足し算)
```

```
[1] 11 12 19
```

``` r
x < 5           # それぞれの要素を比較
```

```
[1]  TRUE  TRUE FALSE
```

---
## 数値: numeric型

普通は倍精度浮動小数点型 `double` として扱われる:


``` r
answer = 42
typeof(answer)
```

```
[1] "double"
```

明示的に変換したり末尾にLを付けることで整数扱いもできる:


``` r
typeof(as.integer(answer))
```

```
[1] "integer"
```

``` r
whoami = 24601L
typeof(whoami)
```

```
[1] "integer"
```
Rではほとんど気にする必要はない。

---
## 様々な数学関数

ベクトルを受け取り、それぞれの要素に適用


``` r
x = c(1, 2, 3)
sqrt(x)
```

```
[1] 1.000000 1.414214 1.732051
```

``` r
log(x)
```

```
[1] 0.0000000 0.6931472 1.0986123
```

``` r
log10(x)
```

```
[1] 0.0000000 0.3010300 0.4771213
```

``` r
exp(x)
```

```
[1]  2.718282  7.389056 20.085537
```

<small style="display: block; text-align: right;"><https://stat.ethz.ch/R-manual/R-patched/library/base/html/00Index.html></small>

---
## data.frameは列vectorの集まり

内容を変更する方法はいくつかある。\
`diamonds` の `price` 列をドルから円に変換する例:


``` r
dia = diamonds    # 別名コピー

# dollar演算子 $ で指定
dia$price = 146.8 * dia$price

# 名前を [[文字列]] で指定
dia[["price"]] = 146.8 * dia[["price"]]

# dplyr::mutate with pipe
dia = diamonds |>
  dplyr::mutate(price = 146.8 * price) |>
  dplyr::filter(carat > 1) |>
  dplyr::summarize(avg_price = mean(price))
```

1発ならどれでもいい。流れ作業には `mutate()` が便利。


---
## 欠損値の除去 `tidyr::drop_na()`

(指定した列に) 欠損値 `NA` が含まれてる行を削除する。


``` r
df = tibble::tibble(x = c(1, 2, NA), y = c("a", NA, "c"), z = c("D", "E", NA))
df |> tidyr::drop_na()
```

```
  x y z
1 1 a D
```

🔰 `starwars` で**身長体重データのある行だけ抽出**してみよう


```
              name height mass hair_color  skin_color eye_color birth_year  sex    gender homeworld species     films  vehicles starships
 1  Luke Skywalker    172   77      blond        fair      blue       19.0 male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2           C-3PO    167   75       <NA>        gold    yellow      112.0 none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3           R2-D2     96   32       <NA> white, blue       red       33.0 none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4     Darth Vader    202  136       none       white    yellow       41.9 male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                       
56         Tarfful    234  136      brown       brown      blue         NA male masculine  Kashyyyk Wookiee <chr [1]> <chr [0]> <chr [0]>
57 Raymus Antilles    188   79      brown       light     brown         NA male masculine  Alderaan   Human <chr [2]> <chr [0]> <chr [0]>
58       Sly Moore    178   48       none        pale     white         NA <NA>      <NA>    Umbara    <NA> <chr [2]> <chr [0]> <chr [0]>
59      Tion Medon    206   80       none        grey     black         NA male masculine    Utapau  Pau'an <chr [1]> <chr [0]> <chr [0]>
```

---
## 欠損値の補完 `tidyr::replace_na()`

欠損値 `NA` を任意の値で置き換える。


``` r
df = tibble::tibble(x = c(1, 2, NA), y = c("a", NA, "c"), z = c("D", "E", NA))
df |> tidyr::replace_na(list(x = 9999, y = "unknown"))
```

```
     x       y    z
1    1       a    D
2    2 unknown    E
3 9999       c <NA>
```

🔰 `starwars` で**髪色と出身地が不明の部分を"!!"に置換**しよう


```
             name height mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1 Luke Skywalker    172   77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167   75         !!        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96   32         !! white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202  136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                        
84            Rey     NA   NA      brown       light     hazel         NA female  feminine        !!   Human <chr [1]> <chr [0]> <chr [0]>
85    Poe Dameron     NA   NA      brown       light     brown         NA   male masculine        !!   Human <chr [1]> <chr [0]> <chr [1]>
86            BB8     NA   NA       none        none     black         NA   none masculine        !!   Droid <chr [1]> <chr [0]> <chr [0]>
87 Captain Phasma     NA   NA       none        none   unknown         NA female  feminine        !!   Human <chr [1]> <chr [0]> <chr [0]>
```

---
## 欠損値とみなす `dplyr::na_if()`

特定の値を `NA` に置き換える:


``` r
df = tibble::tibble(x = c(1, 2, NA), y = c("a", NA, "c"), z = c("D", "E", NA))
df |> dplyr::mutate(x = dplyr::na_if(x, 1), y = dplyr::na_if(y, "a"))
```

```
   x    y    z
1 NA <NA>    D
2  2 <NA>    E
3 NA    c <NA>
```

🔰 `starwars` の**髪色と肌色の"none"を欠損値に**しよう


```
             name height mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1 Luke Skywalker    172   77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167   75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96   32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202  136       <NA>       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                        
84            Rey     NA   NA      brown       light     hazel         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
85    Poe Dameron     NA   NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
86            BB8     NA   NA       <NA>        <NA>     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
87 Captain Phasma     NA   NA       <NA>        <NA>   unknown         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
```

---
## 欠損値の補完 `dplyr::coalesce()`

先に指定したvectorの値が `NA` なら次のvectorの値を採用:


``` r
df = tibble::tibble(x = c(1, 2, NA), y = c("a", NA, "c"), z = c("D", "E", NA))
df |> dplyr::mutate(y_or_z = dplyr::coalesce(y, z))
```

```
   x    y    z y_or_z
1  1    a    D      a
2  2 <NA>    E      E
3 NA    c <NA>      c
```

異なる型を混ぜると怒られる:

``` r
df |> dplyr::mutate(x_or_y = dplyr::coalesce(x, y))
```

```
Error in `dplyr::mutate()`:
ℹ In argument: `x_or_y = dplyr::coalesce(x, y)`.
Caused by error in `dplyr::coalesce()`:
! Can't combine `..1` <double> and `..2` <character>.
```

🔰 `starwars` で**髪色の欠損値を肌色で補おう**


```
             name height mass  hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1 Luke Skywalker    172   77       blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167   75        gold        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96   32 white, blue white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202  136        none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                         
84            Rey     NA   NA       brown       light     hazel         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
85    Poe Dameron     NA   NA       brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
86            BB8     NA   NA        none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
87 Captain Phasma     NA   NA        none        none   unknown         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
```

---
## 条件に応じて値を選択 `dplyr::if_else()`

`TRUE` の位置では `x` を採用、`FALSE` の位置では `y` を採用:


``` r
condition = c(TRUE, TRUE, FALSE)
x = c(1, 2, 3)
y = c(100, 200, 300)
dplyr::if_else(condition, x, y)
```

```
[1]   1   2 300
```

🔰 `starwars` で**種族がドロイドの行だけ身長を100倍**してみよう



```
             name height mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1 Luke Skywalker    172   77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO  16700   75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2   9600   32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202  136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                        
84            Rey     NA   NA      brown       light     hazel         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
85    Poe Dameron     NA   NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
86            BB8     NA   NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
87 Captain Phasma     NA   NA       none        none   unknown         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
```

---
## 文字列: character型 (string)

ダブルクォートで囲む。シングルクォートも使える。


``` r
x = "This is a string"
y = 'If I want to include a "quote" inside a string, I use single quotes'
```

閉じそびれると変な状態になるので、落ち着いて <kbd>esc</kbd> or <kbd>ctrl</kbd><kbd>c</kbd>

```
> "This is a string without a closing quote
+
+
+ HELP I'M STUCK
```

<small style="display: block; text-align: right;"><https://r4ds.hadley.nz/strings.html></small>

---
## R備え付けの文字列機能は使いにくい

-   何をやる関数なのか名前から分かりにくい:\
    `grep`, `grepl`, `regexpr`, `gregexpr`, `regexec`\
    `sub`, `gsub`, `substr`, `substring`
-   対象文字列はいくつめに渡す？関数ごとに違う:

    ```r
    grep(pattern, x, ...)
    sub(pattern, replacement, x, ...)
    substr(x, start, stop)
    ```

-   欠損値 `NA` に対する挙動が微妙:

    
    ``` r
    x = c(1, 2, NA)
    y = c("a", NA, "c")
    paste(x, y)  # NA is not distinguished from character "NA"
    ```
    
    ```
    [1] "1 a"  "2 NA" "NA c"
    ```

---
## stringr --- tidyverseの文字列処理担当

<a href="https://stringr.tidyverse.org/">
<img src="/_img/hex-stickers/stringr.webp" width="180" align="right">
</a>

-   関数や引数の名前に一貫性があって分かりやすい
-   対象文字列が一貫して第一引数なので `|>` able
-   引数オブジェクトの各要素の名前や位置を保持する
    -   長さゼロの入力からは長さゼロの出力
    -   入力に `NA` が含まれる場合は対応する出力も `NA`
-   [公式ドキュメント](https://stringr.tidyverse.org/)を見れば全容が掴める

<figure style="margin: 0;">
<a href="https://stringr.tidyverse.org/">
<img src="/slides/image/cheatsheet/strings.png" width="40%">
<img src="/slides/image/cheatsheet/strings-regex.png" width="40%">
</a>
</figure>


---
## 文字列の基本操作


``` r
fruit4 = head(fruit, 4L) |> print()
```

```
[1] "apple"   "apricot" "avocado" "banana" 
```

``` r
stringr::str_length(fruit4)            # 長さ
```

```
[1] 5 7 7 6
```

``` r
stringr::str_sub(fruit4, 2, 4)         # 部分抽出
```

```
[1] "ppl" "pri" "voc" "ana"
```

``` r
stringr::str_c(1:4, " ", fruit4, "!")  # 結合
```

```
[1] "1 apple!"   "2 apricot!" "3 avocado!" "4 banana!" 
```

🔰 `words` の中で9文字より長いものを抜き出してみよう

🔰 それら長い単語に `str_sub()` や `str_c()` を適用してみよう

---
## パターンマッチング

単純な一致だけじゃなく、いろんな条件でマッチングできる:


``` r
# aで始まる
stringr::str_subset(fruit, "^a")
```

```
[1] "apple"   "apricot" "avocado"
```

``` r
# rで終わる
stringr::str_subset(fruit, "r$")
```

```
[1] "bell pepper"  "chili pepper" "cucumber"     "pear"        
```

``` r
# 英数字3-4文字
stringr::str_subset(fruit, "^\\w{3,4}$")
```

```
[1] "date" "fig"  "lime" "nut"  "pear" "plum"
```

この `^` とか `$` って何者？

---
## 正規表現: 柔軟な検索・置換を可能にするツール

| メタ文字 | 意味 | &emsp;&emsp; | 演算子 | 意味 |
| ---- | ---- | --- | ---- | ---- |
| `\d` | 数字 (逆は `\D`) | | `a?`  | 0回か1回のa |
| `\s` | 空白 (逆は `\S`) | | `a*`  | 0回以上繰り返されたa |
| `\w` | 英数字 (逆は `\W`) | | `a+`  | 1回以上繰り返されたa |
| `.`  | **何でも1文字** | | `a{n,m}` | n回以上m回以下のa |
| `^`  | 行頭   | | `a(?=c)`  | cに先立つa |
| `$`  | 行末   | | `(?<=b)a`  | bに続くa |

<small style="display: block; text-align: right;"><https://unicode-org.github.io/icu/userguide/strings/regexp.html#regular-expression-metacharacters></small>

Rの`"普通の文字列"`ではバックスラッシュを重ねる必要がある: `"^\\d"`.
<aside style="font-size: 0.9rem; opacity: 0.6;">

改行 `\n` とかタブ `\t` のような[エスケープシーケンス](https://duckduckgo.com/?q=escape+sequence)と区別するため。\
`r"(raw文字列)"`を使う場合はひとつでいい: `r"(^\d)"`.

</aside>

---
## 正規表現: チートシート

<figure style="margin: 0;">
<a href="https://stringr.tidyverse.org/">
<img src="/slides/image/cheatsheet/strings-regex.png" width="90%">
<figcaption><small>https://stringr.tidyverse.org/</small></figcaption>
</a>
</figure>

---
## 正規表現: 練習問題

🔰 `str_subset()` と `fruit` でパターンマッチを身に着けよう:

- "o" を含むもの
- "o" で始まるもの
- "berry" で終わるもの
- "c" で始まり "r" で終わるもの
- 空白を含むもの、含まないもの

🔰 `starnames = starwars[["name"]]` として次のマッチにも挑戦:

- 数字を含むもの、含まないもの
- 3語以上のもの
- 小文字アルファベットを含まないもの


---
## 検出 `str_detect()`

マッチするかどうか `TRUE`/`FALSE` を返す。

``` r
fruit4 = head(fruit, 4L)
stringr::str_detect(fruit4, "^a")
```

```
[1]  TRUE  TRUE  TRUE FALSE
```

🔰 `starwars` から `name` 列に空白を含まない行を抽出しよう


```
        name height mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1     C-3PO    167   75       <NA>        gold    yellow        112   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 2     R2-D2     96   32       <NA> white, blue       red         33   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 3     R5-D4     97   32       <NA>  white, red       red         NA   none masculine  Tatooine   Droid <chr [1]> <chr [0]> <chr [0]>
 4 Chewbacca    228  112      brown     unknown      blue        200   male masculine  Kashyyyk Wookiee <chr [5]> <chr [1]> <chr [2]>
--                                                                                                                                   
21   Tarfful    234  136      brown       brown      blue         NA   male masculine  Kashyyyk Wookiee <chr [1]> <chr [0]> <chr [0]>
22      Finn     NA   NA      black        dark      dark         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
23       Rey     NA   NA      brown       light     hazel         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
24       BB8     NA   NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
```

---
## 抽出 `str_extract()`

マッチした部分文字列を取り出す。しなかった要素には `NA`。

``` r
fruit4 = head(fruit, 4L)
stringr::str_extract(fruit4, "^a..")
```

```
[1] "app" "apr" "avo" NA   
```

🔰 `starwars` の `name` 列をファーストネームだけにしてみよう


```
      name height mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
 1    Luke    172   77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2   C-3PO    167   75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3   R2-D2     96   32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4   Darth    202  136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                 
84     Rey     NA   NA      brown       light     hazel         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
85     Poe     NA   NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
86     BB8     NA   NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
87 Captain     NA   NA       none        none   unknown         NA female  feminine      <NA>   Human <chr [1]> <chr [0]> <chr [0]>
```


---
## 置換 `str_replace()`, `str_replace_all()`

カッコ `()` で囲んだマッチングは後で参照できる:

``` r
fruit4 = head(fruit, 4L)
stringr::str_replace(fruit4, "..$", "!!")
```

```
[1] "app!!"   "apric!!" "avoca!!" "bana!!" 
```

``` r
stringr::str_replace(fruit4, "(..)$", "_\\1_")
```

```
[1] "app_le_"   "apric_ot_" "avoca_do_" "bana_na_" 
```

🔰 `starwars` の `name` 列の数字を全部ゼロにしてみよう


```
    name height mass hair_color  skin_color eye_color birth_year  sex    gender homeworld species     films  vehicles starships
1  C-0PO    167   75       <NA>        gold    yellow        112 none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
2  R0-D0     96   32       <NA> white, blue       red         33 none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
3  R0-D0     97   32       <NA>  white, red       red         NA none masculine  Tatooine   Droid <chr [1]> <chr [0]> <chr [0]>
4  IG-00    200  140       none       metal       red         15 none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
5 R0-P00     96   NA       none silver, red red, blue         NA none  feminine      <NA>   Droid <chr [2]> <chr [0]> <chr [0]>
6    BB0     NA   NA       none        none     black         NA none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
```

---
## dplyr, tidyr の列選択などでも活躍

`matches()` だけで `starts_with()`/`ends_with()` の役もこなせる:


``` r
                        # starts_with("c")
diamonds |> dplyr::select(matches("^c"))

                        # ends_with("s")
starwars |> dplyr::select(matches("s$"))

                        # 数字だけ
table4a |>
  tidyr::pivot_longer(matches("^\\d+$"), names_to = "year")
```

See [selection helpers](https://tidyselect.r-lib.org/reference/language.html) for more details.


---
## 形式を変える・整える


``` r
fruit4 = head(fruit, 4L)
stringr::str_to_upper(fruit4)              # 大文字に
```

```
[1] "APPLE"   "APRICOT" "AVOCADO" "BANANA" 
```

``` r
stringr::str_pad(fruit4, 8, "left", "_")   # 幅を埋めて指定幅に
```

```
[1] "___apple" "_apricot" "_avocado" "__banana"
```

``` r
stringr::str_trim("  word  ")              # 前後のスペースを除去
```

```
[1] "word"
```

[`stringi`](http://www.gagolewski.com/software/stringi/) パッケージはさらに多機能

``` r
stringi::stri_trans_nfkc(c("ｶﾀｶﾅ", "４２"))  # 半角カナ・全角数字に対処
```

```
[1] "カタカナ" "42"      
```

↑ これ、日本語データの掃除でかなり重宝する

---
## 文字列から別の型に

<a href="https://readr.tidyverse.org/">
<img src="/_img/hex-stickers/readr.webp" width="180" align="right">
</a>

これはstringrではなくreadrの担当:


``` r
readr::parse_number(c("p = 0.02 *", "N_A = 6e23"))
```

```
[1] 2e-02 6e+23
```

``` r
readr::parse_double(c("0.02", "6e+23"))
```

```
[1] 2e-02 6e+23
```

``` r
readr::parse_logical(c("1", "true", "0", "false"))
```

```
[1]  TRUE  TRUE FALSE FALSE
```

``` r
readr::parse_date("2020-06-03")
```

```
[1] "2020-06-03"
```

`6e+23` は $6 \times 10 ^ {23}$ のプログラミング的表現。
$6e^{23}$ ではない。

---
## 因子型 `factor` でカテゴリカル変数(質的変数)を扱う


``` r
month_levels = c(                       # 取りうる値
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
)
x1 = c("Dec", "Apr", "Jan", "Mar")      # ただの文字列vector
y1 = factor(x1, levels = month_levels)  # 因子型に変換
print(y1)
```

```
[1] Dec Apr Jan Mar
Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```

文字列っぽいけど**実体は整数**:

``` r
typeof(y1)
```

```
[1] "integer"
```

``` r
as.integer(y1)                          # 整数型に変換可能
```

```
[1] 12  4  1  3
```

🔰 `iris` に含まれる因子型を確認しよう: `str(iris)`

<small style="display: block; text-align: right;"><https://r4ds.hadley.nz/factors.html></small>

---
## 因子型 `factor`: 文字列との違い1

取りうる値 (levels) が既知。

typoなどによりlevels外になると `NA` 扱い。


``` r
x2 = c("Dec", "Apr", "Jam", "Mar")
factor(x2, levels = month_levels)
```

```
[1] Dec  Apr  <NA> Mar 
Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```

元の文字列vectorに全てのlevelsが含まれてるなら簡単に変換可能:

``` r
as.factor(starwars[["gender"]])
```

```
 [1] masculine masculine masculine masculine feminine  masculine feminine  masculine masculine masculine masculine masculine masculine masculine masculine masculine masculine <NA>      masculine masculine masculine masculine masculine masculine masculine masculine feminine  masculine masculine masculine masculine masculine masculine feminine  masculine masculine masculine masculine masculine masculine masculine feminine  masculine masculine feminine  masculine masculine masculine masculine masculine masculine masculine masculine feminine  masculine masculine masculine masculine <NA>      <NA>      masculine masculine feminine  feminine  feminine  masculine masculine masculine feminine  masculine masculine feminine  feminine  feminine  masculine masculine feminine  masculine masculine masculine <NA>      masculine masculine feminine  masculine masculine feminine 
Levels: feminine masculine
```

---
## 因子型 `factor`: 文字列との違い2

アルファベット順じゃない順序がある:


``` r
x1 = c("Dec", "Apr", "Jan", "Mar")
sort(x1)     # 文字列としてソートするとアルファベット順
```

```
[1] "Apr" "Dec" "Jan" "Mar"
```

``` r
y1 = factor(x1, levels = month_levels)
sort(y1)     # 因子としてソートするとlevels順
```

```
[1] Jan Mar Apr Dec
Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```

---
## 因子型 `factor`: 順序の情報は作図で生きる

文字列だと勝手にアルファベット順。因子型なら任意指定可能:


``` r
mpg_fct = mpg |>
  dplyr::mutate(drv = factor(drv, levels = c("f", "r", "4")))
```

![plot of chunk factor-plot](./figure/factor-plot-1.png)

---
## 順序つき因子型 `ordered`

大小の比較ができる。


``` r
x1 = c("Dec", "Apr", "Jan", "Mar")
y3 = factor(x1, levels = month_levels, ordered = TRUE)
class(y3)
```

```
[1] "ordered" "factor" 
```

``` r
print(y3)
```

```
[1] Dec Apr Jan Mar
Levels: Jan < Feb < Mar < Apr < May < Jun < Jul < Aug < Sep < Oct < Nov < Dec
```

``` r
y3 < "Sep"
```

```
[1] FALSE  TRUE  TRUE  TRUE
```

🔰 `diamonds` に含まれるordered型を確認しよう: `str(diamonds)`\
🔰 `cut` がPremium以上の行だけ抜き出す、とか。

---
## tidyverse の因子型担当は forcats

<a href="https://forcats.tidyverse.org/">
<img src="/_img/hex-stickers/forcats.webp" width="180" align="right">
</a>


``` r
# 頻度に応じて順序を並べ替え
diamonds |>
  dplyr::mutate(color = forcats::fct_infreq(color))

# 少なすぎるカテゴリを"その他"としてまとめる
mpg |>
  dplyr::mutate(fl = forcats::fct_lump(fl, n = 2))
```

![plot of chunk fct-infreq](./figure/fct-infreq-1.png)

ほかに `fct_reorder()`, `fct_relevel()` なども。
[公式サイト](https://forcats.tidyverse.org/)参照。


---
## factorで順序を変えて作図する練習

🔰 `mpg` で次のような図を描いてみよう

![plot of chunk plot-factor](./figure/plot-factor-1.png)

ヒント: 使うのは [`geom_bar()`](https://ggplot2.tidyverse.org/reference/geom_bar.html)


---
## 日時型: POSIXct, POSIXlt

- POSIXct: エポックからの経過秒数。比較や差分などを取りやすい。
- POSIXlt: list(秒, 分, 時, 日, 月, 年, ...)。単位ごとに抜き出しやすい。


``` r
now = "2025-04-10 15:30:00"
ct = as.POSIXct(now)
unclass(ct)
```

```
[1] 1744266600
attr(,"tzone")
[1] ""
```

``` r
lt = as.POSIXlt(now)
unclass(lt) |> as_tibble()
```

```
  sec min hour mday mon year wday yday isdst zone gmtoff
1   0  30   15   10   3  125    4   99     0  JST     NA
```

素のRでも扱えるけど lubridate パッケージを使うともっと楽に。

---
## lubridate --- 日時型処理パッケージ

<a href="https://lubridate.tidyverse.org/">
<img src="/_img/hex-stickers/lubridate.webp" width="180" align="right">
</a>

日時型への変換:

``` r
lubridate::ymd(c("20250410", "2025-04-10", "24/04/10"))
```

```
[1] "2025-04-10" "2025-04-10" "2024-04-10"
```

日時型から単位ごとに値を取得:

``` r
today = lubridate::ymd(20250410)
lubridate::month(today)
```

```
[1] 4
```

``` r
lubridate::wday(today, label = TRUE)
```

```
[1] Thu
Levels: Sun < Mon < Tue < Wed < Thu < Fri < Sat
```

---
## データ内容を対象とする処理 | まとめ

<div style="float: right;">
<a href="https://stringr.tidyverse.org/">
<img src="/_img/hex-stickers/stringr.webp" width="180">
</a><br>
<a href="https://forcats.tidyverse.org/">
<img src="/_img/hex-stickers/forcats.webp" width="180">
</a><br>
<a href="https://lubridate.tidyverse.org/">
<img src="/_img/hex-stickers/lubridate.webp" width="180">
</a><br>
</div>

- 正規化・欠損値処理は目的に応じて検討
- vectorには**型**がある: 文字列、数値、因子、日時、etc.
- 文字列を扱うには [stringr](https://stringr.tidyverse.org/)
    - **正規表現**は一度習得すれば超強力
- 因子を扱うには [forcats](https://forcats.tidyverse.org/)
    - 知っておくとたまに便利。苦手なら全部文字列にしてもいい。
- 日時を扱うには [lubridate](https://lubridate.tidyverse.org/)

各パッケージの[チートシート.pdf](https://www.rstudio.com/resources/cheatsheets/)を手元に持っておくと便利。


---
## 前処理に必要な道具はだいたい揃った

<div style="float: right;">
<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="180">
</a><br>
<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="180">
</a><br>
<a href="https://stringr.tidyverse.org/">
<img src="/_img/hex-stickers/stringr.webp" width="180">
</a>
</div>

- データ構造を対象とする処理 — 第3, 4回
    - 使いたい部分だけ抽出 --- `select()`, `filter()`
    - グループごとに特徴を要約 --- `group_by()`, `summarize()`
    - 何かの順に並べ替え --- `arrange()`, `relocate()`
    - 異なるテーブルの結合 --- `*_join()`
    - 変形: 縦長 ↔ 横広 --- `pivot_longer()`, `pivot_wider()`
- **データ内容を対象とする処理** — 👈 第5回 本日の話題
    - 数値の変換: 対数、正規化
    - 外れ値・欠損値への対処
    - 型変換: 連続変数、カテゴリカル変数、指示変数、因子、日時
    - 文字列処理: 正規表現によるパターンマッチ

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>


---
## 🔰 3日目の課題1: 組み込みデータをいじくり倒してみよう

<div style="float: right;">
<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="180">
</a><br>
<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="180">
</a><br>
<a href="https://forcats.tidyverse.org/">
<img src="/_img/hex-stickers/forcats.webp" width="180">
</a><br>
<a href="https://lubridate.tidyverse.org/">
<img src="/_img/hex-stickers/lubridate.webp" width="180">
</a><br>
</div>

- データを1人1つ選び、作図して読み取れることを一言。
- 前処理でいろいろなパッケージ・関数を駆使するほど良い。

```r
dplyr::storms
dplyr::starwars
tidyr::billboard
tidyr::cms_patient_experience
tidyr::cms_patient_care
tidyr::relig_income
tidyr::us_rent_income
tidyr::who
tidyr::population
tidyr::world_bank_pop
forcats::gss_cat
lubridate::lakers
ggplot2::midwest
ggplot2::msleep
ggplot2::txhousing
```


---
## Reference

R for Data Science --- Hadley Wickham et al.
: <https://r4ds.hadley.nz>,
  [Paperback](https://amzn.to/4cpL6w8),
  [日本語版書籍](https://amzn.to/2yyFRKt)

[前処理大全 --- 本橋智光](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)\
[RユーザのためのRStudio[実践]入門 (宇宙船本) --- 松村ら](https://amzn.to/2Yy5LND)

Official documents:
: [tidyverse](https://www.tidyverse.org/),
  [dplyr](https://dplyr.tidyverse.org/),
  [tidyr](https://tidyr.tidyverse.org/),
  [stringr](https://stringr.tidyverse.org/),
  [forcats](https://forcats.tidyverse.org/),
  [lubridate](https://lubridate.tidyverse.org/)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2024/)」
   岩嵜航 2024 東京医科歯科大
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2024/)」
   石川由希 2024 名古屋大学

<a href="6-input.html" class="readmore">
6. データ入力、レポート作成
</a>
