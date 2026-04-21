+++
url = "tohoku2026r/4-structure2.html"
linktitle = "データ構造の処理2: 結合、変形など。"
title = "4. データ構造の処理2: 結合、変形など。 — 進化学実習 2026 牧野研 東北大学"
date = 2026-04-09T14:40:00+09:00
draft = false
[params]
dev.css = "projector.css"
dpi = 108
+++

# [進化学実習 2026 牧野研 東北大学](.)

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
<li class="current-deck"><a href="4-structure2.html">データ構造の処理2: 結合、変形など。</a>
<li><a href="5-content.html">データ内容の処理: 数値、文字列など。</a>
<li><a href="6-input.html">データ入力、レポート作成</a>
<li><a href="7-distribution.html">統計モデリング1: 確率分布、尤度</a>
<li><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2026-04-09 東北大学 理学部生物学科 進化学実習<br>
<a href="https://heavywatal.github.io/slides/tohoku2026r/">https://heavywatal.github.io/slides/tohoku2026r/</a>
</div>


---
## 前処理は大きく2つに分けられる

- **データ構造を対象とする処理** — 第3, 4回 本日の話題
    - 使いたい部分だけ抽出
    - グループごとに特徴を要約
    - 何かの順に並べ替え
    - **異なるテーブルの結合** 👈 第4回ここから
    - **変形: 縦長 ↔ 横広**
- データ内容を対象とする処理 <span style="opacity: 0.6;">— 第5回</span>
    - 数値の変換: 対数、正規化
    - 外れ値・欠損値への対処
    - 型変換: 連続変数、カテゴリカル変数、指示変数、因子、日時
    - 文字列処理: 正規表現によるパターンマッチ

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>

---
## dplyr --- data.frameの高速処理担当

<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="180" style="float: right;">
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
## 行の結合: `bind_rows()`

例。先頭と末尾を6行ずつ取って縦並びで結合する:

``` r
dplyr::bind_rows(head(diamonds), tail(diamonds))
```

```
   carat       cut color clarity depth table price    x    y    z
 1  0.23     Ideal     E     SI2  61.5    55   326 3.95 3.98 2.43
 2  0.21   Premium     E     SI1  59.8    61   326 3.89 3.84 2.31
 3  0.23      Good     E     VS1  56.9    65   327 4.05 4.07 2.31
 4  0.29   Premium     I     VS2  62.4    58   334 4.20 4.23 2.63
--                                                               
 9  0.72      Good     D     SI1  63.1    55  2757 5.69 5.75 3.61
10  0.70 Very Good     D     SI1  62.8    60  2757 5.66 5.68 3.56
11  0.86   Premium     H     SI2  61.0    58  2757 6.15 6.12 3.74
12  0.75     Ideal     D     SI2  62.2    55  2757 5.83 5.87 3.64
```

🔰 `mpg` で同様に3行ずつ取って結合してみよう


---
## 列の結合: `bind_cols()`

例。3行2列の表を横並びで結合する:

``` r
dplyr::bind_cols(band_members, band_instruments2)
```

```
  name    band artist  plays
1 Mick  Stones   John guitar
2 John Beatles   Paul   bass
3 Paul Beatles  Keith guitar
```
```
band_members          band_instruments2
   name    band         artist  plays
  <chr>   <chr>          <chr>  <chr>
1  Mick  Stones       1   John guitar
2  John Beatles       2   Paul   bass
3  Paul Beatles       3  Keith guitar
```

**中身が合ってなくても**行数が合ってれば成功してしまう。\
共通する列を**糊しろ**にして結合したい場合は `*_join()` 関数 →


---
## 共通する列で結合: `full_join()`

他方に無い部分を `NA` で補完して**左右とも全行**保持:

``` r
dplyr::full_join(band_members, band_instruments, by = "name")
```

```
   name    band  plays
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

🔰 結合前と結合後の表を手元でも確認しよう

---
## 共通する列で結合: `full_join()`

結合に使う列の名前が違ってても大丈夫:

``` r
dplyr::full_join(band_members, band_instruments2, by = c(name = "artist"))
```

```
   name    band  plays
1  Mick  Stones   <NA>
2  John Beatles guitar
3  Paul Beatles   bass
4 Keith    <NA> guitar
```
```
band_members          band_instruments2
   name    band         artist  plays
  <chr>   <chr>          <chr>  <chr>
1  Mick  Stones       1   John guitar
2  John Beatles       2   Paul   bass
3  Paul Beatles       3  Keith guitar
```

🔰 結合前と結合後の表を手元でも確認しよう

---
## 共通する列で結合: `left_join()`

右側に無い部分を `NA` で補完して**左側だけ全行**保持:

``` r
dplyr::left_join(band_members, band_instruments, by = "name")
```

```
  name    band  plays
1 Mick  Stones   <NA>
2 John Beatles guitar
3 Paul Beatles   bass
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

🔰 結合前と結合後の表を手元でも確認しよう

---
## 共通する列で結合: `inner_join()`

左右ともに**共通する値のある行だけ**保持:

``` r
dplyr::inner_join(band_members, band_instruments, by = "name")
```

```
  name    band  plays
1 John Beatles guitar
2 Paul Beatles   bass
```
```
band_members          band_instruments
   name    band          name  plays
  <chr>   <chr>         <chr>  <chr>
1  Mick  Stones       1  John guitar
2  John Beatles       2  Paul   bass
3  Paul Beatles       3 Keith guitar
```

🔰 結合前と結合後の表を手元でも確認しよう

---
## joinまとめ

<figure>
<a href="https://r4ds.hadley.nz/joins.html">
<img src="/slides/image/r4ds/join-venn.png" width="100%">
<figcaption><small>https://r4ds.hadley.nz/joins.html</small></figcaption>
</a>
</figure>


生命科学における `left_join()` の例

左: **興味のある遺伝子**の発現データ\
右: **全遺伝子**のアノテーション情報

&nbsp; ↓ `left_join`(by = "遺伝子名")

**興味のある遺伝子**の発現+アノテーション

---
## join例題: `nycflights13` データセット

