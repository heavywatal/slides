+++
url = "iwate2025stats/3-bayesian.html"
linktitle = "個体差、ベイズ、MCMC"
title = "3. 個体差、ベイズ、MCMC — 統計モデリング入門 2025 岩手連大"
date = 2025-06-26T18:00:00+09:00
draft = false
dpi = 108
+++

# [統計モデリング入門 2025 岩手連大](.)

<div class="author">
岩嵜 航
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 牧野研 特任助教
</div>

<ol>
<li><a href="1-introduction.html">直線回帰、確率分布</a>
<li><a href="2-glm.html">尤度、最尤推定、一般化線形モデル</a>
<li class="current-deck"><a href="3-bayesian.html">個体差、ベイズ、MCMC</a>
</ol>

<div class="footnote">
2025-06-26 岩手大学 連合農学研究科<br>
<a href="https://heavywatal.github.io/slides/iwate2025stats/">https://heavywatal.github.io/slides/iwate2025stats/</a>
</div>


---
## n個のうちy個生存。二項分布に従......わない！

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。\
親1個体あたりの生存数は<span style="color: #56B4E9;">n=8の二項分布</span>になるはずだけど、\
極端な値(全部死亡、全部生存)が多かった。個体差？


![plot of chunk overdispersion](./figure/overdispersion-1.png)

---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$をそのままパラメータにすると**過剰適合**。\
「パラメータ数 ≥ サンプルサイズ」の“データ読み上げ”モデル。\
i.e., この個体は4個生き残って生存率0.5だね。次の個体は2個体だから......

![plot of chunk saturated-glmm](./figure/saturated-glmm-1.png)

個体の生存能力をもっと少ないパラメータで表現できないか？


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$が能力値$z_i$のシグモイド関数で決まると仮定。\
その能力値は全個体共通の正規分布に従うと仮定:
$z_i \sim \mathcal{N}(\hat z, \sigma)$

![plot of chunk sigmoid](./figure/sigmoid-1.png)

パラメータ2つで済む: 平均 $\hat z$, ばらつき $\sigma$ 。

前者は標本平均 $\hat p$ から求まるとして、後者どうする？

---
## 個体能力のばらつき $\sigma$ が大きいと両端が増える

普通の二項分布は個体差無し $\sigma = 0$ を仮定してるのと同じ。

![plot of chunk alter-sigma](./figure/alter-sigma-1.png)![plot of chunk alter-sigma](./figure/alter-sigma-2.png)

---
## zの値で色分けしてみると想像しやすい

正規分布と二項分布の混ぜ合わせ......?

![plot of chunk alter-sigma-z](./figure/alter-sigma-z-1.png)![plot of chunk alter-sigma-z](./figure/alter-sigma-z-2.png)

---
## 混合分布。ただの二項分布よりも良いあてはまり。

パラメータp(を決めるz)ごとに二項分布を作って、重み付けして足したもの。

![plot of chunk before-mixing](./figure/before-mixing-1.png)

<div align="center">

![plot of chunk after-mixing](./figure/after-mixing-1.png)

</div>

---
## 🔰 乱数生成で混合分布を実感してみよう

1. Quarto Markdown を用意する
1. 100個体の能力値zを正規乱数で生成。分布を描く。
1. 各個体の種子生存率pをシグモイド関数で計算。分布を描く。
   ```r
   sigmoid = function(x, gain = 1) {1 / (1 + exp(-gain * x))}
   ```
1. そのpを使って実際の生存種子数を二項分布(n = 8)から生成。分布を描く。
1. 能力の平均や分散の値を変えたらどうなるか見てみる。


---
## ビールの注文数、再び



お客さんたちが注文したビールの杯数X。平均2.74杯。\
はいはい、<span style="color: #56B4E9;">ポアソン分布</span>でしょ......
いや、分散が大きいぞ。

![plot of chunk beer-overdispersion](./figure/beer-overdispersion-1.png)

全員が同じ平均注文数$\lambda$を持つという仮定が間違ってたのかも。

🔰 平均注文数がガンマ分布に従うと仮定して、乱数生成してみよう。


---
## 負の二項分布 $~\text{NB}(n, p)$

成功率pの試行がn回成功するまでの失敗回数X。
n = 1 のとき幾何分布と一致。

<img src="figure/nbinom-1.png" alt="plot of chunk nbinom">

\\[
\Pr(X = k \mid n,~p) = \binom {n + k - 1} k p^n (1 - p)^k
\\]

失敗回数ではなく試行回数を変数とする定義もある。

平均$\lambda$がガンマ分布でばらついたポアソン分布、とも解釈できる。\
($k \to \infty$でポアソン分布と一致)

---
## 一般化線形混合モデル GLMM

**固定効果(fixed effects)** のみ扱っていたGLMを拡張して、\
**変量効果(random effect)** を混合したモデル。\
<small style="color: #999999;">「混合分布を使うモデル」という意味ではないらしい。</small>

<p>\[\begin{split}
y_i &\sim \text{Binomial}(n,~p_i) \\
\operatorname{logit}(p_i) &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots
  + z_{1i} + \ldots \\
z_{1i} &\sim \mathcal{N}(\mu_1,~\sigma_1)
\end{split}\]</p>

e.g.,\
個体$i$の種子生存率$p_i$は、\
(固定効果) 体サイズ$x_{1i}$と日当たり$x_{2i}$に依存し、\
(変量効果) よくわからん個体差$z_{1i}$と植木鉢差$z_{2i}$もある。

---
## 固定効果にするか、変量効果にするか

推定したパラメータを予測に使うなら固定効果

予測に使えそうなので固定効果向き
: - 観測・操作した連続値変数: 長さ、重さ、温度、etc.
: - 観測・操作したカテゴリカル変数: 性別、投薬、etc.

予測に使えないので変量効果向き
: - 観測・操作できなかった個体差:\
    たまたま集まってくれた学生15人 {A, B, C, ...}。\
    Aさんの固定効果を推定できても、Zさんの予測には使えない。
: - 観測・操作できなかったグループ差:\
    ↑の学生をランダム5人ずつに分けたグループ {い、ろ、は}。\
    いグループの固定効果を推定できても、また集まることはない。

---
## どういうときに変量効果を考える必要があるか

データに**擬似反復**が含まれるとき。\
ぜんぶ独立のつもりで解析すると推定が偏ったり誤ったり。

| 植木鉢 | 個体/植木鉢 | 種子/個体 | 疑似反復 | 推定不可 |
| -----  | ----------- | ----------| ---- | ------ |
| 100個  | 1個体ずつ   | 1個ずつ   | – | 個体差・鉢差 |
| 25個   | 1個体ずつ   | 4個ずつ   | 個体 | 鉢差 |
| 20個   | 5個体ずつ   | 1個ずつ   | 植木鉢 | 個体差 |
| 5個    | 5個体ずつ   | 4個ずつ   | 植木鉢・個体 | – |

疑似反復あり\
→ 観測できなかった個体差・場所差(変量効果)を推定可能\
→ そのぶんを差し引いて固定効果を推定したい


---
## GLMMの問題点・展望

- 最尤推定の計算が難しくなるので、あまり複雑にはできない
    - ベイズ推定を使えばクリアできる
- GLMの拡張として理解はできても、実際に書くのは難しめ
    - 階層ベイズモデルの一種として見るほうが便利

→ ここでGLMMの練習はせず、階層ベイズモデルに進む。

<figure>
<a href="https://kuboweb.github.io/-kubo/ce/LinksGlm.html">
<img src="../tokiomarine2021/image/kubo-p2.png" width="100%">
<figcaption class="url">久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</figcaption>
</a>
</figure>


---
## コイントス4回、たまたま表が1回だったら

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

最尤推定
: 推定結果は最も尤もらしい1点。
: データが少ないとき過剰適合気味。
: 表が出る確率 p = 0.25 のコインだろう。\
  (信じ難いけどデータはこう言っている)

<br>

ベイズ推定
: 推定結果は確率分布そのもの。
: データが少ないなりの不確実さも表現。
: p = 0.25 らへんである確率は高いが、\
  p = 0.6 とかである可能性もまあある。

  </div>
  <div class="column" style="flex-shrink: 1.4;">

![plot of chunk freq-vs-bayes](./figure/freq-vs-bayes-1.png)![plot of chunk freq-vs-bayes](./figure/freq-vs-bayes-2.png)

  </div>
</div>


---
## コイントスの回数が増えていったら

**最尤推定**: 推定値が真の値に近づいていく


![plot of chunk coin-frequentist](./figure/coin-frequentist-1.png)

**ベイズ推定**: 確率分布がどんどん尖り、確信が強まる

![plot of chunk coin-bayesian](./figure/coin-bayesian-1.png)

---
## 確率おさらい

