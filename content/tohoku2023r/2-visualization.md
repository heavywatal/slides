+++
url = "tohoku2023r/2-visualization.html"
linktitle = "データの可視化、レポート作成。"
title = "2. データの可視化、レポート作成。 — 進化学実習 2023 牧野研 東北大学"
date = 2023-04-10T14:40:00+09:00
draft = false
dpi = 108
+++

# [進化学実習 2023 牧野研 東北大学](.)

<div class="author">
岩嵜 航
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 牧野研 特任助教
</div>

<ol>
<li><a href="1-introduction.html">導入: データ解析の全体像。Rの基本。</a>
<li class="current-deck"><a href="2-visualization.html">データの可視化、レポート作成。</a>
<li><a href="3-structure1.html">データ構造の処理1: 抽出、集約など。</a>
<li><a href="4-structure2.html">データ構造の処理2: 結合、変形など。</a>
<li><a href="5-content.html">データ内容の処理: 数値、文字列など。</a>
<li><a href="6-input.html">データ入力、データ解釈</a>
<li><a href="7-distribution.html">統計モデリング1: 確率分布、尤度</a>
<li><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2023-04-10 東北大学 理学部生物学科 進化学実習<br>
<a href="https://heavywatal.github.io/slides/tohoku2023r/">https://heavywatal.github.io/slides/tohoku2023r/</a>
</div>


---
## データ解析のおおまかな流れ

1. コンピュータ環境の整備
1. データの取得、読み込み
1. 探索的データ解析
    - 前処理、加工 (地味。意外と重い) 👈次回
    - **可視化、仮説生成** (派手！楽しい！) 👈今回
    - 統計解析、仮説検証 (みんな勉強したがる)
1. 報告、発表

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption><small>https://r4ds.had.co.nz/introduction.html</small></figcaption>
</a>
</figure>

---
## 作図してみると全体像・構造が見やすい

情報の整理 → **正しい解析・新しい発見・仮説生成**

<img src="figure/simplify-diamonds-1.png" alt="plot of chunk simplify-diamonds">

`carat` が大きいほど `price` も高いらしい。<br>
その度合いは `clarity` によって異なるらしい。

---
## 代表値ばかり見て可視化を怠ると構造を見逃す

<figure style="position: relative;">
<a href="https://www.research.autodesk.com/publications/same-stats-different-graphs/">
<img src="/slides/image/rstats/datasaurus.png" width="95%">
<figcaption><small>https://www.research.autodesk.com/publications/same-stats-different-graphs/</small></figcaption>
</a>
<img src="/slides/image/rstats/DataDino-600x455.gif" width="22%"
     style="position: absolute; left: 0; top: 0; z-index: 255;">
</figure>

---
## そうは言ってもセンスでしょ? --- NO!

<figure style="float: right; width: 670px; margin: 1rem 0;">
<a href="https://tsutawarudesign.com/">
<img src="/slides/image/tsutawaru/title-13.svg" style="margin: 0 -20px 0 0;">
<img src="/slides/image/tsutawaru/hajimeni-03.svg" style="margin: 0 -20px 0 0;">
<figcaption><small>https://tsutawarudesign.com/</small></figcaption>
</a>
</figure>

ある程度は**テクニック**であり**教養**。<br>
デザインの基本的なルールを<br>
知りさえすれば誰でも上達する。<br>


---
## おしながき: Rによるデータ可視化とレポート作成

### ✅ <del>データ解析全体の流れ。可視化だいじ</del>

### ⬜ 一貫性のある文法で合理的に描けるggplot2

### ⬜ Rのコードと実行結果をレポートに埋め込むQuarto


---
## `iris`: アヤメ属3種150個体の測定データ

Rに最初から入ってて、例としてよく使われる。


```r
print(iris)
```

```
    Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
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
boxplot(Petal.Width ~ Species, data = iris)
plot(iris$Sepal.Length, iris$Sepal.Width)
hist(iris$Petal.Length)
```

![plot of chunk base-plot-iris](./figure/base-plot-iris-1.png)![plot of chunk base-plot-iris](./figure/base-plot-iris-2.png)![plot of chunk base-plot-iris](./figure/base-plot-iris-3.png)

きれいなグラフを簡単に描けるパッケージを使いたい。

