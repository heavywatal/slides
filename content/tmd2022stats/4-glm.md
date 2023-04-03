+++
url = "tmd2022stats/4-glm.html"
linktitle = "一般化線形モデル (GLM)"
title = "4. 一般化線形モデル (GLM) — 統計モデリング実習 2022 TMDU"
date = 2023-03-18T14:40:00+09:00
draft = false
css = "style.css"
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
<li class="current-deck"><a href="4-glm.html">一般化線形モデル (GLM)</a>
<li><a href="5-glmm.html">個体差、一般化線形混合モデル (GLMM)</a>
<li><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル (HBM)</a>
</ol>

<div class="footnote">
2023-03-18 東京医科歯科大学<br>
<a href="https://heavywatal.github.io/slides/tmd2022stats/">https://heavywatal.github.io/slides/tmd2022stats/</a>
</div>


---
## 前章で見た統計モデル

確率変数$X$はパラメータ$\theta$の確率分布$f$に“従う”:&nbsp;
$X \sim f(\theta) $

e.g., ある植物が作る種の数$X$は平均値$\lambda$のポアソン分布に従う:

<div>\[\begin{split}
X \sim \text{Poisson}(\lambda)
\end{split}\]</div>



![plot of chunk only-dist](./figure/only-dist-1.png)

これを一般化線形モデル(GLM)として見ることもできる。

---
## 一般化線形モデル(GLM)として記述してみる

個体$i$の種子数$y_i$は平均値$\lambda_i$のポアソン分布に従う。<br>
平均値$\lambda_i$は**他のデータによらず$\beta_0$で一定**。

<div>\[\begin{split}
y_i &\sim \text{Poisson}(\lambda_i) \\
\lambda_i &= \beta_0
\end{split}\]</div>

![plot of chunk glm-without-x](./figure/glm-without-x-1.png)

種子数をY軸にして、式を2つに分けただけ...?<br>
**説明変数**を含むモデルを見ればご利益が分かるかも。

---
## 説明変数が1つある一般化線形モデル

個体$i$の種子数$y_i$は平均値$\lambda_i$のポアソン分布に従う。<br>
平均値の対数$\log(\lambda_i)$は**その個体の大きさ$x_i$に比例**する。

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0;">

<figure>
<img src="../tokiomarine2021/glm.drawio.svg" width="100%"><br>
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
- リンク関数: $\text{logit}(p) = \log \frac {p} {1 - p}$

何かの成否に対する何かの因子の影響、とか

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

客10人中$y_i$人がビールを注文。<br>
その日$i$の気温$x_i$によって割合が変化。

