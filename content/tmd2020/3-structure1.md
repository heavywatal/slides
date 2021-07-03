+++
url = "tmd2020/3-structure1.html"
title = "3. データ構造の処理1: 抽出、集約など — Rによるデータ前処理実習 2020"
linktitle = "データ構造の処理1: 抽出、集約など。"
date = 2020-10-10T13:00:00+09:00
type = "reveal"
draft = false
+++

<link rel="stylesheet" href="style.css">

# [Rによるデータ前処理実習2020](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li><a href="1-introduction.html">入門1: 前処理とは。Rを使うメリット。Rの基本。</a>
<li><a href="2-visualization.html">入門2: データ可視化の重要性と方法。</a>
<li class="current-deck"><a href="3-structure1.html">データ構造の処理1: 抽出、集約など。</a>
<li><a href="4-structure2.html">データ構造の処理2: 結合、変形など。</a>
<li><a href="5-content.html">データ内容の処理: 数値、文字列、日時など。</a>
<li><a href="6-practice.html">実践: 現実の問題に対処してみる。</a>
</ol>

<div class="footnote">
2020-10-10 東京医科歯科大学 M&Dタワー 情報検索室1<br>
<a href="https://heavywatal.github.io/slides/tmd2020/">https://heavywatal.github.io/slides/tmd2020/</a>
</div>





---
## 本実習の目標

### ✅ <strike>再現可能な解析をRで楽にやりたい</strike>

### ✅ <strike>まずデータ全体を可視化してみるのがだいじ</strike>

### ⬜ あれもこれもRでできそう！

### ⬜ やりたくなったらこうやって調べればいいんだな

<br>
That's all.
これさえ押さえれば、個々の方法は覚えなくても大丈夫。


---
## データ解析のおおまかな流れ

1. コンピュータ環境の整備
1. データの取得、読み込み
1. 探索的データ解析
    - **前処理、加工** (地味。意外と重い) 👈本実習の主題
    - 可視化、仮説生成 (派手！だいじ！) [先週後半の話題](2-visualization.html)
    - 統計解析、仮説検証 (みんな勉強したがる)
1. 報告、発表

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
</figure>


---
## 可視化だいじ。わかった。

情報の整理 → **正しい解析・新しい発見・仮説生成**

<figure>
<a href="https://r4ds.had.co.nz/explore-intro.html">
<img src="/slides/image/r4ds/data-science-explore.png">
<figcaption class="url">https://r4ds.had.co.nz/explore-intro.html</figcaption>
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

<cite style="display: block; text-align: right;">
<a class="url" href="https://r4ds.had.co.nz/tidy-data.html">https://r4ds.had.co.nz/tidy-data.html</a>
</cite>


```r
print(ggplot2::diamonds)
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
<cite style="position: absolute; bottom: 18px; right: 24px;">
<a class="url" href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「整然データとは何か」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</cite>

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
<cite style="position: absolute; bottom: 18px; right: 24px;">
<a class="url" href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「整然データとは何か」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</cite>

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
<cite style="position: absolute; bottom: 18px; right: 24px;">
<a class="url" href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「整然データとは何か」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</cite>

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
<cite style="position: absolute; bottom: 18px; right: 24px;">
<a class="url" href="https://id.fnshr.info/2017/01/09/tidy-data-intro/">
西原史暁「整然データとは何か」https://id.fnshr.info/2017/01/09/tidy-data-intro/
</a>
</cite>


---
## 整然データのご利益の例: ggplot2 (先週後半の話題)

x軸、y軸、色分け、パネル分けなどを列の名前で指定して簡単作図:

```r
ggplot(diamonds) + aes(x = carat, y = price) +
  geom_point(mapping = aes(color = color, size = clarity)) +
  facet_wrap(~ cut)
```

<img src="figure/tidy-data-benefit-1.png" alt="plot of chunk tidy-data-benefit">

---
## 目標: 生データを下ごしらえして食べやすい形に


```r
print(VADeaths)
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

- **データ構造を対象とする処理** 👈 第3, 4回 本日の話題
    - 使いたい部分だけ抽出
    - グループごとに特徴を要約
    - 何かの順に並べ替え
    - 異なるテーブルの結合
    - 変形: 縦長 ↔ 横広
