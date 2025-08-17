+++
title = "ESJ65-W07 それもRにやらせよう — 整然データの下ごしらえ"
date = 2018-03-14T10:00:00+09:00
type = "reveal"
draft = false
+++



# それもRにやらせよう --- 整然データの下ごしらえ

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
総研大<br>
(SOKENDAI, The Graduate University for Advanced Studies)
</div>

<div class="footnote">
2018-03-14
<a href="http://www.esj.ne.jp/meeting/65/">
生態学会65＠札幌
</a><br>
<a href="http://hosho.ees.hokudai.ac.jp/~kubo/ce/EcoSj2018.html">
[W07] データ解析で出会う統計的問題: R の新しい作図・作表
</a>
</div>

---
## 下ごしらえを自動化してハッピーに

> Happy families are all alike;<br>
> every unhappy family is unhappy in its own way<br>
> --- Leo Tolstoy "Anna Karenina"

> tidy datasets are all alike,<br>
> but every messy dataset is messy in its own way<br>
> --- Hadley Wickham

出発点となるデータはさまざま
: 実験ノート、フィールドノート、
: データベース、シミュレーション。。。

解析や作図に使えるデータ形式はほぼ決まってる
: `glm(..., data, ...)`,
  `ggplot(data, ...)`, ...


---
## 整然データ tidy data

- 1行は1つの観測
- 1列は1つの変数
- 1セルは1つの値
- (ggplotしたくなる形)


```r
mtcars
```

```
                     mpg cyl  disp  hp drat    wt  qsec vs am gear carb
Mazda RX4           21.0   6 160.0 110 3.90 2.620 16.46  0  1    4    4
Mazda RX4 Wag       21.0   6 160.0 110 3.90 2.875 17.02  0  1    4    4
Datsun 710          22.8   4 108.0  93 3.85 2.320 18.61  1  1    4    1
Hornet 4 Drive      21.4   6 258.0 110 3.08 3.215 19.44  1  0    3    1
Hornet Sportabout   18.7   8 360.0 175 3.15 3.440 17.02  0  0    3    2
Valiant             18.1   6 225.0 105 2.76 3.460 20.22  1  0    3    1
Duster 360          14.3   8 360.0 245 3.21 3.570 15.84  0  0    3    4
Merc 240D           24.4   4 146.7  62 3.69 3.190 20.00  1  0    4    2
Merc 230            22.8   4 140.8  95 3.92 3.150 22.90  1  0    4    2
Merc 280            19.2   6 167.6 123 3.92 3.440 18.30  1  0    4    4
Merc 280C           17.8   6 167.6 123 3.92 3.440 18.90  1  0    4    4
Merc 450SE          16.4   8 275.8 180 3.07 4.070 17.40  0  0    3    3
Merc 450SL          17.3   8 275.8 180 3.07 3.730 17.60  0  0    3    3
Merc 450SLC         15.2   8 275.8 180 3.07 3.780 18.00  0  0    3    3
Cadillac Fleetwood  10.4   8 472.0 205 2.93 5.250 17.98  0  0    3    4
Lincoln Continental 10.4   8 460.0 215 3.00 5.424 17.82  0  0    3    4
Chrysler Imperial   14.7   8 440.0 230 3.23 5.345 17.42  0  0    3    4
Fiat 128            32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
Honda Civic         30.4   4  75.7  52 4.93 1.615 18.52  1  1    4    2
Toyota Corolla      33.9   4  71.1  65 4.22 1.835 19.90  1  1    4    1
Toyota Corona       21.5   4 120.1  97 3.70 2.465 20.01  1  0    3    1
Dodge Challenger    15.5   8 318.0 150 2.76 3.520 16.87  0  0    3    2
AMC Javelin         15.2   8 304.0 150 3.15 3.435 17.30  0  0    3    2
Camaro Z28          13.3   8 350.0 245 3.73 3.840 15.41  0  0    3    4
Pontiac Firebird    19.2   8 400.0 175 3.08 3.845 17.05  0  0    3    2
Fiat X1-9           27.3   4  79.0  66 4.08 1.935 18.90  1  1    4    1
Porsche 914-2       26.0   4 120.3  91 4.43 2.140 16.70  0  1    5    2
Lotus Europa        30.4   4  95.1 113 3.77 1.513 16.90  1  1    5    2
Ford Pantera L      15.8   8 351.0 264 4.22 3.170 14.50  0  1    5    4
Ferrari Dino        19.7   6 145.0 175 3.62 2.770 15.50  0  1    5    6
Maserati Bora       15.0   8 301.0 335 3.54 3.570 14.60  0  1    5    8
Volvo 142E          21.4   4 121.0 109 4.11 2.780 18.60  1  1    4    2
```

参考:<br>
<http://r4ds.had.co.nz/tidy-data.html><br>
<https://speakerdeck.com/fnshr/zheng-ran-detatutenani><br>

---
## 雑然データ messy data

- 1つの観測が縦横バラバラに散らばっている
- 1つの変数が複数列にまたがっている
- 1つのセルに複数の意味や値が含まれている
- セルの結合？もってのほか！
- (データを採るときに楽な形。これは仕方ない)


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

↓下ごしらえ


```
   lbound ubound region    sex death_rate
1      50     54  Rural   Male       11.7
2      55     59  Rural   Male       18.1
3      60     64  Rural   Male       26.9
4      65     69  Rural   Male       41.0
5      70     74  Rural   Male       66.0
6      50     54  Rural Female        8.7
7      55     59  Rural Female       11.7
8      60     64  Rural Female       20.3
9      65     69  Rural Female       30.9
10     70     74  Rural Female       54.3
11     50     54  Urban   Male       15.4
12     55     59  Urban   Male       24.3
13     60     64  Urban   Male       37.0
14     65     69  Urban   Male       54.6
15     70     74  Urban   Male       71.1
16     50     54  Urban Female        8.4
17     55     59  Urban Female       13.6
18     60     64  Urban Female       19.3
19     65     69  Urban Female       35.1
20     70     74  Urban Female       50.0
```


---
## ゑくせる手作業 ＝ シーシュポスの岩

<img src="/slides/image/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="280" style="float: right;">

- 膨大な単純作業がそもそもツラい
- 人間だもの、ミスは防ぎきれない
- なるべく防ぐためのチェックもツラい
- ミスを発見 → 初めからやり直し
- 新たなデータ・研究 → 初めからやり直し
- どんなに経験を積んでも良くならない

<br>
規則性のある退屈な仕事は人間よりも機械のほうが得意。<br>
一度書いたプログラムは、データが変わっても使える財産。<br>

**Reproducible Research, 再現性のためにも R にやらせよう**


---
## 今回の目標

### いまのRってこんなことができるんだな

### やりたくなったらこのへんを調べればいいんだな

<br>
この2点さえ押さえれば、具体的なやり方は覚えなくても大丈夫


---
## tidyverse

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges.png" width="260" style="float: right;">
</a>

Rでデータを上手に扱うためのパッケージ群

- 統一的な使い勝手
- 暗黙の処理をなるべくしない
- 意味のわかるエラーメッセージ
- **シンプルな関数を繋げて使うデザイン**


