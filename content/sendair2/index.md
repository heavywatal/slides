+++
title = "Rでデータを可視化する — Sendai.R #2 初心者セッション"
date = 2019-09-27T14:40:00+09:00
type = "reveal"
draft = false
+++



# Rでデータを可視化する

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
</div>

資料作成協力:<br>
石川由希 (名古屋大学 理学研究科 脳回路構造学 講師)

<div class="footnote">
2019-09-27
<a href="https://sendair.connpass.com/event/137548/">
Sendai.R #2 初心者セッション
</a>
</div>

---
## Who am I?

<img src="/slides/image/profile/google-map.png" height="580" align="right">
Watal M. Iwasaki = 岩嵜 航<br>
https://heavywatal.github.io/

PhD in Life Sciences, Tohoku University, Sendai
: Evolutionary theory of complexity and diversity in biological systems.

Postdoc in SOKENDAI, Hayama
: Evolution of diversity within a tumor/cancer.
: Population genetics of Pacific bluefin tuna. 🐟

<img src="/slides/image/profile/bicycle.jpg" height="220" align="right" style="transform: translate(-10px, 0px);">
Asst. Prof. in Tohoku University
: Genomics of Rice 🍚, etc.

Likes
: 🍺 Beer, Sake, Whisky, Cooking
: ♬ Heavy Metal, Classical, Folk

---
## 生データは情報が多すぎ

関係性も何も見えない


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

ダイヤモンド53,490個について10項目の値を持つ `data.frame`


---
## 要約統計量(平均とか分散とか)を見てみる

まあ何となく分かった気になる


```r
dplyr::summarize_if(diamonds, is.numeric, mean)
```

```
      carat   depth    table  price        x        y        z
      <dbl>   <dbl>    <dbl>  <dbl>    <dbl>    <dbl>    <dbl>
1 0.7979397 61.7494 57.45718 3932.8 5.731157 5.734526 3.538734
```

```r
dplyr::summarize_if(diamonds, is.numeric, sd)
```

```
      carat    depth    table   price        x        y         z
      <dbl>    <dbl>    <dbl>   <dbl>    <dbl>    <dbl>     <dbl>
1 0.4740112 1.432621 2.234491 3989.44 1.121761 1.142135 0.7056988
```

```r
summary(diamonds)
```

```
     carat               cut        color        clarity          depth           table           price             x                y                z         
 Min.   :0.2000   Fair     : 1610   D: 6775   SI1    :13065   Min.   :43.00   Min.   :43.00   Min.   :  326   Min.   : 0.000   Min.   : 0.000   Min.   : 0.000  
 1st Qu.:0.4000   Good     : 4906   E: 9797   VS2    :12258   1st Qu.:61.00   1st Qu.:56.00   1st Qu.:  950   1st Qu.: 4.710   1st Qu.: 4.720   1st Qu.: 2.910  
 Median :0.7000   Very Good:12082   F: 9542   SI2    : 9194   Median :61.80   Median :57.00   Median : 2401   Median : 5.700   Median : 5.710   Median : 3.530  
 Mean   :0.7979   Premium  :13791   G:11292   VS1    : 8171   Mean   :61.75   Mean   :57.46   Mean   : 3933   Mean   : 5.731   Mean   : 5.735   Mean   : 3.539  
 3rd Qu.:1.0400   Ideal    :21551   H: 8304   VVS2   : 5066   3rd Qu.:62.50   3rd Qu.:59.00   3rd Qu.: 5324   3rd Qu.: 6.540   3rd Qu.: 6.540   3rd Qu.: 4.040  
 Max.   :5.0100                     I: 5422   VVS1   : 3655   Max.   :79.00   Max.   :95.00   Max.   :18823   Max.   :10.740   Max.   :58.900   Max.   :31.800  
                                    J: 2808   (Other): 2531                                                                                                     
```

---
## 平均値ばかり見て可視化を怠ると構造を見逃す

