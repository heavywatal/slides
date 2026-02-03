+++
url = "tochigi2026/1-introduction.html"
linktitle = "データ解析入門"
title = "1. データ解析入門 — Rによる統計モデリング入門 2026 栃木県"
date = 2026-02-03T09:30:00+09:00
draft = false
dpi = 108
+++

# [Rによる統計モデリング入門 2026 栃木県](.)

<div class="author">
岩嵜 航
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 牧野研 特任助教
</div>

<ol>
<li class="current-deck"><a href="1-introduction.html">データ解析入門</a>
<li><a href="2-r.html">Rの基本</a>
<li><a href="3-visualization.html">Rによるデータ可視化</a>
</ol>

<div class="footnote">
2026-02-03 栃木県農業総合研究センター (remote)<br>
<a href="https://heavywatal.github.io/slides/tochigi2026/">https://heavywatal.github.io/slides/tochigi2026/</a>
</div>



---
## 本日のおしながき

岡本さんからご依頼いただいた内容をもとに構成

> 前半は統計そのもののお話を中心にしていただき、後半にRの使い方を

> 今回は「**90分で、Rの苦手意識を払拭する**」ことが目標です。

90分6–8コマの講義からの<del>やや無理のある</del>ダイジェスト
: 科学研究におけるデータ解析とモデル
: データ可視化の重要性
: Rを使う心構えと基本操作

すべてを理解しようとせず「**あとで調べればいいや**」くらいの気持ちで。\
「**Rができる人にはできそう**」というイメージが持てればOK👍


---
## 研究という仕事をざっくり捉えると

1. 課題を見つける、仮説を立てる
1. 実験🧫・観察🔬・文献📚などからデータを集める
1. **データを整理・解析して仮説を検証する**
1. **結果を報告する**、1に戻る

つまり、

- 白衣を着て分子実験をやる人も、野山を駆け回って観察する人も、\
  そのパートは研究の半分くらい。
- 残り半分はデータの整理・解析・報告。\
  → しかし軽視されがち。ここを**ちゃんと、でも楽に**やりたい。


---
## データ解析って必要？ 生データ見ればいいべ？

生のままでは複雑過ぎ、情報多すぎ、何もわからない。


``` r
print(ggplot2::diamonds)
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

ダイヤモンド53,940個について10項目の値を持つデータセット

---
## 要約統計量を見てみよう

各列の**平均**とか**標準偏差**とか:


```
  stat carat depth table    price
1 mean  0.80 61.75 57.46  3932.80
2   sd  0.47  1.43  2.23  3989.44
3  max  5.01 79.00 95.00 18823.00
4  min  0.20 43.00 43.00   326.00
```

大きさ `carat` と価格 `price` の**相関係数**はかなり高い:

```
      carat depth table price