```r
install.packages("tidyverse")
library(tidyverse)
# 関連ライブラリが一挙に読み込まれる
```

Q. 素のRも覚えきってないのにいきなりパッケージ？<br>
A. 大丈夫。誰も覚えきってない。


---
## よく見かけるサンプルデータ `iris`

Rに最初から入ってるdata.frame。<br>
3種のアヤメ150個体に関する4個の計測値。

うっかり実行すると、


```r
iris
```

---
## よく見かけるサンプルデータ `iris`

Rに最初から入ってるdata.frame。<br>
3種のアヤメ150個体に関する4個の計測値。

うっかり実行すると、ながーい！


```r
iris
```

```
    Sepal.Length Sepal.Width Petal.Length Petal.Width    Species
1            5.1         3.5          1.4         0.2     setosa
2            4.9         3.0          1.4         0.2     setosa
3            4.7         3.2          1.3         0.2     setosa
4            4.6         3.1          1.5         0.2     setosa
5            5.0         3.6          1.4         0.2     setosa
6            5.4         3.9          1.7         0.4     setosa
7            4.6         3.4          1.4         0.3     setosa
8            5.0         3.4          1.5         0.2     setosa
9            4.4         2.9          1.4         0.2     setosa
10           4.9         3.1          1.5         0.1     setosa
11           5.4         3.7          1.5         0.2     setosa
12           4.8         3.4          1.6         0.2     setosa
13           4.8         3.0          1.4         0.1     setosa
14           4.3         3.0          1.1         0.1     setosa
15           5.8         4.0          1.2         0.2     setosa
16           5.7         4.4          1.5         0.4     setosa
17           5.4         3.9          1.3         0.4     setosa
18           5.1         3.5          1.4         0.3     setosa
19           5.7         3.8          1.7         0.3     setosa
20           5.1         3.8          1.5         0.3     setosa
21           5.4         3.4          1.7         0.2     setosa
22           5.1         3.7          1.5         0.4     setosa
23           4.6         3.6          1.0         0.2     setosa
24           5.1         3.3          1.7         0.5     setosa
25           4.8         3.4          1.9         0.2     setosa
26           5.0         3.0          1.6         0.2     setosa
27           5.0         3.4          1.6         0.4     setosa
28           5.2         3.5          1.5         0.2     setosa
29           5.2         3.4          1.4         0.2     setosa
30           4.7         3.2          1.6         0.2     setosa
31           4.8         3.1          1.6         0.2     setosa
32           5.4         3.4          1.5         0.4     setosa
33           5.2         4.1          1.5         0.1     setosa
34           5.5         4.2          1.4         0.2     setosa
35           4.9         3.1          1.5         0.2     setosa
36           5.0         3.2          1.2         0.2     setosa
37           5.5         3.5          1.3         0.2     setosa
38           4.9         3.6          1.4         0.1     setosa
39           4.4         3.0          1.3         0.2     setosa
40           5.1         3.4          1.5         0.2     setosa
41           5.0         3.5          1.3         0.3     setosa
42           4.5         2.3          1.3         0.3     setosa
43           4.4         3.2          1.3         0.2     setosa
44           5.0         3.5          1.6         0.6     setosa
45           5.1         3.8          1.9         0.4     setosa
46           4.8         3.0          1.4         0.3     setosa
47           5.1         3.8          1.6         0.2     setosa
48           4.6         3.2          1.4         0.2     setosa
49           5.3         3.7          1.5         0.2     setosa
50           5.0         3.3          1.4         0.2     setosa
51           7.0         3.2          4.7         1.4 versicolor
52           6.4         3.2          4.5         1.5 versicolor
53           6.9         3.1          4.9         1.5 versicolor
54           5.5         2.3          4.0         1.3 versicolor
55           6.5         2.8          4.6         1.5 versicolor
56           5.7         2.8          4.5         1.3 versicolor
57           6.3         3.3          4.7         1.6 versicolor
58           4.9         2.4          3.3         1.0 versicolor
59           6.6         2.9          4.6         1.3 versicolor
60           5.2         2.7          3.9         1.4 versicolor
61           5.0         2.0          3.5         1.0 versicolor
62           5.9         3.0          4.2         1.5 versicolor
63           6.0         2.2          4.0         1.0 versicolor
64           6.1         2.9          4.7         1.4 versicolor
65           5.6         2.9          3.6         1.3 versicolor
66           6.7         3.1          4.4         1.4 versicolor
67           5.6         3.0          4.5         1.5 versicolor
68           5.8         2.7          4.1         1.0 versicolor
69           6.2         2.2          4.5         1.5 versicolor
70           5.6         2.5          3.9         1.1 versicolor
71           5.9         3.2          4.8         1.8 versicolor
72           6.1         2.8          4.0         1.3 versicolor
73           6.3         2.5          4.9         1.5 versicolor
74           6.1         2.8          4.7         1.2 versicolor
75           6.4         2.9          4.3         1.3 versicolor
76           6.6         3.0          4.4         1.4 versicolor
77           6.8         2.8          4.8         1.4 versicolor
78           6.7         3.0          5.0         1.7 versicolor
79           6.0         2.9          4.5         1.5 versicolor
80           5.7         2.6          3.5         1.0 versicolor
81           5.5         2.4          3.8         1.1 versicolor
82           5.5         2.4          3.7         1.0 versicolor
83           5.8         2.7          3.9         1.2 versicolor
84           6.0         2.7          5.1         1.6 versicolor
85           5.4         3.0          4.5         1.5 versicolor
86           6.0         3.4          4.5         1.6 versicolor
87           6.7         3.1          4.7         1.5 versicolor
88           6.3         2.3          4.4         1.3 versicolor
89           5.6         3.0          4.1         1.3 versicolor
90           5.5         2.5          4.0         1.3 versicolor
91           5.5         2.6          4.4         1.2 versicolor
92           6.1         3.0          4.6         1.4 versicolor
93           5.8         2.6          4.0         1.2 versicolor
94           5.0         2.3          3.3         1.0 versicolor
95           5.6         2.7          4.2         1.3 versicolor
96           5.7         3.0          4.2         1.2 versicolor
97           5.7         2.9          4.2         1.3 versicolor
98           6.2         2.9          4.3         1.3 versicolor
99           5.1         2.5          3.0         1.1 versicolor
100          5.7         2.8          4.1         1.3 versicolor
101          6.3         3.3          6.0         2.5  virginica
102          5.8         2.7          5.1         1.9  virginica
103          7.1         3.0          5.9         2.1  virginica
104          6.3         2.9          5.6         1.8  virginica
105          6.5         3.0          5.8         2.2  virginica
106          7.6         3.0          6.6         2.1  virginica
107          4.9         2.5          4.5         1.7  virginica
108          7.3         2.9          6.3         1.8  virginica
109          6.7         2.5          5.8         1.8  virginica
110          7.2         3.6          6.1         2.5  virginica
111          6.5         3.2          5.1         2.0  virginica
112          6.4         2.7          5.3         1.9  virginica
113          6.8         3.0          5.5         2.1  virginica
114          5.7         2.5          5.0         2.0  virginica
115          5.8         2.8          5.1         2.4  virginica
116          6.4         3.2          5.3         2.3  virginica
117          6.5         3.0          5.5         1.8  virginica
118          7.7         3.8          6.7         2.2  virginica
119          7.7         2.6          6.9         2.3  virginica
120          6.0         2.2          5.0         1.5  virginica
121          6.9         3.2          5.7         2.3  virginica
122          5.6         2.8          4.9         2.0  virginica
123          7.7         2.8          6.7         2.0  virginica
124          6.3         2.7          4.9         1.8  virginica
125          6.7         3.3          5.7         2.1  virginica
126          7.2         3.2          6.0         1.8  virginica
127          6.2         2.8          4.8         1.8  virginica
128          6.1         3.0          4.9         1.8  virginica
129          6.4         2.8          5.6         2.1  virginica
130          7.2         3.0          5.8         1.6  virginica
131          7.4         2.8          6.1         1.9  virginica
132          7.9         3.8          6.4         2.0  virginica
133          6.4         2.8          5.6         2.2  virginica
134          6.3         2.8          5.1         1.5  virginica
135          6.1         2.6          5.6         1.4  virginica
136          7.7         3.0          6.1         2.3  virginica
137          6.3         3.4          5.6         2.4  virginica
138          6.4         3.1          5.5         1.8  virginica
139          6.0         3.0          4.8         1.8  virginica
140          6.9         3.1          5.4         2.1  virginica
141          6.7         3.1          5.6         2.4  virginica
142          6.9         3.1          5.1         2.3  virginica
143          5.8         2.7          5.1         1.9  virginica
144          6.8         3.2          5.9         2.3  virginica
145          6.7         3.3          5.7         2.5  virginica
146          6.7         3.0          5.2         2.3  virginica
147          6.3         2.5          5.0         1.9  virginica
148          6.5         3.0          5.2         2.0  virginica
149          6.2         3.4          5.4         2.3  virginica
150          5.9         3.0          5.1         1.8  virginica
```

