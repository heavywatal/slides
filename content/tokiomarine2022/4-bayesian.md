+++
url = "tokiomarine2022/4-bayesian.html"
title = "4. ベイズ推定とMCMC — 統計モデリング概論 DSHC 2022"
linktitle = "ベイズ推定とMCMC"
date = 2022-08-24T09:30:00+09:00
type = "reveal"
draft = false
+++


# [統計モデリング概論 DSHC 2022](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li><a href="1-introduction.html">導入</a>
<li><a href="2-stats-model.html">統計モデルの基本: 確率分布、尤度</a>
<li><a href="3-glm.html">一般化線形モデル、混合モデル</a>
<li class="current-deck"><a href="4-bayesian.html">ベイズ推定とMCMC</a>
<li><a href="5-stan-glm.html">StanでGLM</a>
<li><a href="6-stan-hbm.html">Stanで階層ベイズモデル</a>
</ol>

<div class="footnote">
2022-08-24 東京海上 Data Science Hill Climb
<a href="https://heavywatal.github.io/slides/tokiomarine2022/">https://heavywatal.github.io/slides/tokiomarine2022/</a>
</div>





---
## コイントス4回、たまたま表が1回だったら

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

最尤推定
: 推定結果は最も尤もらしい1点。
: データが少ないとき過剰適合気味。
: 表が出る確率 p = 0.25 のコインだろう。<br>
  (信じ難いけどデータはこう言っている)

<br>

ベイズ推定
: 推定結果は確率分布そのもの。
: データが少ないなりの不確実さも表現。
: p = 0.25 らへんである確率は高いが、<br>
  p = 0.6 とかである可能性もまあある。

  </div>
  <div class="column" style="flex-shrink: 1.4;">

![plot of chunk freq-vs-bayes](figure/freq-vs-bayes-1.png)![plot of chunk freq-vs-bayes](figure/freq-vs-bayes-2.png)

  </div>
</div>


---
## コイントスの回数が増えていったら

**最尤推定**: 推定値が真の値に近づいていく

![plot of chunk coin-frequentist](figure/coin-frequentist-1.png)

**ベイズ推定**: 確率分布がどんどん尖り、確信が強まる

![plot of chunk coin-bayesian](figure/coin-bayesian-1.png)

---
## 確率おさらい