<figure style="position: relative;">
<a href="https://www.autodeskresearch.com/publications/samestats">
<img src="/slides/image/rstats/datasaurus.png" width="800">
<figcaption class="url">https://www.autodeskresearch.com/publications/samestats/</figcaption>
</a>
<img src="/slides/image/rstats/DataDino-600x455.gif" width="180"
     style="position: absolute; left: 0; top: 0; z-index: 255;">
</figure>

---
## データ可視化の重要性

情報の整理 → **正しい解析・新しい発見**

![plot of chunk simplify-diamonds](figure/simplify-diamonds-1.png)

---
## データ可視化の重要性

情報の整理 → **正しい解析・新しい発見**

<figure>
<a href="https://r4ds.had.co.nz/explore-intro.html">
<img src="/slides/image/r4ds/data-science-explore.png">
<figcaption class="url">https://r4ds.had.co.nz/explore-intro.html</figcaption>
</a>
</figure>
<figure style="margin-bottom: 32px;">
<a href="https://tsutawarudesign.com/">
<img src="/slides/image/tsutawaru/hajimeni-04.svg" width="570" style="margin: -24px -32px -32px -24px;">
<figcaption class="url">https://tsutawarudesign.com/</figcaption>
</a>
</figure>

---
## そうは言ってもセンスでしょ? --- NO!

<figure style="float: right; width: 450px; margin: 1rem 0;">
<a href="https://tsutawarudesign.com/">
<img src="/slides/image/tsutawaru/title-13.svg" style="margin: 0 -20px 0 0;">
<img src="/slides/image/tsutawaru/hajimeni-03.svg" style="margin: 0 -20px 0 0;">
<figcaption class="url">https://tsutawarudesign.com/</figcaption>
</a>
</figure>

ある程度は**テクニック**であり**教養**。<br>
デザインの基本的なルールを<br>
知りさえすれば誰でも上達する。<br>

<a href="https://www.amazon.co.jp/dp/4774183210/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=heavywatal-22&linkId=7417ab2bc75a7c64806c3d6c0468b45c&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774183210&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=heavywatal-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=heavywatal-22&language=ja_JP&l=li3&o=9&a=4774183210" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

---
## 見せ方の吟味もRでやると捗るよ

平均値の差？ ばらつきの様子？ 軸はゼロから始まる？

![plot of chunk iris-compare](figure/iris-compare-1.png)

---
## こんな感じの図もRでラクラク描けるよ

<figure>
<img src="/slides/image/tumopp/paper/Fig1.png" height="200">
<img src="/slides/image/tumopp/neighborhood.png" height="200">
<img src="/slides/image/tumopp/param-p.png" height="200">
<img src="/slides/image/tumopp/paper/Fig3.png" height="200">
<img src="/slides/image/tumopp/param-k.png" height="200">
<img src="/slides/image/tumopp/driver.gif" height="200"><br>
<img src="/slides/image/tumopp/Cmoore_Lconst.gif" height="100">
<img src="/slides/image/tumopp/Cmoore_Llinear.gif" height="100">
<img src="/slides/image/tumopp/Cmoore_Lstep.gif" height="100">
<img src="/slides/image/tumopp/Chex_Lconst.gif" height="100">
<img src="/slides/image/tumopp/Chex_Llinear.gif" height="100">
<img src="/slides/image/tumopp/Chex_Lstep.gif" height="100">
<figcaption class="url">Iwasaki and Innan (2017)</figcaption>
</figure>

---
## 本セッションの目標

### <strike>データはまず可視化してみなきゃ</strike> (済)

### あれもこれもRでやれそうだな

### やりたくなったらこのへんを調べればいいんだな

<br>
この3点さえ押さえれば、具体的なやり方は覚えなくても大丈夫

この発表スライドもオンラインで読める
<br>
https://heavywatal.github.io/slides/

---
## 目次: Rでデータを可視化する