---
## tibble --- data.frameの改良版

<a href="https://tibble.tidyverse.org/">
<img src="/_img/hex-stickers/tibble.webp" width="120" style="float: right;">
</a>

- **巨大データをうっかり表示しても画面を埋め尽くさない**
- 列の名前や型を勝手に変更しない
- 一応説明したけど、この先は区別せずdata.frameと呼ぶ


```r
as_tibble(iris)
```

```
# A tibble: 150 x 5
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
         <dbl>       <dbl>        <dbl>       <dbl> <fct>  
1          5.1         3.5          1.4         0.2 setosa 
2          4.9         3            1.4         0.2 setosa 
3          4.7         3.2          1.3         0.2 setosa 
4          4.6         3.1          1.5         0.2 setosa 
5          5           3.6          1.4         0.2 setosa 
6          5.4         3.9          1.7         0.4 setosa 
7          4.6         3.4          1.4         0.3 setosa 
8          5           3.4          1.5         0.2 setosa 
# ... with 142 more rows
```

---
## tibble --- data.frameの改良版

<a href="https://tibble.tidyverse.org/">
<img src="/_img/hex-stickers/tibble.webp" width="120" style="float: right;">
</a>

- 巨大データをうっかり表示しても画面を埋め尽くさない
- **列の名前や型を勝手に変更しない**
- 一応説明したけど、この先は区別せずdata.frameと呼ぶ


```r
df = data.frame("x-1" = c("b", "e", "e", "r"))
df[["x.1"]]   # 名前が違う！中身も勝手にfactor型に！
```

```
[1] b e e r
Levels: b e r
```

```r
tbl = tibble("x-1" = c("b", "e", "e", "r"))
tbl[["x-1"]]  # 当然character型のまま
```

```
[1] "b" "e" "e" "r"
```

---
## readr --- data.frameの読み書き担当

<a href="https://readr.tidyverse.org/">
<img src="/_img/hex-stickers/readr.webp" width="120" style="float: right;">
</a>

- 生data.frameではなく安全なtibbleとして読んでくれる
- 列の名前や型を勝手に変更しない
- オプションをごちゃごちゃ付けなくてもいい感じに動く<br>
  (R標準の `read.table()` とかは意外と難しい)


```r
readr::write_tsv(iris, "iris.tsv")
readr::read_tsv("iris.tsv")
```

```
# A tibble: 150 x 5
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
         <dbl>       <dbl>        <dbl>       <dbl> <chr>  
1          5.1         3.5          1.4         0.2 setosa 
2          4.9         3            1.4         0.2 setosa 
3          4.7         3.2          1.3         0.2 setosa 
4          4.6         3.1          1.5         0.2 setosa 
5          5           3.6          1.4         0.2 setosa 
6          5.4         3.9          1.7         0.4 setosa 
7          4.6         3.4          1.4         0.3 setosa 
8          5           3.4          1.5         0.2 setosa 
# ... with 142 more rows
```



---
## dplyr --- data.frameの高速処理担当

<a href="https://dplyr.tidyverse.org/">
<img src="/_img/hex-stickers/dplyr.webp" width="120" style="float: right;">
</a>

ひとつの関数はひとつの仕事。<br>
繋げて使いやすいシンプルな関数がたくさん。

抽出
: `filter()`, `select()`, `distinct()`, `sample_n()`

変更・追加
: `mutate()`, `rename()`

要約・集計
: `group_by()`, `summarise()`, `count()`

ソート
: `arrange()`

結合
: `left_join()`, `inner_join()`, `full_join()`

*etc.*

---
## dplyr --- data.frameの高速処理担当

いつもdata.frameが第一引数。

```r
dplyr::filter(iris, Sepal.Length < 4.6)   # 条件にあう行を抽出
```

```
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          4.4         2.9          1.4         0.2  setosa
2          4.3         3.0          1.1         0.1  setosa
3          4.4         3.0          1.3         0.2  setosa
4          4.5         2.3          1.3         0.3  setosa
5          4.4         3.2          1.3         0.2  setosa
```

```r
dplyr::sample_n(iris, 3L)                 # ランダムに3行抽出
```

```
    Sepal.Length Sepal.Width Petal.Length Petal.Width    Species
60           5.2         2.7          3.9         1.4 versicolor
14           4.3         3.0          1.1         0.1     setosa
107          4.9         2.5          4.5         1.7  virginica
```

---
## dplyr --- data.frameの高速処理担当

小さな関数を繋げて使う。

```r
result = iris %>%
  dplyr::arrange(Petal.Width) %>%          # 小さい順に並べ替え
  dplyr::filter(Species != "setosa") %>%   # 行を除外
  dplyr::select(-matches("^Petal")) %>%    # 列を除外
  dplyr::group_by(Species) %>%             # グループごとに
  dplyr::summarise_all(mean) %>%           # 平均を計算
  dplyr::mutate(area = Sepal.Length * Sepal.Width / 2) %>%
                                           # 新しい列を作る
  print()                                  # 表示してみる
```

