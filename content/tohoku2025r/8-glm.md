+++
url = "tohoku2025r/8-glm.html"
linktitle = "統計モデリング2: 一般化線形モデル"
title = "8. 統計モデリング2: 一般化線形モデル — 進化学実習 2025 牧野研 東北大学"
date = 2025-04-14T14:40:00+09:00
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
<li class="current-deck"><a href="8-glm.html">統計モデリング2: 一般化線形モデル</a>
<li><a href="9-report.html">発表会</a>
</ol>

<div class="footnote">
2025-04-14 東北大学 理学部生物学科 進化学実習<br>
<a href="https://heavywatal.github.io/slides/tohoku2025r/">https://heavywatal.github.io/slides/tohoku2025r/</a>
</div>


---
## ちょっとずつ線形モデルを発展させていく

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="360" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

**線形モデル LM** (単純な直線あてはめ; [#7 前回](7-distribution.html))

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ いろんな<span style="font-weight: bold; color: #56B4E9;">確率分布</span>を扱いたい</span>

**一般化線形モデル GLM** [(👈 #8 今回)](8-glm.html)

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ 個体差などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="opacity: 0.6;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**

<small>「<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ)</cite>」久保拓弥 2012 より改変</small>

<hr>

<span style="font-weight: bold; color: #56B4E9;">確率分布</span>に長い時間を割いたけど、元はと言えば**回帰**したいのでした。

<small>

[Data Science Hill Climb 2024 (東京海上) での講義 (~12時間)](https://heavywatal.github.io/slides/tokiomarine2024/)
の抜粋バージョン (~2時間)。

</small>


---
## 何でもかんでも直線あてはめではよろしくない

<img src="figure/glm-better-1.png" alt="plot of chunk glm-better">

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？
- **データに合わせた統計モデルを使うとマシ**


---
## ここまで見てきた統計モデル

確率変数$X$はパラメータ$\theta$の確率分布$f$に“従う”:&nbsp;
$X \sim f(\theta) $

e.g., ある植物が作る種の数$X$は平均値$\lambda$のポアソン分布に従う:

<div>\[\begin{split}
X \sim \text{Poisson}(\lambda)
\end{split}\]</div>



![plot of chunk only-dist](./figure/only-dist-1.png)

これを一般化線形モデル(GLM)として見ることもできる→


---
## 一般化線形モデル(GLM)として記述してみる

個体$i$の種子数$y_i$は平均値$\lambda_i$のポアソン分布に従う。\
平均値$\lambda_i$は**他のデータによらず$\beta_0$で一定**。

<div>\[\begin{split}
y_i &\sim \text{Poisson}(\lambda_i) \\
\lambda_i &= \beta_0
\end{split}\]</div>

![plot of chunk glm-without-x](./figure/glm-without-x-1.png)

種子数をY軸にして、式を2つに分けただけ...?\
**説明変数**を含むモデルを見ればご利益が分かるかも。

---
## 説明変数が1つある一般化線形モデル

個体$i$の種子数$y_i$は<span style="color: #3366ff;">平均値$\lambda_i$</span>の<span style="color: #56B4E9;">ポアソン分布</span>に従う。\
平均値の対数$\log(\textcolor{#3366ff}{\lambda_i})$は**その個体の大きさ$x_i$に比例**する。

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

<figure style="margin-block: 1rem;">
<img src="../iwate2023stats/glm.drawio.svg" width="640">
</figure>

  </div>
  <div class="column" style="flex-shrink: 1.0;">


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
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

客$n_i$人中$y_i$人がビールを注文。\
その日$i$の気温$x_i$によって割合が変化。

<p>\[\begin{split}
y_i &\sim \text{Binomial}(n_i,~p_i) \\
\operatorname{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
p_i &= \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i)}}
\end{split}\]</p>

ロジスティック関数↑

  </div>
  <div class="column" style="flex-shrink: 1.0;">


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
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

風が吹けば桶屋が儲かる。

<p>\[\begin{split}
y_i &\sim \text{Bernoulli}(p_i) \\
  &= \text{Binomial}(1,~p_i) \\
\operatorname{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
p_i &= \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i)}}
\end{split}\]</p>

ロジスティック関数↑

  </div>
  <div class="column" style="flex-shrink: 1.0;">


![plot of chunk wind](./figure/wind-1.png)

  </div>
</div>


---
## 一般線形モデル (“化”無し) はGLMの一種

- 確率分布: **正規分布**
- リンク関数: **恒等関数**(なにもせずそのまま)

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

<p>\[\begin{split}
y_i &\sim \mathcal{N}(\mu_i,~\sigma^2) \\
\operatorname{identity}(\mu_i) &= \beta_0 + \beta_1 x_i
\end{split}\]</p>

  </div>
  <div class="column" style="flex-shrink: 1.0;">


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
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

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
  <div class="column" style="flex-shrink: 1.3;">



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
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

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
  <div class="column" style="flex-shrink: 1.3;">


![plot of chunk glm-ancova](./figure/glm-ancova-1.png)

  </div>
</div>

GLMなら確率分布・リンク関数を変えてもっと柔軟にモデリングできる。


---
## 交互作用

ある説明変数の効果が、別の説明変数によって異なる。\
e.g., ビール売上の温度依存性が天気によって異なる。

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0; padding-top: 0.1rem;">

| 天気 | $x_1$ |
| ---- | :---: |
| ☀️ 晴れ | 1 |
| ☔️ 雨 | 0 |

<p>\[\begin{split}
y_i &\sim \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \beta_{1,2} x_{1i} x_{2i}
\end{split}\]</p>

雨の日は $x_{1i} = 0$ のため $\beta_0,~\beta_2$ の項だけ。\
晴れの日はそれに加えて $\beta_1,~\beta_{1,2}$ の項も。

  </div>
  <div class="column" style="flex-shrink: 1.3;">


![plot of chunk interaction](./figure/interaction-1.png)

  </div>
</div>


解釈が一気に難しくなるのでむやみに使わない。



---
## 一般化線形モデル(GLM)ふりかえり

確率分布・リンク関数を変えて柔軟にモデリングできる。\
特定の組み合わせには名前がある。

| 名前 | 確率分布 | リンク関数 | 説明変数 |
| ---- | -------- | -------- | -------- |
|ポアソン回帰|ポアソン分布|log| |
|ロジスティック回帰|二項分布|logit| |
|一般線形回帰|正規分布|恒等| |
|分散分析|正規分布|恒等|質的変数|
|共分散分析|正規分布|恒等|質的変数+量的変数|

リンク関数をもう少しだけ掘り下げたい。


---
## リンク関数

統計モデリングにおいて「まっすぐ以外も表現できる」意味

$\operatorname{identity}(\mu_i)$
: $\mu_i = \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots$
: 説明変数の効果が**足し算**的に働く。

$\log(\lambda_i)$
: $\lambda_i = e^{\beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots} = e^{\beta_0} \times e^{\beta_1 x_{1i}} \times e^{\beta_2 x_{2i}} \times \ldots$
: 説明変数の効果が**掛け算**的に働く。\
  e.g., $\Delta x_1$ 増えると $e^{\beta_1 \Delta x_{1}}$ 倍になる

$\operatorname{logit}(p_i)$
: $p_i = \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i + \ldots)}} $ (ロジスティック関数)
: 説明変数の効果が**頭打ち**になる。\
  e.g., $\lim_{x \to -\infty} p = 0;~\lim_{x \to \infty} p = 1$

