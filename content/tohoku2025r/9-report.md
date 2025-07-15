+++
url = "tohoku2025r/9-report.html"
linktitle = "発表会"
title = "9. 発表会 — 進化学実習 2025 牧野研 東北大学"
date = 2025-04-15T13:00:00+09:00
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
<li><a href="5-content.html">データ内容の処理: 数値、文字列など。</a>
<li><a href="6-input.html">データ入力、レポート作成</a>
<li><a href="7-distribution.html">統計モデリング1: 確率分布、尤度</a>
<li><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li class="current-deck"><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2025-04-15 東北大学 理学部生物学科 進化学実習<br>
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
## 最終日のお品書き

- 13:00 ここまでのおさらい、レポートについて、など
- 13:10 **質疑応答、仕上げ、アップロード 50分**
- 14:00 1週目(**発表5分 + 質疑応答3分**) x 8班
- 15:10 休憩、雑談 10分
- 15:20 2週目(**発表5分 + 質疑応答3分**) x 8班
- 16:30 講評
- 解散、質疑応答


---
## QuartoでHTML出力したものを皆で閲覧する

- 最終課題の部分のみQuartoでまとめる
  - 最低1枚の図と、そこに至る前処理＋可視化のコード。
  - グラフから読み取れることを一言。
  - そのほかのコメントもあるとなおよし。
    - 苦労したポイント
    - イチオシの関数、オプション
    - 本当はもっとこうしたかった
  - 4日目に習う統計解析も組み込めるとなおよし。
- 様式: Quarto Markdownで書き、Render済みHTMLをClassroomに提出。
  - `{ID}-{name}-recital.html`, e.g., `C0SB0000-iwasaki-recital.html`
  - `embed-resources: true` で画像などを埋め込んだ独立HTML。


---
## Lightning Talk (LT)

発表者として
: 短い持ち時間で言いたいことを言う。
: うまく情報を絞って整理する必要がある。

聴衆として
: 自分が理解していない部分を探す。
: 必ず**1つは質問するつもり**で聞く。できれば実際にする。

<br>
<hr>

<p><aside style="opacity: 0.5;">受講生から質問が出なければTAがする。</aside></p>


---
## 🔰 レポートについては3日目後半の資料を参照

<iframe width="600" height="450" src="./6-input.html#/40"></iframe>
<iframe width="600" height="450" src="./6-input.html#/41"></iframe>

🔰最終課題は発表会を踏まえた改良版を3日目のぶんに掲載。


---
## 🔰 最終日のレポートに書いてほしいこと追加

この講義を改善するためのコメントをひとつ以上。

- ここがわかりにくかった。
- ここで躓いた。
- ここがツラすぎた。
- ここは良かった。

褒めても貶しても加点・減点しません。\
後輩たちのために、忌憚なき意見をよろしくお願いします。


---
## この実習でやったこと

✅ 生物学研究にはデータとモデルが必須だと認識

✅ 再現可能な解析を楽にやりたい気持ちになる

✅ 必要な方法を調べ、実践する力をつける

✅ データ解析の基本に触れる

⬜ Rで困ったときに参照できるレポートが手元に残る

<hr>

個々の方法は覚えなくても大丈夫！\
<strong>忘れては調べ、を何度も繰り返しながら染み込ませていこう。</strong>

今はまだ完全に飲み込めなくても、
**班員と協力して**レポートを提出しよう。

<a href="." class="readmore">
目次に戻る
</a>