```
      Species Sepal.Length Sepal.Width     area
       <fctr>        <num>       <num>    <num>
1: versicolor        5.936       2.770 8.221360
2:  virginica        6.588       2.974 9.796356
```

見慣れないこの記号 `%>%` は何？

---
## パイプ演算子 `%>%`

パイプの左側の変数を、右側の関数の第一引数にねじ込む:

```r
1 %>% sum(2, 3)
```

```
[1] 6
```

```r
sum(1, 2, 3)
```

```
[1] 6
```

下ごしらえの流れ作業に便利:

```r
# data %>%  process-A  %>%  process-B  %>%  process-C
1      %>%  sum(2, 3)  %>%  factorial()
```

```
[1] 720
```

---
## パイプ演算子 `%>%` を使わない

一時変数を使う方法:

```r
tmp1 = dplyr::filter(iris, Species != "setosa") # 行を除外
tmp2 = dplyr::select(tmp1, -matches("^Petal"))  # 列を除外
tmp3 = dplyr::group_by(tmp2, Species)           # グループごとに
result = dplyr::summarise_all(tmp3, mean)       # 平均を計算
```

もしくは全部同じ名前で:

```r
result = dplyr::filter(iris, Species != "setosa")  # 行を除外
result = dplyr::select(result, -matches("^Petal")) # 列を除外
result = dplyr::group_by(result, Species)          # グループごとに
result = dplyr::summarise_all(result, mean)        # 平均を計算
```

どちらも悪くない。
何度も変数名を入力するのがやや冗長。


---
## パイプ演算子 `%>%` を使わない

一時変数を使わない力技:

```r
result = dplyr::summarise_all(            # 平均を計算
  dplyr::group_by(                          # グループごとに
    dplyr::select(                            # 列を除外
      dplyr::filter(iris, Species != "setosa"), # 行を除外
      -matches("^Petal")),                    # 列を除外
    Species),                               # グループごとに
  mean)                                   # 平均を計算
```

改行さえしない超人技:

```r
result = dplyr::summarise_all(dplyr::group_by(dplyr::select(dplyr::filter(iris, Species != "setosa"), -matches("^Petal")), Species), mean)
```

論理の流れとプログラムの流れが合わず、目が行ったり来たり。<br>
さっきのほうがぜんぜんマシ。

---
## パイプ演算子 `%>%` を使う

慣れれば、論理の流れを追いやすい:

```r
library(tidyverse)
result = iris %>%
  dplyr::filter(Species != "setosa") %>%   # 行を除外
  dplyr::select(-matches("^Petal")) %>%    # 列を除外
  dplyr::group_by(Species) %>%             # グループごとに
  dplyr::summarise_all(mean) %>%           # 平均を計算
  print()                                  # 表示してみる
```

```
      Species Sepal.Length Sepal.Width
       <fctr>        <num>       <num>
1: versicolor        5.936       2.770
2:  virginica        6.588       2.974
```

慣れるまではちょっと大変かも。無理して使わなくても大丈夫。


---
## tidyr --- data.frameの変形・整形担当

<a href="https://tidyr.tidyverse.org/">
<img src="/_img/hex-stickers/tidyr.webp" width="120" style="float: right;">
</a>

横長から縦長に
: `gather()`

縦長から横長に
: `spread()`

入れ子構造をつくる、解消する
: `nest()`, `unnest()`

1列を複数の列に分離
: `separate()`

*etc.*


---
## `tidyr::gather()` 横長から縦長に

複数列にまたがる値を1列にする(ここでは`value`)。<br>
そのラベルも合わせて移動(ここでは`name`)。


```r
long_iris = iris %>% head(2L) %>%              # 最初の2行だけ
  rownames_to_column("id") %>%                 # ID列を追加
  print() %>%                                  # 途中経過を表示
  tidyr::gather(name, value, -id, -Species) %>%   # 縦長に変形
  print()
```

```
  id Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1  1          5.1         3.5          1.4         0.2  setosa
2  2          4.9         3.0          1.4         0.2  setosa
  id Species         name value
1  1  setosa Sepal.Length   5.1
2  2  setosa Sepal.Length   4.9
3  1  setosa  Sepal.Width   3.5
4  2  setosa  Sepal.Width   3.0
5  1  setosa Petal.Length   1.4
6  2  setosa Petal.Length   1.4
7  1  setosa  Petal.Width   0.2
8  2  setosa  Petal.Width   0.2
```

---
## `tidyr::spread()` 縦長から横長に

1列に収まっていた値(`value`)を複数列の行列に変換。<br>
そのラベル(`name`)を列の名前にする。


```r
long_iris %>% print() %>%      # gatherしたやつ
  tidyr::spread(name, value)   # 横長に戻す
```

```
  id Species         name value
1  1  setosa Sepal.Length   5.1
2  2  setosa Sepal.Length   4.9
3  1  setosa  Sepal.Width   3.5
4  2  setosa  Sepal.Width   3.0
5  1  setosa Petal.Length   1.4
6  2  setosa Petal.Length   1.4
7  1  setosa  Petal.Width   0.2
8  2  setosa  Petal.Width   0.2
```

```
  id Species Petal.Length Petal.Width Sepal.Length Sepal.Width
1  1  setosa          1.4         0.2          5.1         3.5
2  2  setosa          1.4         0.2          4.9         3.0
```

---
## `tidyr::separate()` 列を分離


```r
long_iris %>% print() %>%                     # gatherしたやつ
  tidyr::separate(name, c("part", "measure")) # 列を分離
```

```
  id Species         name value
1  1  setosa Sepal.Length   5.1
2  2  setosa Sepal.Length   4.9
3  1  setosa  Sepal.Width   3.5
4  2  setosa  Sepal.Width   3.0
5  1  setosa Petal.Length   1.4
6  2  setosa Petal.Length   1.4
7  1  setosa  Petal.Width   0.2
8  2  setosa  Petal.Width   0.2
```

```
  id Species  part measure value
1  1  setosa Sepal  Length   5.1
2  2  setosa Sepal  Length   4.9
3  1  setosa Sepal   Width   3.5
4  2  setosa Sepal   Width   3.0
5  1  setosa Petal  Length   1.4
6  2  setosa Petal  Length   1.4
7  1  setosa Petal   Width   0.2
8  2  setosa Petal   Width   0.2
```

---
## `tidyr::nest()` 入れ子にする

グループ毎にdata.frameを区切ってlist型の列に入れる。


```r
nested_iris = as_tibble(iris) %>%
  tidyr::nest(-Species) %>% print()
```

```
      Species     data
       <fctr>   <list>
1:     setosa <tbl_df>
2: versicolor <tbl_df>
3:  virginica <tbl_df>
```

```r
nested_iris$data[[1L]]
```

```
# A tibble: 50 x 4
  Sepal.Length Sepal.Width Petal.Length Petal.Width
         <dbl>       <dbl>        <dbl>       <dbl>
1          5.1         3.5          1.4         0.2
2          4.9         3            1.4         0.2
3          4.7         3.2          1.3         0.2
4          4.6         3.1          1.5         0.2
5          5           3.6          1.4         0.2
6          5.4         3.9          1.7         0.4
7          4.6         3.4          1.4         0.3
8          5           3.4          1.5         0.2
# ... with 42 more rows
```