---
## ggplot2: tidyverseの可視化担当

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

- "The <strong><u>G</u></strong>rammar of <strong><u>G</u></strong>raphics" という体系に基づく設計
- 単にいろんなグラフを「描ける」だけじゃなく<br>
  **一貫性のある文法で合理的に描ける**

<br>

![plot of chunk ggplot-iris](./figure/ggplot-iris-1.png)![plot of chunk ggplot-iris](./figure/ggplot-iris-2.png)![plot of chunk ggplot-iris](./figure/ggplot-iris-3.png)


---
## ggplot2: tidyverseの可視化担当

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

- "The <strong><u>G</u></strong>rammar of <strong><u>G</u></strong>raphics" という体系に基づく設計
- 単にいろんなグラフを「描ける」だけじゃなく<br>
  **一貫性のある文法で合理的に描ける**

<figure>
<!--
<a href="https://www.amazon.co.jp/dp/B00HWUVHXK/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=heavywatal-22&linkId=d63d3627df82c09b0bb5ca8f47ee19cc&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00HWUVHXK&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=heavywatal-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=heavywatal-22&language=ja_JP&l=li3&o=9&a=B00HWUVHXK" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<img src="/slides/image/nagoya/iris.png" width="24%">
<img src="/slides/image/nagoya/binhex.png" width="24%">
<img src="/slides/image/nagoya/faithful.png" width="24%">
-->
<img src="/slides/image/tumopp/paper/Fig1.png" height="360">
<img src="/slides/image/tumopp/param-p.png" height="360">
<img src="/slides/image/tumopp/param-k.png" height="360"><br>
<img src="/slides/image/tumopp/paper/Fig3.png" height="180">
<img src="/slides/image/tumopp/Cmoore_Lconst.gif" height="180">
<img src="/slides/image/tumopp/Cmoore_Llinear.gif" height="180">
<img src="/slides/image/tumopp/Chex_Lconst.gif" height="180">
<img src="/slides/image/tumopp/Chex_Llinear.gif" height="180">
<figcaption><small>Iwasaki and Innan (2017)</small></figcaption>
</figure>

---
## いきなりggplot2から使い始めても大丈夫

R標準のやつとは根本的に違うシステムで作図する。

<figure>
<img src="/slides/image/rstats/r-graphics.svg" height="600">
<figcaption><small>「<cite>Rグラフィックス</cite>」Murrell著 久保訳 より改変</small></figcaption>
</figure>

---
## 基本的な使い方: 指示を `+` で重ねていく

<img src="/slides/image/rstats/ggplot-layers.png" height="930">

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds)             # diamondsデータでキャンバス準備
# aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
# geom_point() +                    # 散布図を描く
# facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
# stat_smooth(method = lm) +        # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus1](./figure/ggplot-plus1-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price)         # carat,price列をx,y軸にmapping
# geom_point() +                    # 散布図を描く
# facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
# stat_smooth(method = lm) +        # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus2](./figure/ggplot-plus2-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point()                      # 散布図を描く
# facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
# stat_smooth(method = lm) +        # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus3](./figure/ggplot-plus3-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point() +                    # 散布図を描く
  facet_wrap(vars(clarity))         # clarity列に応じてパネル分割
# stat_smooth(method = lm) +        # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus4](./figure/ggplot-plus4-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point() +                    # 散布図を描く
  facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
  stat_smooth(method = lm)          # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus5](./figure/ggplot-plus5-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point() +                    # 散布図を描く
  facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
  stat_smooth(method = lm) +        # 直線回帰を追加
  coord_cartesian(ylim = c(0, 2e4))   # y軸の表示範囲を狭く
# theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus6](./figure/ggplot-plus6-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point() +                    # 散布図を描く
  facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
  stat_smooth(method = lm) +        # 直線回帰を追加
  coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
  theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus7](./figure/ggplot-plus7-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく


```r
ggplot(data = diamonds) +           # diamondsデータでキャンバス準備
  aes(x = carat, y = price) +       # carat,price列をx,y軸にmapping
  geom_point() +                    # 散布図を描く
# facet_wrap(vars(clarity)) +       # clarity列に応じてパネル分割
# stat_smooth(method = lm) +        # 直線回帰を追加
# coord_cartesian(ylim = c(0, 2e4)) + # y軸の表示範囲を狭く
  theme_classic(base_size = 20)     # クラシックなテーマで
```

![plot of chunk ggplot-plus8](./figure/ggplot-plus8-1.png)


---
## 途中経過オブジェクトを取っておける


```r
p1 = ggplot(data = diamonds)
p2 = p1 + aes(x = carat, y = price)
p3 = p2 + geom_point()
p4 = p3 + facet_wrap(vars(clarity))
print(p3)
```

![plot of chunk ggplot-object](./figure/ggplot-object-1.png)

この `p3` は後で使います。

---
## ひとまずggplotしてみよう

自動車のスペックに関するデータ `mpg` を使って。


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 排気量 `displ` と市街地燃費 `cty` の関係を散布図で。

![plot of chunk ggplot-mpg](./figure/ggplot-mpg-1.png)

---
## よくあるエラー

関数名を `ggplot2` と書いちゃうと勘違い:
```
> ggplot2(diamonds)
Error in ggplot2(diamonds) : could not find function "ggplot2"
```

**ggplot2** はパッケージ名。<br>
今度こそ関数名は合ってるはずなのに...
```
> ggplot(diamonds)
Error in ggplot(diamonds) : could not find function "ggplot"
```

パッケージ読み込みを忘れてた。新しくRを起動するたびに必要:
```r
library(conflicted) # 安全のおまじない
library(tidyverse)  # including ggplot2
ggplot(diamonds)    # OK!
```

そのほか [よくあるエラー集 (石川由希さん@名古屋大)](https://comicalcommet.github.io/r-training-2022/R_training_2022_7.html) を参照。


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
      carat       cut color clarity depth table price    x    y    z
    1  0.23     Ideal     E     SI2  61.5    55   326 3.95 3.98 2.43
    2  0.21   Premium     E     SI1  59.8    61   326 3.89 3.84 2.31
    3  0.23      Good     E     VS1  56.9    65   327 4.05 4.07 2.31
    4  0.29   Premium     I     VS2  62.4    58   334 4.20 4.23 2.63
   --                                                               
53937  0.72      Good     D     SI1  63.1    55  2757 5.69 5.75 3.61
53938  0.70 Very Good     D     SI1  62.8    60  2757 5.66 5.68 3.56
53939  0.86   Premium     H     SI2  61.0    58  2757 6.15 6.12 3.74
53940  0.75     Ideal     D     SI2  62.2    55  2757 5.83 5.87 3.64
```

<small><https://r4ds.hadley.nz/data-tidy.html>; <https://speakerdeck.com/fnshr/zheng-ran-detatutenani></small>


---
## Aesthetic mapping でデータと見せ方を紐付け

`aes()` の中で列名を指定する。


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(mapping = aes(color = clarity, size = cut))
```

![plot of chunk aes-map](./figure/aes-map-1.png)

---
## データによらず一律でaestheticsを変える

`aes()` の外で値を指定する。


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(color = "darkorange", size = 6, alpha = 0.4)
```

![plot of chunk aes-nomap](./figure/aes-nomap-1.png)


---
## 外の `aes()` は全ての `geom_*()` に波及する


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(aes(color = clarity)) +
  geom_line()             # NO color
ggplot(diamonds) +
  aes(x = carat, y = price, color = clarity) +
  geom_point() +          # color
  geom_line()             # color
```

![plot of chunk aes-global-local](./figure/aes-global-local-1.png)![plot of chunk aes-global-local](./figure/aes-global-local-2.png)

---
## [aesthetics一覧](https://ggplot2.tidyverse.org/articles/ggplot2-specs.html)

- [色・透明度を変える](https://ggplot2.tidyverse.org/reference/aes_colour_fill_alpha.html)
  - `color`: 点、線、文字の色
  - `fill`: 面の色
  - [`alpha`](https://ggplot2.tidyverse.org/reference/scale_alpha.html): 不透明度 (0が透明、1が不透明)
- [大きさ・形を変える](https://ggplot2.tidyverse.org/reference/aes_linetype_size_shape.html)
  - [`size`](https://ggplot2.tidyverse.org/reference/scale_size.html),
    [`shape`](https://ggplot2.tidyverse.org/reference/scale_shape.html): 点の大きさや形
  - [`linewidth`](https://ggplot2.tidyverse.org/reference/scale_linewidth.html),
    [`linetype`](https://ggplot2.tidyverse.org/reference/scale_linetype.html): 線の太さや種類
- [単にグループ分けする](https://ggplot2.tidyverse.org/reference/aes_group_order.html)
  - `group`: 折れ線グラフやポリゴンの切り分けなど
- [座標、始点、終点](https://ggplot2.tidyverse.org/reference/aes_position.html)
  - **`x`**, **`y`**, `xmin`, `xmax`, `ymin`, `ymax`, `xend`, `yend`


---
## 点と線と文字は `color`, 面は `fill`

不透明度は `alpha`


```r
ggplot(diamonds) +
  aes(cut, carat) +
  geom_boxplot(color = "royalblue", fill = "gold", alpha = 0.5, linewidth = 2)
```

![plot of chunk fill](./figure/fill-1.png)

---
## 色の変え方の練習

自動車のスペックに関するデータ `mpg` を使って。


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 排気量 `displ` と市街地燃費 `cty` の関係を青い散布図で描こう<br>
🔰 駆動方式 `drv` やシリンダー数 `cyl` によって色を塗り分けしてみよう

![plot of chunk ggplot-mpg-color](./figure/ggplot-mpg-color-1.png)

---
## 色の見え方は人によって違う

<span style="color: #F8766D;">赤</span>
<span style="color: #00BA38;">緑</span>
<span style="color: #619CFF;">青</span>の3色を使った先ほどの図は多くの人には問題なさそう。<br>
しかし5%くらいの人には右のように<span style="color: #B6A86A;">赤</span>
<span style="color: #AC9C45;">緑</span>
<span style="color: #5A96FD;">青</span> や
<span style="color: #FF6074;">赤</span>
<span style="color: #00B5A0;">緑</span>
<span style="color: #00B2C1;">青</span>の2色に見えている。

![plot of chunk color-vision-diversity](./figure/color-vision-diversity-1.png)![plot of chunk color-vision-diversity](./figure/color-vision-diversity-2.png)![plot of chunk color-vision-diversity](./figure/color-vision-diversity-3.png)

MacやiOSなら[Sim Daltonism](https://michelf.ca/projects/sim-daltonism/)というアプリでシミュレーションできる。<br>
Windowsなら[Color Oracle](https://colororacle.org/)が使えそう。

---
## 多様性を前提によく考えられたパレットもある

Sequential palette:<br>
![plot of chunk palette-sequential](./figure/palette-sequential-1.png)![plot of chunk palette-sequential](./figure/palette-sequential-2.png)![plot of chunk palette-sequential](./figure/palette-sequential-3.png)

Diverging palette:<br>
![plot of chunk palette-diverging](./figure/palette-diverging-1.png)![plot of chunk palette-diverging](./figure/palette-diverging-2.png)![plot of chunk palette-diverging](./figure/palette-diverging-3.png)

Qualitative (categorical, discrete) palette:<br>
![plot of chunk palette-qualitative](./figure/palette-qualitative-1.png)![plot of chunk palette-qualitative](./figure/palette-qualitative-2.png)![plot of chunk palette-qualitative](./figure/palette-qualitative-3.png)

---
## 色パレットの変更 `scale_color_*()`

[viridis](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html)
と
[ColorBrewer](https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=5)
のパレットはggplot2に組み込まれているので簡単。<br>
上記リンクから名前を探して、`option =` か `palette =` で指定。


```r
ggplot(diamonds) + aes(carat, price) +
  geom_point(mapping = aes(color = clarity)) +
  scale_color_viridis_d(option = "inferno")
# scale_color_brewer(palette = "YlGnBu")
```

![plot of chunk scale-color](./figure/scale-color-1.png)![plot of chunk scale-color](./figure/scale-color-2.png)

---
## 連続値(continuous)と離散値(discrete)を区別する

渡す値とscale関数が合ってないと怒られる:<br>
`Error: Continuous value supplied to discrete scale`


```r
ggplot(diamonds) + aes(carat, price) +
  geom_point(mapping = aes(color = price)) +
  scale_color_viridis_c(option = "inferno")
# scale_color_distiller(palette = "YlGnBu")
```

![plot of chunk scale-color-continuous](./figure/scale-color-continuous-1.png)![plot of chunk scale-color-continuous](./figure/scale-color-continuous-2.png)

- discrete: `scale_color_viridis_d()`, `scale_color_brewer()`
- continuous: `scale_color_viridis_c()`, `scale_color_distiller()`
- binned: `scale_color_viridis_b()`, `scale_color_fermenter()`

---
## viridisやbrewer以外のパレットを使うには

R標準の `palette.colors()` や
[colorspaceパッケージ](https://colorspace.r-forge.r-project.org/articles/ggplot2_color_scales.html)
を使う。


```r
okabe_ito = palette.colors(9L, "Okabe-Ito")
ggplot(mpg) +
  aes(x = displ, y = cty) +
  geom_point(aes(color = drv), size = 4, alpha = 0.66) +
  scale_color_discrete(type = unname(okabe_ito)[-1])
# scale_color_discrete(type = palette.colors(8L, "R4")[-1])
# colorspace::scale_colour_discrete_divergingx("Zissou 1")
```

![plot of chunk other-palettes](./figure/other-palettes-1.png)![plot of chunk other-palettes](./figure/other-palettes-2.png)![plot of chunk other-palettes](./figure/other-palettes-3.png)

自分で全色個別指定もできるが、専門家の考えたセットを使うのが無難。


---
## `scale_color_*` を省略できるように設定することも可能

連続値viridis, 離散値Okabe-Itoをデフォルトにする例:
```r
grDevices::palette("Okabe-Ito")
options(
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis",
  ggplot2.discrete.colour = grDevices::palette()[-1],
  ggplot2.discrete.fill = grDevices::palette()[-1]
)
```

`options()` による設定はRを終了するまで有効。


---
## 値に応じてパネル切り分け (1変数facet)

ggplotの真骨頂！
これをR標準機能でやるのは結構たいへん。


```r
p3 + facet_wrap(vars(clarity), ncol = 4L)
```

![plot of chunk facet-wrap](./figure/facet-wrap-1.png)

---
## 値に応じてパネル切り分け (≥2変数facet)

ggplotの真骨頂！
これをR標準機能でやるのは結構たいへん。


```r
p3 + facet_grid(vars(clarity), vars(cut))
```

![plot of chunk facet-grid](./figure/facet-grid-1.png)

---
## 多変量データの俯瞰、5次元くらいまで有効

![plot of chunk facet-diamonds](./figure/facet-diamonds-1.png)

---
## 値に応じたfacetの練習

自動車のスペックに関するデータ `mpg` を使って。


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 駆動方式 `drv` やシリンダー数 `cyl` によってfacetしてみよう

![plot of chunk ggplot-mpg-facet](./figure/ggplot-mpg-facet-1.png)


---
## 値を変えず座標軸を変える [`scale_*`](https://ggplot2.tidyverse.org/reference/#section-scales), [`coord_*`](https://ggplot2.tidyverse.org/reference/#section-coordinate-systems)


```r
ggplot(diamonds) + aes(carat, price) + geom_point(alpha = 0.25) +
  scale_x_log10() +
  scale_y_log10(breaks = c(1, 2, 5, 10) * 1000) +
  coord_cartesian(xlim = c(0.1, 10), ylim = c(800, 12000)) +
  labs(title = "Diamonds", x = "Size (carat)", y = "Price (USD)")
```

![plot of chunk scale-axis](./figure/scale-axis-1.png)

---
## データと関係ない部分の見た目を調整 `theme`

[既存の `theme_*()`](https://ggplot2.tidyverse.org/reference/ggtheme.html)
をベースに、[`theme()`](https://ggplot2.tidyverse.org/reference/theme.html)関数で微調整。


```r
p3 + theme_bw(base_size = 18) + theme(
  panel.background = element_rect(fill = "khaki"),      # 箱
  panel.grid       = element_line(color = "royalblue"), # 線
  axis.title.x     = element_text(size = 32),           # 文字
  axis.text.y      = element_blank()                    # 消す
)
```

![plot of chunk theme](./figure/theme-1.png)

---
## 基本的な使い方: 指示を `+` で重ねていく

<img src="/slides/image/rstats/ggplot-layers.png" height="930">

---
## 論文のFigureみたいに並べる

別のパッケージ
([cowplot](https://wilkelab.org/cowplot/)
や
[patchwork](https://patchwork.data-imaginist.com/))
の助けを借りて


```r
pAB = cowplot::plot_grid(p3, p3, labels = c("A", "B"), nrow = 1L)
cowplot::plot_grid(pAB, p3, labels = c("", "C"), ncol = 1L)
```

![plot of chunk cowplot](./figure/cowplot-1.png)

---
## ファイル名もサイズも再現可能な作図

`width`や`height`が小さいほど、文字・点・線が相対的に大きく

```r
# 7inch x 300dpi = 2100px四方 (デフォルト)
ggsave("dia1.png", p3) # width = 7, height = 7, dpi = 300
# 4     x 300    = 1200  全体7/4倍ズーム
ggsave("dia2.png", p3, width = 4, height = 4) # dpi = 300
# 2     x 600    = 1200  全体をさらに2倍ズーム
ggsave("dia3.png", p3, width = 2, height = 2, dpi = 600)
# 4     x 300    = 1200  テーマを使って文字だけ拡大
ggsave("dia4.png", p3 + theme_bw(base_size = 22), width = 4, height = 4)
```

<figure>
<img src="../sendair2/image/dia1.png" width="24%">
<img src="../sendair2/image/dia2.png" width="24%">
<img src="../sendair2/image/dia3.png" width="24%">
<img src="../sendair2/image/dia4.png" width="24%">
</figure>


---
## 日本語が◻️◻️◻️豆腐にならないための設定

環境設定 → General → Graphics → Backend: [**AGG**](https://ragg.r-lib.org/)

<figure>
<img src="/slides/image/rstudio/options-graphics-agg.png" width="80%">
</figure>

英数字以外を使わずに済ませられればそれに越したことはないけど...

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
<img src="/slides/image/cheatsheet/data-visualization.png" width="100%">
<figcaption><small>https://ggplot2.tidyverse.org/</small></figcaption>
</a>
</figure>

---
## 微調整してくと最終的に長いコードになるね...

うん。でもすべての点について後から確認できるし、使い回せる！


```r
set.seed(1)
p = ggplot(diamonds) +
  aes(x = cut, y = price) +
  geom_jitter(aes(color = cut), height = 0, width = 0.2, alpha = 0.1, stroke = 0) +
  geom_boxplot(fill = NA, outlier.shape = NA) +
  scale_color_viridis_d(option = "plasma") +
  facet_wrap(vars(clarity)) +
  coord_flip(xlim = c(0.5, 5.5), ylim = c(0, 20000), expand = FALSE) +
  labs(title = "Diamonds", x = "Cut", y = "Price (USD)") +
  theme_bw(base_size = 20) +
  theme(legend.position = "none",
        axis.ticks = element_blank(),
        panel.grid.major.y = element_blank(),
        panel.spacing.x = grid::unit(3, "lines"),
        plot.margin = grid::unit(c(1, 2, 0.5, 0.5), "lines"))
print(p)
ggsave("diamonds-cut-price.png", p, width = 12, height = 9)
```

---
## 発展的な内容

ggplot2を[さらに拡張するパッケージも続々](https://exts.ggplot2.tidyverse.org/)
: アニメーション [gganimate](https://gganimate.com/)
: 重なりを避けてラベル付け [ggrepel](https://ggrepel.slowkow.com/)
: グラフ/ネットワーク [ggraph](https://ggraph.data-imaginist.com/)
: 系統樹 [ggtree](https://github.com/YuLab-SMU/ggtree)
: 地図 [`geom_sf`](https://ggplot2.tidyverse.org/reference/ggsf.html#examples)
: 学術論文向けのいろいろ [ggpubr](https://github.com/kassambara/ggpubr)

<img src="/slides/image/tumopp/driver.gif" align="right" height="200">

ggplot2は3Dが苦手
: 本当に3Dが必要? 色分けやファセットで足りない?
: 別のパッケージでやる:
  [rgl](http://rgl.neoscientists.org/gallery.shtml),
  [plotly](https://plotly.com/r/3d-charts/), etc.


---
## 🔰 1日目の課題1: 模写

下図になるべく似るように作図・調整してください。<br>

![plot of chunk ggplot-homework](./figure/ggplot-homework-1.png)

- 細かい設定まで見逃さないように、班で協力しましょう。


---
## 🔰 1日目の課題2: 未登場の関数・オプションを紹介

1. ggplot2に関して本講義で説明されなかった関数やオプションを探す。<br>
   [公式サイト](https://ggplot2.tidyverse.org/)や解説ブログなどを参考に。
1. それを使って、作図してみる。
1. 「この講義を受けてggplot2の基礎はわかった」くらいの友達に紹介するつもりで、
   **使い方の説明をレポートに書く**。
   どういうときに使えそうか、が説明できるとなお良い。

<hr>

説明文、Rコード、実行結果、図。<br>
それらをひとまとめに扱えるようなシステムがあるらしい...


---
## おしながき: Rによるデータ可視化とレポート作成

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

### ✅ データ解析全体の流れ。可視化だいじ

### ✅一貫性のある文法で合理的に描けるggplot2

- aesthetic mapping が鍵
- 色覚多様性を意識
- 画像出力まできっちりプログラミング

### ⬜ Rのコードと実行結果をレポートに埋め込むQuarto



---
## Rコードの実行結果をとっておきたい

スクリプト.Rさえ保存しておけばいつでも実行できるけど... **面倒**

`ggsave()` で画像を書き出しておけるけど... **どのコードの結果か分からない**

→ **スクリプトと実行結果を一緒に見渡せる形式**が欲しい。


```r
3 * 14
ggplot(mpg) + aes(displ, hwy) + geom_point(aes(color = drv))
```

```
[1] 42
```

![plot of chunk hello](./figure/hello-1.png)


---
## Quarto Document として研究ノートを作る

<a href="https://quarto.org/">
<img src="/_img/hex-stickers/quarto.webp" width="160" align="right">
</a>

プログラミングからレポート作成まで一元管理できて楽ちん。

- 本文とRコードを含むテキストファイル.qmdを作る。
- HTML, PDFなどリッチな形式に変換して読む。
  - コードだけでなく実行結果の**図**や**表**も埋め込める。

<hr>

<a href="https://rmarkdown.rstudio.com/">
<img src="/_img/hex-stickers/rmarkdown.webp" width="160" align="right">
</a>

Quarto Markdown (`.qmd`)
: **Markdown**亜種。RやPythonのコードと図表を埋め込める。
: Quarto登場前にほぼR専用だった `.Rmd` と使い勝手は同じ。

Markdown (`.md`)
: 最もよく普及している**軽量マークアップ言語**のひとつ。
: 微妙に異なる方言がある。qmdで使うのは Pandoc Markdown 。

(どんなものが作れるのか
[作成例ギャラリー](https://quarto.org/docs/gallery/)
を見てみよう。)

---
## マークアップ言語

文書の構造や視覚的修飾を記述するための言語。<br>
e.g., **HTML**+CSS, XML, LaTeX

```html
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
</div>

表現力豊かで強力だが人間が読み書きするには複雑すぎ、機械寄り。

(好きなウェブサイトのHTMLソースコードを見てみよう。)


---
## 軽量マークアップ言語

**マークアップ言語**の中でも人間が読み書きしやすいもの。<br>
e.g., **Markdown**, reStructuredText, 各種Wiki記法など

```md
### 見出し3

ここは段落。
*強調(italic)*、
**強い強調(bold)**、
[リンク](https://www.lifesci.tohoku.ac.jp/)とか。
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
</div>


---
## Quartoする環境は既に整っているはず



- **R (≥ 4.2.3)**: 最新版 – 0.1 くらいまでが許容範囲
- **RStudio (≥ 2023.03.0+386)**: Quarto CLI を同梱
- **tidyverse (≥ 2.0.0)**: 次の2つを自動インストール
  - rmarkdown (≥ 2.21)
  - knitr (≥ 1.42)

(示してあるバージョンは最低要件ではなく私の現在の環境の)

<hr>

- [Quarto CLI](https://quarto.org/docs/get-started/):
  最新版を求めるなら手動で入れる。
- [`install.packages("quarto")`](https://github.com/quarto-dev/quarto-r):
  多くの人には不要。
  Quarto CLIをRコマンドで呼べるようにするだけ。
- [pandoc](https://pandoc.org/): Quarto CLI に同梱。
  手動で最新版を入れてもRStudio+Quartoがそれを使うかは不明。

---
## Markdown記法で書いてみよう

1. RStudio > New File > Markdown File
   <img src="/slides/image/rstudio/new-markdown.png" width="60%">
1. ["markdown 記法"で検索](https://duckduckgo.com/?q=markdown+syntax)して何か書く。
   最低限、次の概念を含むように:
   - 見出し1, 2, 3
   - コードブロック、インラインコード
   - 箇条書き (番号あり・なし)
1. <kbd>Preview</kbd>ボタンで確認

---
## Quarto Document を作ってみよう

RStudio > New File > Quarto Document...<br>
(DocumentとHTMLを選択し、)タイトルと著者を埋めて、OK。

<img src="/slides/image/rstudio/new-quarto-document.png" width="100%">

---
## 普通のmdには無いqmdの特徴

ヘッダー (フロントマター)
: 最上部の `---` で挟まれた部分。
  文書全体に関わるメタデータを入力。
: オプションは出力形式によって異なる。
  e.g., [`html`](https://quarto.org/docs/output-formats/html-basics.html)

R code chunk
: `` ```{r} `` のように始まるコードブロック。
: コードの実行結果を最終産物に埋め込める。
: [オプションがいろいろある](https://quarto.org/docs/computations/execution-options.html)。e.g.,
  - `echo: false`: コードを非表示。結果は表示。
  - `eval: false`: コードを実行せず表示だけ。
  - `include: false`: コードも結果も表示せず、実行だけする。
  - `fig.width: 7`, `fig.height: 7`: 図の大きさを制御。

まあ細かいことは必要になってから調べるとして...

---
## qmdをHTMLに変換してみよう

左のqmdを "→Render" すると右のができる。手順は次スライド。

<div>
<img src="/slides/image/rstudio/quarto-viewer.png" width="100%">
</div>

---
## qmdをHTMLに変換してみよう

1. ソースコードに名前をつけて保存 <kbd>command</kbd><kbd>s</kbd><br>
   e.g., `report.qmd`
1. ⚙️ ボタンから "Preview in Viewer Pane" を選択。
1. "→Render" を押す。
   - 埋め込まれたRコードが実行される。
   - 実行結果を含むMarkdownが作られる。
   - MarkdownからHTMLに変換される。 e.g., `report.html`
   - プレビューが自動的に開く。
1. 編集 → 保存 → Render を繰り返して作り込む。


---
## レポートの体裁の例

左のようなqmdを作ってRenderし、右のようなHTMLファイルを提出。

<div>
<img src="../tohoku2023r/image/report-example.webp" width="90%"></img>
</div>


---
## 🔰 レポート (締切: 2023-05-18)

- 酒井先生のレポート講座5/8を受けてから提出。
- 課題: 講義資料の🔰若葉マークすべて。
- 様式: Quarto Markdownで書き、Render済みHTMLを提出。
  - 1日分で1ファイル、それぞれClassroomトピックに提出。計4つ。
  - `{ID}-{name}-day{d}.html`, e.g., `C0SB0000-iwasaki-day2.html`
  - `embed-resources: true` で画像などを埋め込んだ独立HTML。
- 評価ポイント
  - エラーも警告も無くコードが走る。
  - 文書の構造や図が視覚的に見やすく整理されている。
  - 半年後の自分が読んでわかるような `# 親切コメント`。
- 手抜きポイント
  - 生物学的な意義があるか、みたいなのはほぼ不問。

---
## 今日の残り時間

- 班やTAに相談し、消化しきれなかった部分をなるべく解消する。
- 課題1 模写を `ggsave()` まできっちりやる。
- TAが班の代表画像を評価し、合格した班から解散。
- 残ってほかの課題に取り組んでもOK。


---
## 参考

R for Data Science --- Hadley Wickham and Garrett Grolemund
: https://r4ds.had.co.nz/
: [Book](https://amzn.to/2tbRmVc)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2022/)」
   岩嵜航 2022 東京医科歯科大
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2022/)」
   石川由希 2022 名古屋大学

ggplot2公式ドキュメント
: https://ggplot2.tidyverse.org/

<a href="3-structure1.html" class="readmore">
3. データ構造の処理1: 抽出、集約など。
</a>
