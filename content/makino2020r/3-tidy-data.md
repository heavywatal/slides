+++
url = "makino2020r/3-tidy-data.html"
title = "Tidying and transforming data with R — Hands-on R Lecture for Makino Lab"
linktitle = "Tidying and transforming data with R"
date = 2020-06-03T13:30:00+09:00
type = "reveal"
draft = false
+++


# [Hands-on Introduction to R 2020](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野
</div>

<ol start="0">
<li><a href="0-why-r.html">Why do we use R?</a>
<li><a href="1-basic-r.html">R basics</a>
<li><a href="2-ggplot.html">Visualization with R</a>
<li class="current-deck"><a href="3-tidy-data.html">Tidying and transforming data with R</a>
<li><a href="4-statistics.html">Statistical analysis with R</a>
</ol>

<div class="footnote">
資料作成協力: 石川由希 (名古屋大学 理学研究科 脳回路構造学 講師)<br>
2020-06-03
</div>





---
## パッケージをアップデートしてください

```r
update.packages()
```

Rを再起動していつものパッケージ読み込み
```r
library(tidyverse)
```
```
── Attaching packages ─────────────────────────────────────── tidyverse 1.3.0 ──
✔ ggplot2 3.3.1     ✔ purrr   0.3.4
✔ tibble  3.0.1     ✔ dplyr   1.0.0
✔ tidyr   1.1.0     ✔ stringr 1.4.0
✔ readr   1.3.1     ✔ forcats 0.5.0
── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
✖ dplyr::filter() masks stats::filter()
✖ dplyr::lag()    masks stats::lag()
```

最近でた **dplyr ≥1.0.0** と **tidyr ≥1.1.0** を使う。


---
## データ解析のおおまかな流れ

1. コンピュータ環境の整備
1. データの取得、読み込み
1. 探索的データ解析
    - **前処理、加工** (地味。意外と重い。今回の主題)
    - 可視化、仮説生成 (派手！楽しい！[前回の主題](2-ggplot.html))
    - 統計解析、仮説検証 (みんな勉強したがる)
1. 報告、発表

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption><small>https://r4ds.had.co.nz/introduction.html</small></figcaption>
</a>
</figure>


---
## 可視化だいじ。わかった。

情報の整理 → **正しい解析・新しい発見・仮説生成**

<figure>
<a href="https://r4ds.had.co.nz/explore-intro.html">
<img src="/slides/image/r4ds/data-science-explore.png">
<figcaption><small>https://r4ds.had.co.nz/explore-intro.html</small></figcaption>
</a>
</figure>

でも**データ分析に費やす労力の8割は前処理**らしいよ。。。


---
## 機械処理しやすい形 vs 人が読み書きしやすい形

作図や解析に使えるデータ形式はほぼ決まってる
: `ggplot(data, ...)`, `glm(..., data, ...)`, ...

出発点となるデータはさまざま
: 実験ノート、フィールドノート、データベース、...

> Happy families are all alike;<br>
> every unhappy family is unhappy in its own way<br>
> --- Leo Tolstoy "Anna Karenina"

> tidy datasets are all alike,<br>
> but every messy dataset is messy in its own way<br>
> --- Hadley Wickham, creator of tidyverse


---
## 整然データ tidy data

- **縦1列**は1つの**変数**
- **横1行**は1つの**観測**
- **1セル**は1つの**値**

<small style="display: block; text-align: right;"><https://r4ds.had.co.nz/tidy-data.html></small>


```r
print(diamonds)
```

```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
   --                                                                  
53937  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
53938  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
53939  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
53940  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```

---
## 整然データ tidy data &nbsp; vs &nbsp; 雑然データ messy data

<div class="column-container">
  <div class="column" style="flex-shrink: 1.1;">
    <img src="/slides/image/fnshr/tidy-data-ex1.png" height="550" style="vertical-align: top;">
  </div>
  <div class="column">
    <img src="/slides/image/fnshr/messy-data-ex1.png" width="300" style="transform: translate(-14px, 0);">
    <div style="position: absolute; top: 440px;">
    縦1列は1つの変数<br>
    横1行は1つの観測<br>
    1セルは1つの値<br>
    </div>
  </div>
</div>
<small style="position: absolute; bottom: 1rem; left: 2rem;">
<a href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「<cite>整然データとは何か</cite>」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</small>

---
## 整然データ tidy data &nbsp; vs &nbsp; 雑然データ messy data

<div class="column-container">
  <div class="column" style="flex-shrink: 1.1;">
    <img src="/slides/image/fnshr/tidy-data-ex1-var.png" height="580" style="vertical-align: top;">
  </div>
  <div class="column">
    <img src="/slides/image/fnshr/messy-data-ex1-var.png" width="420" style="transform: translate(-36px, -10px);">
    <div style="position: absolute; top: 440px;">
    <strong>縦1列は1つの変数</strong><br>
    横1行は1つの観測<br>
    1セルは1つの値<br>
    </div>
  </div>
</div>
<small style="position: absolute; bottom: 1rem; left: 2rem;">
<a href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「<cite>整然データとは何か</cite>」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</small>

---
## 整然データ tidy data &nbsp; vs &nbsp; 雑然データ messy data

<div class="column-container">
  <div class="column" style="flex-shrink: 1.1;">
    <img src="/slides/image/fnshr/tidy-data-ex1-obs.png" height="530" style="vertical-align: top;">
  </div>
  <div class="column">
    <img src="/slides/image/fnshr/messy-data-ex1-obs.png" width="300" style="transform: translate(-24px, 0);">
    <div style="position: absolute; top: 440px;">
    縦1列は1つの変数<br>
    <strong>横1行は1つの観測</strong><br>
    1セルは1つの値<br>
    </div>
  </div>
</div>
<small style="position: absolute; bottom: 1rem; left: 2rem;">
<a href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「<cite>整然データとは何か</cite>」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</small>

---
## 整然データ tidy data &nbsp; vs &nbsp; 雑然データ messy data

<div class="column-container">
  <div class="column" style="flex-shrink: 1.1;">
    <img src="/slides/image/fnshr/tidy-data-ex1-obs.png" height="530" style="vertical-align: top;">
  </div>
  <div class="column">
    <img src="/slides/image/fnshr/messy-data-ex1-val.png" width="300" style="transform: translate(-14px, 4px);">
    <div style="position: absolute; top: 440px;">
    縦1列は1つの変数<br>
    横1行は1つの観測<br>
    <strong>1セルは1つの値</strong><br>
    </div>
  </div>
</div>
<small style="position: absolute; bottom: 1rem; left: 2rem;">
<a href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「<cite>整然データとは何か</cite>」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</small>


---
## 整然データのご利益の一例

x軸、y軸、色分け、パネル分けなどを列の名前で指定して簡単作図:


```r
ggplot(diamonds) + aes(x = carat, y = price) +
  geom_point(mapping = aes(color = color, size = clarity)) +
  facet_wrap(~ cut)
```

![plot of chunk aes-map](figure/aes-map-1.png)


---
## 目標: 生データを下ごしらえして食べやすい形に


```r
VADeaths
```

```
      Rural Male Rural Female Urban Male Urban Female
50-54       11.7          8.7       15.4          8.4
55-59       18.1         11.7       24.3         13.6
60-64       26.9         20.3       37.0         19.3
65-69       41.0         30.9       54.6         35.1
70-74       66.0         54.3       71.1         50.0
```

↓ 下ごしらえ: 作図・解析で使いやすい整然データに


```
   lbound ubound region    sex death
    <int>  <int>  <chr>  <chr> <dbl>
 1     50     54  Rural   Male  11.7
 2     50     54  Rural Female   8.7
 3     50     54  Urban   Male  15.4
 4     50     54  Urban Female   8.4
--                                  
17     70     74  Rural   Male  66.0
18     70     74  Rural Female  54.3
19     70     74  Urban   Male  71.1
20     70     74  Urban Female  50.0
```


---
## 前処理は大きく2つに分けられる

- **データ構造を対象とする処理** 👈
    - 使いたい部分だけ抽出
    - グループごとに特徴を要約
    - 大きい順に並べ替え
    - 異なるテーブルの結合
    - 変形: 縦長 ↔ 横広
- データ内容を対象とする処理
    - 数値を変換する (e.g., 対数、座標系)
    - 変換: 連続変数 ↔ カテゴリカル変数 ↔ ダミー変数
    - 外れ値・欠損値に対処
    - 文字列から数値や日時を抜き出す

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>

---
## tidyverseに便利な道具が揃ってる

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges.png" width="260" style="float: right;">
</a>

Rでデータを上手に扱うためのパッケージ群


```r
install.packages("tidyverse")
library(tidyverse)
# core packages are loaded
```

- 統一的な使い勝手
- シンプルな関数を繋げて使うデザイン

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption><small>https://r4ds.had.co.nz/introduction.html</small></figcaption>
</a>
</figure>

data.frame処理に使うのは主に [dplyr](/rstats/dplyr.html) と [tidyr](/rstats/tidyr.html)


---
## このハンズオンR入門の目標

### ✅ <strike>再現可能な解析を楽にやりたい</strike>

### ⬜ あれもこれもRでできそう！

### ⬜ やりたくなったらこうやって調べればいいんだな

<br>
That's all.
この3点さえ押さえれば、個々の方法は覚えなくても大丈夫。<br>