入れ子にされたlistの列どうする？
`purrr::map()`の出番！

---
## purrr

<a href="https://purrr.tidyverse.org/">
<img src="/_img/hex-stickers/purrr.webp" width="120" style="float: right;">
</a>

listやループの処理担当。

- `map()`, `walk()`
- `map_int()`, `map_dbl()`, `map_chr()`
- `map_dfr()`
- `pmap()`, `map2()`
- `flatten()`
- *etc.*

標準Rの `lapply()`, `sapply()`, `vapply()`, `unlist()` などの代わりに


---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  tibble::rownames_to_column("id")       # あとで必要なID列
  # xやyの値が何列にも広がってる。これを1列に(縦長に)したい
```

```
   id x1 x2 x3 x4    y1   y2    y3    y4
1   1 10 10 10  8  8.04 9.14  7.46  6.58
2   2  8  8  8  8  6.95 8.14  6.77  5.76
3   3 13 13 13  8  7.58 8.74 12.74  7.71
4   4  9  9  9  8  8.81 8.77  7.11  8.84
5   5 11 11 11  8  8.33 9.26  7.81  8.47
6   6 14 14 14  8  9.96 8.10  8.84  7.04
7   7  6  6  6  8  7.24 6.13  6.08  5.25
8   8  4  4  4 19  4.26 3.10  5.39 12.50
9   9 12 12 12  8 10.84 9.13  8.15  5.56
10 10  7  7  7  8  4.82 7.26  6.42  7.91
11 11  5  5  5  8  5.68 4.74  5.73  6.89
```

---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  tibble::rownames_to_column("id") %>%   # あとで必要なID列
  tidyr::gather(key, value, -id)         # 縦長に変形
  # key列の x1 とかを x, 1 の2列に分離したい
```

```
   id key value
1   1  x1 10.00
2   2  x1  8.00
3   3  x1 13.00
4   4  x1  9.00
5   5  x1 11.00
6   6  x1 14.00
7   7  x1  6.00
8   8  x1  4.00
9   9  x1 12.00
10 10  x1  7.00
11 11  x1  5.00
12  1  x2 10.00
13  2  x2  8.00
14  3  x2 13.00
15  4  x2  9.00
16  5  x2 11.00
17  6  x2 14.00
18  7  x2  6.00
19  8  x2  4.00
20  9  x2 12.00
21 10  x2  7.00
22 11  x2  5.00
23  1  x3 10.00
24  2  x3  8.00
25  3  x3 13.00
26  4  x3  9.00
27  5  x3 11.00
28  6  x3 14.00
29  7  x3  6.00
30  8  x3  4.00
31  9  x3 12.00
32 10  x3  7.00
33 11  x3  5.00
34  1  x4  8.00
35  2  x4  8.00
36  3  x4  8.00
37  4  x4  8.00
38  5  x4  8.00
39  6  x4  8.00
40  7  x4  8.00
41  8  x4 19.00
42  9  x4  8.00
43 10  x4  8.00
44 11  x4  8.00
45  1  y1  8.04
46  2  y1  6.95
47  3  y1  7.58
48  4  y1  8.81
49  5  y1  8.33
50  6  y1  9.96
51  7  y1  7.24
52  8  y1  4.26
53  9  y1 10.84
54 10  y1  4.82
55 11  y1  5.68
56  1  y2  9.14
57  2  y2  8.14
58  3  y2  8.74
59  4  y2  8.77
60  5  y2  9.26
61  6  y2  8.10
62  7  y2  6.13
63  8  y2  3.10
64  9  y2  9.13
65 10  y2  7.26
66 11  y2  4.74
67  1  y3  7.46
68  2  y3  6.77
69  3  y3 12.74
70  4  y3  7.11
71  5  y3  7.81
72  6  y3  8.84
73  7  y3  6.08
74  8  y3  5.39
75  9  y3  8.15
76 10  y3  6.42
77 11  y3  5.73
78  1  y4  6.58
79  2  y4  5.76
80  3  y4  7.71
81  4  y4  8.84
82  5  y4  8.47
83  6  y4  7.04
84  7  y4  5.25
85  8  y4 12.50
86  9  y4  5.56
87 10  y4  7.91
88 11  y4  6.89
```

---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  tibble::rownames_to_column("id") %>%   # あとで必要なID列
  tidyr::gather(key, value, -id) %>%     # 縦長に変形
  tidyr::separate(key, c("axis", "group"), 1L)      # 列を分離
  # xとyのペアが1行になってほしい
  # xとyが新たな列名になるように横長にしたい
```

```
   id axis group value
1   1    x     1 10.00
2   2    x     1  8.00
3   3    x     1 13.00
4   4    x     1  9.00
5   5    x     1 11.00
6   6    x     1 14.00
7   7    x     1  6.00
8   8    x     1  4.00
9   9    x     1 12.00
10 10    x     1  7.00
11 11    x     1  5.00
12  1    x     2 10.00
13  2    x     2  8.00
14  3    x     2 13.00
15  4    x     2  9.00
16  5    x     2 11.00
17  6    x     2 14.00
18  7    x     2  6.00
19  8    x     2  4.00
20  9    x     2 12.00
21 10    x     2  7.00
22 11    x     2  5.00
23  1    x     3 10.00
24  2    x     3  8.00
25  3    x     3 13.00
26  4    x     3  9.00
27  5    x     3 11.00
28  6    x     3 14.00
29  7    x     3  6.00
30  8    x     3  4.00
31  9    x     3 12.00
32 10    x     3  7.00
33 11    x     3  5.00
34  1    x     4  8.00
35  2    x     4  8.00
36  3    x     4  8.00
37  4    x     4  8.00
38  5    x     4  8.00
39  6    x     4  8.00
40  7    x     4  8.00
41  8    x     4 19.00
42  9    x     4  8.00
43 10    x     4  8.00
44 11    x     4  8.00
45  1    y     1  8.04
46  2    y     1  6.95
47  3    y     1  7.58
48  4    y     1  8.81
49  5    y     1  8.33
50  6    y     1  9.96
51  7    y     1  7.24
52  8    y     1  4.26
53  9    y     1 10.84
54 10    y     1  4.82
55 11    y     1  5.68
56  1    y     2  9.14
57  2    y     2  8.14
58  3    y     2  8.74
59  4    y     2  8.77
60  5    y     2  9.26
61  6    y     2  8.10
62  7    y     2  6.13
63  8    y     2  3.10
64  9    y     2  9.13
65 10    y     2  7.26
66 11    y     2  4.74
67  1    y     3  7.46
68  2    y     3  6.77
69  3    y     3 12.74
70  4    y     3  7.11
71  5    y     3  7.81
72  6    y     3  8.84
73  7    y     3  6.08
74  8    y     3  5.39
75  9    y     3  8.15
76 10    y     3  6.42
77 11    y     3  5.73
78  1    y     4  6.58
79  2    y     4  5.76
80  3    y     4  7.71
81  4    y     4  8.84
82  5    y     4  8.47
83  6    y     4  7.04
84  7    y     4  5.25
85  8    y     4 12.50
86  9    y     4  5.56
87 10    y     4  7.91
88 11    y     4  6.89
```

---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
anscombe %>%
  tibble::rownames_to_column("id") %>%   # あとで必要なID列
  tidyr::gather(key, value, -id) %>%     # 縦長に変形
  tidyr::separate(key, c("axis", "group"), 1L) %>%  # 列を分離
  tidyr::spread(axis, value)             # axis列をx列とy列に
```