```r
# install.packages("nycflights13")
library(nycflights13)
data(package = "nycflights13")
# airlines, airports, flights, planes, weather
```

<figure>
<a href="https://r4ds.hadley.nz/joins.html#fig-flights-relationships">
<img src="/slides/image/r4ds/relational-nycflights13.png" width="890">
<figcaption><small>https://r4ds.hadley.nz/joins.html#fig-flights-relationships</small></figcaption>
</a>
</figure>

🔰 JFK空港発の100席以上の飛行機で最も多い目的地は何空港？

↓ こんな結果が出るように頑張れ ↓


```
   origin dest     n                           name      lat        lon  alt tz dst               tzone
 1    JFK  LAX 11065               Los Angeles Intl 33.94254 -118.40807  126 -8   A America/Los_Angeles
 2    JFK  SFO  7590             San Francisco Intl 37.61897 -122.37489   13 -8   A America/Los_Angeles
 3    JFK  MCO  4616                   Orlando Intl 28.42939  -81.30899   96 -5   A    America/New_York
 4    JFK  FLL  3683 Fort Lauderdale Hollywood Intl 26.07258  -80.15275    9 -5   A    America/New_York
--                                                                                                     
51    JFK  DCA     2  Ronald Reagan Washington Natl 38.85208  -77.03772   15 -5   A    America/New_York
52    JFK  JAC     2           Jackson Hole Airport 43.60733 -110.73775 6451 -7   A      America/Denver
53    JFK  BNA     1                 Nashville Intl 36.12447  -86.67819  599 -6   A     America/Chicago
54    JFK  STL     1          Lambert St Louis Intl 38.74870  -90.37003  618 -6   A     America/Chicago
```


---
## tidyr --- data.frameの変形・整形担当

<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="180" style="float: right;">
</a>

横広から縦長に
: `pivot_longer()`, <del><code>gather()</code></del>

縦長から横広に
: `pivot_wider()`, <del><code>spread()</code></del>

列を分離、結合
: `separate()`, `unite()`

入れ子構造をつくる、解消する
: `nest()`, `unnest()`

*etc.*

- こういう変形なしでそのまま使えるデータは激レア
- エクセルでポチポチやらず、tidyrで手続きを記述しよう
- ちょっとハードルは高いけど、使えるようになると**強い**💪

---
## `pivot_longer()` 横広から縦長に

複数列にまたがる値を1列にする。\
そのラベルも合わせて移動。

<figure>
<a href="https://r4ds.hadley.nz/data-tidy.html#sec-pivoting">
<img src="/slides/image/cheatsheet/tidyr-pivot_longer.png" width="900">
<figcaption><small>https://r4ds.hadley.nz/data-tidy.html#sec-pivoting</small></figcaption>
</a>
</figure>

```r
table4a
pivot_longer(table4a, 2:3, names_to = "year", values_to = "cases")
```

🔰 変形前と変形後を手元のRで確認してみよう。


---
## `pivot_longer()` 横広から縦長に: `relig_income` の例

宗教と収入の関係を調査したデータ。\
世帯数のカウントが複数列にまたがっている。


``` r
print(relig_income)
```

```
                religion <$10k $10-20k $20-30k $30-40k $40-50k $50-75k $75-100k $100-150k >150k Don't know/refused
 1              Agnostic    27      34      60      81      76     137      122       109    84                 96
 2               Atheist    12      27      37      52      35      70       73        59    74                 76
 3              Buddhist    27      21      30      34      33      58       62        39    53                 54
 4              Catholic   418     617     732     670     638    1116      949       792   633               1489
--                                                                                                                
15       Other Christian     9       7      11      13      13      14       18        14    12                 18
16          Other Faiths    20      33      40      46      49      63       46        40    41                 71
17 Other World Religions     5       2       3       4       2       7        3         4     4                  8
18          Unaffiliated   217     299     374     365     341     528      407       321   258                597
```

---
## `pivot_longer()` 横広から縦長に: `relig_income` の例

宗教と収入の関係を調査したデータ。\
こうなってたらggplotできるのに。

<div class="column-container">
<div class="column">



``` r
print(relig_long)
```

```
  religion  income count
1 Agnostic   <$10k    27
2 Agnostic $10-20k    34
3 Agnostic $20-30k    60
4  Atheist   <$10k    12
5  Atheist $10-20k    27
6  Atheist $20-30k    37
```

🔰 次ページの答えを見ず自力でやってみよう

</div>
<div class="column">

![plot of chunk relig-income-plot](./figure/relig-income-plot-1.png)

</div>
</div>

---
## `pivot_longer()` 横広から縦長に: `relig_income` の例

複数列にまたがっている世帯数カウントを `count` 1列に移動。\
列名になってた収入帯を `income` 列に移動。


``` r
relig_long = relig_income[1:2, 1:4] |> print() |>
  tidyr::pivot_longer(!religion, names_to = "income", values_to = "count") |>
  print()
```

```
  religion <$10k $10-20k $20-30k
1 Agnostic    27      34      60
2  Atheist    12      27      37
  religion  income count
1 Agnostic   <$10k    27
2 Agnostic $10-20k    34
3 Agnostic $20-30k    60
4  Atheist   <$10k    12
5  Atheist $10-20k    27
6  Atheist $20-30k    37
```

移動する列を指定する `!religion` のところは直接 `2:10` とかも可。


---
## `pivot_wider()` 縦長から横広に

1列に収まっていた値を複数列の行列に変換。\
そのラベルを列の名前にする。

<figure>
<a href="https://r4ds.hadley.nz/data-tidy.html#widening-data">
<img src="/slides/image/cheatsheet/tidyr-pivot_wider.png" width="840">
<figcaption><small>https://r4ds.hadley.nz/data-tidy.html#widening-data</small></figcaption>
</a>
</figure>

```r
pivot_wider(table2, names_from = type, values_from = count)
```

🔰 変形前と変形後を手元のRで確認してみよう。

---
## `pivot_wider()` 縦長から横広に: `fish_encounters`