同時分布/結合確率: <span style="font-weight: normal;"> <span style="color: #E69F00;">A</span>かつ<span style="color: #0072B2;">B</span>の確率</span>
: $\Pr(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B}) = \Pr(\textcolor{#E69F00}{A} \cap \textcolor{#0072B2}{B}) = \Pr(\textcolor{#E69F00}{A}) \Pr(\textcolor{#0072B2}{B})$

周辺確率: <span style="font-weight: normal;"> <span style="color: #0072B2;">B</span>によらず<span style="color: #E69F00;">A</span>になる確率</span>
: $\Pr(\textcolor{#E69F00}{A}) = \sum_{\textcolor{#0072B2}{B}} \Pr(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B})$

条件付き確率: <span style="font-weight: normal;"> <span style="color: #0072B2;">B</span>である条件の下で<span style="color: #E69F00;">A</span>になる確率。重要。</span>
: $\Pr(\textcolor{#E69F00}{A} \mid \textcolor{#0072B2}{B}) = \frac {\Pr(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B})} {\Pr(\textcolor{#0072B2}{B})}$

![plot of chunk venn](./figure/venn-1.png)


---
## 条件付き確率がよくわかる具体例

<span style="color: #0072B2;">B Brewery</span>のビールが<span style="color: #E69F00;">Awesome</span>な確率
: $\Pr(\textcolor{#E69F00}{\text{Awesome}} \mid \textcolor{#0072B2}{\text{B Brewery}}) = \frac {\Pr(\textcolor{#E69F00}{\text{Awesome}},~\textcolor{#0072B2}{\text{B Brewery}})} {\Pr(\textcolor{#0072B2}{\text{B Brewery}})}$
: かなり高い確率。良い醸造所。

<span style="color: #E69F00;">Awesome</span>なビールが<span style="color: #0072B2;">B Brewery</span>のものである確率
: $\Pr(\textcolor{#0072B2}{\text{B Brewery}} \mid \textcolor{#E69F00}{\text{Awesome}}) = \frac {\Pr(\textcolor{#E69F00}{\text{Awesome}},~\textcolor{#0072B2}{\text{B Brewery}})} {\Pr(\textcolor{#E69F00}{\text{Awesome}})}$
: かなり低い確率。Awesomeなビールはほかにもたっくさんある。

<img src="figure/venn-1.png" alt="plot of chunk venn">


---
## ベイズの定理

乗法定理
: $\Pr(\textcolor{#E69F00}{A},~\textcolor{#0072B2}{B}) = \Pr(\textcolor{#E69F00}{A} \mid \textcolor{#0072B2}{B})~\Pr(\textcolor{#0072B2}{B}) = \Pr(\textcolor{#0072B2}{B} \mid \textcolor{#E69F00}{A})~\Pr(\textcolor{#E69F00}{A})$

<a href="https://en.wikipedia.org/wiki/Thomas_Bayes">
<img src="../tokiomarine2021/image/Thomas_Bayes.gif" height="240" align="right"></a>

移項するだけで**ベイズの定理**:
<div>
<div style="margin-block: -0.5em;">
<span class="bubble left30" style="margin-inline-start: 2em;">事後確率</span>
<span class="bubble" style="margin-inline-start: 6em;">事前確率</span>
</div>
\[
\Pr(\textcolor{#0072B2}{B} \mid \textcolor{#E69F00}{A}) = \frac
{\Pr(\textcolor{#E69F00}{A} \mid \textcolor{#0072B2}{B})~\Pr(\textcolor{#0072B2}{B})}
{\Pr(\textcolor{#E69F00}{A})}
\]
</div>

宴会場にビールが運ばれてきた。これはどこのブルワリーの？

事前確率: $\Pr(\textcolor{#0072B2}{B})$
: 飲む前、手元のビールが<span style="color: #0072B2;">B Brewery</span>のである確率。
: ↓ 🍻 飲んでみて更新

事後確率: $\Pr(\textcolor{#0072B2}{B} \mid \textcolor{#E69F00}{A})$
: 飲んでみて<span style="color: #E69F00;">Awesome</span>だったビールが
  <span style="color: #0072B2;">B Brewery</span>のである確率。


---
## ベイズの定理 in 感染症検査

- 有病率 $\Pr(I)$ : 0.3% (この地域の感染者の割合; 事前確率)
- 感度 $\Pr(P \mid I)$ : 90% (感染してる人に陽性判定が出る)
- 特異度 $\Pr(\lnot P \mid \lnot I)$: 99% (感染してない人に陰性判定が出る)

さて、陽性適中率(検査陽性の人が実際に感染者である確率)は？

<div>\[\begin{split}
\Pr(I \mid P)
  &= \frac {\Pr(P \mid I)~\Pr(I)} {\Pr(P)} \\
  &= \frac {\Pr(P \mid I)~\Pr(I)}
           {\Pr(P \mid I)~\Pr(I) + \Pr(P \mid \lnot I)~\Pr(\lnot I)} \\
  &= \frac {0.9 \times 0.003} {0.9 \times 0.003 + 0.01 \times 0.997} \approx 0.21
\end{split}\]</div>

感染者を隔離するスクリーニング目的では使いものにならない性能。

🔰 同様に $\Pr(\lnot I \mid \lnot P)$ 陰性的中率を計算してみよう\
🔰 計算結果が検査性能だけでなく有病率にも依存することを確認しよう




---
## ベイズの定理 in 統計モデリング

<p>
<div style="margin-block-end: -0.5em;">
<span class="bubble left30" style="margin-inline-start: 2em;">事後分布</span>
<span class="bubble" style="margin-inline-start: 2em;">尤度</span>
<span class="bubble" style="margin-inline-start: 2em;">事前分布</span>
</div>
<div>\[
\Pr(M \mid D) = \frac {\Pr(D \mid M)~\Pr(M)} {\Pr(D)}
\]</div>
<div style="margin-block-start: -0.5em;">
<span class="bubble flipY" style="margin-inline-start: 11em;">周辺尤度</span>
<div>
</p>

モデル$M$に対する確信度合いをデータ$D$に基づいて更新する。\
モデル$M$を仮説$H$やパラメータ$\theta$に置き換えてもいい。

**周辺尤度**は「確率分布の積分は1」を満たすための正規化定数とみなせる。\
比例関係だけ抜き出してこう書くことが多い:
<div>\[\begin{align}
\Pr(M \mid D) &\propto \Pr(D \mid M)~\Pr(M) \tag{Model}\\
\Pr(H \mid D) &\propto \Pr(D \mid H)~\Pr(H) \tag{Hypothesis} \\
\Pr(\theta \mid D) &\propto \Pr(D \mid \theta)~\Pr(\theta) \tag{Parameter}
\end{align}\]</div>


---
## 表が出る確率のベイズ推定: 1. 事前分布

<div class="column-container">
  <div class="column" style="opacity: 0.2;">
<img src="figure/posterior-beta-1.png" alt="plot of chunk posterior-beta" style="vertical-align: middle;">
&ensp;$\propto$
  </div>
  <div class="column" style="opacity: 0.2;">
<img src="figure/likelihood-binom-1.png" alt="plot of chunk likelihood-binom" style="vertical-align: middle;">
&ensp;⨉
  </div>
  <div class="column">
<img src="figure/prior-beta-1.png" alt="plot of chunk prior-beta" style="vertical-align: middle;">
  </div>
</div>

コイントスを繰り返して、表が出る確率pをベイズ推定したい。

事前分布には**ベータ分布**を採用(理由は後で分かる):
<div>\[\begin{split}
\text{Beta}(p \mid a, b) =
   \frac{\Gamma(a + b)}{\Gamma(a) \Gamma(b)} p^{a-1} (1 - p)^{b-1}
\end{split}\]</div>

分布の形は $a,~b$ によって決まる。\
ガンマ関数の部分は厳つく見えるけどただの正規化定数。\
投げる前なのでとりあえず真っ平らを仮定 $\text{Beta}(p \mid a = 1, b = 1)$:






---
## 表が出る確率のベイズ推定: 2. 尤度関数

<div class="column-container">
  <div class="column" style="opacity: 0.2;">
<img src="figure/posterior-beta-1.png" alt="plot of chunk posterior-beta" style="vertical-align: middle;">
&ensp;$\propto$
  </div>
  <div class="column">
<img src="figure/likelihood-binom-1.png" alt="plot of chunk likelihood-binom" style="vertical-align: middle;">
&ensp;⨉
  </div>
  <div class="column" style="opacity: 0.2;">
<img src="figure/prior-beta-1.png" alt="plot of chunk prior-beta" style="vertical-align: middle;">
  </div>
</div>

4回投げて表が1回だった、というデータで**尤度**を計算(**二項分布**):
<div>\[\begin{split}
\text{Binom}(1 \mid 4,~p) = \binom {1} {4} p^{1} (1 - p)^{3}
\end{split}\]</div>

これに事前分布を掛けて正規化したら事後分布になるはず。


---
## 表が出る確率のベイズ推定: 3. 事後分布

<div class="column-container">
  <div class="column">
<img src="figure/posterior-beta-1.png" alt="plot of chunk posterior-beta" style="vertical-align: middle;">
&ensp;$\propto$
  </div>
  <div class="column" style="opacity: 0.66;">
<img src="figure/likelihood-binom-1.png" alt="plot of chunk likelihood-binom" style="vertical-align: middle;">
&ensp;⨉
  </div>
  <div class="column" style="opacity: 0.66;">
<img src="figure/prior-beta-1.png" alt="plot of chunk prior-beta" style="vertical-align: middle;">
  </div>
</div>

なんと、事後分布もベータ分布になる。

<div>\[\begin{split}
\text{Posterior}
  &\propto \text{Binom}(1 \mid 4,~p) \times \text{Beta}(p \mid  1, 1)\\
  &= \binom {1} {4} p^{1} (1 - p)^{3} \times
     \frac{\Gamma(1 + 1)}{\Gamma(1) \Gamma(1)} p^{1-1} (1 - p)^{1-1} \\
  &= C p^{2-1} (1 - p)^{4-1} \\
  &= \text{Beta}(p \mid 2, 4)
\end{split}\]</div>

ベータ分布の形パラメータ$a$が表、$b$が裏の回数分だけ増加。


---
## 表が出る確率のベイズ推定: 4. 逐次学習

さっきの事後分布を事前分布として、さらにデータを集める。

コイントス4回のうち表1回、に基づく**事前分布**: $\text{Beta}(p \mid 2,~4)$

さらに16回投げたら表が7回、の**尤度**: $\text{Binomial}(7 \mid 16,~p)$

**事後分布**はまた事前分布と同じ形になる:

<div>\[\begin{split}
\text{Beta}(p \mid 9, 13) \propto
  \text{Binomial}(7 \mid 16,~p) \times \text{Beta}(p \mid 2, 4)
\end{split}\]</div>

データを加えるたびに更新していける:

<img src="figure/coin-bayesian-1.png" alt="plot of chunk coin-bayesian" width="90%">

---
## 共役事前分布

事後分布が事前分布と同じ形なので計算しやすい、という組み合わせ。

| 尤度関数 | 共役事前分布 |
| ---------- | ------------ |
| 二項分布 | ベータ分布 |
| ポアソン分布 | ガンマ分布 |
| 正規分布 | ガンマ分布 |
| 正規分布 (分散既知) | 正規分布 |

共役事前分布を使うことが常に最善とは限らない。\
**無情報事前分布**を使って計算機に頑張らせる風潮。

---
## 事後分布を用いた推定

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

区間推定
: 幅のある推定値を提示
: e.g., 95%ベイズ確信区間:\
  等裾事後確信区間 (<u>E</u>qual-<u>T</u>ailed <u>I</u>nterval)\
  最高密度区間 (<u>H</u>ighest <u>D</u>ensity <u>I</u>nterval)

点推定
: 値を1点だけ提示
: e.g.,\
  事後確率最大値 (<u>M</u>aximum <u>A</u> <u>P</u>osteriori)\
  事後中央値 (Posterior <u>Med</u>ian)\
  事後期待値 (<u>E</u>xpected <u>A</u> <u>P</u>osteriori)

  </div>
  <div class="column" style="flex-shrink: 1.3;">

![plot of chunk integrate](./figure/integrate-1.png)

  </div>
</div>

???

ベイズ確信区間 (credible interval)
: 真の値が95%の確率で含まれる区間。

信頼区間 (confidence interval)
: 頻度主義の考え方に基づいていて、解釈が難しい。
「標本抽出を100回繰り返すとそのうちの95回はその区間に母平均が含まれる」
真の値は1つに定まっていて、不確実性は有限のサンプリングに由来する。



---
## ベイズ推定の中間まとめ

- 推定結果は**事後分布** ∝ 尤度関数。
    - 広がり具合によって不確実性も表現できる。
    - **逐次学習**で尖っていき、確信が強まる。

<img src="figure/coin-bayesian-1.png" alt="plot of chunk coin-bayesian" width="80%">

<hr>

コイン投げモデルのベータ分布は美しい例。\
→ 解析的(数学的)に解ける。

実践的なモデル・事後分布はもっと複雑。\
→ コンピュータに頼って数値計算: MCMC


---
## MCMC: <u>M</u>arcov <u>C</u>hain <u>M</u>onte <u>C</u>arlo

<a href="https://en.wikipedia.org/wiki/Andrey_Markov">
<img src="../tokiomarine2021/image/AAMarkov.jpg" height="270" align="right"></a>

マルコフ連鎖
: 次の時点の挙動が現在の値だけで決定されるような確率過程。
: $\ldots \to X_{t - 2} \to X_{t - 1} \to X_{t} \to X_{t + 1}$
: $\Pr(X_{t+1} \mid X_{t}, X_{t-1}, X_{t-2}, \ldots) = \Pr(X_{t+1} \mid X_{t})$
: e.g., すごろく

モンテカルロ法
: 乱数を用いた計算方法の総称。
: <a href="https://en.wikipedia.org/wiki/Monte_Carlo_Casino">
  <img src="../tokiomarine2021/image/Real_Monte_Carlo_Casino.jpg" height="320"></a>
  <a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">
  <img src="../tokiomarine2021/image/Stanislaw_Ulam.jpg" height="320"></a>
  <a href="https://en.wikipedia.org/wiki/John_von_Neumann">
  <img src="../tokiomarine2021/image/John_von_Neumann.jpg" height="320"></a>
  <a href="https://en.wikipedia.org/wiki/Nicholas_Metropolis">
  <img src="../tokiomarine2021/image/Nicholas_Metropolis.png" height="320"></a>

???
スタニスワフ・ウラムがソリテアの成功率を考えてた時に思いついて、
同僚のジョン・フォン・ノイマンが計算機上での実用まで持ってった。
モナコ公国のモンテカルロ地区に国営カジノがあって、
ウラムの叔父がそこで負けて親戚から借金したことにちなんで
同僚のニコラス・メトロポリスが命名したらしい。

マルコフ連鎖
: マルコフ過程のうち、離散的な時間を考えるもの。

マルコフ過程
: マルコフ性を持つ確率過程

マルコフ性
: 次の時点の挙動が現在の値だけで決定され、過去の値と無関係


最適化ではなくサンプリング法


---
## モンテカルロ法は乱数を用いた計算方法

e.g., 半径1の円の面積

数学を知っていれば $\pi r ^ 2 \approx 3.14159$

面積4の正方形に400個の一様乱数を打ち込んだら318個が円に乗った:\
$4 \times \frac {318} {400} = 3.18$

![plot of chunk circle](./figure/circle-1.png)

---
## 変な分布もモンテカルロ法で扱えそう

e.g., 確率密度分布に従って変数Xを集める(棄却サンプリング)。



<div>
<img src="figure/mcpdf-2.png" alt="plot of chunk mcpdf" style="vertical-align: middle;">
$\;\sim\;$
<img src="figure/mcpdf-1.png" alt="plot of chunk mcpdf" style="vertical-align: middle;">
</div>

でも、ハズレの値もけっこう引いてしまう。


---
## 次元の呪い: 高次元になるほど当たりにくくなる

(N次元球の体積 / N次元の立方体) はゼロに近づいていく。

<img src="figure/circle-1.png" alt="plot of chunk circle" align="right">

- 2次元: $\frac {\pi r ^ 2} {(2r) ^ 2} = \frac \pi 4 \approx 0.79$
- 3次元: $\frac {\frac 4 3 \pi r ^ 3} {(2r) ^ 3} = \frac \pi 6 \approx 0.52$
- N次元: $\frac {\frac {\pi ^ {N/2}} {\Gamma (N/2 + 1)} r ^ N} {(2r) ^ N} = \frac {\pi ^ {N/2}} {2^N \Gamma (N/2 + 1)} \to 0$

パラメータが増えると計算量(≈乱数の無駄撃ち)が急増。

<hr>

密度の高い「当たり」付近を効率よく探索したい。\
「当たり」は「当たり」の近くにありがちだろう。\
→ マルコフ連鎖が使えそう


---
## Metropolis--Hastings法 (MH法)

0.  パラメータ $\theta$ の初期値を選ぶ
1.  $\theta$ をちょっと増減させて $\theta_\text{new}$ を作る
2.  それぞれ尤度を計算し、比較。
    - $L(\theta_\text{new}) \ge L(\theta)$ なら $\theta_\text{new}$ を即採択
    - $L(\theta_\text{new}) < L(\theta)$ でも
      確率 $r = \frac {L(\theta_\text{new})} {L(\theta)}$ で  $\theta_\text{new}$ を採択
3.  $\theta_\text{new}$ が採択されたら $\theta$ を更新。手順1に戻る。


![plot of chunk metropolis](./figure/metropolis-1.png)

---
## 採択されたパラメータ値の軌跡

尤度が高い方にただ向かうだけでなく、結構うろつく。\
通ったパラメータ値を集めるといい感じの分布が得られる。

![plot of chunk metropolis-trajectory](./figure/metropolis-trajectory-.gif)


---
## 尤度に比例する事後分布からサンプルしたのと等価

全体にばら撒く棄却サンプリングよりも効率よく集められる。\
が、パラメータ1つの1次元ではご利益はわかりにくい。



<div>
<img src="figure/propto-lik-1.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
$\;\sim\;$
<img src="figure/propto-lik-2.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
$\;\propto\;$
<img src="figure/propto-lik-3.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
</div>

パラメータが複数ある場合は？


---
## Gibbs Sampling

パラメータが複数の場合「ほかを固定してひとつ更新」を繰り返す。

e.g., 二次元正規分布。(-2, 2) からスタート。

![plot of chunk gibbs](./figure/gibbs-.gif)


---
## 何回やっても似たような結果になってほしい

乱数や初期値によって偶々、じゃないことを確認したい。

e.g., `chains = 3` 。ほぼ同じところをうろうろ:

![plot of chunk chains](./figure/chains-1.png)

収束(convergence)の判定については後ほど。

---
## 初期値の影響が消えるまでウォーミングアップ

定常分布の山に到達してからが本番。

e.g., `iter_warmup = 200, iter_sampling = 600` で灰色の部分を捨てる:

![plot of chunk warmup](./figure/warmup-1.png)

どれくらい長く捨てるべきかは場合による。


---
## 適度に間引いて自己相関を軽減したい

直前の値と似すぎていたら独立サンプルとして扱えないので。

e.g., `thin = 5` で5回に1回だけサンプルする:

![plot of chunk thin](./figure/thin-1.png)

間引かなくても大丈夫な場合も、間引いても解決しない場合もある。



---
## 収束判定

- 複数chainsで異なる初期値から実行し、軌跡を可視化(traceplot)
- Gelman-Rubin統計量 $\hat R < 1.05$
- Effective Sample Size (ESS) $N_\text{eff} > 100$ per chain







![plot of chunk convergence](./figure/convergence-1.png)

[`diagnose()`](https://mc-stan.org/docs/cmdstan-guide/diagnose_utility.html)
みたいな機能が提供されていれば利用する。

実行時に[警告してもらえること](https://mc-stan.org/misc/warnings.html)もある。

???
https://ill-identified.hatenablog.com/entry/2020/05/21/001158


---
## 収束・自己相関が悪い場合にどう改善するか

- 小手先の対処
    - iteration (warmup + sampling) をもっと長く
    - thinを大きくして間引く
- ちょっと大掛かり
    - プログラムの書き方を改善する
    - モデルの構造を見直す
    - アルゴリズム・ソフトウェアを変える


---
## 似て非なる: MCMCサンプル増やす vs データ増やす

<div>
<img src="figure/propto-lik-1.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
$\;\sim\;$
<img src="figure/propto-lik-2.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
$\;\propto\;$
<img src="figure/propto-lik-3.png" alt="plot of chunk propto-lik" style="vertical-align: middle;">
</div>

- MCMCサンプルを増やす → 事後分布・尤度関数をより良く近似
- データを増やす → 分布の裾野が狭まり、確信が強まる

<img src="figure/coin-bayesian-1.png" alt="plot of chunk coin-bayesian">


---
##  MCMCの方法いろいろ

採択率を高め、早く収束するように改良されてきている。

- Metropolis--Hastings法
    - Gibbs Sampling
    - Hamiltonian Monte Carlo (HMC)
        - No-U-Turn Sampler (NUTS)


---
## MCMCソフトウェア

- [BUGS](https://www.mrc-bsu.cam.ac.uk/software/)
    - クローズドソースで、ほぼWindows専用。
- [JAGS](https://mcmc-jags.sourceforge.io/)
    - オープンソースで、さまざまなOS・言語から利用可能。
    - マニュアルや用例が不足。
- [**Stan**](https://mc-stan.org/) 👈
    - オープンソースで、さまざまなOS・言語から利用可能。
    - 開発も利用も活発。マニュアルや用例も充実。
    - HMC/NUTSにより早く収束。
- [PyMC3](https://docs.pymc.io/)
- [NumPyro](https://num.pyro.ai/)
- [TensorFlow Probability](https://www.tensorflow.org/probability/)


---
## Stan

<a href="https://mc-stan.org/">
<img src="/slides/image/stan/logo_name.png" width="180" align="right">
</a>

- Stan言語で**モデルを柔軟に記述**できる。
- C++で書かれていて**高速に動作**。
- RやPythonなどから呼び出して使うのが便利。

## R Interface

[RStan](http://mc-stan.org/rstan/)
: [Rcpp](https://heavywatal.github.io/rstats/rcpp.html)を介して[StanHeaders](https://github.com/stan-dev/rstan/tree/develop/StanHeaders)を取り込んだパッケージ。

[CmdStanR](https://mc-stan.org/cmdstanr/) 👈 今後の主流
: [CmdStan](https://mc-stan.org/users/interfaces/cmdstan)
  を呼び出し、書き出されたCSVを読み取る。


---
## CmdStanR: インストールがちょっと特殊

実行の前後にRを再起動してまっさらにすることを推奨。

1. C++言語を扱うためのツールを用意。
    - <iconify-icon inline icon="bi:apple"></iconify-icon>
      macOS: Command Line Tools (`xcode-select --install`)
    - <iconify-icon inline icon="bi:windows"></iconify-icon>
      Windows: [RTools](https://cran.r-project.org/bin/windows/Rtools/)
      (Rのバージョンに合わせる)
1. [CmdStanR](https://mc-stan.org/cmdstanr/)パッケージをインストール。
   (まだCRANに登録されていない):
    ```r
    install.packages("cmdstanr", repos = c("https://stan-dev.r-universe.dev", getOption("repos")))
    ```
1. CmdStan本体と可視化パッケージのインストール:
    ```r
    library(cmdstanr)
    check_cmdstan_toolchain(fix = TRUE)
    install_cmdstan()
    install.packages("bayesplot")
    ```

<https://mc-stan.org/cmdstanr/articles/cmdstanr.html>

---
## 🔰 とりあえずStanを動かしてみよう

```r
library(cmdstanr)
library(bayesplot)
```

```
This is cmdstanr version 0.9.0
- CmdStanR documentation and vignettes: mc-stan.org/cmdstanr
- CmdStan path: /Users/watal/.cmdstan/cmdstan-2.36.0
- CmdStan version: 2.36.0
```

```
This is bayesplot version 1.12.0.9000
```

おおまかな流れ:

1. データ準備
1. Stan言語でモデルを書く
1. モデルをコンパイルして機械語に翻訳 → 実行ファイル
1. 実行ファイルにデータを渡してMCMCサンプリング
1. 結果を見る


---
## 説明変数なしのベイズ推定: データ準備

表が出る確率 $p=0.7$ のイカサマコインをN回投げたデータを作る。\
この $p$ をStanで推定してみよう。


``` r
true_p = 0.7
N = 40L
coin_data = list(N = N, x = rbinom(N, 1, true_p))
print(coin_data)
```

```
$N
[1] 40

$x
 [1] 1 0 0 1 1 1 1 0 1 0 1 1 0 1 1 0 1 1 1 1 0 0 1 1 1 1 1 1 1 0 1 1 0 1 1 0 1 1 1 1
```

Rならlist型、Pythonならdict型にまとめてStanに渡す。


---
## 説明変数なしのベイズ推定: Stan言語でモデル定義

別ファイルに書いておく。
e.g., `coin.stan`:


``` stan
data {
  int<lower=0> N;
  array[N] int x;
}
parameters {
  real<lower=0,upper=1> p;
}
model {
  x ~ binomial(1, p);
}
```

- いくつかのブロックに分けて記述する:\
  R/Pythonから受け取る `data`, 推定する `parameter`, 本体の `model`.
- [変数には型や制約を設定できる](https://mc-stan.org/docs/reference-manual/overview-of-data-types.html)
- [関数もたくさん用意されている](https://mc-stan.org/docs/functions-reference/)

---
## Stan言語の7種のブロック

順番厳守。よく使うのは**太字のやつ**。

1. `functions {...}`
1. **`data {...}`**
1. `transformed data {...}`
1. **`parameters {...}`**
1. `transformed parameters {...}`
1. **`model {...}`**
1. `generated quantities {...}`

<https://mc-stan.org/docs/reference-manual/overview-of-stans-program-blocks.html>


---
## 説明変数なしのベイズ推定: MCMCサンプル

予め実行速度の速い機械語に翻訳(コンパイル):

``` r
model = cmdstanr::cmdstan_model("stan/coin.stan")
```

モデルとデータを使ってMCMCサンプリング:


``` r
fit = model$sample(coin_data, seed = 24601L)
```

いろいろオプションはあるけど、ここではデフォルトに任せる:\
`chains`, `inits`, `iter_warmup`, `iter_samples`, `thin`, ...

問題があったら警告してくれるので**ちゃんと読む**。

---
## 説明変数なしのベイズ推定: 結果を眺める

`parameters` ブロックに書いた変数の情報が出てくる。\
乱数を使った計算なので(乱数シードを固定しない限り)毎回変わる。


``` r
print(fit)
```

```
 variable   mean median   sd  mad     q5    q95 rhat ess_bulk ess_tail
     lp__ -25.61 -25.34 0.70 0.29 -26.99 -25.13 1.00     2012     2035
     p      0.72   0.72 0.07 0.07   0.60   0.82 1.00     1501     1708
```

真の値に近い $p \approx 0.7$ が得られた
(0.6 から
0.82 である確率が90%)。\
$\hat R$ もほぼ1で $N_\text{eff}$ も大きいのでよさそう。

`lp__` はlog posterior(対数事後確率)。後述。

念のため trace plot も確認しておこう→


---
## 説明変数なしのベイズ推定: trace plot 確認

どのchainも似た範囲を動いていて、しっかり毛虫っぽい:


``` r
draws = fit$draws()
params = names(model$variables()$parameters)
bayesplot::mcmc_trace(draws, pars = params)
```

![plot of chunk stan-binom-traceplot](./figure/stan-binom-traceplot-1.png)

---
## 説明変数なしのベイズ推定: 自己相関の確認

2--3ステップくらいで自己相関がほぼ消えるので問題なし:


``` r
bayesplot::mcmc_acf_bar(draws, pars = params)
```

![plot of chunk stan-binom-ac](./figure/stan-binom-ac-1.png)

---
## 説明変数なしのベイズ推定: 推定結果確認

サンプルサイズNが小さいせいか裾野の広い推定結果。\
真の$p$の値も含まれている:


``` r
bayesplot::mcmc_hist(draws, bins = 20, pars = params)
```

![plot of chunk stan-binom-hist](./figure/stan-binom-hist-1.png)


---
## `lp__`: log posterior とは?

`model` ブロックに次のように書いてあると:
```stan
model {
  mu ~ normal(0.0, 10.0);  // prior
  x ~ normal(mu, 1.0);     // likelihood
}
```

内部的には次のような処理が行われている:
```stan
target += normal_lpdf(theta | 0.0, 10.0)  // prior
target += normal_lpdf(x | theta, 1.0);    // likelihood
```

つまり、事前確率と尤度の対数の和を取っている。\
ベイズの定理により、事後確率はこれに比例する。\
`lp__` はこの `target` 変数を記録しておいたようなもの。


---
## Stanで回帰じゃないパラメータ推定、まとめ

別ファイルに書いておく。
e.g., `coin.stan`:


``` stan
data {
  int<lower=0> N;
  array[N] int x;
}
parameters {
  real<lower=0,upper=1> p;
}
model {
  x ~ binomial(1, p);
}
```

Rからデータを渡して走らせる:

``` r
coin_data = tibble::lst(N = 50L, x = rbinom(N, 1, 0.7))
coin_model = cmdstanr::cmdstan_model("stan/binom.stan")
coin_fit = coin_model$sample(coin_data, seed = 24601L)
```


---
## 直線回帰するStanコードの例

受け渡しするデータや推定するパラメータがちょっと増えただけ。


``` stan
data {
  int<lower=0> N;
  vector<lower=0>[N] x;
  vector[N] y;
}

parameters {
  real intercept;
  real slope;
  real<lower=0> sigma;
}

model {
  y ~ normal(intercept + slope * x, sigma);
}
```

Rと同様、 `slope * x` のようなベクトル演算ができる。

---
## 直線回帰っぽいデータに当てはめてみる


``` r
sample_size = 50L
df_lm = tibble::tibble(
  x = rnorm(sample_size, 1.70, 0.05),
  bmi = rnorm(sample_size, 22, 1),
  y = bmi * (x**2)
)
```

<img src="figure/weight-lm-1.png" alt="plot of chunk weight-lm">


---
## 操作は回帰じゃないモデルと同じ



``` r
# リストに入れて渡す:
lm_data = as.list(df_lm)
lm_data[["N"]] = sample_size
# モデルを実行速度の速い機械語に翻訳(コンパイル):
lm_model = cmdstanr::cmdstan_model("stan/lm.stan")
# モデルとデータを使ってMCMCサンプリング:
lm_fit = lm_model$sample(lm_data, seed = 19937L, refresh = 0)
```

``` r
print(lm_fit)
```

```
  variable   mean median    sd   mad     q5    q95 rhat ess_bulk ess_tail
 lp__      -79.49 -79.16  1.30  1.07 -82.06 -78.08 1.00     1065     1341
 intercept -68.54 -69.16 14.57 14.59 -91.28 -43.45 1.00      886      777
 slope      77.87  78.18  8.56  8.58  63.13  91.30 1.00      887      797
 sigma       3.08   3.04  0.33  0.32   2.62   3.65 1.00     1381     1340
```

切片と傾きはそれらしき値。
$\hat R$ や $N_{eff}$ も良さそう。
もう少し確認しよう。

---
## CmdStanによる診断


``` r
lm_fit$cmdstan_diagnose()
```

satisfactory とか no problems ばかりであることを確認
```
Treedepth satisfactory for all transitions.

No divergent transitions found.

E-BFMI satisfactory.

Effective sample size satisfactory.

Split R-hat values satisfactory all parameters.

Processing complete, no problems detected.
```

---
## `draws`: 生のMCMCサンプル


``` r
lm_draws_array = lm_fit$draws()
dim(lm_draws_array)
```

```
[1] 1000    4    4
```

``` r
print(lm_draws_array)
```

```
# A draws_array: 1000 iterations, 4 chains, and 4 variables
, , variable = lp__

         chain
iteration   1   2   3   4
        1 -79 -79 -78 -82
        2 -79 -80 -78 -81
        3 -78 -78 -79 -82
        4 -78 -78 -79 -82
        5 -81 -78 -79 -80

, , variable = intercept

         chain
iteration   1   2   3   4
        1 -53 -74 -71 -34
        2 -58 -74 -76 -38
        3 -65 -74 -62 -36
        4 -72 -72 -58 -39
        5 -90 -62 -58 -65

, , variable = slope

         chain
iteration  1  2  3  4
        1 68 81 79 57
        2 72 81 82 60
        3 76 81 74 59
        4 80 80 72 61
        5 90 74 72 76

, , variable = sigma

         chain
iteration   1   2   3   4
        1 3.2 2.7 3.1 3.5
        2 2.8 2.7 2.9 2.9
        3 2.9 2.7 2.8 2.9
        4 3.2 2.7 2.8 3.5
        5 3.7 3.0 2.8 2.6

# ... with 995 more iterations
```

---
## `draws`: data.frameのほうが見やすいかも


``` r
lm_draws = lm_fit$draws(format = "df") |> print()
```

```
# A draws_df: 1000 iterations, 4 chains, and 4 variables
   lp__ intercept slope sigma
1   -79       -53    68   3.2
2   -79       -58    72   2.8
3   -78       -65    76   2.9
4   -78       -72    80   3.2
5   -81       -90    90   3.7
6   -80       -85    88   3.4
7   -79       -86    88   3.1
8   -79       -85    87   3.0
9   -79       -64    75   2.6
10  -79       -63    74   3.4
# ... with 3990 more draws
# ... hidden reserved variables {'.chain', '.iteration', '.draw'}
```

実体はCmdStanが書き出したCSVファイル:


``` r
lm_fit$output_files()
```
```
[1] "/var/folders/**/***/T/Rtmp******/*-2023****-1-******.csv"
[2] "/var/folders/**/***/T/Rtmp******/*-2023****-2-******.csv"
[3] "/var/folders/**/***/T/Rtmp******/*-2023****-3-******.csv"
[4] "/var/folders/**/***/T/Rtmp******/*-2023****-4-******.csv"
```

---
## `traceplot`: サンプル順に `draws` を並べたもの

どの chain も同じところをうろうろしていればOK。


``` r
params = names(lm_model$variables()$parameters)
bayesplot::mcmc_trace(lm_draws, pars = params, facet_args = list(ncol = 1))
```

![plot of chunk stan-lm-traceplot](./figure/stan-lm-traceplot-1.png)

---
## 各パラメータの事後分布


``` r
bayesplot::mcmc_hist(lm_draws, pars = params, bins = 30)
```

![plot of chunk stan-lm-hist](./figure/stan-lm-hist-1.png)

---
## Posterior Predictive Checking (PPC)

サイズ $S$ のパラメータdrawsと $N$ 個の観察値から
$S \times N$ 行列の $y_{rep}$ を生成:


``` r
mu_rep = lm_draws$intercept + lm_draws$slope %o% df_lm$x
yrep = mu_rep + rnorm(prod(dim(mu_rep)), 0, lm_draws$sigma)
bayesplot::ppc_intervals(y = df_lm[["y"]], yrep = yrep,
  x = df_lm[["x"]], prob = 0.5, prob_outer = 0.9)
```

![plot of chunk stan-lm-ppc](./figure/stan-lm-ppc-1.png)![plot of chunk stan-lm-ppc](./figure/stan-lm-ppc-2.png)

<http://mc-stan.org/bayesplot/reference/PPC-overview.html>


---
## 変数とブロックをうまく使って可読性アップ

途中計算に名前をつけることでモデルが読みやすくなる:

```stan
model {
  vector[N] mu = intercept + slope * x;
  y ~ normal(mu, sigma);
}
```

`transformed parameters` ブロックに書くとさらに見通しがよくなる:

```stan
transformed parameters {
  vector[N] mu = intercept + slope * x;
}

model {
  y ~ normal(mu, sigma);
}
```

見た目が変わるだけでなくMCMCサンプルが記録されるようになる。

---
## drawsは嵩むが頭は使わずに済む



``` r
lmtr_model = cmdstanr::cmdstan_model("stan/lm-transformed.stan")
lmtr_fit = lmtr_model$sample(lm_data, seed = 19937L, refresh = 0)
lmtr_draws = lmtr_fit$draws(format = "df") |> print()
```

```
# A draws_df: 1000 iterations, 4 chains, and 54 variables
   lp__ intercept slope sigma mu[1] mu[2] mu[3] mu[4] mu[5] mu[6] mu[7] mu[8] mu[9] mu[10] mu[11] mu[12] mu[13] mu[14] mu[15] mu[16] mu[17] mu[18] mu[19] mu[20] mu[21] mu[22] mu[23] mu[24] mu[25] mu[26] mu[27] mu[28] mu[29] mu[30] mu[31] mu[32] mu[33] mu[34] mu[35] mu[36] mu[37] mu[38] mu[39] mu[40] mu[41] mu[42] mu[43] mu[44] mu[45] mu[46] mu[47] mu[48] mu[49] mu[50]
1 -79.1     -52.6  68.3  3.25  64.8  69.2  57.9  62.1  64.7  58.7  69.3  61.8  59.3   63.9   67.3   62.5   61.5   64.7   62.9   62.7   66.7   61.5   58.1   57.0   61.7   63.9   64.8   66.1   63.9   61.9   63.7   59.5   70.4   63.8   71.5   67.0   64.5   63.9   68.1   66.6   56.4   65.4   68.6   54.9   64.5   67.0   61.0   62.1   60.5   64.2   67.9   66.6   65.7   62.0
2 -78.6     -58.4  71.8  2.80  64.9  69.6  57.7  62.1  64.8  58.6  69.7  61.8  59.1   64.0   67.5   62.6   61.5   64.8   62.9   62.7   66.9   61.5   57.9   56.7   61.7   64.0   64.9   66.3   64.0   61.8   63.8   59.3   70.8   63.9   71.9   67.3   64.6   64.0   68.4   66.8   56.2   65.6   69.0   54.6   64.6   67.2   60.9   62.1   60.4   64.3   68.2   66.8   65.8   62.0
3 -78.1     -64.5  75.6  2.91  65.4  70.3  57.8  62.4  65.2  58.7  70.4  62.0  59.3   64.4   68.1   62.9   61.7   65.3   63.2   63.1   67.5   61.8   57.9   56.7   62.0   64.4   65.4   66.8   64.4   62.1   64.1   59.5   71.6   64.3   72.8   67.9   65.1   64.4   69.0   67.4   56.1   66.1   69.6   54.5   65.0   67.8   61.2   62.4   60.6   64.7   68.8   67.4   66.3   62.2
4 -78.5     -72.4  80.3  3.20  65.6  70.8  57.6  62.4  65.5  58.5  71.0  62.1  59.1   64.6   68.5   63.0   61.7   65.5   63.3   63.2   67.8   61.8   57.7   56.4   62.0   64.5   65.6   67.1   64.5   62.2   64.3   59.4   72.2   64.4   73.5   68.3   65.3   64.5   69.5   67.7   55.8   66.4   70.1   54.0   65.3   68.2   61.2   62.5   60.6   64.9   69.2   67.7   66.6   62.3
5 -81.0     -89.7  90.0  3.72  65.0  70.8  56.0  61.4  64.8  57.0  71.0  61.0  57.7   63.9   68.3   62.0   60.7   64.9   62.5   62.3   67.5   60.7   56.1   54.7   60.9   63.8   65.0   66.7   63.8   61.1   63.5   58.0   72.4   63.7   73.8   68.0   64.6   63.8   69.4   67.4   54.0   65.8   70.1   52.0   64.6   67.9   60.0   61.5   59.3   64.2   69.1   67.4   66.1   61.3
6 -79.6     -84.7  87.6  3.40  65.8  71.5  57.0  62.3  65.6  58.0  71.6  61.9  58.7   64.7   69.0   62.9   61.6   65.7   63.3   63.1   68.2   61.7   57.2   55.8   61.9   64.6   65.8   67.5   64.6   62.1   64.4   59.0   73.0   64.5   74.4   68.7   65.4   64.6   70.1   68.1   55.1   66.6   70.7   53.2   65.4   68.6   60.9   62.4   60.3   65.0   69.8   68.1   66.9   62.2
# ... with 3994 more draws
# ... hidden reserved variables {'.chain', '.iteration', '.draw'}
```

この右側の `mu` 行列はさっき苦労して作った `mu_rep` と同じ。

ひょっとして `yrep` もStanで作れる？

---
## `generated quantities` ブロックで乱数生成

(`data` と `parameters` のブロックは同じなので省略)


``` stan
transformed parameters {
  vector[N] mu = intercept + slope * x;
}

model {
  y ~ normal(mu, sigma);
}

generated quantities {
  array[N] real yrep = normal_rng(mu, sigma);
}
```

[`normal_rng()`](https://mc-stan.org/docs/functions-reference/normal-distribution.html)
のような乱数生成が使えるのは\
`generated quantities` ブロックだけ。

(`yrep` を `vector[N]` 型で作ろうとすると怒られる。)


---
## drawsはさらに嵩むがコードは美しくなった


``` r
lmgen_model = cmdstanr::cmdstan_model("stan/lm-generated.stan")
lmgen_fit = lmgen_model$sample(lm_data, seed = 19937L, refresh = 0)
lmgen_draws = lmgen_fit$draws(format = "df") |> print()
```

```
# A draws_df: 1000 iterations, 4 chains, and 104 variables
   lp__ intercept slope sigma mu[1] mu[2] mu[3] mu[4] mu[5] mu[6] mu[7] mu[8] mu[9] mu[10] mu[11] mu[12] mu[13] mu[14] mu[15] mu[16] mu[17] mu[18] mu[19] mu[20] mu[21] mu[22] mu[23] mu[24] mu[25] mu[26] mu[27] mu[28] mu[29] mu[30] mu[31] mu[32] mu[33] mu[34] mu[35] mu[36] mu[37] mu[38] mu[39] mu[40] mu[41] mu[42] mu[43] mu[44] mu[45] mu[46] mu[47] mu[48] mu[49] mu[50] yrep[1] yrep[2] yrep[3] yrep[4] yrep[5] yrep[6] yrep[7] yrep[8] yrep[9] yrep[10] yrep[11] yrep[12] yrep[13] yrep[14] yrep[15] yrep[16] yrep[17] yrep[18] yrep[19] yrep[20] yrep[21] yrep[22] yrep[23] yrep[24] yrep[25] yrep[26] yrep[27] yrep[28] yrep[29] yrep[30] yrep[31] yrep[32] yrep[33] yrep[34] yrep[35] yrep[36] yrep[37] yrep[38] yrep[39] yrep[40] yrep[41] yrep[42] yrep[43] yrep[44] yrep[45] yrep[46] yrep[47] yrep[48] yrep[49] yrep[50]
1 -79.1     -52.6  68.3  3.25  64.8  69.2  57.9  62.1  64.7  58.7  69.3  61.8  59.3   63.9   67.3   62.5   61.5   64.7   62.9   62.7   66.7   61.5   58.1   57.0   61.7   63.9   64.8   66.1   63.9   61.9   63.7   59.5   70.4   63.8   71.5   67.0   64.5   63.9   68.1   66.6   56.4   65.4   68.6   54.9   64.5   67.0   61.0   62.1   60.5   64.2   67.9   66.6   65.7   62.0    63.7    70.2    60.3    65.1    68.6    55.8    71.9    58.7    59.3     62.6     66.6     63.4     62.8     65.1     61.4     59.7     68.9     60.9     57.3     55.2     62.0     61.5     73.5     74.5     66.2     61.8     67.0     54.7     72.3     63.1     69.9     74.7     62.9     65.7     71.1     68.2     53.4     71.4     67.1     51.9     63.8     67.9     63.0     57.6     64.0     63.0     65.1     66.6     61.9     61.8
2 -80.1     -46.0  64.3  3.10  64.5  68.7  58.1  62.0  64.4  58.8  68.8  61.7  59.3   63.7   66.9   62.4   61.4   64.4   62.7   62.6   66.3   61.5   58.2   57.2   61.6   63.7   64.5   65.7   63.7   61.8   63.5   59.5   69.8   63.6   70.8   66.7   64.3   63.7   67.7   66.2   56.7   65.1   68.1   55.3   64.2   66.6   61.0   62.0   60.5   63.9   67.4   66.2   65.3   61.9    62.4    70.7    57.1    58.7    71.2    56.6    70.2    61.9    57.0     65.6     70.0     63.5     60.5     60.1     65.3     62.3     70.1     64.9     58.2     56.1     59.3     60.9     64.2     64.3     64.2     62.4     65.3     54.8     70.9     60.6     68.9     70.9     65.6     64.8     68.9     66.5     57.3     64.4     69.5     55.8     64.5     71.4     64.4     63.6     63.8     69.0     70.2     64.8     67.1     61.5
3 -79.6     -46.3  64.9  3.07  65.3  69.5  58.8  62.7  65.2  59.5  69.6  62.4  60.0   64.5   67.7   63.1   62.2   65.2   63.5   63.3   67.1   62.2   58.9   57.9   62.4   64.4   65.3   66.5   64.4   62.5   64.2   60.2   70.6   64.3   71.6   67.4   65.0   64.4   68.4   67.0   57.4   65.9   69.0   55.9   65.0   67.4   61.7   62.7   61.2   64.7   68.2   67.0   66.1   62.6    64.4    70.6    60.9    66.8    66.5    57.6    72.4    61.6    59.6     63.8     75.2     67.1     58.6     64.2     65.1     68.0     70.2     63.2     56.2     50.7     61.6     63.4     63.7     67.5     63.4     66.6     69.0     61.5     78.4     67.4     71.0     74.4     64.7     62.8     65.0     66.6     56.2     66.2     71.7     55.2     58.9     70.1     65.5     64.7     60.1     65.2     69.3     72.8     60.8     62.8
4 -78.9     -51.4  67.8  2.98  65.2  69.6  58.3  62.5  65.0  59.1  69.7  62.2  59.7   64.3   67.6   62.9   61.9   65.0   63.2   63.1   67.0   61.9   58.5   57.4   62.1   64.2   65.1   66.4   64.2   62.2   64.0   59.9   70.7   64.1   71.8   67.4   64.9   64.2   68.4   66.9   56.9   65.8   69.0   55.4   64.9   67.3   61.4   62.5   60.9   64.5   68.2   66.9   66.0   62.3    62.7    70.1    55.7    60.4    71.1    62.1    74.3    61.9    57.7     65.0     72.5     67.3     66.1     70.3     66.1     64.1     71.4     58.3     58.5     55.7     64.8     67.7     65.6     66.0     67.0     62.4     60.5     58.5     67.9     61.3     76.9     68.4     60.0     63.6     68.9     67.2     54.2     64.2     71.8     58.7     69.8     67.9     58.5     62.6     61.2     66.3     63.5     73.6     66.5     62.7
5 -78.7     -53.6  69.2  3.07  65.3  69.8  58.3  62.6  65.2  59.2  69.9  62.2  59.7   64.4   67.8   63.0   62.0   65.2   63.3   63.2   67.2   62.0   58.5   57.4   62.2   64.4   65.3   66.6   64.4   62.3   64.2   59.9   71.0   64.3   72.1   67.6   65.0   64.4   68.7   67.1   56.8   65.9   69.2   55.3   65.0   67.5   61.5   62.6   60.9   64.7   68.4   67.1   66.2   62.4    68.2    65.9    62.6    64.4    63.9    57.3    70.4    55.7    54.6     62.6     65.0     63.3     61.6     69.4     63.5     64.4     69.9     62.2     58.9     57.6     54.9     64.0     60.9     62.3     65.6     64.0     60.8     60.0     67.8     62.9     72.5     66.6     57.6     60.5     69.6     70.4     56.2     66.5     65.5     53.8     65.5     70.4     62.4     59.9     52.9     63.1     63.4     67.2     66.5     57.3
6 -79.3     -87.7  88.9  3.20  65.0  70.8  56.1  61.5  64.8  57.1  70.9  61.1  57.8   63.9   68.2   62.1   60.7   64.9   62.5   62.3   67.4   60.8   56.3   54.8   61.0   63.8   65.0   66.7   63.8   61.2   63.5   58.1   72.3   63.7   73.7   67.9   64.6   63.8   69.3   67.3   54.1   65.8   70.0   52.2   64.6   67.8   60.1   61.5   59.4   64.2   69.0   67.3   66.1   61.3    61.6    71.3    53.2    61.4    65.5    54.7    67.7    63.4    53.5     67.1     71.4     64.6     57.9     63.0     62.9     57.2     64.8     55.2     53.2     57.6     62.9     55.3     61.4     63.7     64.5     58.9     64.0     58.4     71.0     63.9     71.5     70.2     64.8     63.1     73.5     61.0     60.5     65.7     62.9     51.0     65.3     74.5     54.9     59.7     65.2     61.2     61.8     64.2     65.4     61.0
# ... with 3994 more draws
# ... hidden reserved variables {'.chain', '.iteration', '.draw'}
```

`yrep = lmgen_fit$draws("yrep", format = "matrix")`
を取り出したらあとは `bayesplot::ppc_*()` に渡すだけ。


---
## 観察値とは違うXを使ってPredictionすることも可能

観察値の外側とか、均等間隔とか `x_tilde` を好きに作って渡せる。

```stan
data {
  // ...
  int<lower=0> N_tilde
  vector[N_tilde] x_tilde;
}
// ...
generated quantities {
  array[N_tilde] real y_tilde = normal_rng(intercept + slope * x_tilde, sigma);
}
```








---
## 変数の型: `vector` vs `array`

`vector`, `row_vector`, `matrix` は実数 `real` のみで、行列演算できる:

```stan
real x;
vector[3] v;
row_vector[3] r;
matrix[3, 3] m;

x * v  // vector[3]
r * v  // real
v * r  // matrix[3, 3]
m * v  // vector[3]
m * m  // matrix[3, 3]
m[1]   // row_vector[3]
```

`array` に型の制約は無いが、行列演算はできないので自力forループ:
```stan
array[3] int a;
array[3] int b;
for (i in 1:3) {
  b[i] = 2 * a[i] + 1
}
```

---
## パラメータの事前分布を明示的に設定できる

が、省略してもStanがデフォルトでうまくやってくれる。\
そのせいで収束が悪いかも、となってから考えても遅くない。

```stan
parameters {
  real intercept;
  real slope;
  real<lower=0> sigma;
}

model {
  y ~ normal(intercept + slope * x, sigma);
  intercept ~ normal(0, 100);
  slope ~ normal(0, 100);
  sigma ~ student_t(3, 0, 10);
}
```

設定したくなったら、どう選ぶか？

---
## 事前分布の選別

1.  とりあえず**無情報事前分布** $[-\infty, \infty]$。Stanのデフォルト。

1.  収束が悪かったら**弱情報事前分布**を試す。\
    事後分布を更新していったとき**事前分布っぽさが残らない**のが良い。

    - 取りうる値を逃すような狭すぎる分布はダメ。
    - 狭すぎるよりはマシだが、広すぎても良くない。
    - 一様分布 $[a, b]$ は一見無情報っぽくて良さそうだが、\
      事後分布に裾野が残ったり絶壁ができたりしがちなので微妙。

    おすすめ: [**正規分布**](https://mc-stan.org/docs/functions-reference/normal-distribution.html)
    or [**Student's t分布**](https://mc-stan.org/docs/functions-reference/student-t-distribution.html)

<cite><https://github.com/stan-dev/stan/wiki/Prior-Choice-Recommendations></cite>


---
## Stanおすすめ弱情報事前分布: Student's t分布

Student's $t(\nu=\nu_0, \mu = 0, \sigma = \sigma_0)$

- 自由度 $3 \le \nu_0 \le 7 $ で適当に固定。
  - $\nu = 1$ でコーシー分布。裾野が広すぎて良くないらしい。
  - $\nu \to \infty$ で**正規分布**。だいたいこれでいいらしい。
- スケール $\sigma$: 「推定したい値は$[-\sigma_0, \sigma_0]$に収まるだろう」という値。

![plot of chunk studentt](./figure/studentt-1.png)


---
## 🔰 Stanで一般化線形モデル

GLM回のデータをStanでモデリングしてみよう。

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">

- 直線回帰
- ポアソン回帰
- ロジスティック回帰
- 重回帰
- 分散分析
- 共分散分析

  </div>
  <div class="column" style="flex-shrink: 1.0;">
<figure>
<img src="figure/lm-bad-1.png" alt="plot of chunk lm-bad" height=240>
<img src="figure/glm-poisson-1.png" alt="plot of chunk glm-poisson" height=240>
<img src="figure/glm-logistic-1.png" alt="plot of chunk glm-logistic" height=240>
<img src="figure/multiple-regression-1.png" alt="plot of chunk multiple-regression" height=240>
<img src="figure/glm-anova-1.png" alt="plot of chunk glm-anova" height=240>
<img src="figure/glm-ancova-1.png" alt="plot of chunk glm-ancova" height=240>
</figure>
  </div>
</div>















---
## 🔰 Stanでpenguinsの回帰分析をしてみよう

<a href="https://allisonhorst.github.io/palmerpenguins/">
<cite>https://allisonhorst.github.io/palmerpenguins/</cite><br>
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
</a>

<img src="figure/penguins-interaction-1.png" alt="plot of chunk penguins-interaction" height="300">

GLMの練習を参照しつつ。

---
## 🔰 Stanでpenguinsの回帰分析をしてみよう

<a href="https://allisonhorst.github.io/palmerpenguins/">
<cite>https://allisonhorst.github.io/palmerpenguins/</cite><br>
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
</a>

`Stan does not support NA` と怒られるので欠損値を取り除いておく:




``` r
penguins_dropna = penguins |> tidyr::drop_na(body_mass_g)
```








---
## ちょっとずつ線形モデルを発展させていく

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="400" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

久保先生の"緑本"こと\
「[データ解析のための統計モデリング入門](https://kuboweb.github.io/-kubo/ce/IwanamiBook.html)」\
をベースに回帰分析の概要を紹介。

**線形モデル LM** (単純な直線あてはめ)

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ いろんな<span style="font-weight: bold; color: #56B4E9;">確率分布</span>を扱いたい</span>

**一般化線形モデル GLM**

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ <span style="font-weight: bold; color: #E69F00;">個体差</span>などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ もっと<span style="font-weight: bold; color: #B2001D;">自由なモデリング</span>を！</span>

**階層ベイズモデル HBM**


---
## GLMMで登場した個体差を階層ベイズモデルで

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。\
親1個体あたりの生存数は<span style="color: #56B4E9;">n=8の二項分布</span>になるはずだけど、\
極端な値(全部死亡、全部生存)が多かった。個体差？

<img src="figure/overdispersion-1.png" alt="plot of chunk overdispersion">


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$が能力値$z_i$のシグモイド関数で決まると仮定。\
その能力値は全個体共通の正規分布に従うと仮定:
$z_i \sim \mathcal{N}(\hat z, \sigma)$

<img src="figure/sigmoid-1.png" alt="plot of chunk sigmoid">

パラメータ2つで済む: 平均 $\hat z$, ばらつき $\sigma$ 。


---
## 個体能力のばらつき $\sigma$ が大きいと両端が増える

普通の二項分布は個体差無し $\sigma = 0$ を仮定してるのと同じ。

<img src="figure/alter-sigma-z-1.png" alt="plot of chunk alter-sigma-z">

<img src="figure/alter-sigma-z-2.png" alt="plot of chunk alter-sigma-z">

---
## 階層ベイズモデルのイメージ図

事前分布のパラメータに、さらに事前分布を設定するので階層ベイズ

<figure>
<img src="../tokiomarine2022/hbm.drawio.svg" width="800">
</figure>


---
## さっきの図をStan言語で記述すると

`10` とか `3` とか、エイヤっと決めてるやつが超パラメータ。


``` stan
data {
  int<lower=0> N;
  array[N] int<lower=0> y;
}

parameters {
  real z_hat;           // mean ability
  real<lower=0> sigma;  // sd of r
  vector[N] r;          // individual difference
}

transformed parameters {
  vector[N] z = z_hat + r;
  vector[N] p = inv_logit(z);
}

model {
  y ~ binomial(8, p);
  z_hat ~ normal(0, 10);
  r ~ normal(0, sigma);
  sigma ~ student_t(3, 0, 1);
}
```

---
## 変量効果が入った推定結果



``` r
seeds_data = list(y = df_seeds_od$y, N = sample_size)
model = cmdstanr::cmdstan_model("stan/glmm.stan")
fit = model$sample(data = seeds_data, seed = 19937L, step_size = 0.1, refresh = 0)
draws = fit$draws(c("z_hat", "sigma", "r[1]", "r[2]"))
```


```
 variable    mean  median   sd  mad      q5     q95 rhat ess_bulk ess_tail
    lp__  -455.79 -455.38 9.05 9.02 -471.30 -441.70 1.01      897     1643
    z_hat    0.26    0.25 0.30 0.30   -0.22    0.77 1.00      667     1414
    sigma    2.77    2.74 0.34 0.33    2.27    3.36 1.01     1230     1975
    r[1]    -0.25   -0.25 0.78 0.77   -1.56    0.98 1.00     2452     2865
    r[2]     1.74    1.68 1.05 1.02    0.13    3.61 1.00     4089     2701
    r[3]     1.75    1.65 1.07 1.02    0.17    3.62 1.00     4216     2323
    r[4]    -3.74   -3.54 1.62 1.54   -6.72   -1.51 1.00     4563     2694
    r[5]    -2.21   -2.13 1.05 1.00   -4.14   -0.64 1.00     4012     2093
    r[6]    -2.22   -2.15 1.08 1.02   -4.09   -0.62 1.00     3784     2502
    r[7]     0.91    0.86 0.87 0.86   -0.41    2.43 1.00     3300     2944

 # showing 10 of 303 rows (change via 'max_rows' argument or 'cmdstanr_max_rows' option)
```

---
## 抜粋して作図。悪くない。

データ生成の真のパラメータ値は $\hat z = 0.5,~\sigma = 3.0$ だった。

![plot of chunk stan-glmm](./figure/stan-glmm-1.png)


---
## 🔰 階層ベイズモデルの練習問題: 種の数

100個体の植物から8つずつ種を取った、のデータでやってみよう。


``` r
sigmoid = function(x, gain = 1) {1 / (1 + exp(-gain * x))}
sample_size = 100L
df_seeds_od = tibble::tibble(
  z = rnorm(sample_size, 0.5, 3),
  p = sigmoid(z),
  y = rbinom(sample_size, 8L, p)
)
```

<img src="figure/overdispersion-1.png" alt="plot of chunk overdispersion">


---
## 🔰 階層ベイズモデルの練習問題: ビール注文数
<!-- TODO: 時間が余った場合の練習問題 -->


``` r
sample_size = 300L
lambda = 3
overdisp = 4
.n = lambda / (overdisp - 1)
.p = 1 / overdisp
df_beer_od = tibble::tibble(
  X = rnbinom(sample_size, size = .n, prob = .p)
)
```

<img src="figure/beer-overdispersion-1.png" alt="plot of chunk beer-overdispersion">


---
## ベイズ推定まとめ

- 条件付き確率 $\Pr(B \mid A)$ の理解が大事。
    - 事後分布 $\propto$ 尤度 ⨉ 事前分布
    - 確信度合いをデータで更新していく。
- 推定結果は分布そのもの。
    - そこから点推定も区間推定も可能。
- 解析的に解けない問題は計算機に乱数を振らせて解く。
    - MCMCサンプル $\sim$ 解きにくい事後分布
    - 理論・技術の進歩が目覚ましい。


---
## 回帰分析ふりかえり

より柔軟にモデルを記述できるようになった。計算方法も変化。

<figure>
<a href="https://kuboweb.github.io/-kubo/ce/LinksGlm.html">
<img src="../tokiomarine2021/image/kubo-p2.png" width="1100">
<figcaption class="url">久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</figcaption>
</a>
</figure>


---
## 全体まとめ

- 統計とは、データをうまくまとめ、それに基づいて推論するための手法。
- モデルには**理解志向**と**応用志向**があり、統計モデルは前者寄り。
    - どちらも多少は分かった上で使い分けたい。
    - どっちにしろ真の正しい何かではない。
- **確率分布**とその背後にある**確率過程**の理解が重要。
    - 乱数生成→作図を繰り返してイメージを掴もう。
    - MCMCサンプリングも事後分布からの乱数生成。
- 本講義で「統計モデリングを完全に理解した」とは言えない。
    - 理論も実践もほとんど説明していない。
    - 本を読む準備ができた、くらいの気持ち？


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="." class="readmore">
目次に戻る
</a>