```
   id group  x     y
1   1     1 10  8.04
2   1     2 10  9.14
3   1     3 10  7.46
4   1     4  8  6.58
5  10     1  7  4.82
6  10     2  7  7.26
7  10     3  7  6.42
8  10     4  8  7.91
9  11     1  5  5.68
10 11     2  5  4.74
11 11     3  5  5.73
12 11     4  8  6.89
13  2     1  8  6.95
14  2     2  8  8.14
15  2     3  8  6.77
16  2     4  8  5.76
17  3     1 13  7.58
18  3     2 13  8.74
19  3     3 13 12.74
20  3     4  8  7.71
21  4     1  9  8.81
22  4     2  9  8.77
23  4     3  9  7.11
24  4     4  8  8.84
25  5     1 11  8.33
26  5     2 11  9.26
27  5     3 11  7.81
28  5     4  8  8.47
29  6     1 14  9.96
30  6     2 14  8.10
31  6     3 14  8.84
32  6     4  8  7.04
33  7     1  6  7.24
34  7     2  6  6.13
35  7     3  6  6.08
36  7     4  8  5.25
37  8     1  4  4.26
38  8     2  4  3.10
39  8     3  4  5.39
40  8     4 19 12.50
41  9     1 12 10.84
42  9     2 12  9.13
43  9     3 12  8.15
44  9     4  8  5.56
```

---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
tidy_anscombe = anscombe %>%
  tibble::rownames_to_column("id") %>%   # あとで必要なID列
  tidyr::gather(key, value, -id) %>%     # 縦長に変形
  tidyr::separate(key, c("axis", "group"), 1L) %>%  # 列を分離
  tidyr::spread(axis, value) %>%         # axis列をx列とy列に
  dplyr::select(-id) %>%                 # 使い終わったID列を消す
  dplyr::arrange(group) %>%              # グループごとに並べる
  print()                                # ggplotしたい形！
```

```
   group  x     y
1      1 10  8.04
2      1  7  4.82
3      1  5  5.68
4      1  8  6.95
5      1 13  7.58
6      1  9  8.81
7      1 11  8.33
8      1 14  9.96
9      1  6  7.24
10     1  4  4.26
11     1 12 10.84
12     2 10  9.14
13     2  7  7.26
14     2  5  4.74
15     2  8  8.14
16     2 13  8.74
17     2  9  8.77
18     2 11  9.26
19     2 14  8.10
20     2  6  6.13
21     2  4  3.10
22     2 12  9.13
23     3 10  7.46
24     3  7  6.42
25     3  5  5.73
26     3  8  6.77
27     3 13 12.74
28     3  9  7.11
29     3 11  7.81
30     3 14  8.84
31     3  6  6.08
32     3  4  5.39
33     3 12  8.15
34     4  8  6.58
35     4  8  7.91
36     4  8  6.89
37     4  8  5.76
38     4  8  7.71
39     4  8  8.84
40     4  8  8.47
41     4  8  7.04
42     4  8  5.25
43     4 19 12.50
44     4  8  5.56
```

---
## 例題: `anscombe`

4組のx-yは、平均・分散・相関係数がほぼ同じ？


```r
ggplot(tidy_anscombe, aes(x, y)) +
  geom_point(size = 3) +
  stat_smooth(method = lm, se = FALSE, fullrange = TRUE) +
  facet_wrap(~ group, nrow = 1L)
```

<img src="figure/plot_anscombe-1.png" title="plot of chunk plot_anscombe" alt="plot of chunk plot_anscombe" width="98%" />

---
## 例題: `anscombe`

dplyrのグループ化を使って要約


```r
tidy_anscombe %>%
  dplyr::group_by(group) %>%   # group列でグループ化して
  dplyr::summarise(            # x, y列を使ってsummarize
    mean_x = mean(x),
    mean_y = mean(y),
    sd_x = sd(x),
    sd_y = sd(y),
    cor_xy = cor(x, y)
  )
```

```
# A tibble: 4 x 6
  group mean_x mean_y  sd_x  sd_y cor_xy
  <chr>  <dbl>  <dbl> <dbl> <dbl>  <dbl>
1 1          9   7.50  3.32  2.03  0.816
2 2          9   7.50  3.32  2.03  0.816
3 3          9   7.5   3.32  2.03  0.816
4 4          9   7.50  3.32  2.03  0.817
```

---
## 例題: `anscombe`

tidyrのネストを使って要約 (中級者向け)


```r
tidy_anscombe %>%
  tidyr::nest(-group) %>%    # group列でネストして
  dplyr::mutate(data = purrr::map(data, function(data_i) {
    data_i %>%               # 入れ子の内側の各データをいじって
      summarise_all(funs(mean, sd)) %>%
      dplyr::mutate(cor_xy = cor(data_i$x, data_i$y))
  })) %>%
  tidyr::unnest()            # 入れ子を解消
```

```
  group x_mean   y_mean     x_sd     y_sd    cor_xy
1     1      9 7.500909 3.316625 2.031568 0.8164205
2     2      9 7.500909 3.316625 2.031657 0.8162365
3     3      9 7.500000 3.316625 2.030424 0.8162867
4     4      9 7.500909 3.316625 2.030579 0.8165214
```

---
## 例題: [先ほどの伊東さん](https://figshare.com/articles/ggplot2___/5982007)のデータ準備部分

`m_data` をベースに、2つをまとめた `g_data` を作りたい


```r
prefix = "https://raw.githubusercontent.com/ito4303/esj65/master/"
m_data = paste0(prefix, "Measurement_data.csv") %>% read_csv()
s_data = paste0(prefix, "Stem_data.csv") %>% read_csv()
m_data %>% head(3L)
s_data %>% head(3L)
```

```
# A tibble: 3 x 4
  Stem   Year   DBH Comment
  <chr> <int> <dbl> <chr>  
1 WF002  2014   5.9 <NA>   
2 WF004  2014   3.8 <NA>   
3 315    1993  16.1 <NA>   
```

```
# A tibble: 3 x 9
  Indv  Stem      X     Y    X1    Y1 Species              Start   End
  <chr> <chr> <int> <int> <dbl> <dbl> <chr>                <int> <int>
1 WF002 WF002     0     0   2.8   3.2 Cleyera japonica      2014    NA
2 WF004 WF004     0     0   3.1   4   Quercus glauca        2014    NA
3 315   315       0     0   2.8   1.4 Symplocos prunifolia  1993    NA
```


---
## 例題: [先ほどの伊東さん](https://figshare.com/articles/ggplot2___/5982007)のデータ準備部分

`m_data` をベースに、2つをまとめた `g_data` を作りたい


```r
g_data = m_data %>%
  dplyr::inner_join(s_data, by = "Stem") %>%  # 共通する列で結合
  print()                                     # 使う行を絞りたい