carat  1.00                  
depth  0.03  1.00            
table  0.18 -0.30  1.00      
price  0.92 -0.01  0.13  1.00
```

<hr>

**生のままよりは把握しやすい**かも。


---
## 分布を特徴づける代表値 central tendency

<div class="column-container">
  <div class="column" style="flex-shrink: 1.6;">

平均値 mean
: 和を観察数で割る

中央値 median
: 順に並べて真ん中

最頻値 mode
: 最も頻度が高い値

  </div>
  <div class="column">
  <a href="https://www.mhlw.go.jp/toukei/list/20-21.html">
  <img src="../tohoku2025r/image/hist-income-japan-2022.png" width="100%" style="">
  <figcaption><small><cite>所得金額階級別世帯数の頻度分布</cite> 厚生労働省 国民生活基礎調査 2022</small></figcaption>
  </a>
  </div>
</div>

外れ値に対する応答
: もし総資産額20兆円の大富豪が鳥取県に引っ越してきたら\
  → 県民の**平均**資産は4000万円上昇。**中央値**・**最頻値**はほぼそのまま。

目的や状況に応じて使い分けよう。


---
## ばらつきを捉える記述統計量

分散 variance
: 平均値からの差の自乗の平均。 $\frac 1 n \sum _i ^n (X_i - \bar X)^2$
: これの平方根が**標準偏差 (standard deviation)**。

Percentile, Quantile (四分位)
: 小さい順にならべて上位何%にあるか。
: 中央値 = 50th percentile = 第二四分位(Q2)

![plot of chunk quantile](./figure/quantile-1.png)

---
## ばらつきの様子は大小の判断にも重要

<div class="column-container" style="padding-left: 10px;">
<div class="column" style="flex-shrink: 1;">
観測値1つずつ。<br>
たまたまかも。
</div>
<div class="column" style="flex-shrink: 1;">
群内のばらつき大きい。<br>
群間の差は微妙か。
</div>
<div class="column" style="flex-shrink: 1;">
群内のばらつき小さい。<br>
群間には差がありそう。
</div>
</div>

![plot of chunk comparison](./figure/comparison-1.png)

「こんなことがたまたま起こる確率はすごく低いです！」\
をちゃんと示す手続きが**統計的仮説検定**。

<hr>

でも要約統計量とか検定結果だけを見て判断するのは危険...


---
## 要約統計量だけ見て可視化を怠ると構造を見逃す

<figure style="position: relative;">
<a href="https://www.research.autodesk.com/publications/same-stats-different-graphs/">
<img src="/slides/image/rstats/datasaurus.png" width="95%">
<figcaption><small>https://www.research.autodesk.com/publications/same-stats-different-graphs/</small></figcaption>
</a>
<img src="/slides/image/rstats/DataDino-600x455.gif" width="22%"
     style="position: absolute; left: 0; top: 0; z-index: 255;">
</figure>


---
## データ可視化は理解の第一歩

情報をうまく絞って整理 → **直感的にわかる**

![plot of chunk simplify-diamonds](./figure/simplify-diamonds-1.png)

`carat` が大きいほど `price` も高いらしい。\
その度合いは `clarity` によって異なるらしい。

---
## 統計とは

データをうまくまとめ、それに基づいて推論するための手法。

- **記述統計**: データそのものを要約する
    - 要約統計量 (e.g., 平均、標準偏差、etc.)
    - 作図、作表
- **推測統計**: データの背後にある母集団・生成過程を考える
    - 数理モデル
    - 確率分布
    - パラメータ(母数)

「グラフを眺めてなんとなく分かる」以上の分析には**モデル**が必要

---
## モデルとは

対象システムを単純化・理想化して扱いやすくしたもの

Mathematical Model 数理モデル<img src="../tokiomarine2021/image/hill-equation.png" width="210" style="float: right; margin: 0 -5px;">
: 数学的な方程式として記述されるもの。
: e.g., Lotka-Volterra eq., <span style="opacity: 0.6;">Hill eq.</span>\
  <br>

Computational Model 数値計算モデル<img src="/slides/image/tumopp/Chex_Lconst.gif" width="210" style="float: right;">
: 数値計算の手続きとして記述されるもの。
: e.g., Schelling’s Segregation Model, <span style="opacity: 0.6;"><em>tumopp</em></span>\
  <br>

Concrete Model 具象モデル<img src="../tokiomarine2021/image/weisberg-sfbay.jpg" width="330" style="float: right;">
: 具体的な事物で作られるもの。
: e.g., San Francisco Bay-Delta Model

<small>
<a href="https://amzn.to/3bdvhuI">Weisberg 2012 <cite>Simulation and Similarity (科学とモデル)</cite></a>
</small>

???
数理モデルが決定論的、数値計算が確率論的、になる場合が多いけど必ずしもそうではない。
解析的に解くことを諦めて計算機にやらせるという点で実装方法は異なるが、
数理的に記述して解釈するという大枠では同じとみなしたほうがいいかもしれない。

プラモデル: 車や飛行機の重さ・材質は無視して色や形を模倣


---
## ウェットな実験もモデルの一種と見なせる

対象システムを単純化・理想化して扱いやすくしたもの\
→ 自然ではありえない状況にしてでも、見たい関係を見る\
→ 「Xを変えればYが変わる」という**還元的な理解の1ステップ**

- ノイズをなるべく除去
  - 栄養や温度など、**環境を揃える**
  - 近親交配を繰り返して純系を作り、**遺伝的背景を揃える**
- 興味のある要因のみ変えて、表現型の違いを評価
  - **遺伝子**1つ2つだけ改変
  - 投与する**薬剤**の種類・量を変えてみる
  - **栄養塩**の濃度と**光**の強さを変えてみる

ドライの理論研究者を指して「モデル屋」と呼びがちだが、\
広い意味では生物学者みんな「モデル屋」。


---
## データ科学における数理モデル

データ生成をうまく真似できそうな仮定の数式表現。

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="1200">
<figcaption><small>「<a href="https://amzn.to/3uCxTKo"><cite>データ分析のための数理モデル入門</cite></a>」江崎貴裕 2020 より改変</small></figcaption>
</figure>


???

確率モデル: 決定論的なモデルじゃなくて確率論的なゆらぎを導入したもの。
ただし、大塚淳さんの定義は異なる。
帰納推論を可能にする枠組みとして自然の斉一性(ヒューム)を仮定した上で、
データを生成している真の現象を確率用語で記述したものが確率モデルだ、という感じ。
そこからさらに強い仮定としてパラメトリックな確率分布を生成元としたのが統計モデル。

---
## データ科学における数理モデル

データ生成をうまく真似できそうな仮定の数式表現。\
e.g., 大きいほど高く売れる: $\text{price} = A \times \text{carat} + B + \epsilon$

![plot of chunk lm-diamonds](./figure/lm-diamonds-1.png)

新しく採れたダイヤモンドの価格予想とかにも使える。

このように「YをXの関数として表す」ようなモデルを**回帰**と呼ぶ。


---
## 何でもかんでも直線あてはめではよろしくない


![plot of chunk lm-bad](./figure/lm-bad-1.png)

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？


---
## 何でもかんでも直線あてはめではよろしくない

![plot of chunk glm-better](./figure/glm-better-1.png)

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？
- **データに合わせた統計モデルを使うとマシ**


---
## 統計モデリングの教科書決定版: 久保先生の[<abbr title="データ解析のための統計モデリング入門">緑本</abbr>](https://amzn.to/33suMIZ)

ちょっとずつ線形モデルを発展させていく。

<figure style="float: right; margin-inline-start: 0.5em; margin-block: 0;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="360" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
<figcaption><small>https://kuboweb.github.io/-kubo/ce/IwanamiBook.html</small></figcaption>
</a>
</figure>

<div class="column-container" style="position: relative; padding-inline: 0.75em;">
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 12em; background-color: hsl(80deg 100% 50% / 10%); border-radius: 0 0 0 87.5%;"></div>
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 3em; background-color: hsl(80deg 100% 50% / 15%); border-radius: 0 0 0 87.5%;"></div>

  <div>

**線形モデル LM** (単純な直線あてはめ)

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ いろんな<b style="color: #56B4E9">確率分布</b>を扱いたい
</p>

**一般化線形モデル GLM**

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ <b style="color: #E69F00;">個体差</b>などの変量効果を扱いたい
</p>

**一般化線形混合モデル GLMM**

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ もっと<b style="color: #B2001D;">自由なモデリング</b>を！
</p>

**階層ベイズモデル HBM**

  </div>
  <div style="text-align: right;">

<p>最小二乗法<br><br><br></p>
<p>最尤推定法<br><br><br><br></p>
<p>MCMC</p>

  </div>
</div>

<hr>

今回はごく一部のみチラ見せ。理解を目指さなくていいです。


---
## 説明変数が1つある一般化線形モデル GLM

個体$i$の種子数$y_i$は<span style="color: #3366ff;">平均値$\lambda_i$</span>の<span style="color: #56B4E9;">ポアソン分布</span>に従う。\
平均値の対数$\log(\textcolor{#3366ff}{\lambda_i})$は**その個体の大きさ$x_i$に比例**する。

<div class="column-container" style="justify-content: unset;">
  <div>

<figure style="margin-block: 1rem;">
<img src="../iwate2023stats/glm.drawio.svg" width="640">
</figure>

  </div>
  <div>


![plot of chunk glm-poisson](./figure/glm-poisson-1.png)

  </div>
</div>

この場合は**単回帰**。説明変数が複数あると**重回帰**。


---
## 複数の説明変数を同時に扱う重回帰

<p>\[\begin{split}
y_i &\sim \text{Poisson}(\lambda_i) \\
\log(\lambda_i) &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots
\end{split}\]</p>

気温も湿度も高いほどビールが売れる架空データ:


![plot of chunk multiple-regression](./figure/multiple-regression-1.png)

ほかの**確率分布**と**リンク関数**を使う例を見てみよう。


---
## ロジスティック回帰

- 確率分布: **二項分布**
- リンク関数: $\operatorname{logit}(p) = \log \frac {p} {1 - p}$

何かの成否に対する何かの因子の影響、とか

<div class="column-container">
  <div>

客$n_i$人中$y_i$人がビールを注文。\
その日$i$の気温$x_i$によって割合が変化。

<p>\[\begin{split}
y_i &\sim \text{Binomial}(n_i,~p_i) \\
\operatorname{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
p_i &= \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i)}}
\end{split}\]</p>

ロジスティック関数↑

  </div>
  <div>


![plot of chunk glm-logistic](./figure/glm-logistic-1.png)

  </div>
</div>

???
ロジット = 対数オッズ
オッズ = 失敗の何倍成功しやすいか
Xが1増えるとオッズがe^a倍に増える。


---
## ロジスティック回帰 (狭義)

- 確率分布: **ベルヌーイ分布** ($n = 1$ の二項分布)
- リンク関数: $\operatorname{logit}(p) = \log \frac {p} {1 - p}$

何かの成否に対する何かの因子の影響、とか

<div class="column-container">
  <div>

風が吹けば桶屋が儲かる。

<p>\[\begin{split}
y_i &\sim \text{Bernoulli}(p_i) \\
  &= \text{Binomial}(1,~p_i) \\
\operatorname{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
p_i &= \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i)}}
\end{split}\]</p>

ロジスティック関数↑

  </div>
  <div>


![plot of chunk wind](./figure/wind-1.png)

  </div>
</div>


---
## 一般線形モデル (“化”無し) はGLMの一種

- 確率分布: **正規分布**
- リンク関数: **恒等関数**(なにもせずそのまま)

<div class="column-container">
  <div class="column" style="padding-top: 0.5rem;">

<p>\[\begin{split}
y_i &\sim \mathcal{N}(\mu_i,~\sigma^2) \\
\operatorname{identity}(\mu_i) &= \beta_0 + \beta_1 x_i
\end{split}\]</p>

  </div>
  <div class="column">


![plot of chunk glm-weight](./figure/glm-weight-1.png)

  </div>
</div>

最小二乗法の直線あてはめと結果的に同じになる。

<small style="opacity: 0.7;">単回帰・重回帰と言ったとき一般線形モデルを前提とする人もいる。</small>

---
## 分散分析 (<u>An</u>alysis <u>o</u>f <u>va</u>riance, ANOVA) as GLM

**質的な説明変数**を持つ**正規分布・恒等リンク**のGLM、と解釈可能。\
<span title="ダミー変数とも呼ばれる">**指示変数**</span> (0 or 1) に変換してから重回帰する。

<div class="column-container">
  <div style="padding-top: 0.5rem;">

| 天気 | → | $x_1$ ☀️ 晴れ | $x_2$ ☔️ 雨 |
| ---- | :-: | :---: | :---: |
| ☁️ くもり | | 0 | 0 |
| ☀️ 晴れ | | 1 | 0 |
| ☔️ 雨 | | 0 | 1 |

<p>\[\begin{split}
y_i &\sim \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i}
\end{split}\]</p>

  </div>
  <div>



![plot of chunk glm-anova](./figure/glm-anova-1.png)

  </div>
</div>

くもり☁️ $\beta_0$ を基準に、晴れの効果☀️ $\beta_1$ と雨の効果☔️ $\beta_2$ が求まる。

GLMなら確率分布・リンク関数を変えてもっと柔軟にモデリングできる。


---
## 共分散分析 (<u>An</u>alysis of <u>cova</u>riance, ANCOVA) as GLM

**質的変数と量的変数を両方**含むGLM、と解釈可能。\
正規分布・等分散・恒等リンクなどが仮定される。


<div class="column-container">
  <div style="padding-top: 0.5rem;">

| 天気 | → | $x_1$ ☀️ 晴れ | $x_2$ ☔️ 雨 |
| ---- | :-: | :---: | :---: |
| ☁️ くもり | | 0 | 0 |
| ☀️ 晴れ | | 1 | 0 |
| ☔️ 雨 | | 0 | 1 |

<p>\[\begin{split}
y_i &\sim \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \beta_3 x_{3i}
\end{split}\]</p>

  </div>
  <div>


![plot of chunk glm-ancova](./figure/glm-ancova-1.png)

  </div>
</div>

GLMなら確率分布・リンク関数を変えてもっと柔軟にモデリングできる。


---
## 一般化線形モデル(GLM)ふりかえり

確率分布・リンク関数を変えて柔軟にモデリングできる。<br>
特定の組み合わせには名前がある。

| 名前 | 確率分布 | リンク関数 | 説明変数 |
| ---- | -------- | -------- | -------- |
|ポアソン回帰|ポアソン分布|log| |
|ロジスティック回帰|二項分布|logit| |
|一般線形回帰|正規分布|恒等| |
|分散分析|正規分布|恒等|質的変数|
|共分散分析|正規分布|恒等|質的変数+量的変数|


---
## 統計モデリングの教科書決定版: 久保先生の[<abbr title="データ解析のための統計モデリング入門">緑本</abbr>](https://amzn.to/33suMIZ)

ちょっとずつ線形モデルを発展させていく。

<figure style="float: right; margin-inline-start: 0.5em; margin-block: 0;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="360" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
<figcaption><small>https://kuboweb.github.io/-kubo/ce/IwanamiBook.html</small></figcaption>
</a>
</figure>

<div class="column-container" style="position: relative; padding-inline: 0.75em;">
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 12em; background-color: hsl(80deg 100% 50% / 10%); border-radius: 0 0 0 87.5%;"></div>
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 3em; background-color: hsl(80deg 100% 50% / 15%); border-radius: 0 0 0 87.5%;"></div>

  <div>

**線形モデル LM** (単純な直線あてはめ)

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ いろんな<b style="color: #56B4E9">確率分布</b>を扱いたい
</p>

**一般化線形モデル GLM**

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ <b style="color: #E69F00;">個体差</b>などの変量効果を扱いたい
</p>

**一般化線形混合モデル GLMM**

<p style="opacity: 0.7; margin-inline-start: 2em;">
↓ もっと<b style="color: #B2001D;">自由なモデリング</b>を！
</p>

**階層ベイズモデル HBM**

  </div>
  <div style="text-align: right;">

<p>最小二乗法<br><br><br></p>
<p>最尤推定法<br><br><br><br></p>
<p>MCMC</p>

  </div>
</div>

<hr>

今回はごく一部のみチラ見せ。理解を目指さなくていいです。


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
- [科学とモデル---シミュレーションの哲学 入門](https://amzn.to/2Q0f6JQ) Michael Weisberg 2017\
  (原著: [Simulation and Similarity](https://amzn.to/3bdvhuI) 2013)

<a href="2-r.html" class="readmore">
2. Rの基本
</a>
