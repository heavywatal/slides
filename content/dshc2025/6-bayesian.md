+++
url = "dshc2025/6-bayesian.html"
linktitle = "ベイズの定理、事後分布、MCMC"
title = "6. ベイズの定理、事後分布、MCMC — 統計モデリング概論 DSHC 2025"
date = 2025-09-03T09:30:00+09:00
draft = false
dpi = 108
+++

# [統計モデリング概論 DSHC 2025](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li><a href="1-introduction.html">導入</a>
<li><a href="2-distribution.html">直線回帰、確率分布、擬似乱数生成</a>
<li><a href="3-likelihood.html">尤度、最尤推定</a>
<li><a href="4-glm.html">一般化線形モデル(GLM)</a>
<li><a href="5-glmm.html">個体差、一般化線形混合モデル(GLMM)</a>
<li class="current-deck"><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル(HBM)</a>
</ol>

<div class="footnote">
2025-09-03 東京海上 Data Science Hill Climb<br>
<a href="https://heavywatal.github.io/slides/dshc2025/">https://heavywatal.github.io/slides/dshc2025/</a>
</div>



---
## 本講義の主題: 回帰

久保先生の[<abbr title="データ解析のための統計モデリング入門">緑本</abbr>](https://amzn.to/33suMIZ)に沿ってちょっとずつ線形モデルを発展させていく。

<figure style="float: right; margin-inline-start: 0.5em; margin-block: 0;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="360" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
<figcaption><small>https://kuboweb.github.io/-kubo/ce/LinksGlm.html</small></figcaption>
</a>
</figure>

<div class="column-container" style="position: relative; padding-inline: 0.75em;">
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 12em; background-color: hsl(80deg 100% 50% / 10%); border-radius: 0 0 0 87.5%;"></div>
<div style="position: absolute; top: 0; right: 0; width: 100%; height: 3em; background-color: hsl(80deg 100% 50% / 15%); border-radius: 0 0 0 87.5%;"></div>

  <div class="column" style="flex-basis: fit-content;">

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
  <div class="column" style="flex-basis: fit-content;">

<div style="text-align: right;">
<p>最小二乗法<br><br><br></p>
<p>最尤推定法<br><br><br><br></p>
<p>MCMC</p>
</div>

  </div>
</div>


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
<img src="../tokiomarine2021/image/Thomas_Bayes.gif" height="240" style="float: right;"></a>

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
<img src="../tokiomarine2021/image/AAMarkov.jpg" height="270" style="float: right;"></a>

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

<img src="figure/circle-1.png" alt="plot of chunk circle" style="float: right;">

- 2次元: $\frac {\pi r ^ 2} {(2r) ^ 2} = \frac \pi 4 \approx 0.79$
- 3次元: $\frac {\frac 4 3 \pi r ^ 3} {(2r) ^ 3} = \frac \pi 6 \approx 0.52$\
  &nbsp;⋮
- N次元: $\frac {\frac {\pi ^ {N/2}} {\Gamma (N/2 + 1)} r ^ N} {(2r) ^ N} = \frac {\pi ^ {N/2}} {2^N \Gamma (N/2 + 1)} \to 0$

パラメータが増えると計算量(≈乱数の無駄撃ち)急増

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
<img src="/slides/image/stan/logo_name.png" width="180" style="float: right;">
</a>

- Stan言語で**モデルを柔軟に記述**できる。
- C++で書かれていて**高速に動作**。
- RやPythonなどから呼び出して使うのが便利。

## Python Interface

[PyStan](https://pystan.readthedocs.io)
: WindowsやJupyterで使うには難あり。

[CmdStanPy](https://cmdstanpy.readthedocs.io) 👈 今後の主流
: [CmdStan](https://mc-stan.org/users/interfaces/cmdstan)
  を呼び出し、書き出されたCSVを読み取る。



---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="7-stan.html" class="readmore">
7. StanでGLM
</a>
