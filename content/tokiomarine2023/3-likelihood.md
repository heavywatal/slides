+++
url = "tokiomarine2023/3-likelihood.html"
linktitle = "尤度、最尤推定"
title = "3. 尤度、最尤推定 — 統計モデリング概論 DSHC 2023"
date = 2023-08-23T13:00:00+09:00
draft = false
css = "style.css"
dpi = 100
+++

# [統計モデリング概論 DSHC 2023](.)

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
<li class="current-deck"><a href="3-likelihood.html">尤度、最尤推定</a>
<li><a href="4-glm.html">一般化線形モデル(GLM)</a>
<li><a href="5-glmm.html">個体差、一般化線形混合モデル(GLMM)</a>
<li><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル(HBM)</a>
</ol>

<div class="footnote">
2023-08-23 東京海上 Data Science Hill Climb<br>
<a href="https://heavywatal.github.io/slides/tokiomarine2023/">https://heavywatal.github.io/slides/tokiomarine2023/</a>
</div>



---
## 有名な確率分布対応関係ふりかえり

<figure style="float: right;">
<img src="../tokiomarine2021/math-model.drawio.svg" width="450"><br>
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
## データに分布をあてはめたい

ある植物を50個体調べて、それぞれの種子数Xを数えた。<br>
個体Aは種2個、個体Bは種4個、、、サンプルサイズ n = 50 のデータ。


![plot of chunk poisson-seed](./figure/poisson-seed-1.png)

カウントデータだし形も<span class="fragment custom blur">ポアソン</span>分布っぽい。<br>
分布のパラメータ $\lambda$ はどれくらいがいいだろう？


---
## データに分布をあてはめたい

ある植物を50個体調べて、それぞれの種子数Xを数えた。<br>
個体Aは種2個、個体Bは種4個、、、サンプルサイズ n = 50 のデータ。

![plot of chunk poisson-seed-lambda](./figure/poisson-seed-lambda-1.png)

カウントデータだし形もポアソン分布っぽい。<br>
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

$n = 50$個体ぶん、且つ、且つ、且つ、と確率を掛けていく:

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
<img src="../tokiomarine2021/math-model.drawio.svg" width="800"><br>
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
## 🔰 尤度の練習問題 [@`3-likelihood.ipynb`](./3-likelihood.ipynb)

サイコロを10回振ったら6の目が3回出た。

1. 6の目の出る確率が1/6だとした場合の尤度は?
1. 6の目の出る確率が0.2だとした場合の尤度は?
1. 横軸を6の目の出る確率、縦軸を対数尤度とするグラフを描こう。
1. このサイコロで6の目が出る確率を最尤推定しよう。<br>
   数学で解ければ**優**。Rで見つければ**良**。目分量・勘で**可**。

ヒント
: 確率pで当たるクジをn回引いてk回当たる確率、と同じ計算を使う。
: 数学の $\binom 5 2 = {}_5 \mathrm{C} _2 = 10$ はRでは `choose(5, 2)` 。



---
## 🔰 分布を当てはめる練習問題

1. データの分布を描いてみる
1. 理論分布のどれが当てはまりそうか検討する
1. 理論分布を適当なパラメータで描いてみる
1. 尤度を計算しつつ擦り寄せる



<div class="column-container">
  <div class="column">

[`radiation.tsv`](data/radiation.tsv)

```
           time label
  1   0.1125739     A
  2   0.3140102     A
  3   0.3277063     A
  4   0.6970379     C
 --                  
597 231.2013532     A
598 232.1383628     B
599 232.4407758     C
600 232.7671255     B
```

  </div>
  <div class="column">

[`gacha.csv`](data/gacha.csv)

```
    trials hit
  1     10   1
  2     10   2
  3     10   3
  4     10   0
 --           
597     10   2
598     10   0
599     10   1
600     10   1
```

  </div>
</div>


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="4-glm.html" class="readmore">
4. 一般化線形モデル(GLM)
</a>