- データ内容を対象とする処理 <span style="color: #888888;">— 第5回 来週</span>
    - 数値を変換する (e.g., 対数、座標系)
    - 変換: 連続変数 ↔ カテゴリカル変数 ↔ ダミー変数
    - 外れ値・欠損値に対処
    - 文字列から数値や日時を抜き出す

<cite style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></cite>

---
## tidyverse: データ科学のためのパッケージ群

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges.png" width="260" align="right">
</a>

- 統一的な使い勝手
- シンプルな関数を繋げて使うデザイン

```r
# install.packages("tidyverse")
library(tidyverse)  # パッケージ読み込み
```
```
── Attaching packages ──────────────────────── tidyverse 1.3.0 ──
✔ ggplot2 3.3.2     ✔ purrr   0.3.4
✔ tibble  3.0.3     ✔ dplyr   1.0.2
✔ tidyr   1.1.2     ✔ stringr 1.4.0
✔ readr   1.3.1     ✔ forcats 0.5.0
── Conflicts ─────────────────────────── tidyverse_conflicts() ──
✖ dplyr::filter() masks stats::filter()
✖ dplyr::lag()    masks stats::lag()
```

**dplyr ≥1.0.0** と **tidyr ≥1.1.0** を使いたいので古かったら更新:
```r
update.packages(ask = "no", type = "binary")
# いちいち確認せずにビルド済み安定版を入れるオプション
```

---
## dplyr --- data.frameの高速処理担当

<a href="https://dplyr.tidyverse.org/">
<img src="/slides/image/hex-stickers/dplyr.png" width="120" align="right">
</a>

シンプルな関数がたくさん。繋げて使う (piping)

抽出
: 列: `select()`,
: 行: `filter()`, `distinct()`, `slice()`

要約・集計
: `group_by()`, `summarize()`, `count()`

並べ替え
: `arrange()`, `relocate()`

列の追加・変更
: `mutate()`, `rename()`

結合
: 行方向: `bind_rows()`
: 列方向: `left_join()`, `inner_join()`, `full_join()`


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
seq(1, 6) %>% sum()
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
sum(seq(1, 6))
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

🔰 `starwars` の 1, 10, 11 列目を抽出してみよう

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

別解: `diamonds %>% select(c("carat", "cut", "price"))`

🔰 `starwars` の 1, 10, 11 列目を**列名で**抽出してみよう


---
## 列の抽出: `select()`

**捨てる列**をマイナス・反転指定:

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

別解: `diamonds %>% select(!c("carat", "cut", "price"))`

🔰 `starwars` の **1, 10, 11 列目を除外**してみよう

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

🔰 `starwars` の **"s" で終わる列**を抽出してみよう

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

🔰 `starwars` の**文字列型の列**を抽出してみよう

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

🔰 `starwars` の**人間**を抽出してみよう

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

🔰 `starwars` の**身長が150以下のキャラクタ**を抽出してみよう

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

🔰 `starwars` の**目の色が青か赤のキャラクタ**を抽出してみよう

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

🔰 `starwars` の**タトゥーイン生まれの人間**を抽出してみよう


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

🔰 `starwars` の**身長200以上または体重100以上のキャラ**を抽出しよう

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

🔰 `starwars` の**身長が低い順に5名だけ**抽出してみよう


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

🔰 `starwars` の**ジェンダーごとに身長が低い3名ずつ**抽出してみよう

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

🔰 `starwars` の**ジェンダーごとに先頭3名ずつ**抽出してみよう


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

🔰 `starwars` から**ジェンダーごとにランダムに3名**抽出してみよう


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

🔰 `starwars` の**性とジェンダーの組み合わせ**だけ残してみよう

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

🔰 `mpg` の**市街地(cty)と高速道路(hwy)の燃費平均値**を計算しよう

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

🔰 `mpg` の**燃費平均値を駆動方式(drv)ごとに**計算しよう


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

🔰 `mpg` の**各数値列の最大値を駆動方式ごとに**計算しよう

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

🔰 `starwars` の**性とジェンダーの組み合わせ**を数えてみよう

---
## 行の並べ替え: `arrange()`

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

🔰 `starwars` の**種族と身長で並べ替え**てみよう