```

```
         Stem  Year   DBH Comment   Indv     X     Y    X1    Y1
       <char> <int> <num>  <char> <char> <int> <int> <num> <num>
    1:  WF002  2014   5.9    <NA>  WF002     0     0   2.8   3.2
    2:  WF004  2014   3.8    <NA>  WF004     0     0   3.1   4.0
    3:    315  1993  16.1    <NA>    315     0     0   2.8   1.4
    4:    315  1996  16.6    <NA>    315     0     0   2.8   1.4
   ---                                                          
18199: 419531  1996   4.8    <NA> 419531   205    45 205.6  47.6
18200: 419531  1999   5.1    <NA> 419531   205    45 205.6  47.6
18201: 419531  2002   5.4    <NA> 419531   205    45 205.6  47.6
18202: 419531  2005    NA     cut 419531   205    45 205.6  47.6
                    Species Start   End
                     <char> <int> <int>
    1:     Cleyera japonica  2014    NA
    2:       Quercus glauca  2014    NA
    3: Symplocos prunifolia  1993    NA
    4: Symplocos prunifolia  1993    NA
   ---                                 
18199:       Quercus glauca  1993  2002
18200:       Quercus glauca  1993  2002
18201:       Quercus glauca  1993  2002
18202:       Quercus glauca  1993  2002
```


---
## 例題: [先ほどの伊東さん](https://figshare.com/articles/ggplot2___/5982007)のデータ準備部分

`m_data` をベースに、2つをまとめた `g_data` を作りたい


```r
g_data = m_data %>%
  dplyr::inner_join(s_data, by = "Stem") %>%  # 共通する列で結合
  dplyr::filter(                              # 使う行を絞りたい
    Year %in% c(1993, 2014),
    X1 < 50,
    Species %in% c("Quercus glauca", "Symplocos prunifolia"),
    !is.na(DBH)
  ) %>%                                       # 使う列を絞りたい
  print()
```

```
       Stem  Year   DBH       Comment   Indv     X     Y    X1    Y1
     <char> <int> <num>        <char> <char> <int> <int> <num> <num>
  1:  WF004  2014   3.8          <NA>  WF004     0     0   3.1   4.0
  2:    315  1993  16.1          <NA>    315     0     0   2.8   1.4
  3:    315  2014  19.2          <NA>    315     0     0   2.8   1.4
  4:   1319  1993  12.7          <NA>   1319     0     5   0.1   7.3
 ---                                                                
539:  97374  2014   5.4 bark-stripped  97374    45    35  47.0  35.2
540:  97375  1993  10.2          <NA>  97375    45    35  46.4  38.6
541:  97376  1993   8.8          <NA>  98382    45    35  45.1  40.0
542:  98382  1993   8.5          <NA>  98382    45    40  45.0  40.0
                  Species Start   End
                   <char> <int> <int>
  1:       Quercus glauca  2014    NA
  2: Symplocos prunifolia  1993    NA
  3: Symplocos prunifolia  1993    NA
  4: Symplocos prunifolia  1993    NA
 ---                                 
539:       Quercus glauca  1993    NA
540: Symplocos prunifolia  1993  2005
541:       Quercus glauca  1993  2005
542:       Quercus glauca  1993  2005
```


---
## 例題: [先ほどの伊東さん](https://figshare.com/articles/ggplot2___/5982007)のデータ準備部分

`m_data` をベースに、2つをまとめた `g_data` を作りたい


```r
g_data = m_data %>%
  dplyr::inner_join(s_data, by = "Stem") %>%  # 共通する列で結合
  dplyr::filter(                              # 使う行を絞りたい
    Year %in% c(1993, 2014),
    X1 < 50,
    Species %in% c("Quercus glauca", "Symplocos prunifolia"),
    !is.na(DBH)
  ) %>%                                       # 使う列を絞りたい
  dplyr::select(X1, Y1, Year, Species, DBH) %>%
  dplyr::rename(X = X1, Y = Y1) %>%           # 列名を変更
  print()
```

```
         X     Y  Year              Species   DBH
     <num> <num> <int>               <char> <num>
  1:   3.1   4.0  2014       Quercus glauca   3.8
  2:   2.8   1.4  1993 Symplocos prunifolia  16.1
  3:   2.8   1.4  2014 Symplocos prunifolia  19.2
  4:   0.1   7.3  1993 Symplocos prunifolia  12.7
 ---                                             
539:  47.0  35.2  2014       Quercus glauca   5.4
540:  46.4  38.6  1993 Symplocos prunifolia  10.2
541:  45.1  40.0  1993       Quercus glauca   8.8
542:  45.0  40.0  1993       Quercus glauca   8.5
```

---
## 例題: `VADeaths`


```r
as.data.frame(VADeaths)                     # data.frameに変換
                                            # 行名を列に
                                            # 縦長に変形
                                                  # 地域と性別を分離
                                            # 下限と上限を分離
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
## 例題: `VADeaths`


```r
as.data.frame(VADeaths) %>%                 # data.frameに変換
  tibble::rownames_to_column("class")       # 行名を列に
                                            # 縦長に変形
                                                  # 地域と性別を分離
                                            # 下限と上限を分離
```

```
  class Rural Male Rural Female Urban Male Urban Female
1 50-54       11.7          8.7       15.4          8.4
2 55-59       18.1         11.7       24.3         13.6
3 60-64       26.9         20.3       37.0         19.3
4 65-69       41.0         30.9       54.6         35.1
5 70-74       66.0         54.3       71.1         50.0
```

---
## 例題: `VADeaths`


```r
as.data.frame(VADeaths) %>%                 # data.frameに変換
  tibble::rownames_to_column("class") %>%   # 行名を列に
  tidyr::gather(people, death, -class)      # 縦長に変形
                                                  # 地域と性別を分離
                                            # 下限と上限を分離
```

```
   class       people death
1  50-54   Rural Male  11.7
2  55-59   Rural Male  18.1
3  60-64   Rural Male  26.9
4  65-69   Rural Male  41.0
5  70-74   Rural Male  66.0
6  50-54 Rural Female   8.7
7  55-59 Rural Female  11.7
8  60-64 Rural Female  20.3
9  65-69 Rural Female  30.9
10 70-74 Rural Female  54.3
11 50-54   Urban Male  15.4
12 55-59   Urban Male  24.3
13 60-64   Urban Male  37.0
14 65-69   Urban Male  54.6
15 70-74   Urban Male  71.1
16 50-54 Urban Female   8.4
17 55-59 Urban Female  13.6
18 60-64 Urban Female  19.3
19 65-69 Urban Female  35.1
20 70-74 Urban Female  50.0
```

---
## 例題: `VADeaths`


```r
as.data.frame(VADeaths) %>%                 # data.frameに変換
  tibble::rownames_to_column("class") %>%   # 行名を列に
  tidyr::gather(people, death, -class) %>%  # 縦長に変形
  tidyr::separate(people, c("region", "sex"))     # 地域と性別を分離
                                            # 下限と上限を分離
```

