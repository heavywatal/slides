+++
url = "tohoku2024r/7-distribution.html"
linktitle = "統計モデリング1: 確率分布、尤度"
title = "7. 統計モデリング1: 確率分布、尤度 — 進化学実習 2024 牧野研 東北大学"
date = 2024-04-11T13:00:00+09:00
draft = false
dpi = 108
+++

# [進化学実習 2024 牧野研 東北大学](.)

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
<li class="current-deck"><a href="7-distribution.html">統計モデリング1: 確率分布、尤度</a>
<li><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2024-04-11 東北大学 理学部生物学科 進化学実習<br>
<a href="https://heavywatal.github.io/slides/tohoku2024r/">https://heavywatal.github.io/slides/tohoku2024r/</a>
</div>



---
## 作業再開、出欠確認

1. `r-training-2024.Rproj` をダブルクリック。<br>
   正しい working directory でRStudioが起動される。
1. [初日と同じ手順](1-introduction.html#/29)で出欠確認。
1. 今日のぶんのスクリプトを新規作成し、好きな名前で保存。<br>
1. [tidyverseの読み込み](2-visualization.html#/23)や[パレット設定](2-visualization.html#/36)など、
   おまじないをまず実行。


---
## この実習の目標

### ✅ <del>生物学研究にはデータとモデルが必須だと認識</del>

### ✅ <del>再現可能な解析を楽にやりたい気持ちになる</del>

### ✅ <del>必要な方法を調べ、実践する力をつける</del>

### ⬜ データ解析の基本に触れる

<br>
個々の方法は覚えなくても大丈夫！<br>
忘れては調べ、を何度も繰り返しながら染み込ませていこう。

---
## データを使ってやりたいこと

- 現象を**理解**したい
- 将来を**予測**したい
- ものを**分類・判別**したい
- 挙動を**制御**したい
- 新しい何かを**生成**したい

そのために解析は必要？
未加工の生データこそ宝？


---
## 初日を振り返る

<iframe width="600" height="450" src="./1-introduction.html#/5"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/6"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/7"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/8"></iframe>


---
## データ科学における数理モデル

データ生成をうまく真似できそうな仮定の数式表現。<br>
e.g., 大きいほど高く売れる: $\text{price} = A \times \text{carat} + B + \epsilon$

![plot of chunk lm-diamonds](./figure/lm-diamonds-1.png)

新しく採れたダイヤモンドの価格予想とかにも使える。

このように「YをXの関数として表す」ようなモデルを**回帰**と呼ぶ。


---
## ちょっとずつ線形モデルを発展させていく

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="360" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

**線形モデル LM** (単純な直線あてはめ)　[(👈 #7 今回)](7-distribution.html)

<span style="color: #888888;">&nbsp; &nbsp; ↓ いろんな確率分布を扱いたい</span>

**一般化線形モデル GLM** [(#8 次回)](8-glm.html)

<span style="color: #888888;">&nbsp; &nbsp; ↓ 個体差などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**

<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012 より改変</cite>

<hr>
<cite>

[Data Science Hill Climb 2023 (東京海上) での講義 (~12時間)](https://heavywatal.github.io/slides/tokiomarine2023/)
の抜粋バージョン (~2時間)。

</cite>


---
## 回帰モデルの2段階

1. Define a **family of models**: だいたいどんな形か、式をたてる
    - 直線: $y = a_1 + a_2 x$
    - 対数: $\log(y) = a_1 + a_2 x$
    - 二次曲線: $y = a_1 + a_2 x^2$

2. Generate a **fitted model**: データに合うようにパラメータを調整
    - $y = 3x + 7$
    - $y = 9x^2$

<cite>
<a href="https://r4ds.had.co.nz/model-basics.html" class="url">https://r4ds.had.co.nz/model-basics.html</a>
</cite>

---
## たぶん身長が高いほど体重も重い

なんとなく $y = a x + b$ でいい線が引けそう<br>
&nbsp;


![plot of chunk weight-height](./figure/weight-height-1.png)


---
## たぶん身長が高いほど体重も重い

なんとなく $y = a x + b$ でいい線が引けそう<br>
じゃあ傾き *a* と切片 *b*、どう決める？

![plot of chunk weight-lines](./figure/weight-lines-1.png)


---
## 最小二乗法 (Ordinary Least Square: OLS)

<span style="color: #3366ff">回帰直線</span>からの<strong style="color: #E69F00">残差</strong>平方和(RSS)を最小化する。

![plot of chunk weight-residual](./figure/weight-residual-1.png)



---
## 残差平方和(RSS)が最小となるパラメータを探せ

ランダムに試してみて、上位のものを採用。<br>
この程度の試行回数では足りなそう。

![plot of chunk weight-goodlines](./figure/weight-goodlines-1.png)

---
## 残差平方和(RSS)が最小となるパラメータを探せ

**グリッドサーチ**: パラメータ空間の一定範囲内を均等に試す。<br>
さっきのランダムよりはちょっとマシか。

![plot of chunk weight-grid](./figure/weight-grid-1.png)

こうした**最適化**の手法はいろいろあるけど、ここでは扱わない。


---
## これくらいなら一瞬で計算してもらえる


``` r
par_init = c(intercept = 0, slope = 0)
result = optim(par_init, fn = rss_weight, data = df_weight)
result$par
```

```
intercept     slope 
-69.68394  78.53490 
```

![plot of chunk weight-lm](./figure/weight-lm-1.png)

上記コードは最適化一般の書き方。<br>
回帰が目的なら次ページのようにするのが楽 →

---
## `lm()` で直線あてはめしてみる


``` r
fit = lm(data = mpg, formula = hwy ~ displ)
broom::tidy(fit)
```

```
         term  estimate std.error statistic       p.value
1 (Intercept) 35.697651 0.7203676  49.55477 2.123519e-125
2       displ -3.530589 0.1945137 -18.15085  2.038974e-46
```

``` r
mpg_added = modelr::add_predictions(mpg, fit, type = "response")
ggplot(mpg_added) + aes(displ, hwy) + geom_point() +
  geom_line(aes(y = pred), linewidth = 1, color = "#3366ff")
```

![plot of chunk lm-mpg](./figure/lm-mpg-1.png)

🔰 `diamonds` と `iris` でも `lm()` を試してみよう。


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
## ちょっとずつ線形モデルを発展させていく

**線形モデル LM** (単純な直線あてはめ)

<span style="color: #888888;">&nbsp; &nbsp; ↓ いろんな<span class="fragment highlight-blue custom bold">確率分布</span>を扱いたい</span>

**一般化線形モデル GLM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ 個体差などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**

<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012 より改変</cite>


---
## 確率分布

発生する事象(値)と頻度の関係。

手元のデータを数えて作るのが**経験分布**<br>
e.g., サイコロを12回投げた結果、学生1000人の身長

![plot of chunk distribution](./figure/distribution-1.png)

一方、少数のパラメータと数式で作るのが**理論分布**。<br>
(こちらを単に「確率分布」と呼ぶことが多い印象）


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
  <img src="../tohoku2022r/image/hist-income-japan-2019.png" width="100%" style="">
  <figcaption><cite>所得金額階級別世帯数の頻度分布 厚生労働省 国民生活基礎調査 2019</cite></figcaption>
  </a>
  </div>
</div>

目的や状況に応じて使い分けよう。

外れ値に対する応答
: もし総資産額20兆円の大富豪が鳥取県に引っ越してきたら<br>
  → 県民の**平均**資産は4000万円上昇。**中央値**・**最頻値**はほぼそのまま。

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
## 記述統計量に頼りすぎず分布を可視化する

同じデータでも見せ方で印象・情報量が変わる。

![plot of chunk visualize-distribution](./figure/visualize-distribution-1.png)


---
## 確率変数$X$はパラメータ$\theta$の確率分布$f$に従う...?

$X \sim f(\theta)$

e.g.,<br>
コインを3枚投げたうち表の出る枚数 $X$ は**二項分布に従う**。<br>
$X \sim \text{Binomial}(n = 3, p = 0.5)$

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">

![plot of chunk dbinom](./figure/dbinom-1.png)

  </div>
  <div class="column" style="padding-top: 10px;">
\[\begin{split}
\Pr(X = k) &= \binom n k p^k (1 - p)^{n - k} \\
k &\in \{0, 1, 2, \ldots, n\}
\end{split}\]
  </div>
</div>

一緒に実験してみよう。

---
## 試行を繰り返して記録してみる

コインを3枚投げたうち表の出た枚数 $X$

試行1: **表** 裏 **表** → $X = 2$<br>
試行2: 裏 裏 裏 → $X = 0$<br>
試行3: **表** 裏 裏 → $X = 1$ 続けて $2, 1, 3, 0, 2, \ldots$

![plot of chunk rbinom](./figure/rbinom-1.png)

<div style="text-align: right;">
試行回数を増やすほど<b>二項分布</b>の形に近づく。<br>
0と3はレア。1と2が3倍ほど出やすいらしい。
</div>

---
## コイントスしなくても $X$ らしきものを生成できる

- コインを3枚投げたうち表の出る枚数 $X$
- $n = 3, p = 0.5$ の二項分布からサンプルする乱数 $X$

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">
<img src="figure/dbinom-1.png" alt="plot of chunk dbinom">
  </div>
  <div class="column" style="padding-top: 10px;">
$X \sim \text{Binomial}(n = 3, p = 0.5)$

&nbsp;&nbsp; ↓ サンプル

{2, 0, 1, 2, 1, 3, 0, 2, ...}
  </div>
</div>

これらはとてもよく似ているので<br>
**「コインをn枚投げたうち表の出る枚数は二項分布に従う」**<br>
みたいな言い方をする。逆に言うと<br>
**「二項分布とはn回試行のうちの成功回数を確率変数とする分布」**<br>
のように理解できる。

---
## 統計モデリングの一環とも捉えられる

コイン3枚投げを繰り返して得たデータ {2, 0, 1, 2, 1, 3, 0, 2, ...}

&nbsp;&nbsp; ↓ たった2つのパラメータで記述。情報を圧縮。

$n = 3, p = 0.5$ の二項分布で説明・再現できるぞ

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="900"><br>
<figcaption><cite>「データ分析のための数理モデル入門」江崎貴裕 2020 より改変</cite></figcaption>
</figure>

こういうふうに現象と対応した確率分布、ほかにもある？

???
ただし「これが3連コイントスの真理だ」ではない。<br>
あくまで「こう単純化して理解できそう・使えそう」なだけ。

ほかの仮定: コインが立つかも。偏ったコインかも。両表かも。

二項分布はn枚コイントスをたった2パラメータで説明する優秀モデル


---
## 有名な確率分布、それに「従う」もの

離散一様分布
: コインの表裏、サイコロの出目1–6

負の二項分布 (幾何分布 if n = 1)
: 成功率pの試行がn回成功するまでの失敗回数

二項分布
: 成功率p、試行回数nのうちの成功回数

ポアソン分布
: 単位時間あたり平均$\lambda$回起こる事象の発生回数

ガンマ分布 (指数分布 if k = 1)
: ポアソン過程でk回起こるまでの待ち時間

正規分布
: 確率変数の和、平均値など。

---
## 離散一様分布

同じ確率で起こるn通りの事象のうちXが起こる確率

e.g., コインの表裏、サイコロの出目1–6

![plot of chunk dunif](./figure/dunif-1.png)

🔰 一様分布になりそうな例を考えてみよう


---
## 幾何分布 $~\text{Geom}(p)$

成功率pの試行が初めて成功するまでの失敗回数

e.g., コイントスで表が出るまでに何回裏が出るか

![plot of chunk geometric](./figure/geometric-1.png)

\\[
\Pr(X = k \mid p) = p (1 - p)^k
\\]

「初めて成功するまでの試行回数」とする定義もある。

🔰 幾何分布になりそうな例を考えてみよう

---
## 負の二項分布 $~\text{NB}(n, p)$

成功率pの試行がn回成功するまでの失敗回数X。
n = 1 のとき幾何分布と一致。

![plot of chunk nbinom](./figure/nbinom-1.png)

\\[
\Pr(X = k \mid n,~p) = \binom {n + k - 1} k p^n (1 - p)^k
\\]

失敗回数ではなく試行回数を変数とする定義もある。

🔰 負の二項分布になりそうな例を考えてみよう

<!--
平均$\lambda$がガンマ分布でばらついたポアソン分布、とも解釈できる。<br>
($k \to \infty$でポアソン分布と一致)
-->

---
## 二項分布 $~\text{Binomial}(n,~p)$

確率$p$で当たるクジを$n$回引いてX回当たる確率。平均は$np$。

![plot of chunk dbinom-n](./figure/dbinom-n-1.png)

\\[
\Pr(X = k \mid n,~p) = \binom n k p^k (1 - p)^{n - k}
\\]

🔰 二項分布になりそうな例を考えてみよう


---
## ポアソン分布 $~\text{Poisson}(\lambda)$

平均$\lambda$で単位時間(空間)あたりに発生する事象の回数。

e.g., 1時間あたりのメッセージ受信件数、メッシュ区画内の生物個体数

![plot of chunk dpoisson](./figure/dpoisson-1.png)

\\[
\Pr(X = k \mid \lambda) = \frac {\lambda^k e^{-\lambda}} {k!}
\\]

二項分布の極限 $(\lambda = np;~n \to \infty;~p \to 0)$。<br>
めったに起きないことを何回も試行するような感じ。


---
## 指数分布 $~\text{Exp}(\lambda)$

ポアソン過程の事象の発生間隔。平均は $1 / \lambda$ 。

e.g., メッセージの受信間隔、道路沿いに落ちてる手袋の間隔

![plot of chunk dexp](./figure/dexp-1.png)

\\[
\Pr(x \mid \lambda) = \lambda e^{-\lambda x}
\\]

幾何分布の連続値版。

🔰 ポアソン分布・指数分布になりそうな例を考えてみよう


---
## ガンマ分布 $~\text{Gamma}(k,~\lambda)$

ポアソン過程の事象k回発生までの待ち時間

e.g., メッセージを2つ受信するまでの待ち時間

![plot of chunk dgamma](./figure/dgamma-1.png)

\\[
\Pr(x \mid k,~\lambda) = \frac {\lambda^k x^{k - 1} e^{-\lambda x}} {\Gamma(k)}
\\]

指数分布をkのぶん右に膨らませた感じ。<br>
shapeパラメータ $k = 1$ のとき指数分布と一致。


---
## 正規分布 $~\mathcal{N}(\mu,~\sigma)$

平均 $\mu$、標準偏差 $\sigma$ の美しい分布。よく登場する。<br>
e.g., $\mu = 50, ~\sigma = 10$ (濃い灰色にデータの95%, 99%が含まれる):

![plot of chunk gaussian](./figure/gaussian-1.png)

\\[
\Pr(x \mid \mu,~\sigma) = \frac 1 {\sqrt{2 \pi \sigma^2}} \exp \left(\frac {-(x - \mu)^2} {2\sigma^2} \right)
\\]

---
## 正規分布に近づくものがいろいろある

標本平均の反復(**中心極限定理**);
e.g., 一様分布 [0, 100) から40サンプル

![plot of chunk central-limit](./figure/central-limit-1.png)

大きい$n$の二項分布

![plot of chunk binom-normal](./figure/binom-normal-1.png)

---
## 正規分布に近づくものがいろいろある

大きい$\lambda$のポアソン分布

![plot of chunk poisson-normal](./figure/poisson-normal-1.png)

平均値固定なら$k$が大きくなるほど左右対称に尖るガンマ分布

![plot of chunk gamma-normal](./figure/gamma-normal-1.png)


---
## 有名な確率分布対応関係ふりかえり

<figure style="float: right;">
<img src="../tokiomarine2021/math-model.drawio.svg" width="420"><br>
</figure>

離散一様分布
: コインの表裏、サイコロの出目1–6

負の二項分布 (幾何分布 if n = 1)
: 成功率pの試行がn回成功するまでの失敗回数

二項分布
: 成功率p、試行回数nのうちの成功回数

ポアソン分布
: 単位時間あたり平均$\lambda$回起こる事象の発生回数

ガンマ分布 (指数分布 if k = 1)
: ポアソン過程でk回起こるまでの待ち時間

正規分布
: 確率変数の和、平均値。使い勝手が良く、よく登場する。


---
## 現実には、確率分布に「従わない」ことが多い

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #56B4E9;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。


![plot of chunk overdispersion](./figure/overdispersion-1.png)

「それはなぜ？」と考えて要因を探るのも統計モデリングの仕事。<br>
**「普通はこれに従うはず」を理解してこそ**できる思考。


---
## 疑似乱数生成器 Pseudo Random Number Generator

コンピューター上でランダム**っぽい**数値を出力する装置。<br>
実際には**決定論的**に計算されているので、<br>
シード(出発点)と呼び出し回数が同じなら出る数も同じになる。

```r
set.seed(42)
runif(3L)
# 0.9148060 0.9370754 0.2861395
runif(3L)
# 0.8304476 0.6417455 0.5190959
set.seed(42)
runif(6L)
# 0.9148060 0.9370754 0.2861395 0.8304476 0.6417455 0.5190959
```

シードに適当な固定値を与えておくことで再現性を保てる。<br>
ただし「このシードじゃないと良い結果が出ない」はダメ。

さまざまな「分布に従う」乱数を生成することもできる。

---
## いろんな乱数を生成・可視化して感覚を掴もう


``` r
n = 100
x = sample.int(6, n, replace = TRUE)  # 一様分布(整数)
x = runif(n, min = 0, max = 1)        # 一様分布
x = rgeom(n, prob = 0.5)              # 幾何分布
x = rbinom(n, size = 3, prob = 0.5)   # 二項分布
x = rpois(n, lambda = 10)             # ポアソン分布
x = rnorm(n, mean = 50, sd = 10)      # 正規分布
print(x)

p1 = ggplot(data.frame(x)) + aes(x)
p1 + geom_histogram() # for continuous values
p1 + geom_bar()       # for discrete values
```

🔰 小さい `n` から徐々に大きくして変化を確認しよう。

🔰 ほかのオプションもいろいろ変えて変化を確認しよう。

🔰 1%の当たりを狙って10連ガチャを回す人が100万人いたら、<br>
   全部はずれ、1つ当たり、2つ当たり... の人はどれくらいいるか？

(Quartoでどうまとめるか、腕の見せ所)



---
## データに分布をあてはめたい

ある植物を50個体調べて、それぞれの種子数Xを数えた。<br>
個体Aは種2個、個体Bは種4個、、、サンプルサイズ n = 50 のデータ。


![plot of chunk poisson-seed](./figure/poisson-seed-1.png)

カウントデータだから<span class="fragment custom blur">ポアソン</span>分布っぽい。<br>
分布のパラメータ $\lambda$ はどれくらいがいいだろう？



---
## データに分布をあてはめたい

ある植物を50個体調べて、それぞれの種子数Xを数えた。<br>
個体Aは種2個、個体Bは種4個、、、サンプルサイズ n = 50 のデータ。

![plot of chunk poisson-seed-lambda](./figure/poisson-seed-lambda-1.png)

カウントデータだからポアソン分布っぽい。<br>
分布のパラメータ $\lambda$ はどれくらいがいいだろう？

黒が観察データ。<span style="color: #56B4E9;">青がポアソン分布</span>。
よく重なるのは $\lambda \approx 3$ くらいか。


---
## <ruby>尤<rt>ゆう</rt>度</ruby> (likelihood)

<ruby>尤<rt>もっと</rt></ruby>もらしさ。
モデルのあてはまりの良さの尺度のひとつ。

**あるモデル$M$の下でそのデータ$D$が観察される確率**。<br>
定義通り素直に書くと<br>
$\Pr(D \mid M)$

データ$D$を固定し、モデル$M$の関数とみなしたものが**尤度関数**:<br>
$L(M \mid D)$

モデルの構造も固定してパラメータ$\theta$だけ動かす場合はこう書く:<br>
$L(\theta \mid D)$ とか $L(\theta)$ とか


---
## 尤度を手計算できる例

コインを5枚投げた結果 $D$: 表 4, 裏 1

表が出る確率 $p = 0.5$ と仮定:
<div>\[\begin{split}
L(0.5 \mid D)
  &= \binom 5 1 \times \Pr(\text{表} \mid 0.5) ^ 4 \times \Pr(\text{裏} \mid 0.5) ^ 1 \\
  &= 5 \times 0.5 ^ 4 \times 0.5 ^ 1 = 0.15625
\end{split}\]</div>

表が出る確率 $p = 0.8$ と仮定:
<div>\[\begin{split}
L(0.8 \mid D)
  &= \binom 5 1 \times \Pr(\text{表} \mid 0.8) ^ 4 \times \Pr(\text{裏} \mid 0.8) ^ 1 \\
  &= 5 \times 0.8 ^ 4 \times 0.2 ^ 1 = 0.4096
\end{split}\]</div>

$L(0.8 \mid D) > L(0.5 \mid D)$

$p = 0.8$ のほうがより尤もらしい。



---
## 種子数ポアソン分布の例でも尤度を計算してみる

ある植物が作った種子を数える。$n = 50$個体ぶん。

<div>\[\begin{split}
L(\lambda \mid D)
  = \prod _i ^n \Pr(X_i \mid \lambda)
  = \prod _i ^n \frac {\lambda ^ {X_i} e ^ {-\lambda}} {X_i !}
\end{split}\]</div>

![plot of chunk poisson-seed-likelihood](./figure/poisson-seed-likelihood-1.png)

この中では $\lambda = 3$ がいいけど、より尤もらしい値を求めたい。

---
## 最尤推定 <u>M</u>aximum <u>L</u>ikelihood <u>E</u>stimation

扱いやすい **対数尤度** (log likelihood) にしてから計算する。<br>
一階微分が0になる $\lambda$ を求めると...**標本平均**と一致。

<div>\[\begin{split}
\log L(\lambda \mid D)
  &= \sum _i ^n \left[ X_i \log (\lambda) - \lambda - \log (X_i !) \right] \\
\frac {\mathrm d \log L(\lambda \mid D)} {\mathrm d \lambda}
  &= \frac 1 \lambda \sum _i ^n X_i - n = 0 \\
\hat \lambda &= \frac 1 n \sum _i ^n X_i
\end{split}\]</div>


![plot of chunk poisson-mle](./figure/poisson-mle-1.png)

---
## 最尤推定を使っても“真のλ”は得られない

今回のデータは真の生成ルール“$X \sim \text{Poisson}(\lambda = 3.0)$”で作った。<br>
「50個体サンプル→最尤推定」を1,000回繰り返してみると:

![plot of chunk poisson-mle-repl](./figure/poisson-mle-repl-1.png)

サンプルの取れ方によってはかなりズレた推定をしてしまう。<br>
(標本データへのあてはまりはかなり良く見えるのに！)


---
## サンプルサイズを増やすほどマシにはなる

“$X \sim \text{Poisson}(\lambda = 3.0)$”からnサンプル→最尤推定を1,000回繰り返す:

![plot of chunk poisson-mle-nsam](./figure/poisson-mle-nsam-1.png)

Q. じゃあどれくらいのサンプル数nを確保すればいいのか？<br>
A. 推定したい統計量とか、許容できる誤差とかによる。


---
## すべてのモデルは間違っている

確率分布がいい感じに最尤推定できたとしても、<br>
それはあくまでモデル。仮定。近似。

> All models are wrong, but some are useful. --- George E. P. Box

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="900"><br>
<figcaption><cite>「データ分析のための数理モデル入門」江崎貴裕 2020 より改変</cite></figcaption>
</figure>


---
## 統計モデリングの道具 --- まとめ

- 何はともあれ作図して俯瞰
- **確率変数** $X$
- **確率分布** $X \sim f(\theta)$
    - **少ないパラメータ** $\theta$ でばらつきの様子を表現
    - **この現象はこの分布を作りがち(〜に従う)** という知見がある
- **尤度**
    - あるモデルでこのデータになる確率 $\Pr(D \mid M)$
    - データ固定でモデル探索 → **尤度関数** $L(M \mid D),~L(\theta \mid D)$
    - 対数を取ったほうが扱いやすい → **対数尤度** $\log L(M \mid D)$
    - これを最大化するようなパラメータ $\hat \theta$ 探し ＝ **最尤法**


---
## 🔰 4日目の課題1: 尤度

サイコロを10回振ったら6の目が3回出た。

1. 6の目の出る確率が1/6だとした場合の尤度は?

1. 6の目の出る確率が0.2だとした場合の尤度は?

1. 横軸を6の目の出る確率、縦軸を対数尤度とするグラフを描こう。

1. このサイコロで6の目が出る確率を最尤推定しよう。<br>
   数学で解ければ優。Rで見つければ良。目分量・勘で可。

ヒント
: 確率pで当たるクジをn回引いてk回当たる確率、と同じ計算を使う。
: 数学の $\binom 5 2 = {}_5 \mathrm{C} _2 = 10$ はRでは `choose(5, 2)` 。




---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
- [科学とモデル---シミュレーションの哲学 入門](https://amzn.to/2Q0f6JQ) Michael Weisberg 2017<br>
  (原著: [Simulation and Similarity](https://amzn.to/3bdvhuI) 2013)

<a href="8-glm.html" class="readmore">
8. 統計モデリング2: 一般化線形モデル
</a>