発信器のついた魚が観測地点を通過したことを記録したデータ。\
既にggplotしやすそうな形だけど、あえて1魚1行の横広にしたい。

<div class="column-container">
<div class="column">


``` r
print(fish_encounters)
```

```
    fish station seen
  1 4842 Release    1
  2 4842   I80_1    1
  3 4842  Lisbon    1
  4 4842    Rstr    1
 --                  
111 4864   I80_1    1
112 4865 Release    1
113 4865   I80_1    1
114 4865  Lisbon    1
```

</div>
<div class="column">

```r
print(fish_wide)
```

```
   fish Release I80_1 Lisbon Rstr Base_TD BCE BCW BCE2 BCW2 MAE MAW
 1 4842       1     1      1    1       1   1   1    1    1   1   1
 2 4843       1     1      1    1       1   1   1    1    1   1   1
 3 4844       1     1      1    1       1   1   1    1    1   1   1
 4 4845       1     1      1    1       1  NA  NA   NA   NA  NA  NA
--                                                                 
16 4862       1     1      1    1       1   1   1    1    1  NA  NA
17 4863       1     1     NA   NA      NA  NA  NA   NA   NA  NA  NA
18 4864       1     1     NA   NA      NA  NA  NA   NA   NA  NA  NA
19 4865       1     1      1   NA      NA  NA  NA   NA   NA  NA  NA
```

</div>
</div>

🔰 次ページの答えを見ず自力でやってみよう

---
## `pivot_wider()` 縦長から横広に: `fish_encounters`

観測地点 `station` を列名に移動。\
観察されたかどうか `seen` を各列に移動。存在しなければ `NA`


``` r
fish_encounters |>
  tidyr::pivot_wider(names_from = station, values_from = seen)
```

```
   fish Release I80_1 Lisbon Rstr Base_TD BCE BCW BCE2 BCW2 MAE MAW
 1 4842       1     1      1    1       1   1   1    1    1   1   1
 2 4843       1     1      1    1       1   1   1    1    1   1   1
 3 4844       1     1      1    1       1   1   1    1    1   1   1
 4 4845       1     1      1    1       1  NA  NA   NA   NA  NA  NA
--                                                                 
16 4862       1     1      1    1       1   1   1    1    1  NA  NA
17 4863       1     1     NA   NA      NA  NA  NA   NA   NA  NA  NA
18 4864       1     1     NA   NA      NA  NA  NA   NA   NA  NA  NA
19 4865       1     1      1   NA      NA  NA  NA   NA   NA  NA  NA
```

`values_fill = 0` とすれば `NA` じゃなく `0` で埋められる。

---
## `pivot_wider()` 縦長から横広に: 練習問題1


``` r
print(population)
```

```
         country year population
   1 Afghanistan 1995   17586073
   2 Afghanistan 1996   18415307
   3 Afghanistan 1997   19021226
   4 Afghanistan 1998   19496836
  --                            
4057    Zimbabwe 2010   13076978
4058    Zimbabwe 2011   13358738
4059    Zimbabwe 2012   13724317
4060    Zimbabwe 2013   14149648
```

🔰 1国のデータが1行になるように変形しよう↓

```
                     country     1995     1996     1997     1998     1999     2000     2001     2002     2003     2004     2005     2006     2007     2008     2009     2010     2011     2012     2013
  1              Afghanistan 17586073 18415307 19021226 19496836 19987071 20595360 21347782 22202806 23116142 24018682 24860855 25631282 26349243 27032197 27708187 28397812 29105480 29824536 30551674
  2                  Albania  3357858  3341043  3331317  3325456  3317941  3304948  3286084  3263596  3239385  3216197  3196130  3179573  3166222  3156608  3151185  3150143  3153883  3162083  3173271
  3                  Algeria 29315463 29845208 30345466 30820435 31276295 31719449 32150198 32572977 33003442 33461345 33960903 34507214 35097043 35725377 36383302 37062820 37762962 38481705 39208194
  4           American Samoa    52874    53926    54942    55899    56768    57522    58176    58729    59117    59262    59117    58652    57919    57053    56245    55636    55274    55128    55165
 --                                                                                                                                                                                                    
216 West Bank and Gaza Strip  2598393  2722497  2851993  2980563  3099951  3204572  3291620  3363542  3426549  3489743  3559856  3638829  3725076  3817551  3914035  4012880  4114199  4218771  4326295
217                    Yemen 15018201 15578640 16088019 16564235 17035531 17522537 18029989 18551068 19081306 19612696 20139661 20661714 21182162 21703571 22229625 22763008 23304206 23852409 24407381
218                   Zambia  8841338  9073311  9320089  9577483  9839179 10100981 10362137 10625423 10894519 11174650 11470022 11781612 12109620 12456527 12825031 13216985 13633796 14075099 14538640
219                 Zimbabwe 11639364 11846110 12045813 12229500 12384727 12503652 12586763 12640922 12673103 12693047 12710589 12724308 12740160 12784041 12888918 13076978 13358738 13724317 14149648
```

---
## `pivot_wider()` 縦長から横広に: 練習問題2


``` r
print(population)
```

```
         country year population
   1 Afghanistan 1995   17586073
   2 Afghanistan 1996   18415307
   3 Afghanistan 1997   19021226
   4 Afghanistan 1998   19496836
  --                            
4057    Zimbabwe 2010   13076978
4058    Zimbabwe 2011   13358738
4059    Zimbabwe 2012   13724317
4060    Zimbabwe 2013   14149648
```

🔰 1年のデータが1行になるように変形しよう↓