同時分布/結合確率: <span style="font-weight: normal;"> <span style="color: #E69F00;">A</span>かつ<span style="color: #0072B2;">B</span>の確率</span>
: $\text{Prob}(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B}) = \text{Prob}(\textcolor{#E69F00}{A} \cap \textcolor{#0072B2}{B}) = \text{Prob}(\textcolor{#E69F00}{A}) \text{Prob}(\textcolor{#0072B2}{B})$

周辺確率: <span style="font-weight: normal;"> <span style="color: #0072B2;">B</span>によらず<span style="color: #E69F00;">A</span>になる確率</span>
: $\text{Prob}(\textcolor{#E69F00}{A}) = \sum_{\textcolor{#0072B2}{B}} \text{Prob}(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B})$

条件付き確率: <span style="font-weight: normal;"> <span style="color: #0072B2;">B</span>である条件の下で<span style="color: #E69F00;">A</span>になる確率。重要。</span>
: $\text{Prob}(\textcolor{#E69F00}{A} \mid \textcolor{#0072B2}{B}) = \frac {\text{Prob}(\textcolor{#E69F00}{A}, \textcolor{#0072B2}{B})} {\text{Prob}(\textcolor{#0072B2}{B})}$

![plot of chunk venn](figure/venn-1.png)


---
## 条件付き確率がよくわかる具体例

<span style="color: #0072B2;">B Brewery</span>のビールが<span style="color: #E69F00;">Awesome</span>な確率
: $\text{Prob}(\textcolor{#E69F00}{\text{Awesome}} \mid \textcolor{#0072B2}{\text{B Brewery}}) = \frac {\text{Prob}(\textcolor{#E69F00}{\text{Awesome}},~\textcolor{#0072B2}{\text{B Brewery}})} {\text{Prob}(\textcolor{#0072B2}{\text{B Brewery}})}$
: かなり高い確率。良い醸造所。

<span style="color: #E69F00;">Awesome</span>なビールが<span style="color: #0072B2;">B Brewery</span>のものである確率
: $\text{Prob}(\textcolor{#0072B2}{\text{B Brewery}} \mid \textcolor{#E69F00}{\text{Awesome}}) = \frac {\text{Prob}(\textcolor{#E69F00}{\text{Awesome}},~\textcolor{#0072B2}{\text{B Brewery}})} {\text{Prob}(\textcolor{#E69F00}{\text{Awesome}})}$
: かなり低い確率。Awesomeなビールはほかにもたっくさんある。

<img src="figure/venn-1.png" alt="plot of chunk venn">


---
## ベイズの定理

乗法定理
: $\text{Prob}(\textcolor{#E69F00}{A},~\textcolor{#0072B2}{B}) = \text{Prob}(\textcolor{#E69F00}{A} \mid \textcolor{#0072B2}{B})~\text{Prob}(\textcolor{#0072B2}{B}) = \text{Prob}(\textcolor{#0072B2}{B} \mid \textcolor{#E69F00}{A})~\text{Prob}(\textcolor{#E69F00}{A})$

<a href="https://en.wikipedia.org/wiki/Thomas_Bayes">
<img src="../tokiomarine2021/image/Thomas_Bayes.gif" height="150" align="right"></a>

移項するだけで**ベイズの定理**:
<img src="../tokiomarine2021/bayes.drawio.svg" style="padding-left: 1rem;">

宴会場にビールが運ばれてきた。これはどこのブルワリーの？

事前確率: $\text{Prob}(\textcolor{#0072B2}{B})$
: 飲む前、手元のビールが<span style="color: #0072B2;">B Brewery</span>のである確率。
: ↓ 🍻 飲んでみて更新

事後確率: $\text{Prob}(\textcolor{#0072B2}{B} \mid \textcolor{#E69F00}{A})$
: 飲んでみて<span style="color: #E69F00;">Awesome</span>だったビールが
  <span style="color: #0072B2;">B Brewery</span>のである確率。


---
## ベイズの定理 in 感染症検査

- 有病率 $\text{Prob}(I)$ : 0.3% (この地域の感染者の割合; 事前確率)
- 感度 $\text{Prob}(P \mid I)$ : 90% (感染してる人に陽性判定が出る)
- 特異度 $\text{Prob}(\lnot P \mid \lnot I)$: 99% (感染してない人に陰性判定が出る)

さて、陽性適中率(検査陽性の人が実際に感染者である確率)は？

<div>\[\begin{split}
\text{Prob}(I \mid P)
  &= \frac {\text{Prob}(P \mid I)~\text{Prob}(I)} {\text{Prob}(P)} \\
  &= \frac {\text{Prob}(P \mid I)~\text{Prob}(I)}
           {\text{Prob}(P \mid I)~\text{Prob}(I) + \text{Prob}(P \mid \lnot I)~\text{Prob}(\lnot I)} \\
  &= \frac {0.9 \times 0.003} {0.9 \times 0.003 + 0.01 \times 0.997} \approx 0.21
\end{split}\]</div>

感染者を隔離するスクリーニング目的では使いものにならない性能。

🔰 同様に $\text{Prob}(\lnot I \mid \lnot P)$ 陰性的中率を計算してみよう<br>
🔰 計算結果が検査性能だけでなく有病率にも依存することを確認しよう




---
## ベイズの定理 in 統計モデリング

<p>
<img src="../tokiomarine2021/bayesian.drawio.svg">
</p>

モデル$M$に対する確信度合いをデータ$D$に基づいて更新する。<br>
モデル$M$を仮説$H$やパラメータ$\theta$に置き換えてもいい。

**周辺尤度**は「確率分布の積分は1」を満たすための正規化定数とみなせる。<br>
比例関係だけ抜き出してこう書くことが多い:
<div>\[\begin{align}
\text{Prob}(M \mid D) &\propto \text{Prob}(D \mid M)~\text{Prob}(M) \tag{Model}\\
\text{Prob}(H \mid D) &\propto \text{Prob}(D \mid H)~\text{Prob}(H) \tag{Hypothesis} \\
\text{Prob}(\theta \mid D) &\propto \text{Prob}(D \mid \theta)~\text{Prob}(\theta) \tag{Parameter}
\end{align}\]</div>


---
## 表が出る確率のベイズ推定: 1. 事前分布

コイントスを繰り返して、表が出る確率pをベイズ推定したい。

事前分布には**ベータ分布**を採用(理由は後で分かる):
<div>\[\begin{split}
\text{Beta}(p \mid a, b) =
   \frac{\Gamma(a + b)}{\Gamma(a) \Gamma(b)} p^{a-1} (1 - p)^{b-1}
\end{split}\]</div>

分布の形は $a,~b$ によって決まる。<br>
ガンマ関数の部分は厳つく見えるけどただの正規化定数。<br>
投げる前なのでとりあえず真っ平らを仮定 $\text{Beta}(p \mid a = 1, b = 1)$:

![plot of chunk prior-beta](figure/prior-beta-1.png)

---
## 表が出る確率のベイズ推定: 2. 尤度関数

4回投げて表が1回だった、というデータで**尤度**を計算(**二項分布**):
<div>\[\begin{split}
\text{Binom}(1 \mid 4,~p) = \binom {1} {4} p^{1} (1 - p)^{3}
\end{split}\]</div>

これに事前分布を掛けて正規化したら事後分布になるはず。

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">

![plot of chunk likelihood-binom](figure/likelihood-binom-1.png)

  </div>
  <div class="column" style="flex-shrink: 4.0; padding-top: 3rem;">
  ⨉
  </div>
  <div class="column" style="flex-shrink: 1.0;">
<p>
<img src="figure/prior-beta-1.png" alt="plot of chunk prior-beta">
</p>
  </div>
</div>


---
## 表が出る確率のベイズ推定: 3. 事後分布

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

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

![plot of chunk posterior-beta](figure/posterior-beta-1.png)
  </div>
  <div class="column" style="flex-shrink: 4.0; padding-top: 3rem;">
  $\propto$
  </div>
  <div class="column" style="flex-shrink: 1.0">
<p>
<img src="figure/likelihood-binom-1.png" alt="plot of chunk likelihood-binom">
</p>
  </div>
  <div class="column" style="flex-shrink: 4.0; padding-top: 3rem;">
  ⨉
  </div>
  <div class="column" style="flex-shrink: 1.0;">
<p>
<img src="figure/prior-beta-1.png" alt="plot of chunk prior-beta">
</p>
  </div>
</div>


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

<img src="figure/coin-bayesian-1.png" alt="plot of chunk coin-bayesian">


---
## 共役事前分布

事後分布が事前分布と同じ形なので計算しやすい、という組み合わせ。

| 尤度関数 | 共役事前分布 |
| ---------- | ------------ |
| 二項分布 | ベータ分布 |
| ポアソン分布 | ガンマ分布 |
| 正規分布 | ガンマ分布 |
| 正規分布 (分散既知) | 正規分布 |

共役事前分布を使うことが常に正しいとも限らない。<br>
計算コストがかかっても**無情報事前分布**を使う風潮。

---
## 事後分布を用いた推定

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

区間推定
: 幅のある推定値を提示
: e.g., 95%ベイズ確信区間:<br>
  等裾事後確信区間 (<u>E</u>qual-<u>T</u>ailed <u>I</u>nterval)<br>
  最高密度区間 (<u>H</u>ighest <u>D</u>ensity <u>I</u>nterval)

点推定
: 値を1点だけ提示
: e.g.,<br>
  事後確率最大値 (<u>M</u>aximum <u>A</u> <u>P</u>osteriori)<br>
  事後期待値 (<u>E</u>xpected <u>A</u> <u>P</u>osteriori)<br>
  事後中央値 (Posterior <u>Med</u>ian)

  </div>
  <div class="column" style="flex-shrink: 1.3;">

![plot of chunk integrate](figure/integrate-1.png)

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

<img src="figure/coin-bayesian-1.png" alt="plot of chunk coin-bayesian" width="70%">

<hr>

コイン投げモデルのベータ分布は美しい例。<br>
→ 解析的(数学的)に解ける。

実践的なモデル・事後分布はもっと複雑。<br>
→ コンピュータに頼って数値計算: MCMC

☕️ 休憩 + 質疑応答


---
## MCMC: <u>M</u>arcov <u>C</u>hain <u>M</u>onte <u>C</u>arlo

<a href="https://en.wikipedia.org/wiki/Andrey_Markov">
<img src="../tokiomarine2021/image/AAMarkov.jpg" height="180" align="right"></a>

マルコフ連鎖
: 次の時点の挙動が現在の値だけで決定されるような確率過程。
: $\ldots \to X_{t - 2} \to X_{t - 1} \to X_{t} \to X_{t + 1}$
: $\text{Prob}(X_{t+1} \mid X_{t}, X_{t-1}, X_{t-2}, \ldots) = \text{Prob}(X_{t+1} \mid X_{t})$
: e.g., すごろく

モンテカルロ法
: 乱数を用いた計算方法の総称。
: <a href="https://en.wikipedia.org/wiki/Monte_Carlo_Casino">
  <img src="../tokiomarine2021/image/Real_Monte_Carlo_Casino.jpg" height="200"></a>
  <a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">
  <img src="../tokiomarine2021/image/Stanislaw_Ulam.jpg" height="200"></a>
  <a href="https://en.wikipedia.org/wiki/John_von_Neumann">
  <img src="../tokiomarine2021/image/John_von_Neumann.jpg" height="200"></a>
  <a href="https://en.wikipedia.org/wiki/Nicholas_Metropolis">
  <img src="../tokiomarine2021/image/Nicholas_Metropolis.png" height="200"></a>

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

面積4の正方形に400個の一様乱数を打ち込んだら318個が円に乗った:<br>
$4 \times \frac {318} {400} = 3.18$

![plot of chunk circle](figure/circle-1.png)

---
## 変な分布もモンテカルロ法で扱えそう

e.g., 確率密度分布に従って変数Xを集める(棄却サンプリング)。

![plot of chunk mcpdf](figure/mcpdf-1.png)

でも、ハズレの値もけっこう引いてしまう。


---
## 次元の呪い: 高次元になるほど当たりにくくなる

(N次元球の体積 / N次元の立方体) はゼロに近づいていく。

<img src="figure/circle-1.png" width="210" align="right">

- 2次元: $\frac {\pi r ^ 2} {(2r) ^ 2} = \frac \pi 4 \approx 0.79$
- 3次元: $\frac {\frac 4 3 \pi r ^ 3} {(2r) ^ 3} = \frac \pi 6 \approx 0.52$
- N次元: $\frac {\frac {\pi ^ {N/2}} {\Gamma (N/2 + 1)} r ^ N} {(2r) ^ N} = \frac {\pi ^ {N/2}} {2^N \Gamma (N/2 + 1)} \to 0$

パラメータが増えると計算量(≈乱数の無駄撃ち)が急増。

<hr>

密度の高い「当たり」付近を効率よく探索したい。<br>
「当たり」は「当たり」の近くにありがちだろう。<br>
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

![plot of chunk metropolis](figure/metropolis-1.png)

---
## 採択されたパラメータ値の軌跡

尤度が高い方にただ向かうだけでなく、結構うろつく。<br>
通ったパラメータ値を集めるといい感じの分布が得られる。

![plot of chunk metropolis-trajectory](figure/metropolis-trajectory-.gif)


---
## 尤度に比例する事後分布からサンプルしたのと等価

全体にばら撒く棄却サンプリングよりも効率よく集められる。<br>
が、パラメータ1つの1次元ではご利益はわかりにくい。

![plot of chunk propto-lik](figure/propto-lik-1.png)

パラメータが複数ある場合は？


---
## Gibbs Sampling

パラメータが複数の場合「ほかを固定してひとつ更新」を繰り返す。

e.g., 二次元正規分布。(-2, 2) からスタート。

![plot of chunk gibbs](figure/gibbs-.gif)


---
## 何回やっても似たような結果になってほしい

乱数や初期値によって偶々、じゃないことを確認したい。

e.g., `chains = 3` 。ほぼ同じところをうろうろ:

![plot of chunk chains](figure/chains-1.png)

収束(convergence)の判定については後ほど。

---
## 初期値の影響が消えるまでウォーミングアップ

定常分布の山に到達してからが本番。

e.g., `iter_warmup = 200, iter_sampling = 400` で灰色の部分を捨てる:

![plot of chunk warmup](figure/warmup-1.png)

どれくらい長く捨てるべきかは場合による。


---
## 適度に間引いて自己相関を軽減したい

直前の値と似すぎていたら独立サンプルとして扱えないので。

e.g., `thin = 5` で5回に1回だけサンプルする:

![plot of chunk thin](figure/thin-1.png)

間引かなくても大丈夫な場合も、間引いても解決しない場合もある。



---
## 収束判定

- 複数chainsで異なる初期値から実行し、軌跡を可視化(traceplot)
- Gelman-Rubin統計量 $\hat R < 1.05$
- Effective Sample Size (ESS) $N_\text{eff} > 100$ per chain







![plot of chunk convergence](figure/convergence-1.png)

[`diagnose()`](https://mc-stan.org/docs/cmdstan-guide/diagnose.html)
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
##  MCMCの方法いろいろ

採択率を高め、早く収束するように改良されてきている。

- Metropolis--Hastings法
    - Gibbs Sampling
    - Hamiltonian Monte Carlo (HMC)
        - No-U-Turn Sampler (NUTS)


---
## MCMCソフトウェア

- [BUGS](https://www.mrc-bsu.cam.ac.uk/software/bugs/)
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
## ベイズ推定とMCMCまとめ

- 推定結果は**事後分布** ∝ 尤度関数。
    - 広がり具合によって不確実性も表現できる。
    - **逐次学習**で尖っていき、確信が強まる。
- コンピュータに頼った計算方法としてのモンテカルロ法。
    - 高次元・変な形の分布でも効率よくサンプルできるかが肝。
    - ソフトウェアの代表は**Stan** → これから見ていく


---
## Stan

<a href="https://mc-stan.org/">
<img src="/slides/image/stan/logo_name.png" width="120" align="right">
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
## 🔰 とりあえずStanを動かしてみよう

おおまかな流れ:

1. データ準備
1. Stan言語でモデルを書く
1. モデルをコンパイルして機械語に翻訳 → 実行ファイル
1. 実行ファイルにデータを渡してMCMCサンプリング
1. 結果を見る

🔰
[`4-bayesian.ipynb`](4-bayesian.ipynb)
を開き、スライド説明に沿って実行しよう。


---
## 説明変数なしのベイズ推定: データ準備

表が出る確率 $p=0.7$ のイカサマコインをN回投げたデータを作る。<br>
この $p$ をStanで推定してみよう。


```r
true_p = 0.7
N = 40L
mydata = list(N = N, x = rbinom(N, 1, true_p))
print(mydata)
```

```
$N
[1] 40

$x
 [1] 1 1 1 0 0 1 1 1 0 1 1 1 0 0 1 1 0 1 1 0 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1
```

Rならlist型、Pythonならdict型にまとめてStanに渡す。


---
## 説明変数なしのベイズ推定: Stan言語でモデル定義

別ファイルに書いておく。
e.g., `coin.stan`:


```{.stan .stan}
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

- いくつかのブロックに分けて記述する:<br>
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

```r
model = cmdstan_model("stan/coin.stan")
```

モデルとデータを使ってMCMCサンプリング:


```r
fit = model$sample(mydata)
```

いろいろオプションはあるけど、ここではデフォルトに任せる:<br>
`chains`, `inits`, `iter_warmup`, `iter_samples`, `thin`, ...

問題があったら警告してくれるので**ちゃんと読む**。

---
## 説明変数なしのベイズ推定: 結果を眺める

`parameters` ブロックに書いた変数の情報が出てくる。<br>
乱数を使った計算なので(乱数シードを固定しない限り)毎回変わる。


```r
print(fit)
```

```
 variable   mean median   sd  mad     q5    q95 rhat ess_bulk ess_tail
     lp__ -23.59 -23.30 0.77 0.34 -25.17 -23.05 1.00     1760     2102
     p      0.76   0.77 0.07 0.07   0.65   0.86 1.00     1462     1749
```

真の値に近い $p \approx 0.7$ が得られた
(0.65 から
0.86 である確率が90%)。<br>
$\hat R$ もほぼ1で $N_\text{eff}$ も大きいのでよさそう。

`lp__` はlog posterior(対数事後確率)。後述。

念のため trace plot も確認しておこう→


---
## 説明変数なしのベイズ推定: trace plot 確認

どのchainも似た範囲を動いていて、しっかり毛虫っぽい:


```r
draws = fit$draws()
params = names(model$variables()$parameters)
bayesplot::mcmc_trace(draws, pars = params)
```

![plot of chunk stan-binom-traceplot](figure/stan-binom-traceplot-1.png)

---
## 説明変数なしのベイズ推定: 自己相関の確認

2--3ステップくらいで自己相関がほぼ消えるので問題なし:


```r
bayesplot::mcmc_acf_bar(draws, pars = params)
```

![plot of chunk stan-binom-ac](figure/stan-binom-ac-1.png)

---
## 説明変数なしのベイズ推定: 推定結果確認

サンプルサイズNが小さいせいか裾野の広い推定結果。<br>
真の$p$の値も含まれている:


```r
bayesplot::mcmc_hist(draws, bins = 20, pars = params)
```

```
Warning: The following arguments were unrecognized and ignored: bins
```

```
`stat_bin()` using `bins = 30`. Pick better value with `binwidth`.
```

![plot of chunk stan-binom-hist](figure/stan-binom-hist-1.png)


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

つまり、事前確率と尤度の対数の和を取っている。<br>
ベイズの定理により、事後確率はこれに比例する。<br>
`lp__` はこの `target` 変数を記録しておいたようなもの。


---
## ベイズ推定とMCMC

<p>
<img src="../tokiomarine2021/bayesian.drawio.svg">
</p>

- 推定結果は**事後分布** ∝ 尤度関数。
    - 広がり具合によって不確実性も表現できる。
    - **逐次学習**で尖っていき、確信が強まる。
- コンピュータに頼った計算方法としてのモンテカルロ法。
    - 高次元・変な形の分布でも効率よくサンプルできるかが肝。
    - ソフトウェアの代表は**Stan**。
    - Stan言語でモデルを書き、RやPythonから動かす。


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020


<a href="5-stan-glm.html" rel="next" class="readmore">
5. StanでGLM
</a>
