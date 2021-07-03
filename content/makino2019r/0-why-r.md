+++
url = "makino2019r/0-why-r.html"
title = "Why do we use R? — Hands-on R Lecture for Makino Lab"
linktitle = "Why do we use R?"
date = 2019-10-09T14:00:00+09:00
type = "reveal"
draft = false
+++

<link rel="stylesheet" href="style.css">

# [Hands-on R Lecture for Makino Lab](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野
</div>

<ol start="0">
<li class="current-deck"><a href="0-why-r.html">Why do we use R?</a>
<li><a href="1-basic-r.html">R basics</a>
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
## 科学の営み = 巨人の肩に立つ

<figure style="position: absolute; top: 32px; right: 40px;">
<a href="https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants">
<img src="/slides/figure/free/Orion_aveugle_cherchant_le_soleil.jpg" width="240">
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

データ整理・解析・作図も不可欠、だけど...
: 再現不能の職人技で切り抜けちゃう人も多い。
: コピペ、メニュー選択、配色と配置を微調整...

疑義が生じたら...？ 別の人がその研究を発展させたいとき...？
: 💩「ありまぁす！」
: ✅「誰でも確実に再現できるプロトコルがこちらです」

**Reproducible Research (再現可能な研究)** が巨人を大きくする。

---
## 再現不可能な職人的研究の例

動物園の混合展示で、各種動物はどのように分布・行動しているか、<br>
それらを決める要因は何か。膨大な観察データに基づく超大作卒論。

<figure>
<img src="/slides/figure/messy/thesis.png" width="800">
</figure>

---
## 生データ: ここはまだそんなに悪くない

週に1回、各個体の位置と行動を種ごとのファイルに記録。<br>
タブは個体、A列B列はXY座標でそれ以降の列は行動、各行はある時刻。

<figure style="position: relative; margin: 20px 0;">
<img src="/slides/figure/messy/dir-0826.png" class="screenshot" height="500">
<img src="/slides/figure/messy/file-0826-zebra.png" class="screenshot" height="450"
     style="position: absolute; left: 270px; top: 50px;">
</figure>

---
## マウスとコピペを駆使して条件ごとに複製・集計

ちゃんと合ってるのかな... ファイルもタブもたくさん...

<figure style="position: relative;">
<img src="/slides/figure/messy/dir-z.png" class="screenshot" height="550"
     style="position: absolute; z-index: 100;">
<img src="/slides/figure/messy/file-z-book1.png" class="screenshot" height="480"
     style="position: absolute; left: 250px; top: 50px;">
</figure>

---
## マウスとコピペを駆使して条件ごとに複製・集計

ちゃんと合ってるのかな... ファイルもタブもたくさん...

<figure style="position: relative;">
<img src="/slides/figure/messy/dir-z.png" class="screenshot" height="550"
     style="position: absolute; z-index: 100;">
<img src="/slides/figure/messy/file-z-book1.png" class="screenshot" height="480"
     style="position: absolute; left: 250px; top: 50px;">
<img src="/slides/figure/messy/file-z-z-behavior-z1e.png" class="screenshot" height="480"
     style="position: absolute; left: 30px; top: 20px; z-index: 200;">
<img src="/slides/figure/messy/file-z-z-behavior-z1p.png" class="screenshot" height="480"
     style="position: absolute; left: 260px; top: 40px; z-index: 300;">
</figure>

---
## 目と手で数え、濃淡を計算し、画像ソフトで塗る

泣きながら何十枚も...。無料期間が終わって今は使えない...。

<figure style="position: relative; margin: 20px 0;">
<img src="/slides/figure/messy/file-z-z2-habitat.png" class="screenshot" width="105%">
<img src="/slides/figure/messy/photoshop.jpg" width="530"
     style="position: absolute; left: 200px; top: -10px;">
</figure>
<img src="/slides/figure/messy/zebra_AM.jpg" width="300">
<img src="/slides/figure/messy/zebra_PM.jpg" width="300">

---
## 目作業・手作業 ＝ シーシュポスの岩

<figure style="float: right;">
<a href="https://en.wikipedia.org/wiki/Sisyphus">
<img src="/slides/figure/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="320">
<figcaption class="url">https://en.wikipedia.org/wiki/Sisyphus</figcaption>
</a>
</figure>

- **膨大な単純作業**がそもそもツラい
- 人間だもの、**ミスは防ぎきれない**
- なるべくミスを防ぐためのチェックもツラい
- ミスを発見 → **初めからやり直し**
- 新たなデータ・研究 → **初めからやり直し**
- 熟練してもツラいまま
- そのときの自分しかできない、記録に残らない<br>
  → **検証のしようがない**
- 卒論なら努力賞でいいかもしれないけど、科学の手続きとしては問題。

---
## プログラミングで大量のファイルを捌く

先の例に負けず生データはどっさり。でも頑張るのは機械。

<figure>
<img src="/slides/figure/tek/finder.png" height="420">
<img src="/slides/figure/tek/fig5.png" height="420">
<figcaption class="url">Iwasaki, Kijima, Innan (2019)</figcaption>
</figure>

---
## こんな感じの図もRでラクラク描けるよ

<figure>
<img src="/slides/figure/tumopp/paper/Fig1.png" height="200">
<img src="/slides/figure/tumopp/neighborhood.png" height="200">
<img src="/slides/figure/tumopp/param-p.png" height="200">
<img src="/slides/figure/tumopp/paper/Fig3.png" height="200">
<img src="/slides/figure/tumopp/param-k.png" height="200">
<img src="/slides/figure/tumopp/driver.gif" height="200"><br>
<img src="/slides/figure/tumopp/Cmoore_Lconst.gif" height="100">
<img src="/slides/figure/tumopp/Cmoore_Llinear.gif" height="100">
<img src="/slides/figure/tumopp/Cmoore_Lstep.gif" height="100">
<img src="/slides/figure/tumopp/Chex_Lconst.gif" height="100">
<img src="/slides/figure/tumopp/Chex_Llinear.gif" height="100">
<img src="/slides/figure/tumopp/Chex_Lstep.gif" height="100">
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
- やれば上達する。どんどん楽になる！

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/figure/r4ds/data-science.png">
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
</figure>

---
## R is a programming language/environment

for statistical computing and graphics

<figure style="float: right;">
<a href="https://cran.r-project.org/">
<img src="/slides/figure/rstats/Rlogo.svg" height="200">
<figcaption class="url">https://cran.r-project.org/</figcaption>
</a>
</figure>

Cross-platform
: Linux, Mac, Windows

Open source
: Free of charge.
: Improved by collective intelligence.

Community
: Easy to find many websites and people to consult.

There are some alternatives.<br>
[Python](https://www.python.org/) is comparable.
[Julia](https://julialang.org/) is rising.


---
## Goal of this hands-on lecture

### ✅ <strike>Want to do reproducible research effortlessly</strike>

### ⬜ Know you can do this and that with R

### ⬜ Know who/where/how to consult

<br>
That's all. You don't have to remember details.

This slide deck is also available online:
<br>
https://heavywatal.github.io/slides/


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

Irreproducible thesis
: SOKENDAI student M. S. (now R user)

<a href="1-basic-r.html" rel="next" class="readmore">
1. R basics
</a>