---
## 列の並べ替え: `relocate()`

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

🔰 `starwars` の**種族と出身地を名前の右に移動**してみよう


---
## 列の追加・変更: `mutate()`

既存の列名を指定すると上書き:

```r
result = diamonds %>%
  mutate(ratio = price / carat,
         price = 105.59 * price) %>%
  print()
```

```
      carat       cut color clarity depth table     price     x     y     z    ratio
      <dbl>     <ord> <ord>   <ord> <dbl> <dbl>     <dbl> <dbl> <dbl> <dbl>    <dbl>
    1  0.23     Ideal     E     SI2  61.5    55  34422.34  3.95  3.98  2.43 1417.391
    2  0.21   Premium     E     SI1  59.8    61  34422.34  3.89  3.84  2.31 1552.381
    3  0.23      Good     E     VS1  56.9    65  34527.93  4.05  4.07  2.31 1421.739
    4  0.29   Premium     I     VS2  62.4    58  35267.06  4.20  4.23  2.63 1151.724
   --                                                                               
53937  0.72      Good     D     SI1  63.1    55 291111.63  5.69  5.75  3.61 3829.167
53938  0.70 Very Good     D     SI1  62.8    60 291111.63  5.66  5.68  3.56 3938.571
53939  0.86   Premium     H     SI2  61.0    58 291111.63  6.15  6.12  3.74 3205.814
53940  0.75     Ideal     D     SI2  62.2    55 291111.63  5.83  5.87  3.64 3676.000
```

🔰 `starwars` の**身長をメートルで表してBMIを計算**してみよう


---
## 列名の変更: `rename()`

`new = old` の形で指定する:

```r
result = diamonds %>%
  rename(size = carat) %>%
  print()
```

```
       size       cut color clarity depth table price     x     y     z
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

`rename_with(diamonds, toupper)` のように関数を渡すと一括変更。

🔰 `starwars` の**heightをcmに、massをkgに改名**してみよう


---
## 前処理は大きく2つに分けられる

- **データ構造を対象とする処理** 第3, 4回 本日の話題
    - **使いたい部分だけ抽出**
    - **グループごとに特徴を要約**
    - **何かの順に並べ替え** 👈 第3回 ここまで紹介
    - 異なるテーブルの結合
    - 変形: 縦長 ↔ 横広
- データ内容を対象とする処理  <span style="color: #888888;">— 第5回 来週</span>
    - 数値を変換する (e.g., 対数、座標系)
    - 変換: 連続変数 ↔ カテゴリカル変数 ↔ ダミー変数
    - 外れ値・欠損値に対処
    - 文字列から数値や日時を抜き出す

<cite style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></cite>


---
## 憶えなくていい。公式サイトなどを見ながら作業

<figure>
<a href="https://dplyr.tidyverse.org/">
<img src="/slides/image/rstats/dplyr-website.png" width="90%">
<figcaption class="url">https://dplyr.tidyverse.org/</figcaption>
</a>
</figure>


---
## Reference

R for Data Science --- Hadley Wickham and Garrett Grolemund
: <https://r4ds.had.co.nz/>,
  [Paperback](https://amzn.to/2tbRmVc),
  [日本語版書籍](https://amzn.to/2yyFRKt)

[前処理大全 --- 本橋智光](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)<br>
[RユーザのためのRStudio[実践]入門 (宇宙本) --- 松村ら](https://amzn.to/3eBprm5)

整然データとは何か --- [@f_nisihara](https://twitter.com/f_nisihara)
: [Speaker Deck](https://speakerdeck.com/fnshr/zheng-ran-detatutenani),
  [Colorless Green Ideas](https://id.fnshr.info/2017/01/09/tidy-data-intro/)

Official documents:
: [tidyverse](https://www.tidyverse.org/),
  [dplyr](https://dplyr.tidyverse.org/),
  [tidyr](https://tidyr.tidyverse.org/),
  [purrr](https://purrr.tidyverse.org/),
  [tibble](https://tibble.tidyverse.org/),
  [readr](https://readr.tidyverse.org/)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学

<a href="4-structure2.html" rel="next" class="readmore">
4. データ構造の処理2: 結合、変形など。
</a>
