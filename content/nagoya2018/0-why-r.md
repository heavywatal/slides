+++
url = "nagoya2018/0-why-r.html"
title = "nagoya2018-0: どうしてRを使うの？"
linktitle = "どうしてRを使うの？"
date = 2018-05-18T15:00:00+09:00
type = "reveal"
draft = false
+++

# Rにやらせて<ruby>楽<rt>ラク</rt></ruby>しよう <span class="subtitle">— データの可視化と下ごしらえ</span>

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
総研大 先導科学研究科<br>
(SOKENDAI, The Graduate University for Advanced Studies)
</div>

<style>
.reveal .current-deck {font-weight: bold;}
.reveal .subtitle {font-size: 90%;}
</style>
<ol start="0">
<li class="current-deck"><a href="0-why-r.html">どうしてRを使うの？</a>
<li><a href="1-basic-r.html">Rの基本</a>
<li><a href="2-ggplot.html">R + ggplot2 — きれいなグラフを簡単に合理的に</a>
<li><a href="3-tidy-data.html">R + tidyverse — 使える形にデータを整える</a>
</ol>

<div class="footnote">
2018-05-18
名古屋大学 アドバンス生命理学特論 IGER Seminar
</div>

---
## 科学の営み = 巨人の肩に立つ

<figure style="position: absolute; top: 32px; right: 40px;">
<a href="https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants">
<img src="/slides/image/free/Orion_aveugle_cherchant_le_soleil.jpg" width="240">
<figcaption class="url">
https://en.wikipedia.org/wiki/<br>Standing_on_the_shoulders_of_giants
</figcaption>
</a>
</figure>

先人たちの積み重ねに基づいて、新しい発見をする

記録を残すことは何より重要
: 実験や野外観察では些細なことも漏らさず記録。
: 生データは何重にもバックアップ。
: みんな結構できてる(はず)。

データの整理・解析・作図も不可欠、だけど
: 再現不能の職人技で切り抜けちゃう人も多い。
: コピペ、メニュー選択、配色と配置を微調整...

疑義が生じたら...？ 別の人がその研究を発展させたいとき...？
: ❌「ありまぁす！」
: ⭕「誰でも確実に再現できるプロトコルがこちらです」

**Reproducible Research (再現可能な研究)** が巨人を大きくする。

---
## 再現不可能な職人的研究の例

動物園の混合展示で、各種動物はどのように分布・行動しているか、<br>
それらを決める要因は何か。膨大な観察データに基づく超大作卒論。

<figure>
<img src="/slides/image/messy/thesis.png" width="800">
</figure>

---
## 生データ: ここはまだそんなに悪くない

週に1回、各個体の位置と行動を種ごとのファイルに記録。<br>
タブは個体、A列B列はXY座標でそれ以降の列は行動、各行はある時刻。

<figure style="position: relative; margin: 20px 0;">
<img src="/slides/image/messy/dir-0826.png" class="screenshot" height="500">
<img src="/slides/image/messy/file-0826-zebra.png" class="screenshot" height="450"
     style="position: absolute; left: 270px; top: 50px;">
</figure>

---
## マウスとコピペを駆使して条件ごとに複製・集計

ちゃんと合ってるのかな... ファイルもタブもたくさん...

<figure style="position: relative;">
<img src="/slides/image/messy/dir-z.png" class="screenshot" height="550"
     style="position: absolute; z-index: 100;">
<img src="/slides/image/messy/file-z-book1.png" class="screenshot" height="480"
     style="position: absolute; left: 250px; top: 50px;">
</figure>

---
## マウスとコピペを駆使して条件ごとに複製・集計

ちゃんと合ってるのかな... ファイルもタブもたくさん...

<figure style="position: relative;">
<img src="/slides/image/messy/dir-z.png" class="screenshot" height="550"
     style="position: absolute; z-index: 100;">
<img src="/slides/image/messy/file-z-book1.png" class="screenshot" height="480"
     style="position: absolute; left: 250px; top: 50px;">
<img src="/slides/image/messy/file-z-z-behavior-z1e.png" class="screenshot" height="480"
     style="position: absolute; left: 30px; top: 20px; z-index: 200;">
<img src="/slides/image/messy/file-z-z-behavior-z1p.png" class="screenshot" height="480"
     style="position: absolute; left: 260px; top: 40px; z-index: 300;">
</figure>

---
## 目と手で数え、濃淡を計算し、画像ソフトで塗る

泣きながら何十枚も...。無料期間が終わって今は使えない...。

<figure style="position: relative; margin: 20px 0;">
<img src="/slides/image/messy/file-z-z2-habitat.png" class="screenshot" width="105%">
<img src="/slides/image/messy/photoshop.jpg" width="530"
     style="position: absolute; left: 200px; top: -10px;">
</figure>
<img src="/slides/image/messy/zebra_AM.jpg" width="300">
<img src="/slides/image/messy/zebra_PM.jpg" width="300">

---
## 目作業・手作業 ＝ シーシュポスの岩

<figure style="float: right;">
<a href="https://en.wikipedia.org/wiki/Sisyphus">
<img src="/slides/image/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="320">
<figcaption class="url">https://en.wikipedia.org/wiki/Sisyphus</figcaption>
</a>
</figure>

- 膨大な単純作業がそもそもツラい
- 人間だもの、ミスは防ぎきれない
- なるべくミスを防ぐためのチェックもツラい
- ミスを発見 → 初めからやり直し
- 新たなデータ・研究 → 初めからやり直し
- 熟練してもツラいまま
- そのときの自分しかできない、記録に残らない<br>
  → 検証のしようがない
- 卒論なら努力賞でいいかもしれないけど、科学の手続きとしては問題。

---
## プログラミングで大量のファイルを捌く

先の例に負けず生データはどっさり。でも頑張るのは機械。

<figure>
<img src="/slides/image/tek/finder.png" height="420">
<img src="/slides/image/tek/fig5.png" height="420">
<figcaption class="url">(submitted)</figcaption>
</figure>

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
## Rにやらせて楽しよう

- 規則性のある退屈な仕事は人間よりも機械のほうが得意。
- 一度書いたプログラムは、データが変わっても**使いまわせる**。
- **自分以外の人でも再現・検証**できる
- **きれいな図を簡単に**描ける
- 部分的に改変しながらいろんな解析を試せる。<br>
  → **仮説検証** だけでなく、 **仮説生成(探索的データ解析)** もやりやすい
- やれば上達する。

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
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

ほかのプログラミング言語でもできなくはない。<br>
Pythonもいいよ。


---
## 本講義の目標

### <strike>まっとうな科学を、もっと楽にやりたいな</strike> (済)

### あれもこれもRでやれそうだな

### やりたくなったらこのへんを調べればいいんだな

<br>
この3点さえ押さえれば、具体的なやり方は覚えなくても大丈夫

この発表スライドもオンラインで読める
<br>
https://heavywatal.github.io/slides/


---
## 参考

再現可能性のすゝめ --- 高橋康介(著) 石田基広(監修)
: <a href="https://www.amazon.co.jp/gp/product/4320112431/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li3&tag=heavywatal-22&linkId=31a5a582668029b751a57b8846353978" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4320112431&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=heavywatal-22" height="150px"></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=heavywatal-22&l=li3&o=9&a=4320112431" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

R for Data Science --- Hadley Wickham and Garrett Grolemund
: https://r4ds.had.co.nz/
: [英語版書籍](https://amzn.to/2tbRmVc)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

協力
: 総研大 博士課程 M. S. さん (現在はRユーザー)

<a href="1-basic-r.html" rel="next" class="readmore">
1. Rの基本
</a>
