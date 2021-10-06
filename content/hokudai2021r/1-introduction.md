+++
url = "hokudai2021r/1-introduction.html"
title = "1. 入門1: データ解析の全体像。Rを使うメリット。Rの基本 — Rにやらせて楽しよう 2021 北大"
linktitle = "入門1: データ解析の全体像。Rを使うメリット。Rの基本。"
date = 2021-09-13T08:45:00+09:00
type = "reveal"
draft = false
+++

<link rel="stylesheet" href="style.css">

# [Rにやらせて楽しよう — データの可視化と下ごしらえ](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li class="current-deck"><a href="1-introduction.html">入門1: データ解析の全体像。Rを使うメリット。Rの基本。</a>
<li><a href="2-visualization.html">入門2: データ可視化の重要性と方法。</a>
<li><a href="3-structure1.html">データ構造の処理1: 抽出、集約など。</a>
<li><a href="4-structure2.html">データ構造の処理2: 結合、変形など。</a>
<li><a href="5-content.html">データ内容の処理: 数値、文字列、日時など。</a>
<li><a href="6-stats-model.html">統計モデリング基礎: 確率分布、尤度、一般化線形モデル</a>
</ol>

<div class="footnote">
2021-09-13 北海道大学 生命科学院 特別講義
<a href="https://heavywatal.github.io/slides/hokudai2021r/">https://heavywatal.github.io/slides/hokudai2021r/</a>
</div>





---
## 研究の基本プロセス

1. 課題を見つける／仮説を立てる
1. 実験🧫・観察🔬・インターネット🏄‍♀️でデータを集める
1. **データを整理する**
1. **データを解析して仮説を検証する**
1. 結果を報告する

<br>

- 実験や観察は研究の半分くらい！
- 残り半分はデータの整理＆解析！


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

<figure style="float: right; margin: 0.7rem 0 0;">
<a href="https://en.wikipedia.org/wiki/Sisyphus">
<img src="/slides/image/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="290">
<figcaption class="url">https://en.wikipedia.org/wiki/Sisyphus</figcaption>
</a>
</figure>

- **膨大な単純作業**がそもそもツラい
- 人間だもの、**ミスは防ぎきれない**
- ミスを減らすためのチェックもツラい
- ミスを発見 → **初めからやり直し**
- 新データ追加 → **初めからやり直し**
- 熟練してもツラいまま
- そのときの自分しかできない、記録に残らない<br>
  → **検証のしようがない**
- 卒論なら努力賞でいいかもしれないけど、科学の手続きとしては問題。

---
## プログラミングで大量のファイルを捌く

先の例に負けず生データはどっさり。でも頑張るのは機械。

<figure>
<img src="/slides/image/tek/finder.png" height="420">
<img src="/slides/image/tek/fig5.png" height="420">
<figcaption class="url">Iwasaki, Kijima, Innan (2019)</figcaption>
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
- やれば上達する。どんどん楽になる！

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
</figure>

---
## Rとは

統計解析と作図の機能が充実したプログラミング言語・環境

<figure style="float: right;">
<a href="https://cran.r-project.org/">
<img src="/slides/image/rstats/Rlogo.svg" height="200">
<figcaption class="url">https://cran.r-project.org/</figcaption>
</a>
</figure>

クロスプラットフォーム
: Linux, Mac, Windows で動く

オープンソース
: 永久に無償で、すべての機能を使える。
: 集合知によって常に進化している。

コミュニティ
: 相談できる人や参考になるウェブサイトがたくさん見つかる。