- <strike>データ可視化の意義</strike> (済)
- <strike>Rでやるメリット</strike> (済)
- Rの基本おさらい
- R標準のplot、パッケージのggplot2
- ggplot2の基本的な使い方
- 多変量データの俯瞰も手軽に
- 画像ファイル出力も微調整もプログラミングで

<figure>
<img src="/slides/image/nagoya/bicycle-gear.png" height="250">
<img src="/slides/image/nagoya/bicycle-speed.png" height="250">
</figure>

---
## Rとは

統計解析と作図の機能が充実したプログラミング言語

<figure style="float: right;">
<a href="https://cran.r-project.org/">
<img src="/slides/image/rstats/Rlogo.svg" height="200">
<figcaption class="url">https://cran.r-project.org/</figcaption>
</a>
</figure>

クロスプラットフォーム
: Linux, Mac, Windowsで動く。

オープンソース
: 永久に無償で、すべての機能を使える。
: 集合知によって常に進化している。

コミュニティ
: 相談できる人や参考になるウェブサイトがたくさん見つかる。

ほかのプログラミング言語でも似たようなことができる。<br>
例えばPythonもいいよ。

---
## R環境のインストール

R本体
: コマンドを解釈して実行するコア部分
: よく使われる関数なども標準パッケージとして同梱
: https://cran.rstudio.com/ からダウンロードしてインストール

RStudio Desktop
: Rをより快適に使うための総合開発環境(IDE)
: 必須ではないけど、結構みんな使ってるらしい
: https://www.rstudio.com/ からダウンロードしてインストール

<img src="/slides/image/rstudio/rstudio-300x260.png">

---
## Rスクリプトに書いてから、コンソールで実行

File → New File → R script

<img src="/slides/image/rstudio/script-console.png" width="100%">

---
## Rスクリプトに書いてから、コンソールで実行

File → New File → R script

<img src="/slides/image/rstudio/newfile.png" width="100%">

---
## Rと接する上での心構え

エラーを恐れない
: 熟練プログラマーでもよくエラーを発生させる。
: エラー文はRからのメッセージなので、よく読んで意図を汲み取ろう。