```
   year Afghanistan Albania  Algeria American Samoa Andorra   Angola Anguilla Antigua and Barbuda Argentina Armenia  Aruba Australia Austria Azerbaijan Bahamas Bahrain Bangladesh Barbados  Belarus  Belgium Belize    Benin Bermuda Bhutan Bolivia (Plurinational State of) Bonaire, Saint Eustatius and Saba Bosnia and Herzegovina Botswana    Brazil British Virgin Islands Brunei Darussalam Bulgaria Burkina Faso  Burundi Cabo Verde Cambodia Cameroon   Canada Cayman Islands Central African Republic     Chad    Chile      China China, Hong Kong SAR China, Macao SAR Colombia Comoros   Congo Cook Islands Costa Rica Côte d'Ivoire Croatia     Cuba Curaçao  Cyprus Czech Republic Democratic People's Republic of Korea Democratic Republic of the Congo Denmark Djibouti Dominica Dominican Republic  Ecuador    Egypt El Salvador Equatorial Guinea Eritrea Estonia Ethiopia   Fiji Finland   France French Polynesia   Gabon  Gambia Georgia  Germany    Ghana   Greece Greenland Grenada   Guam Guatemala   Guinea Guinea-Bissau Guyana    Haiti Honduras  Hungary Iceland      India Indonesia Iran (Islamic Republic of)     Iraq Ireland  Israel    Italy Jamaica     Japan  Jordan Kazakhstan    Kenya Kiribati  Kuwait Kyrgyzstan Lao People's Democratic Republic  Latvia Lebanon Lesotho Liberia   Libya Lithuania Luxembourg Madagascar   Malawi Malaysia Maldives     Mali  Malta Marshall Islands Mauritania Mauritius    Mexico Micronesia (Federated States of) Monaco Mongolia Montenegro Montserrat  Morocco Mozambique  Myanmar Namibia Nauru    Nepal Netherlands Antilles Netherlands New Caledonia New Zealand Nicaragua    Niger   Nigeria Niue Northern Mariana Islands  Norway    Oman  Pakistan Palau  Panama Papua New Guinea Paraguay     Peru Philippines   Poland Portugal Puerto Rico   Qatar Republic of Korea Republic of Moldova  Romania Russian Federation   Rwanda Saint Kitts and Nevis Saint Lucia Saint Vincent and the Grenadines  Samoa San Marino Sao Tome and Principe Saudi Arabia  Senegal Serbia & Montenegro  Serbia Seychelles Sierra Leone Singapore Sint Maarten (Dutch part) Slovakia Slovenia Solomon Islands  Somalia South Africa South Sudan    Spain Sri Lanka    Sudan Suriname Swaziland  Sweden Switzerland Syrian Arab Republic Tajikistan Thailand The Former Yugoslav Republic of Macedonia Timor-Leste    Togo Tokelau  Tonga Trinidad and Tobago  Tunisia   Turkey Turkmenistan Turks and Caicos Islands Tuvalu   Uganda  Ukraine United Arab Emirates United Kingdom of Great Britain and Northern Ireland United Republic of Tanzania United States of America Uruguay US Virgin Islands Uzbekistan Vanuatu Venezuela (Bolivarian Republic of) Viet Nam Wallis and Futuna Islands West Bank and Gaza Strip    Yemen   Zambia Zimbabwe
 1 1995    17586073 3357858 29315463          52874   63854 12104952     9807               68349  34833168 3223173  80326  18124234 7985372    7770806  280050  563730  119869585   263165 10189075 10161914 206962  5985658   61407 509105                          7635362                                NA                3520996  1583453 161890816                  18425            295003  8358116     10089876  6209923     399477 10769198 13929575 29294899          31672                  3275695  6980351 14440103 1237531429              6144498           398459 36573895  465895 2720633        18305    3478197      14217430 4690192 10932013      NA  855389       10339223                              21763678                         42012524 5232582   663999    71367            7977966 11315800 61168397     5748013            441829 3407812 1433076 57023519 775587 5108176 58008958           215200 1080477 1065746 5067143 83147770 16760926 10671809     55809  100253 145562   9983861  7837173       1139667 728136  7838241  5591935 10351994  267454  955804355 194112556                   60468352 20363138 3610918 5331622 56967071 2462051 124483305 4320158   15549632 27418077    76378 1586123    4592135                          4871472 2487988 3033406 1753824 2079921 4747619   3628079     408152   13452526  9964065 20725374   244965  8988853 395615            51020    2334388   1128676  95392647                           107556  30700  2298063         NA      10232 26833093   15981571 45329862 1654214  9970 20587157               194332    15420000        189220     3675060   4659458  9167078 108424827 2167                    57518 4359788 2154600 126689577 17255 2757004          4715929  4801834 23939261    69606539 38479899 10097055     3689649  501154          44652994             4339081 22963512          148602147  5663838                 42888      147040                           108122 170158      25680                130378     18567343  8711528            10989446      NA      75433      3927105   3482640                        NA  5362950  1991848          359236  6346440     41426810          NA 39420568  18241711 29963988   435776    963428 8826720     7017042             14338240    5784330 58983954                                   1967013          NA 4284497    1520  95928             1255001  8982649 58522320      4188010                    15334   9227 20740726 51146967              2346305                                             57997197                    29944302                268039654 3224383            107018   22950898  168236                           22092144 76020043                     14143                  2598393 15018201  8841338 11639364
 2 1996    18415307 3341043 29845208          53926   64274 12451945    10063               70245  35264070 3173425  83195  18339037 8009345    7852273  283678  579697  122400896   263884 10156258 10186767 212375  6176318   61703 512594                          7806953                                NA                3485575  1620989 164392423                  18834            302511  8274592     10372562  6294482     408790 11090611 14316949 29586368          33535                  3350299  7216321 14662323 1247897092              6275363           405231 37236124  477548 2797572        18244    3566605      14632391 4647843 10980758      NA  873246       10327823                              22016518                         43122601 5254383   675891    71146            8118570 11557151 62123592     5806750            456389 3473399 1412522 58815116 784647 5126021 58216225           219282 1108698 1095930 4990097 83388930 17169151 10758368     55832  100796 148060  10214623  8094751       1165465 730865  7986858  5723639 10334876  270089  973147577 197097887                   61440887 21017108 3638411 5486219 56937309 2485230 124794906 4450852   15326132 28186224    77511 1585244    4658815                          4986592 2458305 3070984 1779197 2197801 4837354   3606012     414004   13882646 10153315 21259831   250659  9222157 398698            51397    2403805   1142191  97201533                           108342  30971  2316598         NA       9375 27237150   16463426 45991828 1705309 10033 21115271               192128    15514794        193493     3717342   4756631  9499605 111166210 2122                    60248 4385951 2175998 130083700 17695 2814525          4841020  4911701 24365985    71184718 38480234 10140627     3719446  512476          44940974             4308050 22841943          148375246  5929575                 43391      148962                           108078 171276      25914                132323     18848350  8940298            11028631      NA      76391      3919708   3570085                        NA  5372351  1989709          369439  6481035     42204043          NA 39513721  18367795 30824141   441734    984506 8849420     7059633             14746306    5862347 59562136                                   1975207          NA 4392177    1529  96218             1258365  9116617 59442502      4267690                    15967   9264 21407693 50821019              2470810                                             58168519                    30780453                271231546 3247585            107589   23381250  171802                           22556838 77166873                     14221                  2722497 15578640  9073311 11846110
 3 1997    19021226 3331317 30345466          54942   64090 12791388    10305               72232  35690778 3137652  85447  18563442 8014124    7921745  286845  597400  124945315   264606 10120556 10205970 218484  6361301   61992 521146                          7978521                                NA                3535998  1657349 166925457                  19270            309904  8199715     10664982  6369573     417562 11395958 14709426 29866502          35596                  3424733  7463347 14872458 1257021784              6430651           412031 37901358  489627 2878333        18093    3658020      15042149 4601596 11024249      NA  890733       10311228                              22240833                         44078397 5276683   687897    70756            8256496 11799289 63094069     5855226            471288 3560353 1397071 60584273 793098 5140755 58418324           223734 1137412 1126986 4922489 83490697 17568461 10833632     55876  101125 150306  10449636  8296478       1191672 734059  8136372  5852719 10311227  272798  990460131 200050444                   62542531 21693597 3669799 5630066 56887127 2509439 125048712 4551911   15085965 28943647    78725 1635999    4739263                          5096724 2434628 3092718 1801679 2365290 4924347   3583272     419979   14329239 10404259 21805835   256347  9462256 401373            51697    2475726   1154701  98968558                           108506  31242  2335723         NA       8217 27632321   16914628 46664455 1757969 10056 21647305               188609    15603344        197726     3752131   4849272  9849621 113979481 2069                    62939 4412958 2177723 133597492 18123 2873288          4970823  5021271 24789855    72780928 38461279 10182158     3746634  529491          45220543             4268774 22717415          148079919  6470628                 43885      150994                           108001 172191      26114                134029     19060850  9164050            11025594      NA      77173      3928313   3653156                        NA  5379101  1988790          379861  6673254     42906581          NA 39603778  18473862 31682982   447771   1006760 8859106     7090176             15168523    5937177 60206941                                   1991687          NA 4504291    1548  96574             1260677  9237249 60372413      4335991                    16527   9298 22084527 50421998              2608993                                             58346633                    31586039                274606475 3270549            108002   23789736  175004                           23020184 78199254                     14309                  2851993 16088019  9320089 12045813
 4 1998    19496836 3325456 30820435          55899   63799 13137542    10545               74206  36109342 3112958  87276  18794552 8009051    7984460  289926  617537  127478524   265370 10080772 10222896 225083  6546493   62276 533737                          8150214                                NA                3640821  1692148 169472347                  19726            317214  8131424     10967836  6447672     425932 11685332 15107909 30140562          37742                  3498140  7724316 15072409 1265222536              6591717           418810 38568056  502128 2961357        17915    3750585      15436470 4554877 11063917      NA  908040       10291153                              22444993                         44960941 5298680   699922    70295            8392534 12042454 64084443     5895018            486542 3668350 1385531 62353942 800616 5153229 58635564           228380 1166525 1159271 4861848 83500716 17968830 10896763     55948  101302 152275  10691090  8457221       1218336 737526  8285690  5980152 10282937  275568 1007746556 202990922                   63713397 22387179 3706616 5764197 56850303 2534127 125266855 4630762   14858241 29702246    80018 1722208    4823870                          5200898 2414650 3114014 1821609 2558085 5009240   3558827     425834   14790245 10700180 22355057   261973  9712365 403688            51922    2550307   1166070 100678867                           108236  31517  2355618         NA       6936 28013585   17350739 47321204 1809719 10054 22175431               184455    15688091        201899     3783470   4937320 10215806 116867371 2010                    65374 4440109 2171135 137139290 18524 2933100          5104516  5130723 25206817    74393147 38428791 10222540     3769718  550367          45489131             4221726 22596183          147715550  7169658                 44391      153066                           107923 172979      26321                135650     19282965  9387783            10990409      NA      77891      3961869   3735537                        NA  5383590  1988806          390493  6904978     43558285          NA 39729942  18575763 32551853   453920   1028694 8861204     7113505             15591261    6012933 60903042                                   2013117          NA 4620710    1566  96991             1262544  9347451 61308204      4395293                    17114   9334 22780451 49974187              2753498                                             58534306                    32378333                278053607 3291677            108271   24170760  178074                           23482700 79140734                     14394                  2980563 16564235  9577483 12229500
--                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
16 2010    28397812 3150143 37062820          55636   77907 19549124    13768               87233  40374224 2963496 101597  22404488 8401924    9094718  360498 1251513  151125475   280396  9491070 10941288 308595  9509798   64951 716939                         10156601                             17616                3845929  1969341 195210154                  27223            400569  7389175     15540284  9232753     487601 14364931 20624343 34126240          55509                  4349921 11720781 17150760 1359821465              7049514           534626 46444798  683081 4111715        20284    4669685      18976588 4338027 11281768  147560 1103685       10553701                              24500520                         62191161 5550959   834036    71167           10016797 15001072 78075705     6218195            696167 5741159 1298533 87095281 860559 5367693 63230866           268065 1556222 1680640 4388674 83017404 24262901 11109999     56546  104677 159440  14341576 10876033       1586624 786126  9896400  7621204 10014633  318042 1205624648 240676485                   74462314 30962380 4467561 7420368 60508978 2741485 127352833 6454554   15921127 40909194    97743 2991580    5334223                          6395713 2090519 4341092 2008921 3957990 6040612   3068457     507885   21079532 15013694 28275835   325694 13985961 424738            52428    3609420   1230659 117886404                           103619  36845  2712738     620078       4953 31642360   23967265 51931231 2178967 10025 26846016                   NA    16615243        246379     4368136   5822209 15893746 159707780 1468                    53860 4891251 2802768 173149306 20470 3678128          6858945  6459721 29262830    93444322 38198754 10589792     3709671 1749713          48453931             3573024 21861476          143617913 10836732                 52352      177397                           109316 186029      30861                178228     27258387 12950564                  NA 9647109      91208      5751976   5078969                     42519  5433437  2054232          526447  9636173     51452352          NA 46182038  20758779 45592931   524960   1193148 9382297     7830534             21532647    7627326 66402316                                   2102216     1079450 6306014    1135 104098             1328095 10631830 72137546      5041995                    30993   9827 33987213 46050220              8441537                                             62066350                    44973330                312247116 3371982            106382   27769270  236299                           29043283 89047397                     13565                  4012880 22763008 13216985 13076978
17 2011    29105480 3153883 37762962          55274   77865 20180490    13956               88152  40728738 2964120 101932  22740536 8432890    9202432  366331 1292764  152862431   281804  9450391 11006632 316280  9779795   65086 729429                         10324445                             18194                3839322  1986701 196935134                  27730            406512  7333122     15995313  9540362     490556 14605862 21156272 34487414          56601                  4436217 12080037 17308449 1368440300              7096359           546278 47078792  700216 4225359        20409    4737680      19389954 4323822 11276053  151523 1116513       10611037                              24631291                         63931512 5575237   846646    71401           10147598 15246481 79392466     6256242            715996 5932852 1294498 89393063 867921 5389084 63582112           270874 1594034 1734966 4374226 82892904 24820706 11118556     56626  105074 160858  14706578 11161530       1624228 790882 10032864  7776669  9996227  322052 1221156319 243801639                   75424285 31837015 4522844 7542327 60729316 2754669 127319206 6731151   16097998 42027891    99250 3124705    5403419                          6521314 2073385 4478105 2029516 4079697 6103233   3043980     516348   21678934 15457531 28758968   331964 14416737 426356            52495    3702763   1234910 119361233                           103424  37261  2754209     620644       5000 32059424   24581367 52350763 2217618 10024 27156367                   NA    16666206        249786     4413923   5905146 16511462 164192925 1426                    53230 4943754 3024774 176166353 20606 3740282          7012977  6573097 29614887    95053437 38204598 10597629     3701373 1910902          48732640             3542928 21808931          143438152 11144315                 52971      179271                           109357 187429      31048                183177     27761728 13330737                  NA 9597413      91799      5865491   5192183                     43451  5440253  2061952          537997  9907903     51949041    10381110 46514117  20925532 36430923   529761   1212159 9448965     7915200             21804363    7814850 66576332                                   2103890     1096293 6472304    1148 104554             1333082 10753073 73058638      5106668                    31726   9844 35148064 45802721              8925096                                             62426923                    46354607                314911752 3383486            106364   28151746  241778                           29500625 89913956                     13451                  4114199 23304206 13633796 13358738
18 2012    29824536 3162083 38481705          55128   78360 20820525    14132               89069  41086927 2969081 102384  23050471 8463948    9308959  371960 1317827  154695368   283221  9405097 11060095 324060 10050702   65216 741822                         10496285                             18694                3833916  2003910 198656019                  28088            412238  7277831     16460141  9849569     494401 14864646 21699631 34837978          57570                  4525209 12448175 17464814 1377064907              7148493           556783 47704427  717503 4337051        20523    4805295      19839750 4307422 11270957  155293 1128994       10660051                              24763188                         65705093 5597760   859652    71684           10276621 15492264 80721874     6297394            736296 6130922 1290778 91728849 874742 5408466 63936575           273814 1632572 1791225 4358242 82800121 25366462 11124639     56787  105483 162810  15082831 11451273       1663558 795369 10173775  7935846  9976195  325867 1236686732 246864191                   76424443 32778030 4575890 7643905 60884593 2768941 127249704 7009444   16271201 43178141   100786 3250496    5474213                          6645827 2060428 4647079 2051545 4190435 6154623   3027621     523744   22293914 15906483 29239927   338442 14853572 427764            52555    3796141   1239557 120847477                           103395  37579  2796484     621081       5046 32521143   25203395 52797319 2259393 10032 27474377                   NA    16714018        253155     4459852   5991733 17157042 168833776 1384                    53305 4993875 3314001 179160111 20754 3802281          7167010  6687361 29987800    96706764 38210924 10603804     3694237 2050514          49002683             3514381 21754741          143169653 11457801                 53584      180870                           109373 188889      31247                188098     28287855 13726021                  NA 9552553      92339      5978727   5303264                     44355  5445757  2067717          549598 10195134     52385920    10837527 46754541  21098099 37195349   534541   1230985 9511313     7997399             21889682    8008990 66785001                                   2105575     1114106 6642928    1169 104941             1337439 10874915 73997128      5172931                    32427   9860 36345860 45529944              9205651                                             62783115                    47783107                317505266 3395253            106462   28541423  247262                           29954782 90795769                     13353                  4218771 23852409 14075099 13724317
19 2013    30551674 3173271 39208194          55165   79218 21471618    14300               89985  41446246 2976566 102911  23342553 8495145    9413420  377374 1332171  156594962   284644  9356678 11104476 331900 10323474   65341 753947                         10671200                             19130                3829307  2021144 200361925                  28341            417784  7222943     16934839 10162532     498897 15135169 22253959 35181704          58435                  4616417 12825314 17619708 1385566537              7203836           566375 48321405  734917 4447632        20629    4872166      20316086 4289714 11265629  158760 1141166       10702197                              24895480                         67513677 5619096   872932    72003           10403761 15737878 82056378     6340454            757014 6333135 1287251 94100756 881065 5426323 64291280           276831 1671711 1849285 4340895 82726626 25904598 11127990     56987  105897 165124  15468203 11745189       1704255 799613 10317461  8097688  9954941  329535 1252139596 249865631                   77447168 33765232 4627173 7733144 60990277 2783888 127143577 7273799   16440586 44353691   102351 3368572    5547548                          6769727 2050317 4821971 2074465 4294077 6201521   3016933     530380   22924851 16362567 29716965   345023 15301650 429004            52634    3889880   1244403 122332399                           103549  37831  2839073     621383       5091 33008150   25833752 53259018 2303315 10051 27797457                   NA    16759229        256496     4505761   6080478 17831270 173615345 1344                    53855 5042671 3632444 182142594 20918 3864170          7321262  6802295 30375603    98393574 38216635 10608156     3688318 2168673          49262698             3487204 21698585          142833689 11776522                 54191      182273                           109373 190372      31448                192993     28828870 14133280                  NA 9510506      92838      6092075   5411737                     45233  5450223  2071997          561231 10495583     52776130    11296173 46926963  21273228 37964306   539276   1249514 9571105     8077833             21898061    8207834 67010502                                   2107158     1132879 6816982    1195 105323             1341151 10996515 74932641      5240072                    33098   9876 37578876 45238805              9346129                                             63136265                    49253126                320050716 3407062            106627   28934102  252763                           30405207 91679733                     13272                  4326295 24407381 14538640 14149648
```