他のプログラミング言語でもいいよ:
[Python](https://www.python.org/)とか[Julia](https://julialang.org/)とか。


---
## この集中講義の目標

### ✅ <del>再現可能な解析を楽にやりたい気持ちになる</del>

### ⬜ データ解析の基本を身につける

- 全体のおおまかな流れがわかる
- 解析しやすいデータの形を知る

### ⬜ 必要な方法を調べ、実践する力をつける

- Rでできそうなことを把握する
- 困ったときの対処法・相談先を知る

<br>
これさえ押さえれば、個々の方法は覚えなくても大丈夫！


---
## データ解析のおおまかな流れ

1. コンピュータ環境の整備
1. データの取得、読み込み
1. 探索的データ解析
    - **前処理、加工** (地味。意外と重い)
    - **可視化**、仮説生成 (派手！楽しい！) 👈 本日の主題
    - 統計解析、仮説検証 (みんな勉強したがる)
1. 報告、発表

<figure>
<a href="https://r4ds.had.co.nz/introduction.html">
<img src="/slides/image/r4ds/data-science.png">
<figcaption class="url">https://r4ds.had.co.nz/introduction.html</figcaption>
</a>
</figure>


---
## そもそもなぜ解析？ 生の数字見ればよくない？

生データは情報が多すぎて関係性も何も見えない


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

ダイヤモンド53,940個について10項目の値を持つデータセット


---
## 要約統計量(平均とか分散とか)を見てみる

各列の**平均**とか**標準偏差**とか:


```
   stat carat depth table    price     x     y     z
  <chr> <dbl> <dbl> <dbl>    <dbl> <dbl> <dbl> <dbl>
1  mean  0.80 61.75 57.46  3932.80  5.73  5.73  3.54
2    sd  0.47  1.43  2.23  3989.44  1.12  1.14  0.71
3   max  5.01 79.00 95.00 18823.00 10.74 58.90 31.80
```

大きさ `carat` と価格 `price` の**相関係数**は 0.92 (かなり高い)。


**生のままよりは把握しやすい**かも。

しかし要注意...


---
## 平均値ばかり見て可視化を怠ると構造を見逃す

<figure style="position: relative;">
<a href="https://www.autodesk.com/research/publications/same-stats-different-graphs">
<img src="/slides/image/rstats/datasaurus.png" width="800">
<figcaption class="url">https://www.autodesk.com/research/publications/same-stats-different-graphs</figcaption>
</a>
<img src="/slides/image/rstats/DataDino-600x455.gif" width="180"
     style="position: absolute; left: 0; top: 0; z-index: 255;">
</figure>


---
## 作図してみると全体像・構造が見やすい

情報の整理 → **正しい解析・新しい発見・仮説生成**

![plot of chunk simplify-diamonds](figure/simplify-diamonds-1.png)

`carat` が大きいほど `price` も高いらしい。<br>
その度合いは `clarity` によって異なるらしい。

---
## 作図してみると全体像・構造が見やすい

情報の整理 → **正しい解析・新しい発見・仮説生成**

<figure>
<a href="https://r4ds.had.co.nz/explore-intro.html">
<img src="/slides/image/r4ds/data-science-explore.png">
<figcaption class="url">https://r4ds.had.co.nz/explore-intro.html</figcaption>
</a>
</figure>

<br>
可視化だいじ。わかった。<br>
でも「データ分析に費やす労力の8割は前処理」だって？


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
> --- Hadley Wickham


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
## 整然データのご利益の例: ggplot2 (本日2時限目の話題)

x軸、y軸、色分け、パネル分けなどを列の名前で指定して簡単作図:


```r
ggplot(diamonds) + aes(x = carat, y = price) +
  geom_point(mapping = aes(color = color, size = clarity)) +
  facet_wrap(~ cut)
```

![plot of chunk tidy-data-benefit](figure/tidy-data-benefit-1.png)

---
## 本日1時限目の話題

### ✅ <del>なぜRを使うのか？</del>

### ✅ <del>データ解析全体の流れ。可視化だいじ</del> <small style="font-weight: normal;">(詳細は本日後半)</small>

### ✅ <del>作図・解析の前にデータの前処理が必要</del> <small style="font-weight: normal;">(詳細は明日)</small>

### ⬜ Rの基礎

- R環境のセットアップ
- Rとの対話
- 「プロジェクト」と「スクリプト」を作る
- 基本的な型と演算
- Rパッケージ


---
## Keyboard shortcuts

Action | <i class="fab fa-apple"></i> Mac | <i class="fab fa-windows"></i> Windows
------ | ------- | ----
Switch apps | <kbd>command</kbd><kbd>tab</kbd> | <kbd>alt</kbd><kbd>tab</kbd>
Quit apps | <kbd>command</kbd><kbd>q</kbd>     | <kbd>alt</kbd><kbd>F4</kbd>
Spotlight | <kbd>command</kbd><kbd>space</kbd>
Cut, Copy, Paste | <kbd>command</kbd><kbd>x</kbd>, -<kbd>c</kbd>, -<kbd>v</kbd> | <kbd>ctrl</kbd><kbd>x</kbd>, -<kbd>c</kbd>, -<kbd>v</kbd>
Select all | <kbd>command</kbd><kbd>a</kbd>    | <kbd>ctrl</kbd><kbd>a</kbd>
Undo | <kbd>command</kbd><kbd>z</kbd>    | <kbd>ctrl</kbd><kbd>z</kbd>
Find | <kbd>command</kbd><kbd>f</kbd>    | <kbd>ctrl</kbd><kbd>f</kbd>
Save | <kbd>command</kbd><kbd>s</kbd>    | <kbd>ctrl</kbd><kbd>s</kbd>

See https://support.apple.com/HT201236


---
## R環境のセットアップ

[R本体](https://cran.rstudio.com/)
: コマンドを解釈して実行するコア部分。
: よく使われる関数なども標準パッケージとして同梱。

[RStudio Desktop](https://www.rstudio.com/)
: Rをより快適に使うための総合開発環境 (IDE)
: 必須じゃないけど便利なので結構みんな使ってる。

<img src="/slides/image/rstudio/rstudio-300x260.png">


---
## RStudioを起動してConsoleで対話しよう

**Workspace (Environment)** = 一時オブジェクトの集まり

<img src="/slides/image/rstudio/console.png" class="screenshot" width="90%">




---
## 毎回まっさらなワークスペースで始める設定

<i class="fab fa-fw fa-lg fa-apple"></i> RStudio → Preferences &nbsp; <kbd>command</kbd><kbd>,</kbd><br>
<i class="fab fa-fw fa-lg fa-windows"></i> Tools → Global options

"Restore ..." の**チェックを外し**て、 "Save ..." の**Never**を選択

<figure style="margin: 0;">
<a href="https://r4ds.had.co.nz/workflow-projects.html">
<img src="/slides/image/rstudio/preferences-workspace.png"
     style="object-fit: cover; object-position: top; height: 420px;">
<figcaption class="url">https://r4ds.had.co.nz/workflow-projects.html</figcaption>
</a>
</figure>


---
## "Project" を新規作成する

File → New Project... → New Directory → New Project →<br>
→ Directory name: `r-training-2021`<br>
→ as subdirectory of: `~/project` (無ければ作る)

<img src="/slides/image/rstudio/create-new-project.png" class="screenshot" width="90%"
     style="object-fit: cover; object-position: top; height: 450px;">

📁 ディレクトリ ＝ フォルダ

---
## Rスクリプトに書いてから実行

File → New File → R script

<img src="/slides/image/rstudio/newfile.png" width="100%">

---
## Rスクリプトに書いてから実行

File → New File → R script

<img src="/slides/image/rstudio/script-console.png" width="100%">

---
## Rスクリプトに書いてから実行

Select text with <kbd>shift</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd><br>
Execute them with <kbd>ctrl</kbd><kbd>return</kbd>

<img src="/slides/image/rstudio/101.png" width="100%">

---
## Rスクリプトを保存する

- 手順
    - File → Save <kbd>command</kbd><kbd>s</kbd>
    - ファイル名: `hello.R`
    - 場所: さっき作ったプロジェクト内 (デフォルトでそうなるはず)
- **スクリプトを書いたら消さずに保存すること！**
    - 書いたスクリプトは財産
    - 保存しておけばまた使い回せる

🔰 いろんな四則演算を試して `hello.R` に保存してみよう。<br>
e.g., `1 + 2 + 3`, `3 * 7 * 2`, `4 / 2`, `4 / 3`, etc.

---
## プロジェクト📁にファイルが溜まっていく

スクリプト、データ、結果を分けて整理する例:

```
r-training-2021/           # プロジェクトの最上階
├── r-training-2021.Rproj  # これダブルクリックでRStudioを起動
├── hello.R
├── transform.R            # データ整理・変形のスクリプト
├── visualize.R            # 作図のスクリプト
├── data/                  # 元データを置くところ
│   ├── iris.tsv
│   └── diamonds.xlsx
└── output/                # 結果の出力先
    ├── iris-petal.png
    └── iris-summary.tsv
```

プロジェクト最上階を作業ディレクトリとし、<br>
ファイル読み書きの基準にする。(後で詳しく)

ほんの一例です。好きな構造に決めてください。

---
## Rと接する上での心構え

<figure>
<img src="/slides/image/free/akusyu_uchuujin.png" height="200">
</figure>

エラー文を恐れない
: 熟練プログラマでも頻繁にエラーを起こす。
: エラーはRからのメッセージ。**意図を読み取って修正**しよう。
: プログラミングの経験値 ≈ エラー解決の経験値

困ったらウェブ検索
: あなたの問題は全世界のRユーザーが既に通った道。
: 日本語で、英語で、エラー文そのもので検索すれば解決策に当たる。


---
## この実習の取り組み方

とにかく手を動かして体感しよう！

1.  こういう枠が出てきたら、自分のRスクリプトに**コピペして保存**:

    ```r
    head(iris)
    ```

1.  **実行してコンソールを確認**。思ったとおりの出力？<br>
    `Error` や `Warning` があったらよく読んで対処する。<br>
    (無視していい `Warning` もたまーにあるけど)

1.  🔰 マークの練習問題があれば解いてみる。<br>
    そこまでのコードの**コピペ＋改変**でできるはず。

疑問・困りごとがある場合は**気軽にChat欄に**書き込んでください。<br>
私の代わりに解答するのも大歓迎です助かります。


---
## 変数/オブジェクトを作ってみよう


```r
x = 2        # Create x
x            # What's in x?
```

```
[1] 2
```

```r
y = 5        # Create y
y            # What's in y?
```

```
[1] 5
```

Rでは代入演算子として矢印 `<-` も使えるけど私は `=` 推奨。<br>
`#` 記号より右はRに無視される。コメントを書くのに便利。


```r
x + y
```

```
[1] 7
```

🔰 `x` と `y` の引き算、掛け算、割り算をやってみよう


---
## 基本的な演算

`+` とか `*` のような演算子(operator)を変数の間に置く。<br>

```r
10 + 3    # addition
10 - 3    # subtraction
10 * 3    # multiplication
10 / 3    # division
10 %/% 3  # integer division
10 %% 3   # modulus 剰余
10 ** 3   # exponent 10^3
```

🔰 コピペして結果を確認してみよう。

---
## 関数 (function)

変数を受け取って、何か仕事して、返す命令セット


```r
x = seq(1, 3)  # 1と3を渡すとvectorが返ってくる
x
```

```
[1] 1 2 3
```

```r
sum(x)         # vectorを渡すと足し算が返ってくる
```

```
[1] 6
```

```r
square = function(something) {  # 自分の関数を定義
  something ** 2
}
square(x)                       # 使ってみる
```

```
[1] 1 4 9
```

🔰 自分の関数を何か作ってみよう。
e.g., 2倍にする関数 `twice`


---
## 変数/オブジェクトを作ってみよう Part 2


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

この `x` と `y` を足そうとするとエラーになる。なぜ？


```r
x + y        # Error! Why?
```

```
Error in x + y: non-numeric argument to binary operator
```

---
## 変数/オブジェクトの型


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

🔰 さっき作った `y` にも同じ関数を適用してみよう。

---
## 変数/オブジェクトの型

- `vector`: 基本型。一次元の配列。
    - `logical`: 論理値 (`TRUE` or `FALSE`)
    - `numeric`: 数値 (整数 `42L` or 実数 `3.1416`)
    - `character`: 文字列 (`"a string"`)
    - `factor`: 因子 (文字列っぽいけど微妙に違う)
- `array`: 多次元配列。`vector`同様、全要素が同じ型。
    - `matrix`: 行列 = 二次元の配列。
- `list`: 異なる型でも詰め込める太っ腹ベクトル。
- **`data.frame`: 同じ長さのベクトルを並べた長方形のテーブル。重要。** <br>
  **`tibble`** とか **`tbl_df`** と呼ばれる亜種もあるけどほぼ同じ。


---
## vector: 一次元の配列

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
x < 5           # 5より小さいか
```

```
[1]  TRUE  TRUE FALSE
```

🔰 この `x, y` を使っていろいろな演算を試してみよう


---
## vectorから部分的に抜き出す

`[]` を使う。番号は1から始まる。


```r
letters
```

```
 [1] "a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z"
```

```r
letters[3]
```

```
[1] "c"
```

```r
letters[seq(4, 6)]       # 4 5 6
```

```
[1] "d" "e" "f"
```

```r
letters[seq(1, 26) < 4]  # TRUE TRUE TRUE FALSE FALSE ...
```

```
[1] "a" "b" "c"
```

---
## vectorを渡した結果は関数によって異なる

各要素に適用するもの:

```r
x = c(1, 2, 9)
y = sqrt(x)     # square root
y
```

```
[1] 1.000000 1.414214 3.000000
```

全要素を集約した値を返すもの:

```r
z = sum(x)
z
```

```
[1] 12
```

🔰 `log()`, `exp()`, `length()`, `max()`, `mean()`
にvectorを渡してみよう。


---
## matrix: 二次元の配列 (行列)

1本のvectorを折り曲げて長方形にしたもの。<br>
中身は全て同じ型。機械学習とか画像処理とかで使う。


```r
v = seq(1, 8)              # c(1, 2, 3, 4, 5, 6, 7, 8)
x = matrix(v, nrow = 2)    # 2行に畳む。列ごとに詰める
x
```

```
     [,1] [,2] [,3] [,4]
[1,]    1    3    5    7
[2,]    2    4    6    8
```

```r
y = matrix(v, nrow = 2, byrow = TRUE)  # 行ごとに詰める
y
```

```
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
```

🔰 結果を確認してみよう: `x + y`, `dim(x)`, `nrow(x)`, `ncol(x)`.


---
## 行 (row), 列 (column) の憶え方

<div class="column-container">
  <div class="column">
    <figure>
    <a href="https://commons.wikimedia.org/wiki/File:2012_Super_GT_Sugo_starting_grid.jpg">
    <img src="/slides/image/free/front-row.jpg" height="480">
    <figcaption class="url">https://commons.wikimedia.org/wiki/File:2012_Super_GT_Sugo_starting_grid.jpg</figcaption>
    </a>
    </figure>
  </div>
  <div class="column">
    <figure>
    <a href="https://en.wikipedia.org/wiki/Rhodes">
    <img src="/slides/image/free/apollon-columns.jpg" height="480">
    <figcaption class="url">https://en.wikipedia.org/wiki/Rhodes</figcaption>
    </a>
    </figure>
  </div>
</div>


---
## data.frame: 長方形のテーブル (重要!)

同じ長さの列vectorを複数束ねた長方形の表。<br>
e.g., 長さ150の数値ベクトル4本と因子ベクトル1本:


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

`iris` はアヤメ属3種150個体に関する測定データ。<br>
Rに最初から入ってて、例としてよく使われる。

---
## data.frameを眺める

概要を掴む:
```r
head(iris, 6)   # 先頭だけ見てみる。末尾は tail()
nrow(iris)      # 行数: Number of ROWs
ncol(iris)      # 列数: Number of COLumns
names(iris)     # 列名
summary(iris)   # 要約
View(iris)      # RStudioで閲覧
```

```r
str(iris)       # 構造が分かる形で表示
```

```
tibble [150 × 5] (S3: tbl_df/tbl/data.frame)
 $ Sepal.Length: num [1:150] 5.1 4.9 4.7 4.6 5 5.4 4.6 5 4.4 4.9 ...
 $ Sepal.Width : num [1:150] 3.5 3 3.2 3.1 3.6 3.9 3.4 3.4 2.9 3.1 ...
 $ Petal.Length: num [1:150] 1.4 1.4 1.3 1.5 1.4 1.7 1.4 1.5 1.4 1.5 ...
 $ Petal.Width : num [1:150] 0.2 0.2 0.2 0.2 0.2 0.4 0.3 0.2 0.2 0.1 ...
 $ Species     : Factor w/ 3 levels "setosa","versicolor",..: 1 1 1 1 1 1 1 1 1 1 ...
```

🔰 ほかのデータもいろいろ見てみよう。
e.g., `mtcars`, `quakes`, [`data()`](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/00Index.html)

---
## data.frameを眺める

部分的なdata.frameを取得する:
```r
iris[2, ]                  # 2行目
iris[2:5, ]                # 2行目から5行目まで
iris[, 3:4]                # 3-4列目
iris[2:5, 3:4]             # 2-5行目, 3-4列目
```

vectorとして取得する:
```r
iris[[3]]                  # 3列目
iris$Petal.Length          # Petal.Length列
iris[["Petal.Length"]]     # Petal.Length列
iris[["Petal.Length"]][2]  # Petal.Length列の2番目
```

結果がdata.frameになるかvectorになるか微妙:
```r
iris[, 3]                  # 3列目
iris[, "Petal.Length"]     # Petal.Length列
iris[2, 3]                 # 2行目3列目
iris[2, "Petal.Length"]    # 2行目Petal.Length列
```

---
## data.frameの新規作成

同じ長さの **列(column) vector** を結合して作る:

```r
x = c(1, 2, 3)
y = c("A", "B", "C")
mydata = data.frame(x, y)
print(mydata)
```

```
  x y
1 1 A
2 2 B
3 3 C
```

🔰 次のようなdata.frameを作って `theDF` と名付けよう:
```
 i s
24 x
25 y
26 z
```
ヒント: `c()` 無しでクリアすることも可能。


---
## data.frameの読み書き

- readxlパッケージを使えば `.xlsx` ファイルも読める、けど
- カンマ区切り(CSV)とかタブ区切り(TSV)のテキストが無難。
- ファイル名は**作業ディレクトリ**からの**相対パス**で指定。

    ```r
    install.packages("readr") # R標準の read.table() とかは難しいので
    library(readr)            # パッケージのやつを使うよ
    write_tsv(iris, "data/iris.tsv")   # 書き出し
    iris2 = read_tsv("data/iris.tsv")  # 読み込み
    ```

- 現在の作業ディレクトリとその中身を確認しておこう:

    ```r
    getwd()               # Get Working Directory
    list.files(".")       # List files in "."
    list.files("data")    # List files in "./data"
    ```

🔰 R組み込みデータや自作データを読み書きしてみよう

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
<img src="/slides/image/rstats/hex-badges8.png" width="300" align="right">
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
## tidyverse

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges8.png" width="300" align="right">
</a>

Rでデータを上手に扱うためのパッケージ群

```r
install.packages("tidyverse")
library(tidyverse)
# 関連パッケージが一挙に読み込まれる
```

- `Conflicts ❌` とか表示されて不安だけど<br>
  これは大丈夫なやつ:

```
── Attaching packages ─────────────────────────────────────── tidyverse 1.3.1 ──
✔ ggplot2 3.3.5     ✔ purrr   0.3.4
✔ tibble  3.1.4     ✔ dplyr   1.0.7
✔ tidyr   1.1.3     ✔ stringr 1.4.0
✔ readr   2.0.1     ✔ forcats 0.5.1
── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
✖ dplyr::filter() masks stats::filter()
✖ dplyr::lag()    masks stats::lag()
```

次回からはこれらを使って解説


---
## 疑問やエラーの解決方法

- エラーのほとんどは凡ミス由来。よく確認しよう。
    - エラー文をちゃんと読む: `No such file or directory`
    - [よくあるエラー集 (石川由希さん@名古屋大)](https://comicalcommet.github.io/r-training-2021/R_training_2021_7.html)
      をチェックする
    - 変数の中身を確かめる: `str(iris)`, `attributes(iris)`
- エラー文やパッケージ名をコピペしてウェブ検索<br>
  → [StackOverflow](https://stackoverflow.com/questions/tagged/r)
  や個人サイトに解決策
- Slack <i class="fab fa-slack"></i>
  [r-wakalang](https://github.com/tokyor/r-wakalang)
  で質問を投稿する。<br>
  (質問に飢えた優しいワニが多数生息 👀 &nbsp; 👀 &nbsp; 👀 &nbsp; 👀)
- 状況再現できる小さな例
  [(reprex)](https://reprex.tidyverse.org/)
  を添えると回答を得やすい。<br>
  (これを準備してるうちに問題が切り分けられて自己解決したり)
- パッケージの公式ドキュメントをちゃんと読む
- R(Studio)内のヘルプを読む: `?sum`, `help.start()`


---
## 本日1時限目の話題

### ✅ なぜRを使うのか？

### ✅ データ解析全体の流れ。可視化だいじ <small style="font-weight: normal;">(詳細は本日後半)</small>

### ✅ 作図・解析の前にデータの前処理が必要 <small style="font-weight: normal;">(詳細は明日)</small>

### ✅ Rの基礎

- まず**Rスクリプト**に書いてから、**コンソール**で実行
- 変数には型がある: 数値、文字列、**データフレーム**など
- 便利な**パッケージ**を使おう
- 調べ方さえわかれば、全部覚えなくても大丈夫。


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
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2020/)」
   岩嵜航 2020 東京医科歯科大
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2021/)」
   石川由希 2021 名古屋大学

<a href="2-visualization.html" rel="next" class="readmore">
2. 入門2: データ可視化の重要性と方法。
</a>