困ったらググる
: その困りごとは、全世界のRユーザーの誰かが通った道。
: 日本語で、英語で、エラー文そのままで、検索してみよう。
: それでも分からなかったら [r-wakalang](https://github.com/tokyor/r-wakalang) で相談しよう。

<figure style="float: right; margin: 0;">
<img src="/slides/image/rstats/error.png" height="300">
</figure>

コード入力はコピペが早い
: 見つけたコードはまずコピペして使ってみよう。
: 動くようなら自分のデータに合わせて改変しよう。
: (ただし、ライセンスには注意...)

---
## data.frame: 長方形のテーブル。重要。

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
## R標準のグラフィックス

描けるっちゃ描けるけど。カスタマイズしていくのは難しい。


```r
plot(iris$Sepal.Length, iris$Sepal.Width)
```

![plot of chunk plot](figure/plot-1.png)

きれいなグラフを簡単に描けるパッケージを使いたい。

---
## R標準のグラフィックス

描けるっちゃ描けるけど。カスタマイズしていくのは難しい。


```r
hist(iris$Petal.Length)
```

![plot of chunk hist](figure/hist-1.png)

きれいなグラフを簡単に描けるパッケージを使いたい。

---
## R標準のグラフィックス

描けるっちゃ描けるけど。カスタマイズしていくのは難しい。


```r
boxplot(Petal.Width ~ Species, data = iris)
```

![plot of chunk boxplot](figure/boxplot-1.png)

きれいなグラフを簡単に描けるパッケージを使いたい。

---
## パッケージ

便利な関数やデータセットなどをひとまとめにしたもの。

Standard Packages
: Rの標準機能。何もしなくても使用可能。

Contributed Packages
: 有志により開発され、
  [CRAN](https://cran.rstudio.com/web/packages/index.html)
  にまとめて公開されている。
: 要インストール。使う前に読み込むおまじないが必要。


```r
install.packages("ggplot2")  # 一度やればOK
library(ggplot2)             # 読み込みはRを起動するたびに必要
update.packages()            # たまには更新しよう
```

素のRも覚えきってないのにいきなりパッケージ？
: 大丈夫。誰も覚えきってない。
: パッケージを使わないR作業 = 火もナイフも使わない料理

---
## tidyverse

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges.png" width="260" align="right">
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
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
</figure>

---
## ggplot2とは

<a href="https://ggplot2.tidyverse.org/">
<img src="/slides/image/hex-stickers/ggplot2.png" width="120" align="right">
</a>

- tidyverseパッケージ群のひとつ
- "The **G**rammer of **G**raphics" という体系に基づく設計
- 単にいろんなグラフを「描ける」だけじゃなく<br>
  **一貫性のある文法で合理的に描ける**

<figure>
<a href="https://www.amazon.co.jp/Grammar-Graphics-Statistics-Computing/dp/0387245448/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=heavywatal-22&linkId=2d44a24b81394d310843bd982fdadf98" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0387245448&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=heavywatal-22" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=heavywatal-22&l=li3&o=9&a=0387245448" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<img src="/slides/image/nagoya/iris.png" width="24%">
<img src="/slides/image/nagoya/binhex.png" width="24%">
<img src="/slides/image/nagoya/faithful.png" width="24%">
</figure>

---
## R標準のプロットとは根本的に違う

いきなりggplot2から使い始めても大丈夫。

<div class="goldmark-p-workaround">
<svg width="288pt" height="266pt"
 viewBox="0.00 0.00 288.35 265.60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(4 261.6)">
<title>boxes_and_circles</title>
<polygon fill="#ffffff" stroke="transparent" points="-4,4 -4,-261.6 284.3471,-261.6 284.3471,4 -4,4"/>
<!-- Traditional R plot
boxplot(), hist(), ... -->
<g id="node1" class="node">
<title>Traditional R plot
boxplot(), hist(), ...</title>
<polygon fill="none" stroke="#000000" points="128.6762,-257.4019 .1078,-257.4019 .1078,-216.1981 128.6762,-216.1981 128.6762,-257.4019"/>
<text text-anchor="middle" x="64.392" y="-241" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">Traditional R plot</text>
<text text-anchor="middle" x="64.392" y="-224.2" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">boxplot(), hist(), ...</text>
</g>
<!-- graphics -->
<g id="node4" class="node">
<title>graphics</title>
<polygon fill="none" stroke="#000000" points="113.7897,-180 44.9943,-180 44.9943,-144 113.7897,-144 113.7897,-180"/>
<text text-anchor="middle" x="79.392" y="-157.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">graphics</text>
</g>
<!-- Traditional R plot
boxplot(), hist(), ...&#45;&gt;graphics -->
<g id="edge1" class="edge">
<title>Traditional R plot
boxplot(), hist(), ...&#45;&gt;graphics</title>
<path fill="none" stroke="#000000" d="M68.5703,-215.964C70.1727,-207.9736 72.0285,-198.7191 73.746,-190.1547"/>
<polygon fill="#000000" stroke="#000000" points="77.2114,-190.6746 75.746,-180.1816 70.348,-189.2982 77.2114,-190.6746"/>
</g>
<!-- lattice -->
<g id="node2" class="node">
<title>lattice</title>
<polygon fill="none" stroke="#000000" points="200.392,-254.8 146.392,-254.8 146.392,-218.8 200.392,-218.8 200.392,-254.8"/>
<text text-anchor="middle" x="173.392" y="-232.6" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">lattice</text>
</g>
<!-- grid -->
<g id="node5" class="node">
<title>grid</title>
<polygon fill="none" stroke="#000000" points="200.392,-180 146.392,-180 146.392,-144 200.392,-144 200.392,-180"/>
<text text-anchor="middle" x="173.392" y="-157.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">grid</text>
</g>
<!-- lattice&#45;&gt;grid -->
<g id="edge3" class="edge">
<title>lattice&#45;&gt;grid</title>
<path fill="none" stroke="#000000" d="M173.392,-218.693C173.392,-210.2112 173.392,-199.9062 173.392,-190.4204"/>
<polygon fill="#000000" stroke="#000000" points="176.8921,-190.1995 173.392,-180.1995 169.8921,-190.1995 176.8921,-190.1995"/>
</g>
<!-- ggplot2 -->
<g id="node3" class="node">
<title>ggplot2</title>
<polygon fill="none" stroke="#000000" points="280.3023,-254.8 218.4817,-254.8 218.4817,-218.8 280.3023,-218.8 280.3023,-254.8"/>
<text text-anchor="middle" x="249.392" y="-232.6" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">ggplot2</text>
</g>
<!-- ggplot2&#45;&gt;grid -->
<g id="edge4" class="edge">
<title>ggplot2&#45;&gt;grid</title>
<path fill="none" stroke="#000000" d="M230.9945,-218.693C221.4499,-209.2991 209.6333,-197.669 199.1915,-187.3922"/>
<polygon fill="#000000" stroke="#000000" points="201.4657,-184.7196 191.8835,-180.1995 196.5555,-189.7086 201.4657,-184.7196"/>
</g>
<!-- grDevices -->
<g id="node6" class="node">
<title>grDevices</title>
<polygon fill="none" stroke="#000000" points="157.6139,-108 79.1701,-108 79.1701,-72 157.6139,-72 157.6139,-108"/>
<text text-anchor="middle" x="118.392" y="-85.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">grDevices</text>
</g>
<!-- graphics&#45;&gt;grDevices -->
<g id="edge2" class="edge">
<title>graphics&#45;&gt;grDevices</title>
<path fill="none" stroke="#000000" d="M89.2333,-143.8314C93.5877,-135.7925 98.8018,-126.1666 103.6089,-117.2918"/>
<polygon fill="#000000" stroke="#000000" points="106.7328,-118.8732 108.4181,-108.4133 100.5777,-115.5392 106.7328,-118.8732"/>
</g>
<!-- grid&#45;&gt;grDevices -->
<g id="edge5" class="edge">
<title>grid&#45;&gt;grDevices</title>
<path fill="none" stroke="#000000" d="M159.5132,-143.8314C153.1784,-135.5386 145.5536,-125.557 138.5994,-116.4533"/>
<polygon fill="#000000" stroke="#000000" points="141.3095,-114.2353 132.4577,-108.4133 135.7468,-118.4847 141.3095,-114.2353"/>
</g>
<!-- pdf -->
<g id="node7" class="node">
<title>pdf</title>
<polygon fill="none" stroke="#000000" points="73.392,-36 19.392,-36 19.392,0 73.392,0 73.392,-36"/>
<text text-anchor="middle" x="46.392" y="-13.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">pdf</text>
</g>
<!-- grDevices&#45;&gt;pdf -->
<g id="edge6" class="edge">
<title>grDevices&#45;&gt;pdf</title>
<path fill="none" stroke="#000000" d="M100.2234,-71.8314C91.6768,-63.2848 81.3363,-52.9443 72.0118,-43.6198"/>
<polygon fill="#000000" stroke="#000000" points="74.3512,-41.0095 64.8053,-36.4133 69.4015,-45.9592 74.3512,-41.0095"/>
</g>
<!-- png -->
<g id="node8" class="node">
<title>png</title>
<polygon fill="none" stroke="#000000" points="145.392,-36 91.392,-36 91.392,0 145.392,0 145.392,-36"/>
<text text-anchor="middle" x="118.392" y="-13.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">png</text>
</g>
<!-- grDevices&#45;&gt;png -->
<g id="edge7" class="edge">
<title>grDevices&#45;&gt;png</title>
<path fill="none" stroke="#000000" d="M118.392,-71.8314C118.392,-64.131 118.392,-54.9743 118.392,-46.4166"/>
<polygon fill="#000000" stroke="#000000" points="121.8921,-46.4132 118.392,-36.4133 114.8921,-46.4133 121.8921,-46.4132"/>
</g>
<!-- svg -->
<g id="node9" class="node">
<title>svg</title>
<polygon fill="none" stroke="#000000" points="217.392,-36 163.392,-36 163.392,0 217.392,0 217.392,-36"/>
<text text-anchor="middle" x="190.392" y="-13.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#000000">svg</text>
</g>
<!-- grDevices&#45;&gt;svg -->
<g id="edge8" class="edge">
<title>grDevices&#45;&gt;svg</title>
<path fill="none" stroke="#000000" d="M136.5606,-71.8314C145.1072,-63.2848 155.4477,-52.9443 164.7722,-43.6198"/>
<polygon fill="#000000" stroke="#000000" points="167.3825,-45.9592 171.9787,-36.4133 162.4328,-41.0095 167.3825,-45.9592"/>
</g>
</g>
</svg>
</div>

---
## 基本的な使い方: 指示を `+` していく

- `ggplot()` このデータでよろしく
- `geom_*()` 点や線をよろしく
- `theme_*()` 軸とか背景の見た目をよろしく

<figure>
<a href="https://mrunadon.github.io/概要をおさえてggplot2を使いこなすチュートリアルとコード集/">
<img src="image/mrunadon-ggplot2.png">
<figcaption class="url">https://mrunadon.github.io/概要をおさえてggplot2を使いこなすチュートリアルとコード集/</figcaption>
</a>
</figure>

---
## 基本的な使い方: 指示を `+` していく

- `ggplot()` このデータでよろしく
- `geom_*()` 点や線をよろしく
- `theme_*()` 軸とか背景の見た目をよろしく


```r
ggplot(data = diamonds)               # diamondsデータでキャンバス準備
# geom_histogram(aes(x = carat)) +    # x軸caratのヒストグラムで
# theme_classic(base_size = 20)       # クラシックなテーマで
```

![plot of chunk ggplot-plus0](figure/ggplot-plus0-1.png)

---
## 基本的な使い方: 指示を `+` していく

- `ggplot()` このデータでよろしく
- `geom_*()` 点や線をよろしく
- `theme_*()` 軸とか背景の見た目をよろしく


```r
ggplot(data = diamonds) +             # diamondsデータでキャンバス準備
  geom_histogram(aes(x = carat))      # x軸caratのヒストグラムで
# theme_classic(base_size = 20)       # クラシックなテーマで
```

![plot of chunk ggplot-plus1](figure/ggplot-plus1-1.png)

---
## 基本的な使い方: 指示を `+` していく

- `ggplot()` このデータでよろしく
- `geom_*()` 点や線をよろしく
- `theme_*()` 軸とか背景の見た目をよろしく


```r
ggplot(data = diamonds) +             # diamondsデータでキャンバス準備
  geom_histogram(aes(x = carat)) +    # x軸caratのヒストグラムで
  theme_classic(base_size = 20)       # クラシックなテーマで
```

![plot of chunk ggplot-plus2](figure/ggplot-plus2-1.png)

---
## よくあるエラー

パッケージ名は ggplot2、関数名は `ggplot`:
```
> ggplot2(data = diamonds)
Error in ggplot2(data = diamonds) : could not find function "ggplot2"
```

関数名は合ってるはずなのに...
```
> ggplot(data = diamonds)
Error in ggplot(data = diamonds) : could not find function "ggplot"
```

パッケージ読み込みは新しくRを起動するたびに必要:
```r
library(tidyverse)
```


---
## 途中経過を取っておける


```r
p0 = ggplot(data = diamonds)
p1 = p0 + geom_point(mapping = aes(x = carat, y = price))
p2 = p1 + theme_classic(base_size = 20, base_family = "Helvetica")
p3 = p2 + facet_wrap(~ clarity)
print(p3)
```

![plot of chunk ggplot-object](figure/ggplot-object-1.png)

`p0` とか `p1` あとで使うよ

---
## `ggplot()` に渡すのは整然データ tidy data

- 1行は1つの観測
- 1列は1つの変数
- 1セルは1つの値
- この列をX軸、この列をY軸、この列で色わけ、と指定できる！


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

参考:<br>
`data(package = "ggplot2")`<br>
<https://r4ds.had.co.nz/tidy-data.html><br>
<https://speakerdeck.com/fnshr/zheng-ran-detatutenani><br>



---
## Aesthetic mapping でデータと見せ方を紐付け

`aes()` の中で列名を指定する。


```r
p0 + geom_point(mapping = aes(x = carat, y = price,
                              color = color, size = clarity))
```

![plot of chunk aes-map](figure/aes-map-1.png)

---
## データによらず一律で見せ方を変える

`aes()` の外で値を指定する。


```r
p0 + geom_point(mapping = aes(x = carat, y = price),
                color = "darkorange", size = 6, alpha = 0.4)
```

![plot of chunk aes-nomap](figure/aes-nomap-1.png)

---
## 色パレットの変更 `scale_colour_*()`

個々の色を自分で決めず、既存のパレットを利用するのが吉。<br>
e.g., [ColorBrewer](https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=5),
[viridis](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html)
(色覚多様性の対策にも有効)


```r
#pQ+ scale_colour_brewer(palette = "Spectral")
pQ + scale_colour_viridis_c(option = "magma", direction = -1)
```

![plot of chunk quakes](figure/quakes-1.png)

---
## 値に応じて切り分けて表示 (1変数facet)

ggplotの真骨頂！
これをR標準グラフィックスでやるのは結構たいへん。


```r
p1 + facet_wrap(~ clarity, ncol = 4L)
```

![plot of chunk facet-wrap](figure/facet-wrap-1.png)

---
## 値に応じて切り分けて表示 (≥2変数facet)

ggplotの真骨頂！
これをR標準グラフィックスでやるのは結構たいへん。


```r
p1 + facet_grid(cut ~ clarity)
```

![plot of chunk facet-grid](figure/facet-grid-1.png)

---
## 多変量データの俯瞰に便利

![plot of chunk facet-diamonds](figure/facet-diamonds-1.png)

---
## 値を変えず座標軸を変える `scale_*`, `coord_*`


```r
ggplot(data = diamonds, aes(carat, price)) +
  geom_point(alpha = 0.25) +
  scale_x_log10() +
  scale_y_log10(breaks = c(1, 2, 5, 10) * 1000) +
  coord_cartesian(xlim = c(0.1, 10), ylim = c(800, 12000)) +
  labs(title = "Diamonds", x = "Size (carat)", y = "Price (USD)")
```

![plot of chunk scale-axis](figure/scale-axis-1.png)

---
## データと関係ない部分の見た目を調整 `theme`

[既存の `theme_*()`](https://ggplot2.tidyverse.org/reference/ggtheme.html)
をベースに、`theme()` 関数で微調整。


```r
p1 + theme_bw() + theme(
  panel.background = element_rect(fill = "khaki"), # 箱
  panel.grid.major = element_line(colour = "red"), # 線
  axis.title       = element_text(size = 32),      # 文字
  axis.text        = element_blank()               # 消す
)
```

![plot of chunk theme](figure/theme-1.png)

---
## 論文のFigureみたいに並べる

別のパッケージ
([cowplot](https://cran.r-project.org/package=cowplot)
や
[patchwork](https://github.com/thomasp85/patchwork))
の助けを借りて


```r
pAB = cowplot::plot_grid(p2, p2, labels = c("A", "B"), nrow = 1L)
cowplot::plot_grid(pAB, p2, labels = c("", "C"), ncol=1L)
```

![plot of chunk cowplot](figure/cowplot-1.png)

---
## ファイル名もサイズも再現可能な作図

`width`や`height`が小さいほど、文字・点・線が相対的に大きく


```r
# 7inch x 300dpi = 2100px四方 (デフォルト)
ggsave("dia1.png", p1) # width = 7, height = 7, dpi = 300
# 4     x 300    = 1200  全体7/4倍ズーム
ggsave("dia2.png", p1, width = 4, height = 4) # dpi = 300
# 2     x 600    = 1200  全体をさらに2倍ズーム
ggsave("dia3.png", p1, width = 2, height = 2, dpi = 600)
# 4     x 300    = 1200  テーマを使って文字だけ拡大
ggsave("dia4.png", p1 + theme_bw(base_size = 22), width = 4, height = 4)
```

<figure>
<img src="image/dia1.png" width="24%">
<img src="image/dia2.png" width="24%">
<img src="image/dia3.png" width="24%">
<img src="image/dia4.png" width="24%">
</figure>

---
## 他にどんな種類の `geom_*()` が使える？

なんでもある。
[公式サイト](https://ggplot2.tidyverse.org/reference/index.html)を見に行こう。

<figure>
<img src="/slides/image/rstats/ggplot2-reference-geoms.png" width="80%">
</figure>

---

<figure style="margin: 0;">
<a href="https://ggplot2.tidyverse.org/">
<img src="/slides/image/rstats/data-visualization-2.1-4789.jpg" width="100%">
<figcaption class="url">https://ggplot2.tidyverse.org/</figcaption>
</a>
</figure>

---
## 微調整してくと最終的に長いコードになるね...

うん。でもすべての点について後から確認できるし、使い回せる！


```r
ggplot(diamonds) +
  geom_boxplot(aes(y = carat, x = cut, color = cut)) +
  theme_classic(base_size = 15, base_family = "Helvetica") +
  coord_cartesian(ylim = c(-1, 6)) +
  labs(title = "Diamonds", x = "Size (carat)", y = "Price (USD)") +
  theme(axis.title.x = element_text(color = "black", size = 30),
        axis.title.y = element_text(color = "black", size = 30),
        axis.text.x = element_blank(),
        axis.text.y = element_text(color = "black", size = 30),
        axis.line.x = element_line(),
        axis.line.y = element_line(),
        axis.ticks.length = unit(8, "pt"),
        panel.background = element_blank(),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        legend.position = "none",
        plot.margin = grid::unit(c(0.5, 0.5, 1, 0.5), "lines"))
```

---
## 発展的な内容

ggplot2を[さらに拡張するパッケージも続々](https://exts.ggplot2.tidyverse.org/)
: アニメーション gganimate
: ラベル付け ggrepel
: グラフ/ネットワーク ggraph
: 系統樹 ggtree

<img src="/slides/image/tumopp/driver.gif" align="right" height="200">

もちろん地図とかも描ける
: [OK, Google. "ggplot 地図"](https://www.google.co.jp/search?q=ggplot+%E5%9C%B0%E5%9B%B3)

ggplot2は3Dが苦手
: 本当に3Dが必要? 色分けやファセットで足りない?
: 別のパッケージ(rgl, plotly)でやる。

---
## 疑問やエラーの解決方法

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
## 参考

講義資料
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学

R for Data Science --- Hadley Wickham and Garrett Grolemund
: https://r4ds.had.co.nz/
: [英語版書籍](https://amzn.to/2tbRmVc)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

ggplot2公式ドキュメント
: https://ggplot2.tidyverse.org/


---
## まとめ

データを持ったらまずは可視化
: 要約統計量ばかり見てると大事なものを見逃す

こんなグラフを描きたいな
: だいたい何でもggplot2でできるよ。

どうやるんだっけ
: たす `p = ggplot(data) + geom_*() + scale_*() + theme_*()`
: 保存 `ggsave("fig1.png", p, width=4, height=3, dpi=300)`
: 忘れるたびに調べる。徐々に身につく。

ちゃんと描こうと思うと結構な量のプログラムになるね...
: そうだけど、一度書いたら後で使い回せるよ。