(今日は結構盛り沢山なので念のため再掲)


---
## dplyr --- data.frameの高速処理担当

<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="120" style="float: right;">
</a>

シンプルな関数がたくさん。繋げて使う (piping)

抽出
: 列: `select()`,
: 行: `filter()`, `distinct()`, `slice()`

要約・集計
: `group_by()`, `summarize()`, `count()`

ソート
: `arrange()`

結合
: 行方向: `bind_rows()`
: 列方向: `left_join()`, `inner_join()`, `full_join()`

列の追加・変更
: `mutate()`, `rename()`


---
## dplyrを使ってみる準備

パッケージを読み込んで、データを見てみる
```r
# install.packages("tidyverse")
library(tidyverse)
print(diamonds)
View(diamonds)  # RStudio
```


```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
   --                                                                  
53937  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
53938  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
53939  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
53940  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```


---
## dplyr 使用例

小さな関数を繋げて使う流れ作業:

```r
result = diamonds %>%              # 生データから出発して
  select(carat, cut, price) %>%    # 列を抽出して
  filter(carat > 1) %>%            # 行を抽出して
  group_by(cut) %>%                # グループ化して
  summarize(mean(price)) %>%       # 平均を計算
  print()                          # 表示してみる
```

```
        cut mean(price)
      <ord>       <dbl>
1      Fair    7177.856
2      Good    7753.601
3 Very Good    8340.549
4   Premium    8487.249
5     Ideal    8674.227
```

この見慣れぬ記号 `%>%` は何？

---
## Pipe operator (パイプ演算子) `%>%`

パイプの左側の変数を、右側の関数の第一引数にねじ込む:
```r
diamonds %>% filter(carat > 1)
filter(diamonds, carat > 1)     # これと同じ

# 前処理の流れ作業に便利:
diamonds %>% select(carat, price) %>% filter(carat > 1) %>% ...
#   data %>%  do_A()  %>%  do_B()  %>%  do_C()  %>% ...
```

[問] パイプを使わない形に書き換えよう:

```r
seq_len(6) %>% sum()
```

```
[1] 21
```

```r
letters %>% toupper() %>% head(3)
```

```
[1] "A" "B" "C"
```

[解答例]
```r
sum(seq_len(6))
head(toupper(letters), 3)
```

---
## パイプ演算子 `%>%` を使わない方法

😐 一時変数をイチイチ作る:

```r
tmp1 = select(diamonds, carat, cut, price)   # 列を抽出して
tmp2 = filter(tmp1, carat > 1)               # 行を抽出して
tmp3 = group_by(tmp2, cut)                   # グループ化して
result = summarize(tmp3, mean(price))        # 平均を計算
```

😐 同じ名前を使い回す:

```r
result = select(diamonds, carat, cut, price) # 列を抽出して
result = filter(result, carat > 1)           # 行を抽出して
result = group_by(result, cut)               # グループ化して
result = summarize(result, mean(price))      # 平均を計算
```

どちらも悪くない。
何度も変数名を入力するのがやや冗長。


---
## パイプ演算子 `%>%` を使わない方法

😫 一時変数を使わずに:

```r
result = summarize(                    # 平均を計算
    group_by(                            # グループ化して
      filter(                              # 行を抽出して
        select(diamonds, carat, cut, price), # 列を抽出して
        carat > 1),                        # 行を抽出して
      cut),                              # グループ化して
    mean(price))                       # 平均を計算
```

🤪 改行さえせずに:

```r
result = summarize(group_by(filter(select(diamonds, carat, cut, price), carat > 1), cut), mean(price))
```

論理の流れとプログラムの流れが合わず、目が行ったり来たり。<br>
さっきのほうがぜんぜんマシ。

---
## パイプ演算子 `%>%` を使おう

😁 慣れれば、論理の流れを追いやすい:

```r
result = diamonds %>%
  select(carat, cut, price) %>%    # 列を抽出して
  filter(carat > 1) %>%            # 行を抽出して
  group_by(cut) %>%                # グループ化して
  summarize(mean(price)) %>%       # 平均を計算
  print()                          # 表示してみる
```

```
        cut mean(price)
      <ord>       <dbl>
1      Fair    7177.856
2      Good    7753.601
3 Very Good    8340.549
4   Premium    8487.249
5     Ideal    8674.227
```

慣れるまではちょっと大変かも。
無理して使わなくても大丈夫。


---
## 列の抽出: `select()`

**列の番号**で指定:

```r
result = diamonds %>%
  select(1, 2, 7) %>%
  print()
```

```
      carat       cut price
      <dbl>     <ord> <int>
    1  0.23     Ideal   326
    2  0.21   Premium   326
    3  0.23      Good   327
    4  0.29   Premium   334
   --                      
53937  0.72      Good  2757
53938  0.70 Very Good  2757
53939  0.86   Premium  2757
53940  0.75     Ideal  2757
```

別解: `diamonds[, c(1, 2, 7)]`


---
## 列の抽出: `select()`

**列の名前**で指定:

```r
result = diamonds %>%
  select(carat, cut, price) %>%
  print()
```

```
      carat       cut price
      <dbl>     <ord> <int>
    1  0.23     Ideal   326
    2  0.21   Premium   326
    3  0.23      Good   327
    4  0.29   Premium   334
   --                      
53937  0.72      Good  2757
53938  0.70 Very Good  2757
53939  0.86   Premium  2757
53940  0.75     Ideal  2757
```

別解: `diamonds %>% select(c("carat", "cut", "price"))`<br>
別解: `diamonds[, c("carat", "cut", "price")]`


---
## 列の抽出: `select()`

**捨てる列**をマイナス指定:

```r
result = diamonds %>%
  select(-carat, -cut, -price) %>%
  print()
```

```
      color clarity depth table     x     y     z
      <ord>   <ord> <dbl> <dbl> <dbl> <dbl> <dbl>
    1     E     SI2  61.5    55  3.95  3.98  2.43
    2     E     SI1  59.8    61  3.89  3.84  2.31
    3     E     VS1  56.9    65  4.05  4.07  2.31
    4     I     VS2  62.4    58  4.20  4.23  2.63
   --                                            
53937     D     SI1  63.1    55  5.69  5.75  3.61
53938     D     SI1  62.8    60  5.66  5.68  3.56
53939     H     SI2  61.0    58  6.15  6.12  3.74
53940     D     SI2  62.2    55  5.83  5.87  3.64
```

---
## 列の抽出: `select()`

名前の**部分一致**で指定:

```r
result = diamonds %>%
  select(starts_with("c")) %>%
  print()
```

```
      carat       cut color clarity
      <dbl>     <ord> <ord>   <ord>
    1  0.23     Ideal     E     SI2
    2  0.21   Premium     E     SI1
    3  0.23      Good     E     VS1
    4  0.29   Premium     I     VS2
   --                              
53937  0.72      Good     D     SI1
53938  0.70 Very Good     D     SI1
53939  0.86   Premium     H     SI2
53940  0.75     Ideal     D     SI2
```