---
## `pivot_wider()` 縦長から横広に: 練習問題3


``` r
print(us_rent_income)
```

```
    GEOID        NAME variable estimate moe
  1    01     Alabama   income    24476 136
  2    01     Alabama     rent      747   3
  3    02      Alaska   income    32940 508
  4    02      Alaska     rent     1200  13
 --                                        
101    56     Wyoming   income    30854 342
102    56     Wyoming     rent      828  11
103    72 Puerto Rico   income       NA  NA
104    72 Puerto Rico     rent      464   6
```

🔰 `income` と `rent` の推定値がそれぞれ列となるように変形しよう

```
   GEOID          NAME income rent
 1    01       Alabama  24476  747
 2    02        Alaska  32940 1200
 3    04       Arizona  27517  972
 4    05      Arkansas  23789  709
--                                
49    54 West Virginia  23707  681
50    55     Wisconsin  29868  813
51    56       Wyoming  30854  828
52    72   Puerto Rico     NA  464
```


---
## `separate()` 列を分離

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#separate">
<img src="/slides/image/cheatsheet/tidyr-separate.png" height="240">
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#separate</small></figcaption>
</a>
</figure>


``` r
table3 |> tidyr::separate(rate, into = c("cases", "population"), sep = "/")
```

```
      country year  cases population
1 Afghanistan 1999    745   19987071
2 Afghanistan 2000   2666   20595360
3      Brazil 1999  37737  172006362
4      Brazil 2000  80488  174504898
5       China 1999 212258 1272915272
6       China 2000 213766 1280428583
```