```
   class region    sex death
1  50-54  Rural   Male  11.7
2  55-59  Rural   Male  18.1
3  60-64  Rural   Male  26.9
4  65-69  Rural   Male  41.0
5  70-74  Rural   Male  66.0
6  50-54  Rural Female   8.7
7  55-59  Rural Female  11.7
8  60-64  Rural Female  20.3
9  65-69  Rural Female  30.9
10 70-74  Rural Female  54.3
11 50-54  Urban   Male  15.4
12 55-59  Urban   Male  24.3
13 60-64  Urban   Male  37.0
14 65-69  Urban   Male  54.6
15 70-74  Urban   Male  71.1
16 50-54  Urban Female   8.4
17 55-59  Urban Female  13.6
18 60-64  Urban Female  19.3
19 65-69  Urban Female  35.1
20 70-74  Urban Female  50.0
```

---
## 例題: `VADeaths`


```r
as.data.frame(VADeaths) %>%                 # data.frameに変換
  tibble::rownames_to_column("class") %>%   # 行名を列に
  tidyr::gather(people, death, -class) %>%  # 縦長に変形
  tidyr::separate(people, c("region", "sex")) %>% # 地域と性別を分離
  tidyr::separate(class, c("lbound", "ubound"), "-", convert=TRUE)
                                            # 下限と上限を分離
```

```
   lbound ubound region    sex death
1      50     54  Rural   Male  11.7
2      55     59  Rural   Male  18.1
3      60     64  Rural   Male  26.9
4      65     69  Rural   Male  41.0
5      70     74  Rural   Male  66.0
6      50     54  Rural Female   8.7
7      55     59  Rural Female  11.7
8      60     64  Rural Female  20.3
9      65     69  Rural Female  30.9
10     70     74  Rural Female  54.3
11     50     54  Urban   Male  15.4
12     55     59  Urban   Male  24.3
13     60     64  Urban   Male  37.0
14     65     69  Urban   Male  54.6
15     70     74  Urban   Male  71.1
16     50     54  Urban Female   8.4
17     55     59  Urban Female  13.6
18     60     64  Urban Female  19.3
19     65     69  Urban Female  35.1
20     70     74  Urban Female  50.0
```


---
## 例題: 数値+単位になっちゃってる列を処理


```r
women2 = women %>% sample_n(2L) %>% tibble::as_tibble() %>% dplyr::mutate(height = paste0(height, "in"), weight = paste(weight, "lbs")) %>% print()
```

```
   height  weight
   <char>  <char>
1:   72in 164 lbs
2:   67in 142 lbs
```

```r
# 単位を捨てる (スペースの有無によらず可能)
women2 %>% dplyr::mutate(weight = readr::parse_number(weight))
```

```
# A tibble: 2 x 2
  height weight
  <chr>   <dbl>
1 72in      164
2 67in      142
```

```r
# 単位を新しい列に分ける
women2 %>%
  tidyr::separate(height, c("height", "uh"), -2L, convert=TRUE) %>%
  tidyr::separate(weight, c("weight", "uw"), " ", convert=TRUE)
```

```
# A tibble: 2 x 4
  height uh    weight uw   
   <int> <chr>  <int> <chr>
1     72 in       164 lbs  
2     67 in       142 lbs  
```


---
## (質問を受けて補足) 文字列処理

さらに複雑な文字列の抽出・置換をしたい場合は
[stringrパッケージ](https://stringr.tidyverse.org/)
で正規表現を使う:

```r
c("Who am I? 24601!", "p = 0.02 *") %>%
  str_extract("[\\d\\.]+") %>%  # 連続する数字または小数点を抽出
  as.numeric()                  # 数値に変換
```

```
[1] 24601.00     0.02
```

全角英数字を半角に変換

```r
c("ｔｐ５３", "ＫＲＡＳ") %>%
  stringi::stri_trans_nfkc()
```

```
[1] "tp53" "KRAS"
```

---
## (質問を受けて補足) 名前の衝突

`filter(...)` でも動くのにわざわざ頭に `dplyr::` 付ける？

- 今回の発表では、どのパッケージ由来かをなるべく明示したかった
- ほかのパッケージや自分の作業によって、<br>
  **同じ名前の関数で上書きされちゃっても大丈夫なように:**


```r
filter = function(x, y) return(NULL)     # うっかり同名の関数を作る
filter(iris, Petal.Length < 1.2)         # 新しいほうが使われちゃう
```

```
NULL
```

```r
dplyr::filter(iris, Petal.Length < 1.2)  # 明示したので大丈夫
```

```
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          4.3         3.0          1.1         0.1  setosa
2          4.6         3.6          1.0         0.2  setosa
```

---
## (質問を受けて補足) 布教

<img src="/slides/image/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="280" style="float: right;">

頑なにエクセルを使い込む熟練のシーシュポスたちにどうやってRの利用を広めていくか？

- 彼らが苦労してる作業を魔法のように一瞬で解決して見せる。
- その魔法を使うのは意外と難しくない、と思わせる。
- というのを地道に続けていくしかない・・・？


---
## 参考

R for Data Science --- Hadley Wickham and Garrett Grolemund
: http://r4ds.had.co.nz/
: [英語版書籍](https://amzn.to/2tbRmVc)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

各パッケージの公式ドキュメント
: [tidyverse](https://www.tidyverse.org/),
  [dplyr](https://dplyr.tidyverse.org/),
  [tidyr](https://tidyr.tidyverse.org/),
  [purrr](https://purrr.tidyverse.org/),
  [tibble](https://tibble.tidyverse.org/),
  [readr](https://readr.tidyverse.org/),
  [readxl](https://readxl.tidyverse.org/),
  [stringr](https://stringr.tidyverse.org/)

整然データとは何か --- [@f_nisihara](https://twitter.com/f_nisihara)
: https://speakerdeck.com/fnshr/zheng-ran-detatutenani
: http://id.fnshr.info/2017/01/09/tidy-data-intro/

https://en.wikipedia.org/wiki/Sisyphus

---
## 疑問やエラーの解決方法

- 公式ドキュメントを読む
- エラー文をちゃんと読む
- パッケージ名やエラー文をコピペしてウェブ検索<br>
  → StackOverflowや個人サイトに先例
- 身近な経験者に訊く
- Slackのr-wakalangに質問を投稿する<br>
  https://github.com/tokyor/r-wakalang <br>
  内容によってチャンネルを選ぶ:<br>
  `#r_beginners`, `#statistics`, `#ggplot2`, etc.
- 質問するときは、状況を再現できる小さな例
  [(reprex)](https://reprex.tidyverse.org/)
  を添えて

---
## まとめ

- 解析や作図の前に、使いやすい形にデータを整えよう。
- マウスでぽちぽちセルの切り貼りをするのはやめて、<br>
  そういうことはRにやらせよう。
- いまRを使うなら、tidyverseの機能を使うと捗る。
- 調べ方がわかれば、具体的な方法を全部覚えなくても大丈夫。
