+++
url = "multiomics2021/bayesian.html"
title = "ベイズ推定、階層ベイズモデル — マルチNGSオミクス解析研究会 #10"
linktitle = "ベイズ推定、階層ベイズモデル"
date = 2021-12-14T14:00:00+09:00
type = "reveal"
draft = false
+++

# [確率分布を理解する統計モデリング入門](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li><a href="distribution.html">統計モデリング基礎: 確率分布、尤度</a>
<li><a href="glm.html">一般化線形モデル、混合モデル</a>
<li class="current-deck"><a href="bayesian.html">ベイズ統計、階層ベイズモデル</a>
</ol>

<div class="footnote">
2021-12-14 東京大学 中戸研 <a href="https://amedprime-nakatolab.github.io/Seminar/10.html">マルチNGSオミクス解析研究会 #10</a><br>
<a href="https://heavywatal.github.io/slides/multiomics2021/">https://heavywatal.github.io/slides/multiomics2021/</a>
</div>





---
## 全体の構成

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="280" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

久保先生の"緑本"こと<br>
「データ解析のための統計モデリング入門」<br>
をベースに回帰分析の概要を紹介。

1. イントロ [(#7 9/30)](distribution.html)
1. 統計モデルの基本
    - 確率変数・**確率分布** 👈 主役
    - 尤度・最尤推定
1. 一般化線形モデル、混合モデル [(#10 12/14 前半)](glm.html)
1. ベイズ統計、階層ベイズモデル [(#10 12/14 後半)](bayesian.html)

回帰のキモは**線ではなく分布**。

<hr>
<small>

[Data Science Hill Climb 2021 (東京海上) での講義 (~6時間)](https://heavywatal.github.io/slides/tokiomarine2021/)
の演習無し抜粋バージョン (~2時間 x 2回)。

</small>


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

- 有病率 $\text{Prob}(M)$ : 0.3% (この地域の感染者の割合; 事前確率)
- 感度 $\text{Prob}(P \mid M)$ : 90% (感染してる人に陽性判定が出る)
- 特異度 $\text{Prob}(N \mid \overline{M})$: 99% (感染してない人に陰性判定が出る)

$\text{Prob}(M \mid P)$ 真陽性率(検査陽性の人が実際に感染者である確率)は？

<div>\[\begin{split}
\text{Prob}(M \mid P)
  &= \frac {\text{Prob}(P \mid M)~\text{Prob}(M)} {\text{Prob}(P)} \\
  &= \frac {\text{Prob}(P \mid M)~\text{Prob}(M)}
           {\text{Prob}(P \mid M)~\text{Prob}(M) + (1 - \text{Prob}(N \mid \overline{M}))~\text{Prob}(\overline{M})} \\
  &= \frac {0.9 \times 0.003} {0.9 \times 0.003 + 0.01 \times 0.997} \approx 0.21
\end{split}\]</div>

感染者を隔離するスクリーニング目的では使いものにならない性能。

🔰 同様に $\text{Prob}(\overline{M} \mid N)$ 真陰性率を計算してみよう<br>
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
<div>\[\begin{split}
\text{Prob}(M \mid D) &\propto \text{Prob}(D \mid M)~\text{Prob}(M) \\
\text{Prob}(H \mid D) &\propto \text{Prob}(D \mid H)~\text{Prob}(H) \\
\text{Prob}(\theta \mid D) &\propto \text{Prob}(D \mid \theta)~\text{Prob}(\theta)
\end{split}\]</div>


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
: e.g., 95%ベイズ確信区間<br>
  (等裾事後信用区間, 最高密度区間)

点推定
: 値を1点だけ提示
: e.g., MAP, MED, EAP

  </div>
  <div class="column" style="flex-shrink: 1.3;">

![plot of chunk integrate](figure/integrate-1.png)

  </div>
</div>

コイン投げモデルのベータ分布は美しい例。<br>
→ 解析的(数学的)に解ける。

実践的なモデル・事後分布はもっと複雑。<br>
→ コンピュータに頼って数値計算: MCMC

???

- 95%ベイズ確信区間 (credible interval): 真の値が95%の確率で含まれる区間。
- 等裾事後信用区間 (equal-tailed interval): 両端から2.5%ずつ削る
- 最高密度区間 (highest density interval): 分布密度に閾値を設ける
- 事後中央値 (Posteriori <u>Med</u>ian: MED)
- 事後期待値 (<u>E</u>xpected <u>A</u> <u>P</u>osteriori: EAP)
- 事後確率最大値 (<u>M</u>aximum <u>A</u> <u>P</u>osteriori: MAP)

信頼区間 (confidence interval)
頻度主義の考え方に基づいていて、解釈が難しい。
「標本抽出を100回繰り返すとそのうちの95回はその区間に母平均が含まれる」
真の値は1つに定まっていて、不確実性は有限のサンプリングに由来する。


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

面積4の正方形に400個の一様乱数を打ち込んだら318個乗った:<br>
$4 \times \frac {318} {400} = 3.18$

![plot of chunk circle](figure/circle-1.png)

数学を知っていれば $\pi r ^ 2 \approx 3.14$

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

???
これは「コイン10回投げて6回表。表の出る確率pは？」という簡単なモデル。


---
## Gibbs Sampling

パラメータが複数の場合「ほかを固定してひとつ更新」を繰り返す。

e.g., 二次元正規分布。(-2, 2) からスタート。

![plot of chunk gibbs](figure/gibbs-.gif)


---
## 中間まとめ

- ベイズ推定では不確実性も表現できる。
- コンピュータに頼った計算方法としてのモンテカルロ法。
- 多次元でも効率よくサンプルするためのMCMC。

<hr>

ここから、実行するにあたっての注意点を見ていく。


---
## 何回やっても似たような結果になってほしい

乱数や初期値によって偶々、じゃないことを確認したい。

e.g., `chains = 3, iter = 600` 。ほぼ同じところをうろうろ:

![plot of chunk chains](figure/chains-1.png)

収束(convergence)の判定については後ほど。

---
## 初期値の影響が消えるまでウォーミングアップ

定常分布の山に到達してからが本番。

e.g., `iter = 600, warmup = 200` で灰色の部分を捨てる:

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

- 複数chains・複数初期値で実行し、軌跡や分布を可視化
- Gelman-Rubin統計量 $\hat R < 1.05$
- Effective Sample Size (ESS) $N_\text{eff} > 100$ per chain

![plot of chunk convergence](figure/convergence-1.png)

```
Warning: The largest R-hat is ***, indicating chains have not mixed.
Warning: Bulk Effective Samples Size (ESS) is too low, indicating posterior means and medians may be unreliable.
Warning: Tail Effective Samples Size (ESS) is too low, indicating posterior variances and tail quantiles may be unreliable.
Running the chains for more iterations may help. See
http://mc-stan.org/misc/warnings.html
```

???
https://ill-identified.hatenablog.com/entry/2020/05/21/001158


---
## 収束・自己相関が悪い場合にどう改善するか

- 小手先の対処
    - warmupとiterをもっと長くする
    - thinを大きくして間引く
- ちょっと大掛かり
    - モデルを見直す
    - プログラムを見直す
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
## Stan

<a href="https://mc-stan.org/">
<img src="/slides/image/stan/logo_name.png" width="120" align="right">
</a>

- Stan言語でモデルを書く
- C++を介して機械語に翻訳(コンパイル)するので高速
- RやPythonなどから呼び出して使うのが便利

```r
# install.packages("rstan")
library(rstan)
rstan_options(auto_write = TRUE)
```

---
## おおまかな流れ

```r
# データ準備
mydata

# Stan言語で書いたモデルをコンパイル
model = rstan::stan_model(file = "model.stan")

# MCMCサンプリング
fit = rstan::sampling(model, data = mydata)

# 結果を眺める
print(fit)
rstan::stan_trace(fit)
rstan::stan_hist(fit)
rstan::stan_ac(fit)
```


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
 [1] 0 0 1 0 1 1 0 1 1 0 1 0 0 1 1 0 0 1 1 1 0 1 0 0 1 1 1 0 1 0 0 0 1 1 1 0 1 1 0 1
```

Rならlist型、Pythonならdict型にまとめてStanに渡す。


---
## 説明変数なしのベイズ推定: Stan言語でモデル定義

文字列として保持するか、別ファイルに書いておく:


```
data {
  int<lower=0> N;
  int x[N];
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
- 整数型 `int`, 実数型 `real`, それらの配列がある。
- 下限 `lower`, 上限 `upper` を設定できる。


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
model = rstan::stan_model("binom.stan")
```

これに結構時間がかかるので、変更が無ければ再利用するため先ほど
`rstan_options(auto_write = TRUE)` しておいた。

<hr>

モデルとデータを使ってMCMCサンプリング:


```r
fit = rstan::sampling(model, data = mydata)
```

いろいろオプションはあるけどとりあえずデフォルトで:<br>
`chains = 4`, `iter = 2000`, `warmup = floor(iter/2)`, `thin = 1`, ...

問題があったら実行終了時に警告してくれるので**ちゃんと読む**。

---
## 説明変数なしのベイズ推定: 結果を眺める

$\hat R$ もほぼ1で $N_\text{eff}$ も大きいのでよさそう。<br>
念のため trace plot も確認しておこう。


```r
print(fit)
```

```
Inference for Stan model: binom.
4 chains, each with iter=2000; warmup=1000; thin=1; 
post-warmup draws per chain=1000, total post-warmup draws=4000.

       mean se_mean   sd   2.5%    25%    50%    75%  97.5% n_eff Rhat
p      0.55    0.00 0.08   0.39   0.50   0.55   0.60   0.69  1651    1
lp__ -29.45    0.02 0.76 -31.61 -29.61 -29.16 -28.97 -28.92  1262    1

Samples were drawn using NUTS(diag_e) at Fri Oct 29 17:13:51 2021.
For each parameter, n_eff is a crude measure of effective sample size,
and Rhat is the potential scale reduction factor on split chains (at 
convergence, Rhat=1).
```

乱数を使った計算なので(乱数シードを固定しない限り)毎回変わる。


---
## 説明変数なしのベイズ推定: trace plot 確認

どのchainも似た範囲を動いていて、しっかり毛虫っぽい:


```r
rstan::stan_trace(fit)
```

![plot of chunk stan-binom-traceplot](figure/stan-binom-traceplot-1.png)

---
## 説明変数なしのベイズ推定: 自己相関の確認

2--3ステップくらいで自己相関がほぼ消えるので問題なし:


```r
rstan::stan_ac(fit, pars = c("p"))
```

![plot of chunk stan-binom-ac](figure/stan-binom-ac-1.png)

---
## 説明変数なしのベイズ推定: 推定結果確認

サンプルサイズNが小さいせいか裾野の広い推定結果。<br>
真の$p$の値も含まれている:


```r
rstan::stan_hist(fit, bins = 30)
```

![plot of chunk stan-binom-hist](figure/stan-binom-hist-1.png)

次はもう少しだけ複雑な例を見てみよう。

---
## 線形回帰のベイズ推定: データ準備

<figure>
<a href="https://allisonhorst.github.io/palmerpenguins/">
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
<figcaption>
<small>https://allisonhorst.github.io/palmerpenguins/</small>
</figcaption>
</a>
</figure>

![plot of chunk stan-penguins-glm](figure/stan-penguins-glm-1.png)


---
## 線形回帰のベイズ推定: データ準備

<figure>
<a href="https://allisonhorst.github.io/palmerpenguins/">
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
<figcaption>
<small>https://allisonhorst.github.io/palmerpenguins/</small>
</figcaption>
</a>
</figure>

`Stan does not support NA` と怒られるので欠損値を取り除いておく:


```
List of 3
 $ body_mass_g      : int [1:342] 3750 3800 3250 3450 3650 3625 4675 3475 4250 3300 ...
 $ flipper_length_mm: int [1:342] 181 186 195 193 190 181 195 193 190 186 ...
 $ N                : int 342
```

---
## 単回帰のベイズ推定: Stan言語でモデル定義

切片、傾き、ばらつきを推定する:


```
data {
  int<lower=0> N;
  vector<lower=0>[N] body_mass_g;
  vector<lower=0>[N] flipper_length_mm;
}

parameters {
  real intercept;
  real slope;
  real<lower=0> sigma;
}

model {
  flipper_length_mm ~ normal(intercept + slope * body_mass_g, sigma);
}
```


---
## 単回帰のベイズ推定: MCMCサンプル

予め実行速度の速い機械語に翻訳(コンパイル):


```r
model = rstan::stan_model("penguins.stan")
```

モデルとデータを使ってMCMCサンプリング:


```r
fit = rstan::sampling(model, data = data)
```

いろいろオプションはあるけどとりあえずデフォルトで:<br>
`chains = 4`, `iter = 2000`, `warmup = floor(iter/2)`, `thin = 1`, ...

問題があったら実行終了時に警告してくれるので**ちゃんと読む**。

---
## 単回帰のベイズ推定: 結果を眺める

$\hat R$ もほぼ1で $N_\text{eff}$ も大きいのでよさそう。<br>
念のため trace plot も確認しておこう。


```r
print(fit)
```

```
Inference for Stan model: penguins.
4 chains, each with iter=2000; warmup=1000; thin=1; 
post-warmup draws per chain=1000, total post-warmup draws=4000.

             mean se_mean   sd    2.5%     25%     50%     75%   97.5% n_eff Rhat
intercept  136.76    0.05 1.97  132.89  135.40  136.75  138.04  140.67  1506    1
slope        0.02    0.00 0.00    0.01    0.01    0.02    0.02    0.02  1526    1
sigma        6.94    0.01 0.27    6.41    6.76    6.94    7.13    7.47  1198    1
lp__      -830.83    0.04 1.24 -834.08 -831.39 -830.51 -829.93 -829.43  1120    1

Samples were drawn using NUTS(diag_e) at Fri Oct 29 17:13:56 2021.
For each parameter, n_eff is a crude measure of effective sample size,
and Rhat is the potential scale reduction factor on split chains (at 
convergence, Rhat=1).
```


---
## 単回帰のベイズ推定: trace plot 確認

どのchainも似た範囲を動いていて、しっかり毛虫っぽい:


```r
rstan::stan_trace(fit)
```

![plot of chunk stan-penguins-traceplot](figure/stan-penguins-traceplot-1.png)

---
## 単回帰のベイズ推定: 自己相関の確認

どれもまあまあすぐ消えるので問題なし:


```r
rstan::stan_ac(fit, pars = c("intercept", "slope", "sigma"))
```

![plot of chunk stan-penguins-ac](figure/stan-penguins-ac-1.png)

---
## 単回帰のベイズ推定: 推定結果確認

正規分布っぽいきれいな形:


```r
rstan::stan_hist(fit, bins = 30)
```

![plot of chunk stan-penguins-hist](figure/stan-penguins-hist-1.png)

これらの値を使って点推定・区間推定も可能。


---
## 単回帰のベイズ推定: 推定結果で回帰

無事に最尤推定と似たような線が引けた。


```r
coef = rstan::get_posterior_mean(fit)[, "mean-all chains"]
p_penweight +
  geom_abline(intercept = coef["intercept"], slope = coef["slope"], size = 1, color = "#3366ff")
```

![plot of chunk stan-penguins-regression](figure/stan-penguins-regression-1.png)

---
## ベイズ推定を使った回帰に便利なパッケージ

[rstanarm](https://mc-stan.org/rstanarm/) + [tidybayes](https://mjskay.github.io/tidybayes)

- Stan言語のモデルを自分で書かずに済む。
- モデルの主要部品がコンパイル済みなので試行錯誤も機敏に。
- 区間推定の可視化までお世話してくれる。


```r
library(rstanarm)
library(tidybayes)
fit = rstanarm::stan_glm(flipper_length_mm ~ body_mass_g, family = gaussian(), data = penguins)
pred = penguins %>% tidyr::drop_na() %>% tidybayes::add_fitted_draws(fit)
p_penweight +
  ggdist::stat_lineribbon(aes(y = .value), data = pred, color = "#3366ff", size = 0.4) +
  scale_fill_brewer(palette = "Greys")
```

![plot of chunk rstanarm-penguins](figure/rstanarm-penguins-1.png)


---
## rstanarmを使えば重回帰のベイズ推定も簡単

GLMのような書き味で書ける。


```r
fit = rstanarm::stan_glm(flipper_length_mm ~ body_mass_g + species, family = gaussian(), data = penguins)
pred = penguins %>% tidyr::drop_na() %>% tidybayes::add_fitted_draws(fit)
p_penweight + aes(color = species, group = species) +
  ggdist::stat_lineribbon(aes(y = .value), data = pred, size = 0.4) +
  scale_color_manual(values = penguins_colors) +
  scale_fill_brewer(palette = "Greys")
```

![plot of chunk rstanarm-penguins-multi](figure/rstanarm-penguins-multi-1.png)


---
## GLMMで登場した個体差を階層ベイズモデルで

<figure>
<a href="https://kuboweb.github.io/-kubo/ce/LinksGlm.html">
<img src="../tokiomarine2021/image/kubo-p2.png" width="100%">
<figcaption><small>久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</small></figcaption>
</a>
</figure>


---
## GLMMで登場した個体差を階層ベイズモデルで

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #3366ff;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。個体差？

<img src="figure/overdispersion-1.png" alt="plot of chunk overdispersion">


---
## 階層ベイズモデルのイメージ図

事前分布のパラメータに、さらに事前分布を設定するので階層ベイズ

<figure>
<img src="../tokiomarine2021/hbm.drawio.svg">
</figure>


---
## さっきの図をStan言語で記述すると

お絵描きモデルとStanモデルを見比べてみよう。


```
data {
  int<lower=0> N;
  int y[N];
}

parameters {
  real a;           // mean ability
  vector[N] r;      // individual difference
  real<lower=0> s;  // sd of r
}

model {
  y ~ binomial(8, inv_logit(a + r));
  a ~ normal(0, 10);
  r ~ normal(0, s);
  s ~ exponential(0.01);
}
```

`inv_logit(a + r)` が p に相当。<br>
`10` とか `0.01` とか、エイヤっと決めてるやつが超パラメータ。

---
## 変量効果が入った推定結果




```
Inference for Stan model: glmm.
4 chains, each with iter=2000; warmup=1000; thin=1; 
post-warmup draws per chain=1000, total post-warmup draws=4000.

          mean se_mean   sd    2.5%     25%     50%     75%   97.5% n_eff Rhat
a         0.64    0.01 0.33    0.02    0.42    0.63    0.85    1.31   715 1.00
r[1]     -1.14    0.01 0.83   -2.80   -1.67   -1.12   -0.58    0.39  3103 1.00
r[2]     -4.21    0.03 1.66   -8.07   -5.11   -3.98   -3.03   -1.59  2501 1.00
r[3]      3.28    0.03 1.75    0.53    2.01    3.05    4.27    7.32  3607 1.00
r[4]     -1.74    0.02 0.87   -3.55   -2.28   -1.70   -1.15   -0.11  3161 1.00
r[5]      3.32    0.03 1.79    0.50    2.01    3.09    4.35    7.55  3155 1.00
r[6]      3.34    0.03 1.81    0.53    2.03    3.11    4.42    7.55  3351 1.00
r[7]      3.29    0.03 1.79    0.50    2.01    3.05    4.33    7.41  3755 1.00
r[8]     -1.73    0.02 0.87   -3.54   -2.28   -1.70   -1.12   -0.14  3211 1.00
r[9]      1.47    0.02 1.14   -0.51    0.70    1.37    2.13    4.00  3450 1.00
r[10]    -4.23    0.03 1.73   -8.22   -5.21   -4.01   -2.99   -1.51  2901 1.00
r[11]    -4.22    0.03 1.74   -8.43   -5.18   -3.94   -3.00   -1.50  3181 1.00
r[12]    -1.75    0.02 0.93   -3.75   -2.33   -1.70   -1.12   -0.05  3312 1.00
r[13]    -4.20    0.03 1.67   -8.08   -5.14   -3.94   -3.02   -1.61  3401 1.00
r[14]     1.48    0.02 1.16   -0.51    0.68    1.35    2.20    4.07  3648 1.00
r[15]    -0.06    0.01 0.81   -1.65   -0.58   -0.07    0.47    1.54  3262 1.00
r[16]    -1.76    0.02 0.91   -3.66   -2.33   -1.71   -1.15   -0.12  3090 1.00
r[17]     0.57    0.02 0.89   -1.05   -0.04    0.54    1.12    2.48  3339 1.00
r[18]    -1.12    0.01 0.78   -2.70   -1.63   -1.12   -0.59    0.40  3214 1.00
r[19]    -4.15    0.03 1.63   -7.95   -5.06   -3.93   -3.01   -1.62  3150 1.00
r[20]     0.58    0.01 0.91   -1.06   -0.05    0.55    1.16    2.52  3689 1.00
r[21]    -2.58    0.02 1.10   -5.08   -3.22   -2.49   -1.83   -0.70  3230 1.00
r[22]     3.27    0.03 1.74    0.46    2.06    3.03    4.23    7.33  4449 1.00
r[23]    -0.60    0.01 0.81   -2.22   -1.14   -0.58   -0.05    1.03  3225 1.00
r[24]     3.33    0.03 1.82    0.49    2.06    3.08    4.39    7.55  4216 1.00
r[25]     1.46    0.02 1.10   -0.44    0.70    1.38    2.11    3.86  3242 1.00
r[26]    -2.57    0.02 1.07   -4.88   -3.23   -2.49   -1.82   -0.69  3177 1.00
r[27]     3.34    0.03 1.76    0.56    2.08    3.13    4.38    7.45  3473 1.00
r[28]     3.29    0.03 1.79    0.45    1.97    3.05    4.35    7.29  4532 1.00
r[29]     0.55    0.02 0.88   -1.06   -0.04    0.52    1.12    2.42  3429 1.00
r[30]     3.30    0.03 1.77    0.44    2.03    3.06    4.36    7.30  3878 1.00
r[31]     3.32    0.03 1.81    0.39    2.00    3.09    4.43    7.49  4289 1.00
r[32]    -1.13    0.01 0.82   -2.81   -1.66   -1.11   -0.59    0.43  3146 1.00
r[33]    -4.20    0.03 1.66   -7.91   -5.09   -3.96   -3.03   -1.62  3309 1.00
r[34]     1.47    0.02 1.14   -0.52    0.67    1.36    2.17    4.00  3491 1.00
r[35]    -1.14    0.02 0.82   -2.79   -1.66   -1.11   -0.58    0.41  2846 1.00
r[36]     3.32    0.03 1.78    0.52    2.04    3.07    4.37    7.37  3656 1.00
r[37]     3.33    0.03 1.82    0.49    2.04    3.05    4.34    7.63  2878 1.00
r[38]     3.31    0.03 1.75    0.54    2.06    3.07    4.30    7.33  4249 1.00
r[39]    -1.74    0.02 0.88   -3.57   -2.29   -1.68   -1.14   -0.13  3177 1.00
r[40]     3.34    0.03 1.82    0.52    2.06    3.07    4.35    7.55  3303 1.00
r[41]     1.48    0.02 1.09   -0.42    0.70    1.38    2.14    3.85  3730 1.00
r[42]     3.30    0.03 1.81    0.43    2.01    3.08    4.35    7.39  4420 1.00
r[43]     3.30    0.03 1.83    0.40    2.01    3.05    4.32    7.72  4425 1.00
r[44]     3.31    0.03 1.80    0.47    2.02    3.07    4.32    7.53  4103 1.00
r[45]    -2.58    0.02 1.06   -4.91   -3.22   -2.48   -1.84   -0.76  3490 1.00
r[46]    -0.62    0.01 0.78   -2.19   -1.12   -0.63   -0.11    0.97  3135 1.00
r[47]     3.35    0.03 1.83    0.54    2.03    3.10    4.39    7.54  3843 1.00
r[48]    -4.17    0.03 1.63   -7.97   -5.08   -3.95   -3.00   -1.64  3222 1.00
r[49]    -1.75    0.02 0.85   -3.51   -2.30   -1.71   -1.15   -0.22  2868 1.00
r[50]     3.35    0.03 1.80    0.49    2.02    3.11    4.42    7.47  4154 1.00
r[51]     3.29    0.03 1.74    0.56    2.05    3.05    4.29    7.33  3633 1.00
r[52]     1.45    0.02 1.13   -0.48    0.66    1.37    2.11    3.89  3494 1.00
r[53]    -1.75    0.02 0.87   -3.57   -2.31   -1.70   -1.15   -0.14  2798 1.00
r[54]    -1.74    0.01 0.85   -3.50   -2.30   -1.70   -1.16   -0.17  3373 1.00
r[55]     3.28    0.03 1.80    0.42    2.00    3.03    4.33    7.41  4110 1.00
r[56]     1.48    0.02 1.15   -0.49    0.67    1.37    2.16    4.02  3902 1.00
r[57]     0.58    0.02 0.92   -1.09   -0.03    0.53    1.16    2.52  3282 1.00
r[58]    -0.07    0.01 0.79   -1.60   -0.60   -0.07    0.45    1.52  3475 1.00
r[59]    -4.17    0.03 1.67   -8.09   -5.08   -3.93   -2.98   -1.59  3864 1.00
r[60]    -0.06    0.01 0.78   -1.55   -0.59   -0.08    0.44    1.54  3064 1.00
r[61]    -0.60    0.01 0.79   -2.15   -1.12   -0.61   -0.08    0.97  2960 1.00
r[62]    -1.74    0.02 0.90   -3.68   -2.27   -1.68   -1.13   -0.10  3136 1.00
r[63]     3.30    0.03 1.79    0.52    1.98    3.09    4.32    7.43  4105 1.00
r[64]     1.44    0.02 1.08   -0.46    0.69    1.35    2.10    3.77  3982 1.00
r[65]     3.30    0.03 1.80    0.48    2.03    3.04    4.30    7.52  3822 1.00
r[66]    -1.14    0.01 0.80   -2.74   -1.65   -1.11   -0.60    0.41  2886 1.00
r[67]     0.58    0.02 0.91   -1.08   -0.05    0.54    1.16    2.50  3257 1.00
r[68]     1.44    0.02 1.08   -0.45    0.69    1.36    2.10    3.87  3589 1.00
r[69]    -4.16    0.03 1.60   -7.74   -5.12   -3.92   -3.01   -1.63  3384 1.00
r[70]    -2.56    0.02 1.06   -4.86   -3.21   -2.46   -1.84   -0.74  4056 1.00
r[71]    -4.19    0.03 1.67   -8.02   -5.17   -4.00   -2.98   -1.56  2914 1.00
r[72]    -4.14    0.03 1.61   -7.83   -5.09   -3.93   -3.02   -1.57  3898 1.00
r[73]    -0.06    0.01 0.83   -1.60   -0.61   -0.09    0.48    1.64  3389 1.00
r[74]     0.56    0.02 0.89   -1.03   -0.05    0.53    1.12    2.45  3455 1.00
r[75]     3.32    0.03 1.77    0.52    2.02    3.12    4.33    7.49  3877 1.00
r[76]     1.45    0.02 1.06   -0.38    0.71    1.35    2.10    3.80  4350 1.00
r[77]    -2.59    0.02 1.10   -4.91   -3.26   -2.49   -1.81   -0.68  3702 1.00
r[78]     3.32    0.03 1.79    0.46    2.08    3.09    4.31    7.51  4059 1.00
r[79]    -1.15    0.02 0.81   -2.77   -1.68   -1.13   -0.60    0.38  2749 1.00
r[80]     3.28    0.03 1.77    0.50    2.05    3.04    4.22    7.47  3877 1.00
r[81]    -2.59    0.02 1.10   -5.05   -3.25   -2.49   -1.82   -0.64  3963 1.00
r[82]    -0.07    0.01 0.83   -1.66   -0.63   -0.08    0.46    1.62  3331 1.00
r[83]    -0.06    0.01 0.79   -1.58   -0.59   -0.05    0.45    1.53  3115 1.00
r[84]     0.57    0.02 0.89   -1.09   -0.03    0.53    1.13    2.35  3043 1.00
r[85]    -0.06    0.02 0.81   -1.62   -0.60   -0.08    0.49    1.57  2857 1.00
r[86]     0.56    0.01 0.90   -1.14   -0.03    0.50    1.10    2.51  3650 1.00
r[87]    -1.13    0.02 0.81   -2.85   -1.65   -1.11   -0.59    0.36  2735 1.00
r[88]    -2.58    0.02 1.13   -5.18   -3.22   -2.46   -1.80   -0.71  3137 1.00
r[89]    -4.22    0.03 1.69   -8.10   -5.20   -4.01   -2.99   -1.56  3726 1.00
r[90]    -2.56    0.02 1.09   -4.92   -3.21   -2.47   -1.80   -0.73  3150 1.00
r[91]    -1.14    0.01 0.81   -2.76   -1.68   -1.13   -0.59    0.34  2959 1.00
r[92]     3.29    0.03 1.76    0.54    2.00    3.06    4.36    7.26  4439 1.00
r[93]    -4.16    0.03 1.69   -8.13   -5.10   -3.95   -2.96   -1.52  3633 1.00
r[94]     3.34    0.03 1.78    0.51    2.04    3.12    4.40    7.52  4070 1.00
r[95]    -2.58    0.02 1.08   -4.98   -3.22   -2.45   -1.84   -0.74  3719 1.00
r[96]    -4.19    0.03 1.64   -7.97   -5.15   -3.98   -3.02   -1.65  3574 1.00
r[97]    -0.06    0.02 0.83   -1.66   -0.61   -0.07    0.47    1.67  3004 1.00
r[98]    -1.74    0.02 0.87   -3.57   -2.30   -1.70   -1.16   -0.12  3103 1.00
r[99]    -0.06    0.01 0.80   -1.60   -0.61   -0.09    0.46    1.62  3153 1.00
r[100]   -1.14    0.01 0.79   -2.75   -1.65   -1.10   -0.58    0.34  2838 1.00
s         2.95    0.01 0.38    2.30    2.68    2.92    3.18    3.78  1096 1.01
lp__   -452.90    0.38 9.69 -473.84 -458.96 -452.20 -446.19 -435.36   639 1.01

Samples were drawn using NUTS(diag_e) at Fri Oct 29 17:14:22 2021.
For each parameter, n_eff is a crude measure of effective sample size,
and Rhat is the potential scale reduction factor on split chains (at 
convergence, Rhat=1).
```

---
## 抜粋して作図。悪くない。

データ生成の真のパラメータ値は $a = 0.5,~s = 3.0$ だった。

![plot of chunk stan-glmm](figure/stan-glmm-1.png)


---
## 事前分布の選別

1.  とりあえず**無情報事前分布** $[-\infty, \infty]$。Stanのデフォルト。

1.  収束が悪かったら**弱情報事前分布**を試す。<br>
    事後分布を更新していったとき**事前分布っぽさが残らない**のが良い。

    - 取りうる値を逃すような狭すぎる分布はダメ。
    - 狭すぎるよりはマシだが、広すぎても良くない。
    - 一様分布 $[a, b]$ は一見無情報っぽくて良さそうだが、<br>
      事後分布に裾野が残ったり絶壁ができたりしがちなので微妙。

    おすすめ: **Student's t分布**、正規分布、指数分布など。

<small><https://github.com/stan-dev/stan/wiki/Prior-Choice-Recommendations></small>


---
## Stanおすすめ弱情報事前分布: Student's t分布

Student's $t(\nu=\nu_0, \mu = 0, \sigma = \sigma_0)$

- 自由度 $\nu$: 小さいほど裾野が広い。$3 \le \nu_0 \le 7 $ で適当に固定。
- スケール $\sigma$: 「推定したい値は$[-\sigma_0, \sigma_0]$に収まるだろう」という値。

![plot of chunk student_t](figure/student_t-1.png)

正の値しか取らない場合は `<lower=0>` として右半分だけ使うとか。


---
## 非線形回帰の例: データ

刺激強度xに対する応答強度yを20個体調査。<br>
非対称なひと山。応答変数も説明変数も正の値。

<div>\[\begin{split}
y = ae ^ {-bx} - ce ^ {-dx}
\end{split}\]</div>

![plot of chunk non-linear](figure/non-linear-1.png)

---
## 非線形回帰の例: Stanコード

```stan
data {
  int<lower=1> N;
  vector[N] x;
  vector[N] y;
  int id[N];
  int<lower=1> Ninds;
}

parameters {
  real a;
  real d;
  real<upper=a> c;
  real<upper=d> b;
  real shape;
  vector[Ninds] intercept;
}

model {
  vector[N] mu = a * exp(-b * x) - (a - c) * exp(-d * x) + intercept[id];
  y ~ gamma(shape, shape ./ mu);
  a ~ exponential(1);
  b ~ exponential(1);
  c ~ exponential(1);
  d ~ exponential(1);
  shape ~ exponential(0.001);
  intercept ~ normal(0, 0.005);
}
```


---
## ベイズ推定まとめ

- 条件付き確率 $\text{Prob}(B \mid A)$ の理解が大事。
    - 事後分布 $\propto$ 尤度 ⨉ 事前分布
    - 確信度合いをデータで更新していく。
- 推定結果は分布そのもの。
    - そこから点推定も区間推定も可能。
- 解析的に解けない問題は計算機に乱数を振らせて解く。
    - 理論・技術の進歩が目覚ましい。


---
## 回帰分析ふりかえり

より柔軟にモデルを記述できるようになった。計算方法も変化。

<figure>
<a href="https://kuboweb.github.io/-kubo/ce/LinksGlm.html">
<img src="../tokiomarine2021/image/kubo-p2.png" width="100%">
<figcaption><small>久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</small></figcaption>
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