`sep` は指定しなくてもデフォルトで記号や空白を認識してくれる。

🔰 変形前と変形後を手元のRで確認してみよう。

---
## `unite()` 列を融合

<figure>
<a href="https://r4ds.had.co.nz/tidy-data.html#unite">
<img src="/slides/image/cheatsheet/tidyr-unite.png" height="240" style="vertical-align: top;">
<span style="margin-inline: -2.85rem 0 ; line-height: 1.5; color: #ffffff; background-color: #808080; padding: 0.05rem; font-size: 0.9em; font-weight: bold;">YEAR</span>
<figcaption><small>https://r4ds.had.co.nz/tidy-data.html#unite</small></figcaption>
</a>
</figure>


``` r
table5 |> tidyr::unite(YEAR, century, year, sep = "") |>
  dplyr::mutate(YEAR = as.integer(YEAR))
```

```
      country YEAR              rate
1 Afghanistan 1999      745/19987071
2 Afghanistan 2000     2666/20595360
3      Brazil 1999   37737/172006362
4      Brazil 2000   80488/174504898
5       China 1999 212258/1272915272
6       China 2000 213766/1280428583
```

**結合直後は文字列**になっているので数値なら忘れずに変換。

🔰 変形前と変形後を手元のRで確認してみよう。

---
## `separate()` / `unite()` 練習問題