See `?dplyr_tidy_select` or [tidyselect helpers](https://tidyselect.r-lib.org/reference/select_helpers.html) for more details.


---
## 列の抽出: `select()`

**列の型**で指定:

```r
result = diamonds %>%
  select(where(is.numeric)) %>%
  print()
```

```
      carat depth table price     x     y     z
      <dbl> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23  61.5    55   326  3.95  3.98  2.43
    2  0.21  59.8    61   326  3.89  3.84  2.31
    3  0.23  56.9    65   327  4.05  4.07  2.31
    4  0.29  62.4    58   334  4.20  4.23  2.63
   --                                          
53937  0.72  63.1    55  2757  5.69  5.75  3.61
53938  0.70  62.8    60  2757  5.66  5.68  3.56
53939  0.86  61.0    58  2757  6.15  6.12  3.74
53940  0.75  62.2    55  2757  5.83  5.87  3.64
```

See `?dplyr_tidy_select` or [`tidyselect::where`](https://tidyselect.r-lib.org/reference/where.html) for more details.


---
## 行の抽出: `filter()`

等号 `==` で**完全一致する行**のみ残す:

```r
result = diamonds %>%
  filter(cut == "Ideal") %>%
  print()
```

```
      carat   cut color clarity depth table price     x     y     z
      <dbl> <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23 Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.23 Ideal     J     VS1  62.8    56   340  3.93  3.90  2.46
    3  0.31 Ideal     J     SI2  62.2    54   344  4.35  4.37  2.71
    4  0.30 Ideal     I     SI2  62.0    54   348  4.31  4.34  2.68
   --                                                              
21548  0.71 Ideal     E     SI1  61.9    56  2756  5.71  5.73  3.54
21549  0.71 Ideal     G     VS1  61.4    56  2756  5.76  5.73  3.53
21550  0.72 Ideal     D     SI1  60.8    57  2757  5.75  5.76  3.50
21551  0.75 Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```

別解: `diamonds[diamonds[["cut"]] == "Ideal", ]`


---
## 行の抽出: `filter()`

不等号で**一致しない行**のみ残す:

```r
result = diamonds %>%
  filter(cut != "Ideal") %>%
  print()
```

```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    2  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    3  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
    4  0.31      Good     J     SI2  63.3    58   335  4.34  4.35  2.75
   --                                                                  
32386  0.72   Premium     D     SI1  62.7    59  2757  5.69  5.73  3.58
32387  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
32388  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
32389  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
```

不等号: `!=`, `<`, `<=`, `>`, `>=`

---
## 行の抽出: `filter()`

複数の値のうち**どれかに一致する行**のみ残す:

```r
result = diamonds %>%
  filter(cut %in% c("Ideal", "Good")) %>%
  print()
```

```
      carat   cut color clarity depth table price     x     y     z
      <dbl> <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23 Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.23  Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    3  0.31  Good     J     SI2  63.3    58   335  4.34  4.35  2.75
    4  0.30  Good     J     SI1  64.0    55   339  4.25  4.28  2.73
   --                                                              
26454  0.71 Ideal     G     VS1  61.4    56  2756  5.76  5.73  3.53
26455  0.72 Ideal     D     SI1  60.8    57  2757  5.75  5.76  3.50
26456  0.72  Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
26457  0.75 Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```

---
## 行の抽出: `filter()`

2つの条件を**両方満たす行**のみ残す (AND):

```r
result = diamonds %>%
  filter(carat > 2 & price < 14000) %>%
  print()
```

```
    carat       cut color clarity depth table price     x     y     z
    <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
  1  2.06   Premium     J      I1  61.2    58  5203  8.10  8.07  4.95
  2  2.14      Fair     J      I1  69.4    57  5405  7.74  7.70  5.36
  3  2.15      Fair     J      I1  65.5    57  5430  8.01  7.95  5.23
  4  2.22      Fair     J      I1  66.7    56  5607  8.04  8.02  5.36
 --                                                                  
641  2.07   Premium     H     SI1  62.7    58 13993  8.14  8.09  5.09
642  2.07      Good     I     SI1  63.6    58 13993  8.09  7.99  5.11
643  2.13 Very Good     J     SI1  62.8    58 13996  8.13  8.17  5.12
644  2.11   Premium     J     SI1  62.4    58 13996  8.27  8.17  5.13
```

---
## 行の抽出: `filter()`

2つの条件の**いずれかを満たす行**のみ残す (OR):

```r
result = diamonds %>%
  filter(carat > 2 | price < 14000) %>%
  print()
```

```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
   --                                                                  
53023  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
53024  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
53025  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
53026  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```

---
## 上位/下位の行の抽出: `slice_max()`, `slice_min()`

指定した列の値が**大きい順**に抽出:

```r
result = diamonds %>%
  slice_max(price, n = 5L) %>%
  print()
```

```
  carat       cut color clarity depth table price     x     y     z
  <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
1  2.29   Premium     I     VS2  60.8    60 18823  8.50  8.47  5.16
2  2.00 Very Good     G     SI1  63.5    56 18818  7.90  7.97  5.04
3  1.51     Ideal     G      IF  61.7    55 18806  7.37  7.41  4.56
4  2.07     Ideal     G     SI2  62.5    55 18804  8.20  8.13  5.11
5  2.00 Very Good     H     SI1  62.8    57 18803  7.95  8.00  5.01
```

**割合を指定**するなら `n` の代わりに `prop = 0.05`


---
## 上位/下位の行の抽出: `slice_max()`, `slice_min()`

指定した列の値が**大きい順**に**各グループから**抽出:

```r
result = diamonds %>%
  group_by(cut) %>%
  slice_max(price, n = 2L) %>%
  print()
```

```
   carat     cut color clarity depth table price     x     y     z
   <dbl>   <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1  2.01    Fair     G     SI1  70.6    64 18574  7.43  6.64  4.69
 2  2.02    Fair     H     VS2  64.5    57 18565  8.00  7.95  5.14
 3  2.80    Good     G     SI2  63.8    58 18788  8.90  8.85  0.00
 4  2.07    Good     I     VS2  61.8    61 18707  8.12  8.16  5.03
--                                                                
 7  2.29 Premium     I     VS2  60.8    60 18823  8.50  8.47  5.16
 8  2.29 Premium     I     SI1  61.8    59 18797  8.52  8.45  5.24
 9  1.51   Ideal     G      IF  61.7    55 18806  7.37  7.41  4.56
10  2.07   Ideal     G     SI2  62.5    55 18804  8.20  8.13  5.11
```

**割合を指定**するなら `n` の代わりに `prop = 0.05`


---
## 先頭/末尾の行の抽出: `slice_head()`, `slice_tail()`

**各グループの先頭**を抽出:

```r
result = diamonds %>%
  group_by(cut) %>%
  slice_head(n = 3L) %>%
  print()
```

```
   carat     cut color clarity depth table price     x     y     z
   <dbl>   <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1  0.22    Fair     E     VS2  65.1    61   337  3.87  3.78  2.49
 2  0.86    Fair     E     SI2  55.1    69  2757  6.45  6.33  3.52
 3  0.96    Fair     F     SI2  66.3    62  2759  6.27  5.95  4.07
 4  0.23    Good     E     VS1  56.9    65   327  4.05  4.07  2.31
--                                                                
12  0.22 Premium     F     SI1  60.4    61   342  3.88  3.84  2.33
13  0.23   Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
14  0.23   Ideal     J     VS1  62.8    56   340  3.93  3.90  2.46
15  0.31   Ideal     J     SI2  62.2    54   344  4.35  4.37  2.71
```

**割合を指定**するなら `n` の代わりに `prop = 0.05`


---
## ランダムに行の抽出: `slice_sample()`

**行数を指定**してランダムサンプル:

```r
result = diamonds %>%
  group_by(cut) %>%
  slice_sample(n = 3L, replace = FALSE) %>%
  print()
```

```
   carat     cut color clarity depth table price     x     y     z
   <dbl>   <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1  0.83    Fair     I     VS2  64.9    58  2577  5.90  5.84  3.81
 2  1.20    Fair     I      I1  62.2    66  3011  6.77  6.70  4.20
 3  0.73    Fair     I     SI2  61.3    67  1892  5.77  5.64  3.51
 4  0.61    Good     I     VS2  63.7    60  1239  5.34  5.28  3.38
--                                                                
12  1.35 Premium     G    VVS2  60.2    59 11868  7.20  7.16  4.32
13  1.70   Ideal     I     SI1  62.9    57  9901  7.57  7.50  4.74
14  0.41   Ideal     E     SI1  62.5    57   755  4.74  4.79  2.98
15  0.76   Ideal     D     SI2  62.4    57  2770  5.78  5.83  3.62
```

**割合を指定**するなら `prop =` を使う。


---
## X番目の行の抽出: `slice()`

**各グループのX番目の行**を抽出:

```r
result = diamonds %>%
  group_by(cut) %>%
  slice(c(1, 2, 9)) %>%
  print()
```

```
   carat     cut color clarity depth table price     x     y     z
   <dbl>   <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1  0.22    Fair     E     VS2  65.1    61   337  3.87  3.78  2.49
 2  0.86    Fair     E     SI2  55.1    69  2757  6.45  6.33  3.52
 3  0.84    Fair     G     SI1  55.1    67  2782  6.39  6.20  3.47
 4  0.23    Good     E     VS1  56.9    65   327  4.05  4.07  2.31
--                                                                
12  0.22 Premium     D     VS2  59.3    62   404  3.91  3.88  2.31
13  0.23   Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
14  0.23   Ideal     J     VS1  62.8    56   340  3.93  3.90  2.46
15  0.32   Ideal     I     SI1  60.9    55   404  4.45  4.48  2.72
```


---
## 重複行の除去: `distinct()`

指定した列に関してユニークな行のみ残す:

```r
result = diamonds %>%
  distinct(cut, color) %>%
  print()
```

```
       cut color
     <ord> <ord>
 1   Ideal     E
 2 Premium     E
 3    Good     E
 4 Premium     I
--              
32    Fair     G
33    Fair     J
34    Fair     I
35    Fair     D
```

`.keep_all = TRUE`
オプションを付けると指定しなかった列も残せる。

---
## 要約・集計: `summarize()`

列の**合計、平均、最大**などを求める:

```r
result = diamonds %>%
  summarize(sum(carat), mean(carat), max(price)) %>%
  print()
```

```
  sum(carat) mean(carat) max(price)
       <dbl>       <dbl>      <int>
1   43040.87   0.7979397      18823
```

vectorを受け取って1つの値を返す集約関数:<br>
`min()`, `max()`, `mean()`, `median()`, `var()`, `sd()`, etc.


---
## 要約・集計: `summarize()`

列の値を**グループごとに**集計する:

```r
result = diamonds %>%
  group_by(cut) %>%
  summarize(avg_carat = mean(carat),
            max_price = max(price)) %>%
  print()
```

```
        cut avg_carat max_price
      <ord>     <dbl>     <int>
1      Fair 1.0461366     18574
2      Good 0.8491847     18788
3 Very Good 0.8063814     18818
4   Premium 0.8919549     18823
5     Ideal 0.7028370     18806
```


---
## 要約・集計: `summarize()` 発展編

複数の列の複数の値を柔軟に集計する:

```r
result = diamonds %>%
  group_by(cut) %>%
  summarize(across(where(is.numeric), range)) %>%
  print()
```

```
       cut carat depth table price     x     y     z
     <ord> <dbl> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1    Fair  0.22  43.0    49   337  0.00  0.00  0.00
 2    Fair  5.01  79.0    95 18574 10.74 10.54  6.98
 3    Good  0.23  54.3    51   327  0.00  0.00  0.00
 4    Good  3.01  67.0    66 18788  9.44  9.38  5.79
--                                                  
 7 Premium  0.20  58.0    51   326  0.00  0.00  0.00
 8 Premium  4.01  63.0    62 18823 10.14 58.90  8.06
 9   Ideal  0.20  43.0    43   326  0.00  0.00  0.00
10   Ideal  3.50  66.7    63 18806  9.65 31.80  6.03
```

`across()` も `where()` も複数行出力も dplyr 1.0.0 新機能


---
## 要約・集計: `count()`

指定した列の組み合わせ出現数を数える:

```r
result = diamonds %>%
  count(cut, color) %>%
  print()
```

```
     cut color     n
   <ord> <ord> <int>
 1  Fair     D   163
 2  Fair     E   224
 3  Fair     F   312
 4  Fair     G   314
--                  
32 Ideal     G  4884
33 Ideal     H  3115
34 Ideal     I  2093
35 Ideal     J   896
```

`diamonds %>% group_by(cut, color) %>% tally()` と同じ。


---
## 行のソート: `arrange()`

指定した列の値が**小さい順に上から**並べる:

```r
result = diamonds %>%
  arrange(color, desc(carat)) %>%  # 色の昇順。色が同じなら大きさ降順
  print()
```

```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  3.40      Fair     D      I1  66.8    52 15964  9.42  9.34  6.27
    2  2.75     Ideal     D      I1  60.9    57 13156  9.04  8.98  5.49
    3  2.58 Very Good     D     SI2  58.9    63 14749  9.08  9.01  5.33
    4  2.57   Premium     D     SI2  58.9    58 17924  8.99  8.94  5.28
   --                                                                  
53937  0.27 Very Good     J    VVS2  60.8    57   443  4.16  4.20  2.54
53938  0.24 Very Good     J    VVS2  62.8    57   336  3.94  3.96  2.48
53939  0.24     Ideal     J    VVS2  62.8    57   432  3.96  3.94  2.48
53940  0.23     Ideal     J     VS1  62.8    56   340  3.93  3.90  2.46
```

逆にするには `desc()` を使う。


---
## 列の並び替え: `relocate()`

指定した列を左端に移動:

```r
result = diamonds %>%
  relocate(carat, price, clarity) %>%
  print()
```

```
      carat price clarity       cut color depth table     x     y     z
      <dbl> <int>   <ord>     <ord> <ord> <dbl> <dbl> <dbl> <dbl> <dbl>
    1  0.23   326     SI2     Ideal     E  61.5    55  3.95  3.98  2.43
    2  0.21   326     SI1   Premium     E  59.8    61  3.89  3.84  2.31
    3  0.23   327     VS1      Good     E  56.9    65  4.05  4.07  2.31
    4  0.29   334     VS2   Premium     I  62.4    58  4.20  4.23  2.63
   --                                                                  
53937  0.72  2757     SI1      Good     D  63.1    55  5.69  5.75  3.61
53938  0.70  2757     SI1 Very Good     D  62.8    60  5.66  5.68  3.56
53939  0.86  2757     SI2   Premium     H  61.0    58  6.15  6.12  3.74
53940  0.75  2757     SI2     Ideal     D  62.2    55  5.83  5.87  3.64
```

`.before`, `.after` オプションで微調整も可能。


---
## 行の結合: `bind_rows()`

例。先頭と末尾を6行ずつ取ってひとつの表に結合する:

```r
bind_rows(head(diamonds), tail(diamonds))
```

```
   carat       cut color clarity depth table price     x     y     z
   <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
 1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
 2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
 3  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
 4  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
--                                                                  
 9  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
10  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
11  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
12  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```


---
## 共通する列で結合: `full_join()`

他方に無い部分を `NA` で補完して**左右とも全行**保持:

```r
full_join(band_members, band_instruments, by = "name")
```

```
   name    band  plays
  <chr>   <chr>  <chr>
1  Mick  Stones   <NA>
2  John Beatles guitar
3  Paul Beatles   bass
4 Keith    <NA> guitar
```
```
band_members          band_instruments
   name    band          name  plays
  <chr>   <chr>         <chr>  <chr>
1  Mick  Stones       1  John guitar
2  John Beatles       2  Paul   bass
3  Paul Beatles       3 Keith guitar
```

---
## 共通する列で結合: `left_join()`

右側に無い部分を `NA` で補完して**左側だけ全行**保持:

```r
left_join(band_members, band_instruments, by = "name")
```

```
   name    band  plays
  <chr>   <chr>  <chr>
1  Mick  Stones   <NA>
2  John Beatles guitar
3  Paul Beatles   bass
```
```
band_members          band_instruments
   name    band          name  plays
  <chr>   <chr>         <chr>  <chr>
1  Mick  Stones       1  John guitar
2  John Beatles       2  Paul   bass
3  Paul Beatles       3 Keith guitar
```

その逆は `right_join()`

---
## 共通する列で結合: `inner_join()`

左右ともに**共通する値のある行だけ**保持:

```r
inner_join(band_members, band_instruments, by = "name")
```

```
   name    band  plays
  <chr>   <chr>  <chr>
1  John Beatles guitar
2  Paul Beatles   bass
```
```
band_members          band_instruments
   name    band          name  plays
  <chr>   <chr>         <chr>  <chr>
1  Mick  Stones       1  John guitar
2  John Beatles       2  Paul   bass
3  Paul Beatles       3 Keith guitar
```

---
## joinまとめ

<figure>
<a href="https://r4ds.had.co.nz/relational-data.html#mutating-joins">
<img src="/slides/image/r4ds/join.png" height="550">
<br>
<figcaption><small>https://r4ds.had.co.nz/relational-data.html#mutating-joins</small></figcaption>
</a>
</figure>


---
## join例題: `nycflights13` データセット

関連するdata.frameをいろいろな方法で結合してみよう。

```r
install.packages("nycflights13")
library(nycflights13)
data(package = "nycflights13")
# airlines, airports, flights, planes, weather
```

<figure>
<a href="https://r4ds.had.co.nz/relational-data.html#nycflights13-relational">
<img src="/slides/image/r4ds/relational-nycflights.png" height="320">
<br>
<figcaption><small>https://r4ds.had.co.nz/relational-data.html#nycflights13-relational</small></figcaption>
</a>
</figure>


---
## 新しい列の追加: `mutate()`

既存の列名を指定すると上書き:

```r
result = diamonds %>%
  mutate(ratio = price / carat,
         price = price * 108.36) %>%
  print()
```

```
      carat       cut color clarity depth table     price     x     y     z    ratio
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl>     <dbl> <dbl> <dbl> <dbl>    <dbl>
    1  0.23     Ideal     E     SI2  61.5    55  35325.36  3.95  3.98  2.43 1417.391
    2  0.21   Premium     E     SI1  59.8    61  35325.36  3.89  3.84  2.31 1552.381
    3  0.23      Good     E     VS1  56.9    65  35433.72  4.05  4.07  2.31 1421.739
    4  0.29   Premium     I     VS2  62.4    58  36192.24  4.20  4.23  2.63 1151.724
   --                                                                               
53937  0.72      Good     D     SI1  63.1    55 298748.52  5.69  5.75  3.61 3829.167
53938  0.70 Very Good     D     SI1  62.8    60 298748.52  5.66  5.68  3.56 3938.571
53939  0.86   Premium     H     SI2  61.0    58 298748.52  6.15  6.12  3.74 3205.814
53940  0.75     Ideal     D     SI2  62.2    55 298748.52  5.83  5.87  3.64 3676.000
```


---
## tidyr --- data.frameの変形・整形担当

<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="120" style="float: right;">
</a>

横広から縦長に
: `pivot_longer()`, <strike><code>gather()</code></strike>

縦長から横広に
: `pivot_wider()`, <strike><code>spread()</code></strike>

列を分離、結合
: `separate()`, `unite()`

入れ子構造をつくる、解消する
: `nest()`, `unnest()`

*etc.*


---
## `pivot_longer()` 横広から縦長に

複数列にまたがる値を1列にする。<br>
そのラベルも合わせて移動。

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#gathering">
<img src="/slides/image/r4ds/tidy-gather.png" width="800">
<br>
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#gathering</small></figcaption>
</a>
</figure>

---
## `pivot_longer()` 横広から縦長に

複数列にまたがる値を1列にする(ここでは`value`)。<br>
そのラベルも合わせて移動(ここでは`item`)。


```r
iris_long = iris %>% head(2L) %>%    # 最初の2行だけ
  rowid_to_column("id") %>%          # ID列を追加
  print() %>%                        # 途中経過を表示
  pivot_longer(2:5, names_to = "item", values_to = "value") %>%
  print()                            # 2–5列目の値を移動
```

```
  id Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1  1          5.1         3.5          1.4         0.2  setosa
2  2          4.9         3.0          1.4         0.2  setosa
     id Species         item value
  <int>   <fct>        <chr> <dbl>
1     1  setosa Sepal.Length   5.1
2     1  setosa  Sepal.Width   3.5
3     1  setosa Petal.Length   1.4
4     1  setosa  Petal.Width   0.2
5     2  setosa Sepal.Length   4.9
6     2  setosa  Sepal.Width   3.0
7     2  setosa Petal.Length   1.4
8     2  setosa  Petal.Width   0.2
```


---
## `pivot_wider()` 縦長から横広に

1列に収まっていた値を複数列の行列に変換。<br>
そのラベルを列の名前にする。

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#spreading">
<img src="/slides/image/r4ds/tidy-spread.png" height="480">
<br>
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#spreading</small></figcaption>
</a>
</figure>

---
## `pivot_wider()` 縦長から横広に

1列に収まっていた値を複数列の行列に変換(`value`)。<br>
そのラベルを列の名前にする(`item`)。


```r
iris_long %>% print() %>%                    # さっき縦長にしたやつ
  pivot_wider(names_from = item, values_from = value)  # 横広に戻す
```

```
     id Species         item value
  <int>   <fct>        <chr> <dbl>
1     1  setosa Sepal.Length   5.1
2     1  setosa  Sepal.Width   3.5
3     1  setosa Petal.Length   1.4
4     1  setosa  Petal.Width   0.2
5     2  setosa Sepal.Length   4.9
6     2  setosa  Sepal.Width   3.0
7     2  setosa Petal.Length   1.4
8     2  setosa  Petal.Width   0.2
```

```
     id Species Sepal.Length Sepal.Width Petal.Length Petal.Width
  <int>   <fct>        <dbl>       <dbl>        <dbl>       <dbl>
1     1  setosa          5.1         3.5          1.4         0.2
2     2  setosa          4.9         3.0          1.4         0.2
```

---
## `separate()` 列を分離

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#separate">
<img src="/slides/image/r4ds/tidy-separate.png" width="800">
<br>
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#separate</small></figcaption>
</a>
</figure>

---
## `separate()` 列を分離


```r
iris_long %>% print() %>%
  separate(item, c("part", "measure")) # 列を分離
```

```
     id Species         item value
  <int>   <fct>        <chr> <dbl>
1     1  setosa Sepal.Length   5.1
2     1  setosa  Sepal.Width   3.5
3     1  setosa Petal.Length   1.4
4     1  setosa  Petal.Width   0.2
5     2  setosa Sepal.Length   4.9
6     2  setosa  Sepal.Width   3.0
7     2  setosa Petal.Length   1.4
8     2  setosa  Petal.Width   0.2
```

```
     id Species  part measure value
  <int>   <fct> <chr>   <chr> <dbl>
1     1  setosa Sepal  Length   5.1
2     1  setosa Sepal   Width   3.5
3     1  setosa Petal  Length   1.4
4     1  setosa Petal   Width   0.2
5     2  setosa Sepal  Length   4.9
6     2  setosa Sepal   Width   3.0
7     2  setosa Petal  Length   1.4
8     2  setosa Petal   Width   0.2
```

---
## `unite()` 列を融合

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#unite">
<img src="/slides/image/r4ds/tidy-unite.png" width="800">
<br>
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#unite</small></figcaption>
</a>
</figure>

---
## `nest()` 入れ子にする

グループ毎にdata.frameを区切ってlist型の列に入れる。

<figure>
<a href="https://www.tidyverse.org/articles/2019/09/tidyr-1-0-0/">
<img src="/slides/image/rstats/nest-pack-chop.png" height="500">
<br>
<figcaption><small>https://www.tidyverse.org/articles/2019/09/tidyr-1-0-0/</small></figcaption>
</a>
</figure>

---
## `nest()` 入れ子にする

グループ毎にdata.frameを区切ってlist型の列に入れる。


```r
iris_nested = as_tibble(iris) %>%
  nest(data = -Species) %>% print()
```

```
     Species              data
       <fct>            <list>
1     setosa <tbl_df [50 x 4]>
2 versicolor <tbl_df [50 x 4]>
3  virginica <tbl_df [50 x 4]>
```

```r
iris_nested$data[[1L]]
```

```
   Sepal.Length Sepal.Width Petal.Length Petal.Width
          <dbl>       <dbl>        <dbl>       <dbl>
 1          5.1         3.5          1.4         0.2
 2          4.9         3.0          1.4         0.2
 3          4.7         3.2          1.3         0.2
 4          4.6         3.1          1.5         0.2
--                                                  
47          5.1         3.8          1.6         0.2
48          4.6         3.2          1.4         0.2
49          5.3         3.7          1.5         0.2
50          5.0         3.3          1.4         0.2
```

---
## 例題1: `VADeaths` を縦長にしたい


```r
as.data.frame(VADeaths)                  # data.frameに変換
                                         # 行名を列に
                                         # 縦長に変形したい
```

```
      Rural Male Rural Female Urban Male Urban Female
50-54       11.7          8.7       15.4          8.4
55-59       18.1         11.7       24.3         13.6
60-64       26.9         20.3       37.0         19.3
65-69       41.0         30.9       54.6         35.1
70-74       66.0         54.3       71.1         50.0
```

---
## 例題1: `VADeaths` を縦長にしたい


```r
as.data.frame(VADeaths) %>%              # data.frameに変換
  rownames_to_column("age")              # 行名を列に
                                         # 縦長に変形したい
```

```
    age Rural Male Rural Female Urban Male Urban Female
1 50-54       11.7          8.7       15.4          8.4
2 55-59       18.1         11.7       24.3         13.6
3 60-64       26.9         20.3       37.0         19.3
4 65-69       41.0         30.9       54.6         35.1
5 70-74       66.0         54.3       71.1         50.0
```

---
## 例題1: `VADeaths` を縦長にしたい


```r
as.data.frame(VADeaths) %>%              # data.frameに変換
  rownames_to_column("age") %>%          # 行名を列に
  pivot_longer(-age, values_to = "death")     # age以外を移動して縦長化
                                         # 新しいname列を分割
```

```
     age         name death
   <chr>        <chr> <dbl>
 1 50-54   Rural Male  11.7
 2 50-54 Rural Female   8.7
 3 50-54   Urban Male  15.4
 4 50-54 Urban Female   8.4
--                         
17 70-74   Rural Male  66.0
18 70-74 Rural Female  54.3
19 70-74   Urban Male  71.1
20 70-74 Urban Female  50.0
```

---
## 例題1: `VADeaths` を縦長にしたい


```r
as.data.frame(VADeaths) %>%              # data.frameに変換
  rownames_to_column("age") %>%          # 行名を列に
  pivot_longer(-age, values_to = "death") %>% # age以外を移動して縦長化
  separate(name, c("region", "sex"))     # 新しいname列を分割
```

```
     age region    sex death
   <chr>  <chr>  <chr> <dbl>
 1 50-54  Rural   Male  11.7
 2 50-54  Rural Female   8.7
 3 50-54  Urban   Male  15.4
 4 50-54  Urban Female   8.4
--                          
17 70-74  Rural   Male  66.0
18 70-74  Rural Female  54.3
19 70-74  Urban   Male  71.1
20 70-74  Urban Female  50.0
```

---
## 例題1: `VADeaths` を縦長にしたい


```r
va_deaths = as.data.frame(VADeaths) %>%  # data.frameに変換
  rownames_to_column("age") %>%          # 行名を列に
  pivot_longer(-age, values_to = "death") %>% # age以外を移動して縦長化
  separate(name, c("region", "sex")) %>% # 新しいname列を分割
  separate(age, c("lbound", "ubound"), "-", convert = TRUE) %>%
  print()                                # 下限と上限を分離
```

```
   lbound ubound region    sex death
    <int>  <int>  <chr>  <chr> <dbl>
 1     50     54  Rural   Male  11.7
 2     50     54  Rural Female   8.7
 3     50     54  Urban   Male  15.4
 4     50     54  Urban Female   8.4
--                                  
17     70     74  Rural   Male  66.0
18     70     74  Rural Female  54.3
19     70     74  Urban   Male  71.1
20     70     74  Urban Female  50.0
```

---
## 例題1: `VADeaths` 別解


```r
va_deaths = as.data.frame(VADeaths) %>%  # data.frameに変換
  rownames_to_column("age") %>%          # 行名を列に
  pivot_longer(                          # 縦長に変形したい
    -age,                                # age以外の列に入ってる値を移動
    names_to = c("region", "sex"),       # 元の列名を2つに分離
    names_sep = " ",                     # スペースで切る
    values_to = "death") %>%             # 値の行き先の列名
  separate(age, c("lbound", "ubound"), "-", convert = TRUE) %>%
  print()                                # 下限と上限を分離
```

```
   lbound ubound region    sex death
    <int>  <int>  <chr>  <chr> <dbl>
 1     50     54  Rural   Male  11.7
 2     50     54  Rural Female   8.7
 3     50     54  Urban   Male  15.4
 4     50     54  Urban Female   8.4
--                                  
17     70     74  Rural   Male  66.0
18     70     74  Rural Female  54.3
19     70     74  Urban   Male  71.1
20     70     74  Urban Female  50.0
```

---
## 例題1: `VADeaths` 作図例


```r
ggplot(va_deaths) +
  aes(lbound, death) +
  geom_point(aes(color = sex, shape = region), size = 5) +
  theme_classic(base_size = 16)
```

![plot of chunk vadeaths_plot](figure/vadeaths_plot-1.png)

---
## 例題2: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  rowid_to_column("id")              # IDをつけておく
                                     # x y で始まる列の値を移して縦長に
```

```
      id    x1    x2    x3    x4    y1    y2    y3    y4
   <int> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
 1     1    10    10    10     8  8.04  9.14  7.46  6.58
 2     2     8     8     8     8  6.95  8.14  6.77  5.76
 3     3    13    13    13     8  7.58  8.74 12.74  7.71
 4     4     9     9     9     8  8.81  8.77  7.11  8.84
--                                                      
 8     8     4     4     4    19  4.26  3.10  5.39 12.50
 9     9    12    12    12     8 10.84  9.13  8.15  5.56
10    10     7     7     7     8  4.82  7.26  6.42  7.91
11    11     5     5     5     8  5.68  4.74  5.73  6.89
```

ggplot does not accept this format. Let's transformt it.


---
## 例題2: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  rowid_to_column("id") %>%          # IDをつけておく
  pivot_longer(matches("^x|y"))      # x y で始まる列の値を移して縦長に

                                     # name列を分割
```

```
      id  name value
   <int> <chr> <dbl>
 1     1    x1 10.00
 2     1    x2 10.00
 3     1    x3 10.00
 4     1    x4  8.00
--                  
85    11    y1  5.68
86    11    y2  4.74
87    11    y3  5.73
88    11    y4  6.89
```

---
## 例題2: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  rowid_to_column("id") %>%          # IDをつけておく
  pivot_longer(matches("^x|y")) %>%  # x y で始まる列の値を移して縦長に
  separate(name, c("axis", "group"), 1L, convert = TRUE)
                                     # name列を分割
```

```
      id  axis group value
   <int> <chr> <int> <dbl>
 1     1     x     1 10.00
 2     1     x     2 10.00
 3     1     x     3 10.00
 4     1     x     4  8.00
--                        
85    11     y     1  5.68
86    11     y     2  4.74
87    11     y     3  5.73
88    11     y     4  6.89
```

---
## 例題2: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
tidy_anscombe = anscombe %>%
  rowid_to_column("id") %>%          # IDをつけておく
  pivot_longer(matches("^x|y")) %>%  # x y で始まる列の値を移して縦長に
  separate(name, c("axis", "group"), 1L, convert = TRUE) %>%
                                     # name列を分割
  pivot_wider(names_from = axis, values_from = value) %>%
                                     # axis列内の x y を列にして横広化
  arrange(group) %>%                 # グループごとに並べる
  print()                            # ggplotしたい形！
```

```
      id group     x     y
   <int> <int> <dbl> <dbl>
 1     1     1    10  8.04
 2     2     1     8  6.95
 3     3     1    13  7.58
 4     4     1     9  8.81
--                        
41     8     4    19 12.50
42     9     4     8  5.56
43    10     4     8  7.91
44    11     4     8  6.89
```

---
## 例題2: `anscombe` 別解

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
tidy_anscombe = anscombe %>%
  pivot_longer(                       # 縦長に変形したい
    everything(),                     # すべての列について
    names_to = c(".value", "group"),  # 新しい列名
    names_sep = 1L,                   # 切る位置
    names_transform = list(group = as.integer)) %>% # 型変換
  arrange(group) %>%                  # グループごとに並べる
  print()                             # ggplotしたい形！
```

```
   group     x     y
   <int> <dbl> <dbl>
 1     1    10  8.04
 2     1     8  6.95
 3     1    13  7.58
 4     1     9  8.81
--                  
41     4    19 12.50
42     4     8  5.56
43     4     8  7.91
44     4     8  6.89
```


---
## 例題2: `anscombe` 作図例

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
ggplot(tidy_anscombe) + aes(x, y) +
  geom_point(size = 3) +
  stat_smooth(method = lm, formula = y ~ x, se = FALSE, fullrange = TRUE) +
  facet_wrap(~ group, nrow = 1L)
```

<img src="figure/plot_anscombe-1.png" title="plot of chunk plot_anscombe" alt="plot of chunk plot_anscombe" width="98%" />

---
## 例題2: `anscombe` 要約

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
tidy_anscombe %>%
  group_by(group) %>%   # group列でグループ化して
  summarize(            # x, y列を使ってsummarize
    mean_x = mean(x),
    mean_y = mean(y),
    sd_x = sd(x),
    sd_y = sd(y),
    cor_xy = cor(x, y)
  )
```

```
  group mean_x   mean_y     sd_x     sd_y    cor_xy
  <int>  <dbl>    <dbl>    <dbl>    <dbl>     <dbl>
1     1      9 7.500909 3.316625 2.031568 0.8164205
2     2      9 7.500909 3.316625 2.031657 0.8162365
3     3      9 7.500000 3.316625 2.030424 0.8162867
4     4      9 7.500909 3.316625 2.030579 0.8165214
```



<!-- ###################################################################### -->



---
## 前処理は大きく2つに分けられる

- データ構造を対象とする処理
    - 使いたい部分だけ抽出 --- `select()`, `filter()`
    - グループごとに特徴を要約 --- `group_by()`, `summarize()`
    - 大きい順に並べ替え --- `arrange()`
    - 異なるテーブルの結合 --- `*_join()`
    - 変形: 縦長 ↔ 横広 --- `pivot_longer()`, `pivot_wider()`
- **データ内容を対象とする処理** 👈
    - 数値を変換する (e.g., 対数、座標系)
    - 変換: 連続変数 ↔ カテゴリカル変数 ↔ ダミー変数
    - 外れ値・欠損値に対処
    - 文字列から数値や日時を抜き出す

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>

---
## 変数/オブジェクトの型 (先週のおさらい)

- **`vector`: 基本型。一次元の配列。** (👈今回の主役)
    - `logical`: 論理値 (`TRUE` or `FALSE`)
    - `numeric`: 数値 (整数 `42L` or 実数 `3.1416`)
    - `character`: 文字列 (`"a string"`)
    - `factor`: 因子 (文字列っぽいけど微妙に違う)
- `array`: 多次元配列。`vector`同様、全要素が同じ型。
    - `matrix`: 行列 = 二次元の配列。
- `list`: 異なる型でも詰め込める太っ腹ベクトル。
- `data.frame`: 同じ長さのベクトルを並べた長方形のテーブル。重要。** <br>
  `tibble` とか `tbl_df` と呼ばれる亜種もあるけどほぼ同じ。


---
## vector: 一次元の配列 (先週のおさらい)

1個の値でもベクトル扱い。<br>
ベクトルの各要素に一気に計算を適用できる。


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


---
## data.frameは列vectorの集まり

内容を変更する方法はいくつかある。<br>
`diamonds[["price"]]` をドルから円に変換する例:


```r
dia = diamonds    # 別名コピー

# dollar演算子で指定
dia$price = 109.58 * dia$price

# 名前を文字列で指定
dia[["price"]] = 109.58 * dia[["price"]]

# dplyr::mutate with pipe
dia = diamonds %>%
  mutate(price = 109.58 * price)
```

1発ならどれでもいい。流れ作業には `mutate()` が便利。


---
## 数値: numeric型

普通は倍精度浮動小数点型 `double` として扱われる:


```r
answer = 42
typeof(answer)
```

```
[1] "double"
```

明示的に変換したり末尾にLを付けることで整数扱いもできる:


```r
typeof(as.integer(answer))
```

```
[1] "integer"
```

```r
whoami = 24601L
typeof(whoami)
```

```
[1] "integer"
```

---
## 様々な数学関数

ベクトルを受け取り、それぞれの要素に適用


```r
x = c(1, 2, 3)
sqrt(x)
```

```
[1] 1.000000 1.414214 1.732051
```

```r
log(x)
```

```
[1] 0.0000000 0.6931472 1.0986123
```

```r
log10(x)
```

```
[1] 0.0000000 0.3010300 0.4771213
```

```r
exp(x)
```

```
[1]  2.718282  7.389056 20.085537
```

<small style="display: block; text-align: right;"><https://stat.ethz.ch/R-manual/R-patched/library/base/html/00Index.html></small>

---
## 正規化 (z-score normalization)

平均=0、標準偏差=1、になるように:


```r
result = diamonds %>%
  mutate(depth = scale(depth)) %>%
  print()
```

```
      carat       cut color clarity  depth[,1] table price     x     y     z
      <dbl>     <ord> <ord>   <ord>      <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2 -0.1740899    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1 -1.3607259    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1 -3.3849872    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2  0.4541292    58   334  4.20  4.23  2.63
   --                                                                       
53937  0.72      Good     D     SI1  0.9427440    55  2757  5.69  5.75  3.61
53938  0.70 Very Good     D     SI1  0.7333376    60  2757  5.66  5.68  3.56
53939  0.86   Premium     H     SI2 -0.5231005    58  2757  6.15  6.12  3.74
53940  0.75     Ideal     D     SI2  0.3145249    55  2757  5.83  5.87  3.64
```

`depth = (depth - mean(depth)) / sd(depth)` と同じ。


---
## 正規化 (min-max normalization)

最小=0、最大=1、になるように:


```r
result = diamonds %>%
  mutate(depth = (depth - min(depth)) / (max(depth) - min(depth))) %>%
  print()
```

```
      carat       cut color clarity     depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord>     <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2 0.5138889    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1 0.4666667    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1 0.3861111    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2 0.5388889    58   334  4.20  4.23  2.63
   --                                                                      
53937  0.72      Good     D     SI1 0.5583333    55  2757  5.69  5.75  3.61
53938  0.70 Very Good     D     SI1 0.5500000    60  2757  5.66  5.68  3.56
53939  0.86   Premium     H     SI2 0.5000000    58  2757  6.15  6.12  3.74
53940  0.75     Ideal     D     SI2 0.5333333    55  2757  5.83  5.87  3.64
```

外れ値の影響を大きく受けることに注意。


---
## 外れ値の除去

平均値から標準偏差の3倍以上離れているものを取り除く例:


```r
result = diamonds %>%
  filter(abs(depth - mean(depth)) / sd(depth) < 3) %>%
  print()
```

```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    3  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
    4  0.31      Good     J     SI2  63.3    58   335  4.34  4.35  2.75
   --                                                                  
53252  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
53253  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
53254  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
53255  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```

唯一の方法ではないし、そもそもやるべきかどうかも要検討


---
## 欠損値の除去 `tidyr::drop_na()`

(指定した列に) `NA` が含まれてる行を削除する。


```r
df = tibble(x = c(1, 2, NA), y = c("a", NA, "b"))
df %>% drop_na()
```

```
      x     y
  <dbl> <chr>
1     1     a
```

問: `starwars` データセットで試してみよう


```
             name height  mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
            <chr>  <int> <dbl>      <chr>       <chr>     <chr>      <dbl>  <chr>     <chr>     <chr>   <chr>    <list>    <list>    <list>
 1 Luke Skywalker    172    77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167    75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96    32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202   136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                         
84    Poe Dameron     NA    NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
85            BB8     NA    NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
86 Captain Phasma     NA    NA    unknown     unknown   unknown         NA   <NA>      <NA>      <NA>    <NA> <chr [1]> <chr [0]> <chr [0]>
87  Padmé Amidala    165    45      brown       light     brown       46.0 female  feminine     Naboo   Human <chr [3]> <chr [0]> <chr [3]>
```

---
## 欠損値の補完 `tidyr::replace_na()`

欠損値 `NA` を任意の値で置き換える。


```r
df = tibble(x = c(1, 2, NA), y = c("a", NA, "b"))
df %>% replace_na(list(x = 0, y = "unknown"))
```

```
      x       y
  <dbl>   <chr>
1     1       a
2     2 unknown
3     0       b
```

問: `starwars` データセットで試してみよう


---
## 欠損値の補完 `dplyr::coalesce()`

先に指定した列が `NA` なら次の列の値を採用:


```r
y = c(1, 2, NA, NA, 5)
z = c(NA, NA, 3, 4, 5)
coalesce(y, z)
```

```
[1] 1 2 3 4 5
```

型が異なると怒られる:

```r
df = tibble(x = c(1, 2, NA), y = c("a", NA, "b"))
df %>%
  mutate(z = coalesce(x, y))
```

```
Error: Problem with `mutate()` column `z`.
ℹ `z = coalesce(x, y)`.
✖ Can't combine `..1` <double> and `..2` <character>.
```

問: `starwars` データセットで試してみよう


---
## 欠損値とみなす `dplyr::na_if()`

特定の値を `NA` に置き換える:


```r
df %>%
  mutate(x = na_if(x, 1), y = na_if(y, "a"))
```

```
      x     y
  <dbl> <chr>
1    NA  <NA>
2     2  <NA>
3    NA     b
```

問: `starwars` データセットで試してみよう



---
## 文字列

ダブルクォートで囲む。シングルクォートも使える。


```r
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

<small style="display: block; text-align: right;"><https://r4ds.had.co.nz/strings.html></small>

---
## R備え付けの文字列機能は使いにくい

-   何をやる関数なのか名前から分かりにくい<br>
    `grep`, `grepl`, `regexpr`, `gregexpr`, `regexec`<br>
    `sub`, `gsub`, `substr`, `substring`
-   第一引数は対象文字列？検索パターン？関数ごとに違う。
-   `NA` に対する挙動が微妙


---
## stringr --- 文字列処理パッケージ

<a href="https://stringr.tidyverse.org/">
<img src="/_img/hex-stickers/stringr.webp" width="120" style="float: right;">
</a>

-   tidyverseの一部
-   何をやる関数なのか名前から分かりやすい
-   対象文字列が一貫して第一引数で、パターンが二番目
-   引数オブジェクトの各要素の名前や位置を保持する
    -   長さゼロの入力からは長さゼロの出力
    -   入力に `NA` が含まれる場合は対応する出力も `NA`
-   [ICU正規表現](http://userguide.icu-project.org/strings/regexp) の仕様が明確
-   [チートシート](https://github.com/rstudio/cheatsheets/raw/master/strings.pdf)


---
## 文字列基本操作


```r
fruit4 = head(fruit, 4L) %>% print()
```

```
[1] "apple"   "apricot" "avocado" "banana" 
```

```r
str_length(fruit4)            # 長さ
```

```
[1] 5 7 7 6
```

```r
str_sub(fruit4, 2, 4)         # 部分列
```

```
[1] "ppl" "pri" "voc" "ana"
```

```r
str_c(1:4, " ", fruit4, "!")  # 結合
```

```
[1] "1 apple!"   "2 apricot!" "3 avocado!" "4 banana!" 
```


---
## パターンマッチング、正規表現

単純な一致だけじゃなく、いろんな条件でマッチングできる:


```r
# aで始まる
str_subset(fruit, "^a")
```

```
[1] "apple"   "apricot" "avocado"
```

```r
# rで終わる
str_subset(fruit, "r$")
```

```
[1] "bell pepper"  "chili pepper" "cucumber"     "pear"        
```

```r
# 英数字3-4文字
str_subset(fruit, "^\\w{3,4}$")
```

```
[1] "date" "fig"  "lime" "nut"  "pear" "plum"
```


---
## 正規表現: よく使う特殊文字

| メタ文字 | 意味 | &emsp;&emsp;&emsp; | 演算子 | 意味 |
| ---- | ---- | --- | ---- | ---- |
| `\d` | 数字   | | `?`  | 0回か1回 |
| `\s` | 空白   | | `*`  | 0回以上繰り返し |
| `\w` | 英数字 | | `+`  | 1回以上繰り返し |
| `.`  | 何でも | | `{n,m}` | n回以上m回以下 |
| `^`  | 行頭   | | `XXX(?=YYY)`  | YYYに先立つXXX |
| `$`  | 行末   | | `(?<=YYY)XXX`  | YYYに続くXXX |

R文字列ではバックスラッシュを重ねる必要がある, e.g., `"\\d"`.<br>
`\D`, `\S`, `W` のように大文字にすると反転。

<small style="display: block; text-align: right;"><http://userguide.icu-project.org/strings/regexp></small>

問: `str_subset(fruit, "PATTERN")` をいろいろ試してみよう


---
## 検出 `str_detect()`

マッチするかどうか `TRUE`/`FALSE` を返す。

```r
fruit4 = head(fruit, 4L)
str_detect(fruit4, "^a")
```

```
[1]  TRUE  TRUE  TRUE FALSE
```

問: `starwars` の `name` 列で `filter()` してみよう


```
             name height  mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
            <chr>  <int> <dbl>      <chr>       <chr>     <chr>      <dbl>  <chr>     <chr>     <chr>   <chr>    <list>    <list>    <list>
 1 Luke Skywalker    172    77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167    75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96    32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202   136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                         
84    Poe Dameron     NA    NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
85            BB8     NA    NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
86 Captain Phasma     NA    NA    unknown     unknown   unknown         NA   <NA>      <NA>      <NA>    <NA> <chr [1]> <chr [0]> <chr [0]>
87  Padmé Amidala    165    45      brown       light     brown       46.0 female  feminine     Naboo   Human <chr [3]> <chr [0]> <chr [3]>
```

---
## 抽出 `str_extract()`

マッチした部分文字列を取り出す。しなかった要素には `NA`。

```r
fruit4 = head(fruit, 4L)
str_extract(fruit4, "^a..")
```

```
[1] "app" "apr" "avo" NA   
```

問: `diamonds` の `clarity` 列から数字を取り除いてみよう


```
      carat       cut color clarity depth table price     x     y     z
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl> <int> <dbl> <dbl> <dbl>
    1  0.23     Ideal     E     SI2  61.5    55   326  3.95  3.98  2.43
    2  0.21   Premium     E     SI1  59.8    61   326  3.89  3.84  2.31
    3  0.23      Good     E     VS1  56.9    65   327  4.05  4.07  2.31
    4  0.29   Premium     I     VS2  62.4    58   334  4.20  4.23  2.63
   --                                                                  
53937  0.72      Good     D     SI1  63.1    55  2757  5.69  5.75  3.61
53938  0.70 Very Good     D     SI1  62.8    60  2757  5.66  5.68  3.56
53939  0.86   Premium     H     SI2  61.0    58  2757  6.15  6.12  3.74
53940  0.75     Ideal     D     SI2  62.2    55  2757  5.83  5.87  3.64
```


---
## 置換 `str_replace()`

カッコ `()` で囲んだマッチングは後で参照できる:

```r
fruit4 = head(fruit, 4L)
str_replace(fruit4, "..$", "!!")
```

```
[1] "app!!"   "apric!!" "avoca!!" "bana!!" 
```

```r
str_replace(fruit4, "(..)$", "!!\\1")
```

```
[1] "app!!le"   "apric!!ot" "avoca!!do" "bana!!na" 
```

問: `starwars` の `name` 列の数字を全部ゼロにしてみよう


```
             name height  mass hair_color  skin_color eye_color birth_year    sex    gender homeworld species     films  vehicles starships
            <chr>  <int> <dbl>      <chr>       <chr>     <chr>      <dbl>  <chr>     <chr>     <chr>   <chr>    <list>    <list>    <list>
 1 Luke Skywalker    172    77      blond        fair      blue       19.0   male masculine  Tatooine   Human <chr [5]> <chr [2]> <chr [2]>
 2          C-3PO    167    75       <NA>        gold    yellow      112.0   none masculine  Tatooine   Droid <chr [6]> <chr [0]> <chr [0]>
 3          R2-D2     96    32       <NA> white, blue       red       33.0   none masculine     Naboo   Droid <chr [7]> <chr [0]> <chr [0]>
 4    Darth Vader    202   136       none       white    yellow       41.9   male masculine  Tatooine   Human <chr [4]> <chr [0]> <chr [1]>
--                                                                                                                                         
84    Poe Dameron     NA    NA      brown       light     brown         NA   male masculine      <NA>   Human <chr [1]> <chr [0]> <chr [1]>
85            BB8     NA    NA       none        none     black         NA   none masculine      <NA>   Droid <chr [1]> <chr [0]> <chr [0]>
86 Captain Phasma     NA    NA    unknown     unknown   unknown         NA   <NA>      <NA>      <NA>    <NA> <chr [1]> <chr [0]> <chr [0]>
87  Padmé Amidala    165    45      brown       light     brown       46.0 female  feminine     Naboo   Human <chr [3]> <chr [0]> <chr [3]>
```


---
## 形式を変える・整える


```r
fruit4 = head(fruit, 4L)
str_to_upper(fruit4)              # 大文字に
```

```
[1] "APPLE"   "APRICOT" "AVOCADO" "BANANA" 
```

```r
str_pad(fruit4, 8, "left", "_")   # 幅を埋める
```

```
[1] "___apple" "_apricot" "_avocado" "__banana"
```

[`stringi`](http://www.gagolewski.com/software/stringi/) パッケージはさらに多機能

```r
stringi::stri_trans_nfkc("ｶﾀｶﾅ")  # 半角カナを全角に
```

```
[1] "カタカナ"
```

---
## 文字列から別の型に

<a href="https://readr.tidyverse.org/">
<img src="/_img/hex-stickers/readr.webp" width="120" style="float: right;">
</a>

これはstringrではなくreadrの担当:


```r
parse_number(c("p = 0.02 *", "N_A = 6e23"))
```

```
[1] 2e-02 6e+23
```

```r
parse_double(c("0.02", "6e23"))   # 異物には警告
```

```
[1] 2e-02 6e+23
```

```r
parse_logical(c("1", "true", "0", "false"))
```

```
[1]  TRUE  TRUE FALSE FALSE
```

```r
parse_date("2020-06-03")
```

```
[1] "2020-06-03"
```

---
## 因子型 `factor`

カテゴリカル変数を扱うための型。文字列っぽいけど中身は数。


```r
iris = tibble::as_tibble(iris) %>% print()
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

```r
levels(iris[["Species"]])
```

```
[1] "setosa"     "versicolor" "virginica" 
```

<small style="display: block; text-align: right;"><https://r4ds.had.co.nz/factors.html></small>


---
## 因子型 `factor`: 文字列との違い1

取りうる値 (levels) が既知。

typoがあると `NA` 扱い。


```r
month_levels = c(
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
)
x2 = c("Dec", "Apr", "Jam", "Mar")
factor(x2, levels = month_levels)
```

```
[1] Dec  Apr  <NA> Mar 
Levels: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
```

---
## 因子型 `factor`: 文字列との違い2

順序がある。

文字列をソートすると当然アルファベット順になるけど、<br>
因子型にはそうじゃない順序を持たせられる:


```r
x1 = c("Dec", "Apr", "Jan", "Mar")
sort(x1)
```

```
[1] "Apr" "Dec" "Jan" "Mar"
```

```r
y1 = factor(x1, levels = month_levels)
as.integer(y1)
```

```
[1] 12  4  1  3
```


---
## 因子型 `factor`: 順序の情報は作図で生きる

文字列ならアルファベット順、因子型なら任意指定可能。<br>
頻度順にする例:


```r
diamonds %>%
  mutate(color = fct_infreq(color)) %>%
  ggplot() + aes(x = color) +
  geom_bar() + coord_flip()
```

![plot of chunk fct_infreq](figure/fct_infreq-1.png)

---
## tidyverse の因子型担当は forcats

<a href="https://forcats.tidyverse.org/">
<img src="/_img/hex-stickers/forcats.webp" width="120" style="float: right;">
</a>

- `fct_reorder()`: 別の変数に応じて順序を並べ替え
- `fct_infreq()`: 頻度に応じて順序を並べ替え
- `fct_relevel()`: すべて手動で再設定
- `fct_lump()`: 少なすぎるカテゴリを"その他"としてまとめる


---
## ダミー変数に変換

イチゼロの値を持たせて横広に変形するのと等価。


```r
iris %>%
  rowid_to_column() %>% select(-starts_with("Sepal")) %>%
  mutate(value = 1L) %>%
  pivot_wider(names_from = Species, values_from = value, values_fill = c(value = 0L))
```

```
    rowid Petal.Length Petal.Width setosa versicolor virginica
    <int>        <dbl>       <dbl>  <int>      <int>     <int>
  1     1          1.4         0.2      1          0         0
  2     2          1.4         0.2      1          0         0
  3     3          1.3         0.2      1          0         0
  4     4          1.5         0.2      1          0         0
 --                                                           
147   147          5.0         1.9      0          0         1
148   148          5.2         2.0      0          0         1
149   149          5.4         2.3      0          0         1
150   150          5.1         1.8      0          0         1
```

問: これの逆向きをやってみよう


---
## 日時型: POSIXct, POSIXlt

- POSIXct: エポックからの経過秒数。比較や差分などを取りやすい。
- POSIXlt: list(年, 月, 日, 時, 分, 秒)。単位ごとに抜き出しやすい。


```r
now = "2020-06-03 13:00:00"
ct = as.POSIXct(now)
unclass(ct)
```

```
[1] 1591156800
attr(,"tzone")
[1] ""
```

```r
lt = as.POSIXlt(now)
unclass(lt) %>% as_tibble()
```

```
    sec   min  hour  mday   mon  year  wday  yday isdst  zone gmtoff
  <dbl> <int> <int> <int> <int> <int> <int> <int> <int> <chr>  <int>
1     0     0    13     3     5   120     3   154     0   JST     NA
```

素のRでも扱えるけど lubridate パッケージを使うともっと楽に。

---
## lubridate --- 日時型処理パッケージ

<a href="https://lubridate.tidyverse.org/">
<img src="/_img/hex-stickers/lubridate.webp" width="120" style="float: right;">
</a>

日時型への変換:

```r
ymd(c("20200603", "2020-06-03", "20/6/3"))
```

```
[1] "2020-06-03" "2020-06-03" "2020-06-03"
```

日時型から単位ごとに値を取得:

```r
today = ymd(20200603)
month(today)
```

```
[1] 6
```

```r
wday(today, label = TRUE)
```

```
[1] Wed
Levels: Sun < Mon < Tue < Wed < Thu < Fri < Sat
```

[チートシート](https://github.com/rstudio/cheatsheets/raw/master/lubridate.pdf)

---
## 終盤のまとめ

- vectorには型がある: 文字列、数値、因子、日時、etc.
- 文字列を扱うには [stringr](https://stringr.tidyverse.org/)
    - 正規表現は強力・汎用的
- 因子を扱うには [forcats](https://forcats.tidyverse.org/)
    - 知っておくと作図で有利
- 日時を扱うには [lubridate](https://lubridate.tidyverse.org/)

各パッケージのチートシート.pdfを手元に持っておくと便利。

---
## Reference

R for Data Science --- Hadley Wickham and Garrett Grolemund
: <https://r4ds.had.co.nz/>,
  [Paperback](https://amzn.to/2tbRmVc),
  [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

- [本橋智光「前処理大全」](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)
- [松村ら「RユーザのためのRStudio[実践]入門」(宇宙本)](https://amzn.to/3eBprm5)

整然データとは何か --- [@f_nisihara](https://twitter.com/f_nisihara)
: [Speaker Deck](https://speakerdeck.com/fnshr/zheng-ran-detatutenani),
  [Colorless Green Ideas](https://id.fnshr.info/2017/01/09/tidy-data-intro/)

Official documents:
: [tidyverse](https://www.tidyverse.org/),
  [dplyr](https://dplyr.tidyverse.org/),
  [tidyr](https://tidyr.tidyverse.org/),
  [purrr](https://purrr.tidyverse.org/),
  [tibble](https://tibble.tidyverse.org/),
  [readr](https://readr.tidyverse.org/),
  [stringr](https://stringr.tidyverse.org/),
  [forcats](https://forcats.tidyverse.org/),
  [lubridate](https://lubridate.tidyverse.org/)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2019/)」
   岩嵜航 2019 東京医科歯科大

<a href="4-statistics.html" rel="next" class="readmore">
4. Statistical analysis with R
</a>