ほかに `probit`, `inverse`, `sqrt`, etc.


---
## RにおけるGLMのやりかた

直線回帰のときの `lm` とほぼ同じ。


``` r
formula = weight ~ height
fit = glm(formula, data = df_weight)
coef(fit)
```

```
(Intercept)      height 
  -69.85222    78.63444 
```

デフォルトは正規分布・恒等リンクで `lm` と同じ結果。\
`family=` オプションで確率分布とリンク関数を明示的に指定:
```r
glm(formula, family = gaussian(link = identity), data = mydata)
glm(formula, family = poisson(link = log), data = mydata)
glm(formula, family = binomial(link = logit), data = mydata)
```

See [`?family`](https://stat.ethz.ch/R-manual/R-patched/library/stats/html/family.html) for more details.


---
## 🔰 とにかくGLMを使ってみる練習

とりあえず当てはめと作図だけ。\
結果の解釈やモデルの評価はこの後。


``` r
n = 50
df_weight = tibble::tibble(
  height = rnorm(n, 1.70, 0.05),
  bmi = rnorm(n, 22, 1),
  weight = bmi * (height**2)
) |>
  print()
```

```
     height      bmi   weight
 1 1.718019 21.55500 63.62151
 2 1.782862 22.83775 72.59199
 3 1.617464 22.43569 58.69604
 4 1.678291 23.37245 65.83231
--                           
47 1.762930 21.78337 67.70106
48 1.744133 21.47257 65.31960
49 1.730495 19.72866 59.07966
50 1.676496 22.85824 64.24627
```

---
## 🔰 とにかくGLMを使ってみる練習 解答例


``` r
fit_wh = glm(weight ~ height, family = gaussian(link = identity), data = df_weight)
broom::tidy(fit_wh)
```

```
         term  estimate std.error statistic      p.value
1 (Intercept) -69.85222 13.622977 -5.127530 5.214312e-06
2      height  78.63444  8.001338  9.827661 4.460964e-13
```

``` r
df_fit_wh = broom::augment(fit_wh, type.predict = "response")
ggplot(df_fit_wh) +
  aes(height, weight) +
  geom_point() +
  geom_line(aes(y = .fitted), linewidth = 1, color = "#3366ff")
```

![plot of chunk glm-df-weight](./figure/glm-df-weight-1.png)

---
## 🔰 ポアソン回帰


``` r
n = 300L
a = 3
b = -3
df_seeds = tibble::tibble(
  body_mass = runif(n, 0.4, 1.7),
  num_seeds = rpois(n, exp(a * body_mass + b))
) |>
  print()
```

```
    body_mass num_seeds
  1 0.9185923         1
  2 0.5154446         0
  3 1.3362802         4
  4 1.6858125        11
 --                    
297 1.3407210         3
298 1.3357421         1
299 0.8928759         0
300 0.4583795         0
```


---
## データはひとつ、モデルはたくさん

どう選ぶ？

1. メカニズム的に納得できるものを選ぶ
    - ポアソン過程の**カウント**ならポアソン分布、**間隔**ならガンマ分布
    - n回中k回のように**割合的なカウント**なら二項分布
1. データを可視化してみて、それっぽい形・性質のものを選ぶ
    - **左右対称のひと山**ならとりあえず正規分布
    - **負の値を取らない**ならガンマ分布
    - 直線的か、指数関数的か、頭打ちか、などなど

客観的な指標もほしい。\
モデルの尤もらしさといえば...


---
## <ruby>尤<rt>ゆう</rt>度</ruby> (likelihood)

**あるモデル$M$の下でそのデータ$D$が観察される確率**:\
$\Pr(D \mid M)$

データ$D$を固定し、モデル$M$の関数とみなしたものが**尤度関数**:\
$L(M \mid D)$

モデルの構造も固定してパラメータ$\theta$だけ動かす場合はこう書く:\
$L(\theta \mid D)$ or $L(\theta)$

**対数尤度** $\log L$ の形にしたほうがいろいろ便利。

<hr>

各モデルで最適なパラメータを探して、比較:\
$\log L^* (M_1) \text{ vs. } \log L^* (M_2) \text{ vs. } \log L^* (M_3) \ldots$


``` r
broom::glance(fit)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      1305.043      49 -124.9298 255.8597 261.5957 433.2606          48   50
```

---
## たしかに尤度はあてはまりの良さを表してそう

この場合は直線回帰よりもポアソン回帰が良さそう:

![plot of chunk compare-loglik](./figure/compare-loglik-1.png)

この調子で、より尤度の高いモデルを探していけばいいだろうか？

---
## あてはまりが良ければいいってもんでもない

過剰適合 / 過学習 / overfitting
: パラメータを増やせば**現データへの**適合度・尤度を高くできるが、\
  予測・理解の役には立たなくなる。

![plot of chunk saturated-model](./figure/saturated-model-1.png)

**帰無モデル**: 説明変数なし。切片のみ。\
**飽和モデル**: データ点の数 ≤ パラメータの数。“データ読み上げ”的モデル


---
## 無駄な説明変数を加えても尤度は上がる

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。\
観察時に着てた服の色 $x_2$ を追加すると尤度が上がる......?

![plot of chunk many-models](./figure/many-models-1.png)



---
## AIC: 赤池情報量基準

<p>\[\begin{split}
\text{AIC} = -2 (\log L^* - k) = -2 \log L^* + 2k
\end{split}\]</p>

- **AICが小さいほど予測精度の良いモデル**。
    - 尤度は上げたい。
    - パラメータ数 $k$ が増えるとペナルティ。
- どのデータに対する当てはまりを目指すかという観点
    - 「手元のデータ」に対する対数尤度は $\log L^*$
    - 「真のメカニズムから出てくる未来のデータ」に対する\
      平均対数尤度の推定量は $(\log L^* - k)$\
      (Kullback--Leibler情報量を使って導出するらしい)



``` r
broom::glance(fit)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      1305.043      49 -124.9298 255.8597 261.5957 433.2606          48   50
```

???
https://www.slideshare.net/logics-of-blue/1-6aic


---
## 無駄な説明変数の追加でAIC増加

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。\
観察時に着てた服の色 $x_2$ を追加したモデルはAICが増加。

![plot of chunk many-models-aic](./figure/many-models-aic-1.png)

---
## ほかの情報量基準

- $\text{BIC} = -2 \log L^* + k \log n$
    - パラメータ数 $k$ でペナルティを付けるのはAICと同じ。
    - データの観測数 $n$ に依存する点でAICと異なる。\
      感覚としては「AICはデータサイズによるペナルティが無い」
    - (周辺尤度の最大化という観点で導出するらしい)
- [WAIC](https://warp.ndl.go.jp/info:ndljp/pid/12597014/watanabe-www.math.dis.titech.ac.jp/users/swatanab/waic2011.html),
  [WBIC](https://warp.ndl.go.jp/info:ndljp/pid/12597014/watanabe-www.math.dis.titech.ac.jp/users/swatanab/wbic2012.html)
    - AIC, BICを一般化し、広く使えるようにしたもの。
    - 理想的な条件ではそれぞれAIC, BICとほぼ同じ。\
      そうじゃない場合(現実的には常に)こちらが優位。
    - WAICは予測の良さ、WBICは真のモデルへの近さ、を表す。


---
## モデル選択の心構え

「正しい」ものを選べるわけではない。\
予測・理解に useful なものを何らかの基準で選ぶだけ。

> All models are wrong, but some are useful. --- George E. P. Box

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="960">
<figcaption><small>「<a href="https://amzn.to/3uCxTKo"><cite>データ分析のための数理モデル入門</cite></a>」江崎貴裕 2020 より改変</small></figcaption>
</figure>


---
## 現実的な注意点・悩みどころ

- **多重共線性**(multicollinearity):
  - 説明変数同士が強い相関関係にあるとマズいので予め取り除く。
- 変数変換:
  - 気安くやるべきじゃない。でも対数変換などはしばしば有用。
  - **割り算はなるべく避ける**。二項分布やオフセット項を検討。
    - 誤差のある観測値同士を割った値、その確率分布は扱いにくい。
    - 情報が失われる:「5打数2安打」と「500打数200安打」
- **交互作用**を入れると解釈が難しくなる。


---
## 一般化線形モデル座学まとめ

- 何はともあれ散布図を描く
- 適切な確率分布・リンク関数・説明変数を考える
- パラメータを最尤推定する
- 尤度は「手元のデータへのあてはまり」
- モデルを比較するときは情報量基準を参考にする



---
## penguinsデータセット

<figure>
<a href="https://allisonhorst.github.io/palmerpenguins/">
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
<figcaption>
<small>https://allisonhorst.github.io/palmerpenguins/</small>
</figcaption>
</a>
</figure>

```r
install.packages("palmerpenguins")
library(palmerpenguins)
penguins_colors = c(Adelie = "darkorange", Chinstrap = "purple", Gentoo = "cyan4")
print(penguins)
```


---
## penguinsデータセット

<figure>
<a href="https://allisonhorst.github.io/palmerpenguins/">
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
<figcaption>
<small>https://allisonhorst.github.io/palmerpenguins/</small>
</figcaption>
</a>
</figure>


```
      species    island bill_length_mm bill_depth_mm flipper_length_mm body_mass_g    sex year
  1    Adelie Torgersen           39.1          18.7               181        3750   male 2007
  2    Adelie Torgersen           39.5          17.4               186        3800 female 2007
  3    Adelie Torgersen           40.3          18.0               195        3250 female 2007
  4    Adelie Torgersen             NA            NA                NA          NA     NA 2007
 --                                                                                           
341 Chinstrap     Dream           43.5          18.1               202        3400 female 2009
342 Chinstrap     Dream           49.6          18.2               193        3775   male 2009
343 Chinstrap     Dream           50.8          19.0               210        4100   male 2009
344 Chinstrap     Dream           50.2          18.7               198        3775 female 2009
```

---
## 欠損値のある行を取り除いておく

性別はとりあえず使わないので、体長関連だけでも。


``` r
penguins |> dplyr::filter(dplyr::if_any(everything(), is.na))
```

```
   species    island bill_length_mm bill_depth_mm flipper_length_mm body_mass_g sex year
 1  Adelie Torgersen             NA            NA                NA          NA  NA 2007
 2  Adelie Torgersen           34.1          18.1               193        3475  NA 2007
 3  Adelie Torgersen           42.0          20.2               190        4250  NA 2007
 4  Adelie Torgersen           37.8          17.1               186        3300  NA 2007
--                                                                                      
 8  Gentoo    Biscoe           46.2          14.4               214        4650  NA 2008
 9  Gentoo    Biscoe           47.3          13.8               216        4725  NA 2009
10  Gentoo    Biscoe           44.5          15.7               217        4875  NA 2009
11  Gentoo    Biscoe             NA            NA                NA          NA  NA 2009
```

``` r
penguins_dropna = penguins |> tidyr::drop_na(body_mass_g)
dim(penguins_dropna)
```

```
[1] 342   8
```

---
## 🔰 penguinsでGLMの練習

次の課題を解いてみよう。\
(次ページ以降に解答があるけど、まずは自力で。)

1. `body_mass_g` を横軸、 `flipper_length_mm` を縦軸に、まず作図。
1. 単回帰して、切片と傾きを求める。そして作図。
1. `species` で色分けして作図。
1. `species` も説明変数に加えて重回帰し、切片と傾きを求める。そして作図。
1. 余裕があれば、クチバシの長さと深さを縦横軸にして同様の解析。


---
## 単回帰の練習: 1. まず作図

どうやら、重いペンギンほど翼長も長い。


``` r
p_penweight = ggplot(penguins_dropna) +
  aes(body_mass_g, flipper_length_mm) +
  geom_point(shape = 16, size = 2, alpha = 0.66) +
  theme_bw(base_size = 22) +
  theme(panel.grid.minor = element_blank())
p_penweight
```

![plot of chunk penguins-weight](./figure/penguins-weight-1.png)


---
## 単回帰の練習: 2. モデル作成、フィッティング

とりあえずデフォルトの正規分布・恒等リンク。
$y = 136.7 + 0.0153 x$


``` r
fit1 = glm(flipper_length_mm ~ body_mass_g, data = penguins_dropna)
broom::tidy(fit1)
```

```
         term     estimate   std.error statistic       p.value
1 (Intercept) 136.72955927 1.996835406  68.47312 5.712947e-201
2 body_mass_g   0.01527592 0.000466836  32.72223 4.370681e-107
```

``` r
broom::glance(fit1)
```

```
  null.deviance df.null    logLik      AIC     BIC deviance df.residual nobs
1      67426.54     341 -1145.518 2297.035 2308.54  16250.3         340  342
```

---
## 単回帰の練習: 3. フィッティング結果を作図

結果とデータから予測値を作って回帰線を引く。


``` r
aug1 = broom::augment(fit1, type.predict = "response")
p1 = p_penweight +
  geom_line(aes(y = .fitted), data = aug1, linewidth = 1, color = "#3366ff")
p1
```

![plot of chunk penguins-weight-glm](./figure/penguins-weight-glm-1.png)

---
## 重回帰の練習: 1. まず作図

種によって色分けしてみると、傾向の違いが見える。


``` r
p_penweight_color = p_penweight + aes(color = species) +
  scale_color_manual(values = penguins_colors)
p_penweight_color
```

![plot of chunk penguins-weight-sp](./figure/penguins-weight-sp-1.png)


---
## 重回帰の練習: 2. モデル作成、フィッティング

Adelieを基準に、ChinstrapとGentooはそれより長め。\
体重の効果は単回帰のとき(0.0153)より小さい。


``` r
fit2 = glm(flipper_length_mm ~ body_mass_g + species, data = penguins_dropna)
broom::tidy(fit2)
```

```
              term     estimate    std.error statistic       p.value
1      (Intercept) 1.588603e+02 2.3865766963 66.564071 2.450113e-196
2      body_mass_g 8.402113e-03 0.0006338976 13.254686  1.401600e-32
3 speciesChinstrap 5.597440e+00 0.7882166229  7.101398  7.334777e-12
4    speciesGentoo 1.567747e+01 1.0906590679 14.374308  6.800823e-37
```

``` r
broom::glance(fit2)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      67426.54     341 -1059.718 2129.437 2148.611 9839.073         338  342
```

---
## 重回帰の練習: 3. フィッティング結果を作図


``` r
aug2 = broom::augment(fit2, type.predict = "response")
p2 = p_penweight_color +
  geom_line(aes(y = .fitted), data = aug2, linewidth = 1)
p2
```

![plot of chunk penguins-weight-sp-glm](./figure/penguins-weight-sp-glm-1.png)

**傾き**も種によって違うかも。**交互作用**を入れてみたい。


---
## 交互作用の練習: モデル作成、フィッティング

Adelieを基準に、Chinstrapの傾きが結構違う。\
切片の違いは解釈しにくくなった。


``` r
fit3 = glm(flipper_length_mm ~ body_mass_g * species, data = penguins_dropna)
broom::tidy(fit3)
```

```
                          term      estimate    std.error statistic       p.value
1                  (Intercept) 165.244812649 3.5508916651 46.536146 1.561669e-148
2                  body_mass_g   0.006676867 0.0009522935  7.011354  1.301783e-11
3             speciesChinstrap -13.863939075 7.3012647809 -1.898841  5.844186e-02
4                speciesGentoo   6.059375933 6.0508813200  1.001404  3.173522e-01
5 body_mass_g:speciesChinstrap   0.005228197 0.0019486293  2.683013  7.657147e-03
6    body_mass_g:speciesGentoo   0.002362269 0.0013525781  1.746494  8.163897e-02
```

``` r
broom::glance(fit3)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      67426.54     341 -1055.711 2125.422 2152.265 9611.166         336  342
```

---
## 交互作用の練習: フィッティング結果を作図


``` r
aug3 = broom::augment(fit3, type.predict = "response")
p3 = p_penweight_color +
  geom_line(aes(y = .fitted), data = aug3, linewidth = 1)
p3
```

![plot of chunk penguins-interaction](./figure/penguins-interaction-1.png)

---
## ここまでの3つのモデルでどれがいいか？

AICで選ぶなら交互作用入り重回帰が良さそう → 傾きが種によって違う。


``` r
labels = sprintf("AIC = %.1f", AIC(fit1, fit2, fit3)$AIC)
cowplot::plot_grid(p1 + labs(title = labels[1]),
                   p2 + labs(title = labels[2]) + theme(legend.position = "none"),
                   p3 + labs(title = labels[3]) + theme(legend.position = "none"), nrow = 1L)
```

![plot of chunk penguins-aic](./figure/penguins-aic-1.png)


---
## 余裕があったら追加の練習

🔰クチバシの長さと深さで同じ解析をやってみよう。

![plot of chunk penguins-bill](./figure/penguins-bill-1.png)





---
## 一般化線形モデルまとめ

- 何はともあれ作図して俯瞰
- GLMは統計モデリングの考え方の根幹
    - 確率分布・リンク関数・説明変数
    - 尤度・最尤法によるパラメータ推定
    - 情報量基準などによるモデル選択


---
## 今日の残り時間

- 班やTAに相談し、消化しきれなかった部分をなるべく解消する。
- 今日の課題1と2はレポート向けなので、後回しでもいい。
- **明日発表する最終課題に取り組み、だいたい形になった人から解散。**
  - Quartoのオプションや体裁が大丈夫か、TAに確認してもらう。
- 遅くとも17:50には部屋を閉めたい。


---
## 補遺

ここ以降の練習問題はレポートに入れなくてもいいです。\
入れてもいいですが。


---
## 🔰 重回帰

均等に回帰線を引くには `broom::augment()` の使い方に工夫が必要。\
とりあえず `geom_point()` で"回帰点々"を表示してみるとこまでで可とする。


``` r
n = 200L
true_coef = c(3, 0.05, 0.006)
df_beer = tibble::tibble(
  temperature = runif(n, 8, 32),
  humidity = runif(n, 20, 80),
  beer_sales = rpois(n, exp(true_coef[1] + true_coef[2] * temperature + true_coef[3] * humidity))
) |>
  print()
```

```
    temperature humidity beer_sales
  1    17.57401 54.68339         67
  2    10.13129 67.34727         55
  3    25.28517 40.93855        104
  4    31.73808 32.14308        113
 --                                
197    26.28116 41.89173        105
198    23.53532 73.12257        113
199    13.87494 41.92560         51
200    31.60519 61.47984        140
```

---
## 🔰 ロジスティック回帰

次ページにヒント。


``` r
sigmoid = function(x, gain = 1) {1 / (1 + exp(-gain * x))}
nrep = 200L
n = 10L
df_logistic = tibble::tibble(
  x = runif(nrep, -10, 35),
  logit_p = -3 + 0.3 * x,
  p = sigmoid(logit_p),
  y = rbinom(nrep, n, p),
  response = matrix(c(y, n - y), ncol = 2)
) |>
  print()
```

```
            x    logit_p          p  y response[,1] [,2]
  1  7.951271 -0.6146188 0.35100632  4            4    6
  2 -6.003840 -4.8011520 0.00815325  0            0   10
  3 22.409698  3.7229095 0.97640654 10           10    0
  4 34.508895  7.3526686 0.99935953 10           10    0
 --                                                     
197 24.277180  4.2831541 0.98638875 10           10    0
198 19.128721  2.7386162 0.93926720  8            8    2
199  1.015520 -2.6953441 0.06324865  0            0   10
200 34.259733  7.2779199 0.99930986 10           10    0
```

---
## ロジスティック回帰のヒント

左辺の応答変数に指定できるのはだいたい次の2種類:
- 成功を1、失敗を0で表す整数vector (狭義のロジスティック回帰)
- 1列目が成功回数、2列目が失敗回数の整数matrix

今回の場合、成功回数 `y` だけをformulaに入れると怒られる

``` r
glm(y ~ x, df_logistic, family = binomial)
```

```
Error in eval(family$initialize): y values must be 0 <= y <= 1
```
ので失敗回数もモデルに含むよう `response ~ x` とする。

(今回のように試行回数が10回固定じゃなくても使える、ということ)


---
## 🔰 共分散分析: GLM with 質的変数 + 量的変数

まずはweatherだけで分散分析、次にtemperatureを入れて共分散分析。


``` r
n = 200L
b = c(70, 3, 20, -20)  # true coef
weather_levels = c("rainy", "cloudy", "sunny")
df_ancova = tibble::tibble(
    temperature = runif(n, 8, 32),
    weather = factor(sample(weather_levels, n, TRUE), levels = weather_levels)
  ) |>
  dplyr::mutate(name = weather, value = 1L) |>
  tidyr::pivot_wider(values_fill = 0L) |>
  dplyr::select(!cloudy) |>
  dplyr::mutate(mu = b[1] + b[2] * temperature + b[3] * sunny + b[4] * rainy) |>
  dplyr::mutate(beer_sales = rnorm(n, mu, 10)
) |>
  print()
```

```
    temperature weather rainy sunny        mu beer_sales
  1   23.377217  cloudy     0     0 140.13165  129.36288
  2   26.043088  cloudy     0     0 148.12926  138.26966
  3   30.830351  cloudy     0     0 162.49105  141.46190
  4   15.022311  cloudy     0     0 115.06693  108.18593
 --                                                     
197    8.277514  cloudy     0     0  94.83254   74.38321
198   28.675228   sunny     0     1 176.02568  180.34777
199   27.310881   sunny     0     1 171.93264  162.31587
200   24.064285   rainy     1     0 122.19286  104.89368
```

---
## 🔰 交互作用



``` r
n = 200L
b = c(70, 3, 100, -2)  # true coef
weather_levels = c("rainy", "sunny")
df_interact = tibble::tibble(
    temperature = runif(n, 8, 32),
    weather = factor(sample(weather_levels, n, TRUE), levels = weather_levels)
  ) |>
  dplyr::mutate(name = weather, value = 1L) |>
  tidyr::pivot_wider(values_fill = 0L) |>
  dplyr::mutate(mu = b[1] * sunny + b[2] * temperature + b[3] * rainy + b[4] * temperature * rainy) |>
  dplyr::mutate(beer_sales = rnorm(n, mu, 10)) |>
  print()
```

```
    temperature weather sunny rainy       mu beer_sales
  1   23.377217   sunny     1     0 140.1316   133.0540
  2   26.043088   sunny     1     0 148.1293   155.9879
  3   30.830351   sunny     1     0 162.4911   162.3405
  4   15.022311   sunny     1     0 115.0669   117.6067
 --                                                    
197    8.277514   rainy     0     1 108.2775   117.7023
198   28.675228   rainy     0     1 128.6752   127.9629
199   27.310881   sunny     1     0 151.9326   155.6515
200   24.064285   rainy     0     1 124.0643   124.6956
```


---
## 🔰 架空データでGLM

宿屋の主人が宿泊客の冒険者に話を聞いてデータを集めた。\
冒険者の**レベル**、**職業**、通ってきた**ルート**、魔物との**遭遇回数**。\
これらの変数の間に、なんらかの関係は見られるだろうか？

[adventure.tsv](adventure.tsv)


```
     level     job route encounter
   1     7 fighter field         2
   2     7 fighter field         0
   3    40    mage  cave         9
   4    38    mage field         3
  --                              
 997    17 fighter  cave         4
 998    49    mage field         8
 999    43 fighter field         6
1000    37    mage field        11
```




---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
- [科学とモデル---シミュレーションの哲学 入門](https://amzn.to/2Q0f6JQ) Michael Weisberg 2017\
  (原著: [Simulation and Similarity](https://amzn.to/3bdvhuI) 2013)

<a href="9-report.html" class="readmore">
9. 発表会
</a>