🔰 `table3` の `rate` を分割したあと、また元に戻してみよう。

🔰 `table3` の `year` を分割して `table5` を作ってみよう。


``` r
print(table3)
```

```
      country year              rate
1 Afghanistan 1999      745/19987071
2 Afghanistan 2000     2666/20595360
3      Brazil 1999   37737/172006362
4      Brazil 2000   80488/174504898
5       China 1999 212258/1272915272
6       China 2000 213766/1280428583
```

---
## `nest()` 入れ子にする

グループ毎にdata.frameを区切ってlist型の列に入れる。

<figure>
<a href="https://www.tidyverse.org/blog/2019/09/tidyr-1-0-0/">
<img src="/slides/image/rstats/nest-pack-chop.png" height="540">
<figcaption><small>https://www.tidyverse.org/blog/2019/09/tidyr-1-0-0/</small></figcaption>
</a>
</figure>

<div>
<a href="https://purrr.tidyverse.org/">
<img src="/_img/hex-stickers/purrr.webp" width="180" style="vertical-align: middle;">
purrrパッケージ</a>と共に扱えるようになると強力 (今回は紹介だけ)
</div>

---
## `nest()` 入れ子にする

グループ毎にdata.frameを区切ってlist型の列に入れる。


``` r
mpg_nested = mpg |> tidyr::nest(data = !drv) |> print()
```

```
  drv                data
1   f <tbl_df [106 x 10]>
2   4 <tbl_df [103 x 10]>
3   r  <tbl_df [25 x 10]>
```

``` r
mpg_nested$data[[1]]
```