<p>\[\begin{split}
y_i &\sim \text{Binomial}(n,~p_i) \\
\text{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
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
- リンク関数: $\text{logit}(p) = \log \frac {p} {1 - p}$

何かの成否に対する何かの因子の影響、とか

<div class="column-container">
  <div class="column" style="flex-shrink: 1.0; padding-top: 1rem;">

風が吹けば桶屋が儲かる。

<p>\[\begin{split}
y_i &\sim \text{Bernoulli}(p_i) \\
  &= \text{Binomial}(1,~p_i) \\
\text{logit}(p_i) &= \beta_0 + \beta_1 x_i \\
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
\text{identity}(\mu_i) &= \beta_0 + \beta_1 x_i
\end{split}\]</p>

  </div>
  <div class="column" style="flex-shrink: 1.0;">


![plot of chunk glm-weight](./figure/glm-weight-1.png)

  </div>
</div>

最小二乗法の直線あてはめと結果的に同じになる。

<small style="color: #999999;">単回帰・重回帰と言ったとき一般線形モデルを前提とする人もいる。</small>

---
## 分散分析 (<u>An</u>alysis <u>o</u>f <u>va</u>riance, ANOVA) as GLM

**質的な説明変数**を持つ**正規分布・恒等リンク**のGLM、と解釈可能。<br>
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

**質的変数と量的変数を両方**含むGLM、と解釈可能。<br>
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

ある説明変数の効果が、別の説明変数によって異なる。<br>
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

雨の日は $x_{1i} = 0$ のため $\beta_0,~\beta_2$ の項だけ。<br>
晴れの日はそれに加えて $\beta_1,~\beta_{1,2}$ の項も。

  </div>
  <div class="column" style="flex-shrink: 1.3;">


![plot of chunk interaction](./figure/interaction-1.png)

  </div>
</div>


解釈が一気に難しくなるのでむやみに使わない。


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

確率分布については[前章を参照](2-stats-model.html)。<br>
リンク関数をもう少しだけ掘り下げたい。


---
## リンク関数

統計モデリングにおいて「まっすぐ以外も表現できる」意味

$\text{identity}(\mu_i)$
: $\mu_i = \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots$
: 説明変数の効果が**足し算**的に働く。

$\log(\lambda_i)$
: $\lambda_i = e^{\beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots} = e^{\beta_0} \times e^{\beta_1 x_{1i}} \times e^{\beta_2 x_{2i}} \times \ldots$
: 説明変数の効果が**掛け算**的に働く。<br>
  e.g., $\Delta x_1$ 増えると $e^{\beta_1 \Delta x_{1}}$ 倍になる

$\text{logit}(p_i)$
: $p_i = \frac 1 {1 + e^{-(\beta_0 + \beta_1 x_i + \ldots)}} $ (ロジスティック関数)
: 説明変数の効果が**頭打ち**になる。<br>
  e.g., $\lim_{x \to -\infty} p = 0;~\lim_{x \to \infty} p = 1$

ほかに `probit`, `inverse`, `sqrt`, etc.


---
## RにおけるGLMのやりかた

直線回帰のときの `lm` とほぼ同じ。


```r
formula = weight ~ height
fit = glm(formula, data = df_weight)
coef(fit)
```

```
(Intercept)      height 
  -69.85222    78.63444 
```

デフォルトは正規分布・恒等リンクで `lm` と同じ結果。<br>
`family=` オプションで確率分布とリンク関数を明示的に指定:
```r
glm(formula, family = gaussian(link = identity), data = mydata)
glm(formula, family = poisson(link = log), data = mydata)
glm(formula, family = binomial(link = logit), data = mydata)
```

See [`?family`](https://stat.ethz.ch/R-manual/R-patched/library/stats/html/family.html) for more details.


---
## 🔰 とにかくGLMを使ってみる練習

とりあえず当てはめと作図だけ。<br>
結果の解釈やモデルの評価はこの後。


```r
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
## 🔰 ポアソン回帰


```r
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
## 🔰 重回帰


```r
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


```r
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
## 🔰 共分散分析: GLM with 質的変数 + 量的変数

まずはweatherだけで分散分析、次にtemperatureを入れて共分散分析。


```r
n = 200L
b = c(70, 3, 20, -20)  # true coef
weather_levels = c("sunny", "cloudy", "rainy")
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
    temperature weather sunny rainy        mu beer_sales
  1   23.377217  cloudy     0     0 140.13165  129.36288
  2   26.043088  cloudy     0     0 148.12926  138.26966
  3   30.830351  cloudy     0     0 162.49105  141.46190
  4   15.022311  cloudy     0     0 115.06693  108.18593
 --                                                     
197    8.277514  cloudy     0     0  94.83254   74.38321
198   28.675228   rainy     0     1 136.02568  140.34777
199   27.310881   rainy     0     1 131.93264  122.31587
200   24.064285   sunny     1     0 162.19286  144.89368
```

---
## 🔰 交互作用



```r
n = 200L
b = c(70, 3, 100, -2)  # true coef
weather_levels = c("sunny", "rainy")
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
    temperature weather rainy sunny        mu beer_sales
  1   23.377217   rainy     1     0 123.37722   116.2995
  2   26.043088   rainy     1     0 126.04309   133.9018
  3   30.830351   rainy     1     0 130.83035   130.6798
  4   15.022311   rainy     1     0 115.02231   117.5620
 --                                                     
197    8.277514   sunny     0     1  94.83254   104.2573
198   28.675228   sunny     0     1 156.02568   155.3134
199   27.310881   rainy     1     0 127.31088   131.0297
200   24.064285   sunny     0     1 142.19286   142.8241
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

客観的な指標もほしい。<br>
モデルの尤もらしさといえば...


---
## <ruby>尤<rt>ゆう</rt>度</ruby> (likelihood)

**あるモデル$M$の下でそのデータ$D$が観察される確率**:<br>
$\text{Prob}(D \mid M)$

データ$D$を固定し、モデル$M$の関数とみなしたものが**尤度関数**:<br>
$L(M \mid D)$

モデルの構造も固定してパラメータ$\theta$だけ動かす場合はこう書く:<br>
$L(\theta \mid D)$ or $L(\theta)$

**対数尤度** $\log L$ の形にしたほうがいろいろ便利。

<hr>

各モデルで最適なパラメータを探して、比較:<br>
$\log L^* (M_1) \text{ vs. } \log L^* (M_2) \text{ vs. } \log L^* (M_3) \ldots$


```r
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
: パラメータを増やせば**現データへの**適合度・尤度を高くできるが、<br>
  予測・理解の役には立たなくなる。

![plot of chunk saturated-model](./figure/saturated-model-1.png)

**帰無モデル**: 説明変数なし。切片のみ。<br>
**飽和モデル**: データ点の数 ≤ パラメータの数。“データ読み上げ”的モデル


---
## 無駄な説明変数を加えても尤度は上がる

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。<br>
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
    - 「手元のデータ」に対する対数尤度は $\log L^*$<br>
    - 「真のメカニズムから出てくる未来のデータ」に対する<br>
      平均対数尤度の推定量は $(\log L^* - k)$<br>
      (Kullback--Leibler情報量を使って導出するらしい)



```r
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

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。<br>
観察時に着てた服の色 $x_2$ を追加したモデルはAICが増加。

![plot of chunk many-models-aic](./figure/many-models-aic-1.png)

---
## ほかの情報量基準

- $\text{BIC} = -2 \log L^* + k \log n$
    - パラメータ数 $k$ でペナルティを付けるのはAICと同じ。
    - データの観測数 $n$ に依存する点でAICと異なる。<br>
      感覚としては「AICはデータサイズによるペナルティが無い」
    - (周辺尤度の最大化という観点で導出するらしい)
- [WAIC](http://watanabe-www.math.dis.titech.ac.jp/users/swatanab/waic2011.html),
  [WBIC](http://watanabe-www.math.dis.titech.ac.jp/users/swatanab/wbic2012.html)
    - AIC, BICを一般化し、広く使えるようにしたもの。
    - 理想的な条件ではそれぞれAIC, BICとほぼ同じ。<br>
      そうじゃない場合(現実的には常に)こちらが優位。
    - WAICは予測の良さ、WBICは真のモデルへの近さ、を表す。


---
## モデル選択の心構え

「正しい」ものを選べるわけではない。<br>
予測・理解に useful なものを何らかの基準で選ぶだけ。

> All models are wrong, but some are useful. --- George E. P. Box

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="800"><br>
<figcaption><cite>「データ分析のための数理モデル入門」江崎貴裕 2020 より改変</cite></figcaption>
</figure>


---
## 現実的な注意点・悩みどころ

- 多重共線性(multicollinearity):
    - 説明変数同士が強い相関関係にある
- 変数変換:
    - 気安くやるべきじゃないけど、対数変換などしばしば有用
    - 割り算した値は危険
- 交互作用を入れると解釈が難しくなる。


---
## 一般化線形モデル座学まとめ

- 何はともあれ散布図を描く
- 適切な確率分布・リンク関数・説明変数を考える
- パラメータを最尤推定する
- 尤度は「手元のデータへのあてはまり」
- モデルを比較するときは情報量基準を参考にする

---
## penguinsデータセット

<a href="https://allisonhorst.github.io/palmerpenguins/">
<cite>https://allisonhorst.github.io/palmerpenguins/</cite><br>
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
</a>

```r
install.packages("palmerpenguins")
library(palmerpenguins)
penguins_colors = c(Adelie = "darkorange", Chinstrap = "purple", Gentoo = "cyan4")
print(penguins)
```


---
## penguinsデータセット

<a href="https://allisonhorst.github.io/palmerpenguins/">
<cite>https://allisonhorst.github.io/palmerpenguins/</cite><br>
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
</a>


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


```r
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

```r
penguins_dropna = penguins |> tidyr::drop_na(body_mass_g)
dim(penguins_dropna)
```

```
[1] 342   8
```

---
## 🔰 penguinsでGLMの練習

次の課題を解いてみよう。<br>
(次ページ以降に解答。まずは自力で。)

1. `body_mass_g` を横軸、 `flipper_length_mm` を縦軸に、まず作図。
1. 単回帰して、切片と傾きを求める。そして作図。
1. `species` で色分けして作図。
1. `species` も説明変数に加えて重回帰し、切片と傾きを求める。そして作図。
1. 余裕があれば、クチバシの長さと深さを縦横軸にして同様の解析。


---
## 単回帰の練習: 1. まず作図

どうやら、重いペンギンほど翼長も長い。


```r
p_penweight = ggplot(penguins_dropna) +
  aes(body_mass_g, flipper_length_mm) +
  geom_point(shape = 16, alpha = 0.66) +
  theme_bw(base_size = 20) +
  theme(panel.grid.minor = element_blank())
p_penweight
```

![plot of chunk penguins-weight](./figure/penguins-weight-1.png)


---
## 単回帰の練習: 2. モデル作成、フィッティング

とりあえずデフォルトの正規分布・恒等リンク。
$y = 136.7 + 0.0153 x$


```r
fit1 = glm(flipper_length_mm ~ body_mass_g, data = penguins_dropna)
broom::tidy(fit1)
```

```
         term     estimate   std.error statistic       p.value
1 (Intercept) 136.72955927 1.996835406  68.47312 5.712947e-201
2 body_mass_g   0.01527592 0.000466836  32.72223 4.370681e-107
```

```r
broom::glance(fit1)
```

```
  null.deviance df.null    logLik      AIC     BIC deviance df.residual nobs
1      67426.54     341 -1145.518 2297.035 2308.54  16250.3         340  342
```

---
## 単回帰の練習: 3. フィッティング結果を作図

結果とデータから予測値を作って回帰線を引く。


```r
added1 = modelr::add_predictions(penguins_dropna, fit1, type = "response")
p1 = p_penweight +
  geom_line(aes(y = pred), data = added1, linewidth = 1, color = "#3366ff")
p1
```

![plot of chunk penguins-weight-glm](./figure/penguins-weight-glm-1.png)

---
## 重回帰の練習: 1. まず作図

種によって色分けしてみると、傾向の違いが見える。


```r
p_penweight_color = p_penweight + aes(color = species) +
  scale_color_manual(values = penguins_colors)
p_penweight_color
```

![plot of chunk penguins-weight-sp](./figure/penguins-weight-sp-1.png)


---
## 重回帰の練習: 2. モデル作成、フィッティング

Adelieを基準に、ChinstrapとGentooはそれより長め。<br>
体重の効果は単回帰のとき(0.0153)より小さい。


```r
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

```r
broom::glance(fit2)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      67426.54     341 -1059.718 2129.437 2148.611 9839.073         338  342
```

---
## 重回帰の練習: 3. フィッティング結果を作図


```r
added2 = modelr::add_predictions(penguins_dropna, fit2, type = "response")
p2 = p_penweight_color +
  geom_line(aes(y = pred), data = added2, linewidth = 1)
p2
```

![plot of chunk penguins-weight-sp-glm](./figure/penguins-weight-sp-glm-1.png)

**傾き**も種によって違うかも。**交互作用**を入れてみたい。


---
## 交互作用の練習: モデル作成、フィッティング

Adelieを基準に、Chinstrapの傾きが結構違う。<br>
切片の違いは解釈しにくくなった。


```r
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

```r
broom::glance(fit3)
```

```
  null.deviance df.null    logLik      AIC      BIC deviance df.residual nobs
1      67426.54     341 -1055.711 2125.422 2152.265 9611.166         336  342
```

---
## 交互作用の練習: フィッティング結果を作図


```r
added3 = modelr::add_predictions(penguins_dropna, fit3, type = "response")
p3 = p_penweight_color +
  geom_line(aes(y = pred), data = added3, linewidth = 1)
p3
```

![plot of chunk penguins-interaction](./figure/penguins-interaction-1.png)

---
## ここまでの3つのモデルでどれがいいか？

AICで選ぶなら交互作用入り重回帰が良さそう。


```r
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

🔰余裕があったら性別や年なども説明変数に入れてみよう。

<!-- TODO: 練習に適した課題データ -->


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="5-glmm.html" class="readmore">
5. 個体差、一般化線形混合モデル (GLMM)
</a>
