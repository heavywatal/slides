+++
url = "tmd2022stats/5-glmm.html"
linktitle = "個体差、一般化線形混合モデル (GLMM)"
title = "5. 個体差、一般化線形混合モデル (GLMM) — 統計モデリング実習 2022 TMDU"
date = 2023-03-25T13:00:00+09:00
draft = false
dpi = 100
+++

# [統計モデリング実習 2022 TMDU](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野 特任助教<br>
(Graduate School of Life Sciences, Tohoku University)
</div>

<ol>
<li><a href="1-introduction.html">導入、直線回帰</a>
<li><a href="2-distribution.html">確率分布、擬似乱数生成</a>
<li><a href="3-likelihood.html">尤度、最尤推定</a>
<li><a href="4-glm.html">一般化線形モデル (GLM)</a>
<li class="current-deck"><a href="5-glmm.html">個体差、一般化線形混合モデル (GLMM)</a>
<li><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル (HBM)</a>
</ol>

<div class="footnote">
2023-03-25 東京医科歯科大学<br>
<a href="https://heavywatal.github.io/slides/tmd2022stats/">https://heavywatal.github.io/slides/tmd2022stats/</a>
</div>


---
## ちょっとずつ線形モデルを発展させていく

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="400" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

久保先生の"緑本"こと<br>
「[データ解析のための統計モデリング入門](https://kuboweb.github.io/-kubo/ce/IwanamiBook.html)」<br>
をベースに回帰分析の概要を紹介。

**線形モデル LM** (単純な直線あてはめ)

<span style="color: #888888;">&nbsp; &nbsp; ↓ いろんな<span style="font-weight: bold; color: #56B4E9;">確率分布</span>を扱いたい</span>

**一般化線形モデル GLM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ 個体差などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**


---
## 有名な確率分布対応関係ふりかえり

<figure style="float: right;">
<img src="../tokiomarine2021/math-model.drawio.svg" width="400">
</figure>

離散一様分布
: コインの表裏、サイコロの出目1–6

幾何分布
: 成功率pの試行が初めて成功するまでの失敗回数

二項分布
: 成功率p、試行回数nのうちの成功回数

ポアソン分布
: 単位時間あたり平均$\lambda$回起こる事象の発生回数

ガンマ分布
: ポアソン過程でk回起こるまでの待ち時間
: (k = 1のとき**指数分布**と呼ばれる)

正規分布
: 確率変数の和、平均値。使い勝手が良く、よく登場する。



---
## 何でもかんでも直線あてはめではよろしくない

<img src="figure/glm-better-1.png" alt="plot of chunk glm-better">

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？
- **データに合わせた統計モデルを使うとマシ**


---
## ちょっとずつ線形モデルを発展させていく

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="400" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

久保先生の"緑本"こと<br>
「[データ解析のための統計モデリング入門](https://kuboweb.github.io/-kubo/ce/IwanamiBook.html)」<br>
をベースに回帰分析の概要を紹介。

**線形モデル LM** (単純な直線あてはめ)

<span style="color: #888888;">&nbsp; &nbsp; ↓ いろんな**確率分布**を扱いたい</span>

**一般化線形モデル GLM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ <span style="font-weight: bold; color: #E69F00;">個体差</span>などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**


---
## n個のうちy個生存。二項分布に従......わない！

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #56B4E9;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。個体差？


![plot of chunk overdispersion](./figure/overdispersion-1.png)


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$をそのままパラメータにすると**過剰適合**。<br>
「パラメータ数 ≥ サンプルサイズ」の“データ読み上げ”モデル。<br>
i.e., この個体は4個生き残って生存率0.5だね。次の個体は2個体だから......

![plot of chunk saturated-glmm](./figure/saturated-glmm-1.png)

個体の生存能力をもっと少ないパラメータで表現できないか？


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$が能力値$z_i$のシグモイド関数で決まると仮定。<br>
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



お客さんたちが注文したビールの杯数X。平均2.74杯。<br>
はいはい、<span style="color: #56B4E9;">ポアソン分布</span>でしょ......
いや、分散が大きいぞ。

![plot of chunk beer-overdispersion](./figure/beer-overdispersion-1.png)

全員が同じ平均注文数$\lambda$を持つという仮定が間違ってたのかも。<br>

🔰 平均注文数がガンマ分布に従うと仮定して、乱数生成してみよう。


---
## 負の二項分布 $~\text{NB}(n, p)$

成功率pの試行がn回成功するまでの失敗回数X。
n = 1 のとき幾何分布と一致。

![plot of chunk nbinom](./figure/nbinom-1.png)

\\[
\text{Prob}(X = k \mid n,~p) = \binom {n + k - 1} k p^n (1 - p)^k
\\]

失敗回数ではなく試行回数を変数とする定義もある。

平均$\lambda$がガンマ分布でばらついたポアソン分布、とも解釈できる。<br>
($k \to \infty$でポアソン分布と一致)

---
## 一般化線形混合モデル GLMM

**固定効果(fixed effects)** のみ扱っていたGLMを拡張して、<br>
**変量効果(random effect)** を混合したモデル。<br>
<small style="color: #999999;">「混合分布を使うモデル」という意味ではないらしい。</small>

<p>\[\begin{split}
y_i &\sim \text{Binomial}(n,~p_i) \\
\text{logit}(p_i) &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots
  + z_{1i} + \ldots \\
z_{1i} &\sim \mathcal{N}(\mu_1,~\sigma_1)
\end{split}\]</p>

e.g.,<br>
個体$i$の種子生存率$p_i$は、<br>
(固定効果) 体サイズ$x_{1i}$と日当たり$x_{2i}$に依存し、<br>
(変量効果) よくわからん個体差$z_{1i}$と植木鉢差$z_{2i}$もある。

---
## 固定効果にするか、変量効果にするか

推定したパラメータを予測に使うなら固定効果

予測に使えそうなので固定効果向き
: - 観測・操作した連続値変数: 長さ、重さ、温度、etc.
: - 観測・操作したカテゴリカル変数: 性別、投薬、etc.

予測に使えないので変量効果向き
: - 観測・操作できなかった個体差:<br>
    たまたま集まってくれた学生15人 {A, B, C, ...}。<br>
    Aさんの固定効果を推定できても、Zさんの予測には使えない。
: - 観測・操作できなかったグループ差:<br>
    ↑の学生をランダム5人ずつに分けたグループ {い、ろ、は}。<br>
    いグループの固定効果を推定できても、また集まることはない。

---
## どういうときに変量効果を考える必要があるか

データに**擬似反復**が含まれるとき。<br>
ぜんぶ独立のつもりで解析すると推定が偏ったり誤ったり。

| 植木鉢 | 個体/植木鉢 | 種子/個体 | 疑似反復 | 推定不可 |
| -----  | ----------- | ----------| ---- | ------ |
| 100個  | 1個体ずつ   | 1個ずつ   | – | 個体差・鉢差 |
| 25個   | 1個体ずつ   | 4個ずつ   | 個体 | 鉢差 |
| 20個   | 5個体ずつ   | 1個ずつ   | 植木鉢 | 個体差 |
| 5個    | 5個体ずつ   | 4個ずつ   | 植木鉢・個体 | – |

疑似反復あり<br>
→ 観測できなかった個体差・場所差(変量効果)を推定可能<br>
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
<img src="../tokiomarine2021/image/kubo-p2.png" width="60%">
<figcaption><small>久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</small></figcaption>
</a>
</figure>


---
## 一般化線形(混合)モデルまとめ

- 何はともあれ作図して俯瞰
- GLMは統計モデリングの考え方の根幹
    - 確率分布・リンク関数・説明変数
    - 尤度・最尤法によるパラメータ推定
    - 情報量基準などによるモデル選択
- GLMMは現実のデータ解析に向けた強化
    - 疑似反復による変量効果を考慮
    - 階層ベイズモデルとして扱うほうが楽

<a href="6-bayesian.html" class="readmore">
6. ベイズの定理、事後分布、MCMC
</a>