```
    manufacturer  model displ year cyl      trans cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)  21  29  p compact
  3         audi     a4   2.0 2008   4 manual(m6)  20  31  p compact
  4         audi     a4   2.0 2008   4   auto(av)  21  30  p compact
 --                                                                 
103   volkswagen passat   2.0 2008   4 manual(m6)  21  29  p midsize
104   volkswagen passat   2.8 1999   6   auto(l5)  16  26  p midsize
105   volkswagen passat   2.8 1999   6 manual(m5)  18  26  p midsize
106   volkswagen passat   3.6 2008   6   auto(s6)  17  26  p midsize
```


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

- **データ構造を対象とする処理** 👈 第3, 4回 本日の話題
    - 使いたい部分だけ抽出 --- `select()`, `filter()`
    - グループごとに特徴を要約 --- `group_by()`, `summarize()`
    - 何かの順に並べ替え --- `arrange()`, `relocate()`
    - 異なるテーブルの結合 --- `*_join()`
    - 変形: 縦長 ↔ 横広 --- `pivot_longer()`, `pivot_wider()`
- データ内容を対象とする処理 — 第5回
    - 数値の変換: 対数、正規化
    - 外れ値・欠損値への対処
    - 型変換: 連続変数、カテゴリカル変数、指示変数、因子、日時
    - 文字列処理: 正規表現によるパターンマッチ

<small style="display: block; text-align: right;"><a href="https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b">
本橋智光「前処理大全」
</a></small>


---
## 憶えなくていい。公式サイトなどを見ながら作業

<figure>
<a href="https://dplyr.tidyverse.org/">
<img src="/slides/image/rstats/dplyr-website.png" width="80%">
<figcaption><small>https://dplyr.tidyverse.org/</small></figcaption>
</a>
</figure>



---
## 🔰 課題1: `economics` を変形して作図しよう

```r
print(economics)
```


```
          date     pce      pop psavert uempmed unemploy
  1 1967-07-01   506.7 198712.0    12.6     4.5     2944
  2 1967-08-01   509.8 198911.0    12.6     4.7     2945
 --                                                     
573 2015-03-01 12158.3 320230.8     7.4    12.0     8504
574 2015-04-01 12193.8 320402.3     7.6    11.5     8526
```

![plot of chunk economics-longer](./figure/economics-longer-1.png)

---
## 少し前に出てきたこれ、そろそろできるのでは


``` r
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
<img src="figure/vadeaths-plot-1.png" alt="plot of chunk vadeaths-plot" width="540" style="float: right; margin-block-start: 3em;">


```
   lbound ubound region    sex death
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
## 🔰 課題2: `VADeaths` を縦長にしてggplotしてみよう


``` r
VADeaths |> as.data.frame() |>       # dplyr/tidyrで扱うのはdata.frame
  tibble::rownames_to_column("age")  # 行名は扱いにくいので普通の列に
```

```
    age Rural Male Rural Female Urban Male Urban Female
1 50-54       11.7          8.7       15.4          8.4
2 55-59       18.1         11.7       24.3         13.6
3 60-64       26.9         20.3       37.0         19.3
4 65-69       41.0         30.9       54.6         35.1
5 70-74       66.0         54.3       71.1         50.0
```

<div class="column-container">
  <div class="column" style="flex-shrink: 0.8; min-width: 0;">


``` r
class(VADeaths)
```

```
[1] "matrix" "array" 
```

``` r
rownames(VADeaths)
```

```
[1] "50-54" "55-59" "60-64" "65-69" "70-74"
```

  </div>
  <div class="column">

![plot of chunk vadeaths-plot](./figure/vadeaths-plot-1.png)

  </div>
</div>

---
## 🔰 課題3: `anscombe` を縦長にしてggplotしてみよう

```r
anscombe |> tibble::rowid_to_column("id")   # IDをつけておく
```

```
   id x1 x2 x3 x4    y1   y2    y3   y4
 1  1 10 10 10  8  8.04 9.14  7.46 6.58
 2  2  8  8  8  8  6.95 8.14  6.77 5.76
 3  3 13 13 13  8  7.58 8.74 12.74 7.71
--                                     
 9  9 12 12 12  8 10.84 9.13  8.15 5.56
10 10  7  7  7  8  4.82 7.26  6.42 7.91
11 11  5  5  5  8  5.68 4.74  5.73 6.89
```

![plot of chunk anscombe-plot](./figure/anscombe-plot-1.png)

---
## 🔰 課題4: `anscombe` の要約統計量を計算しよう

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```
  group mean_x   mean_y     sd_x     sd_y    cor_xy
1     1      9 7.500909 3.316625 2.031568 0.8164205
2     2      9 7.500909 3.316625 2.031657 0.8162365
3     3      9 7.500000 3.316625 2.030424 0.8162867
4     4      9 7.500909 3.316625 2.030579 0.8165214
```

表示桁数とかは気にしなくていいです。


---
## 今日の残り時間

- 班やTAに相談し、消化しきれなかった部分をなるべく解消する。
- 4つの課題を協力/手分けして解く。
- TAが評価して合格した班から解散。
- 残ってほかの課題に取り組んでもOK。
- 遅くとも17:50には部屋を閉めたい。TAの給料は17:00まで。


---
## Reference

R for Data Science --- Hadley Wickham et al.
: <https://r4ds.hadley.nz>,
  [Paperback](https://amzn.to/4cpL6w8),
  [日本語版書籍](https://amzn.to/2yyFRKt)

[前処理大全 --- 本橋智光](https://www.amazon.co.jp/dp/4774196479/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=heavywatal-22&linkId=8a3fd4e9a0c944b1b41242bbab8d147b)\
[RユーザのためのRStudio[実践]入門 (宇宙船本) --- 松村ら](https://amzn.to/2Yy5LND)

整然データとは何か --- [@f_nisihara](https://twitter.com/f_nisihara)
: [Speaker Deck](https://speakerdeck.com/fnshr/zheng-ran-detatutenani),
  [Colorless Green Ideas](https://id.fnshr.info/2017/01/09/tidy-data-intro/)

Other versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2025/)」
   石川由希 名古屋大学
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2024/)」
   岩嵜航 2024 東京医科歯科大

<a href="5-content.html" class="readmore">
5. データ内容の処理: 数値、文字列など。
</a>
