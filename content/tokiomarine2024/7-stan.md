+++
url = "tokiomarine2024/7-stan.html"
linktitle = "StanでGLM"
title = "7. StanでGLM — 統計モデリング概論 DSHC 2024"
date = 2024-08-28T13:00:00+09:00
draft = false
css = "style.css"
dpi = 108
+++

# [統計モデリング概論 DSHC 2024](.)

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
<li><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li class="current-deck"><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル(HBM)</a>
</ol>

<div class="footnote">
2024-08-28 東京海上 Data Science Hill Climb<br>
<a href="https://heavywatal.github.io/slides/tokiomarine2024/">https://heavywatal.github.io/slides/tokiomarine2024/</a>
</div>



---
## 🔰 とりあえずStanを動かしてみよう


```
This is cmdstanr version 0.8.1
- CmdStanR documentation and vignettes: mc-stan.org/cmdstanr
- CmdStan path: /Users/watal/.cmdstan/cmdstan-2.35.0
- CmdStan version: 2.35.0
```

```
This is bayesplot version 1.11.1
```

おおまかな流れ:

1. データ準備
1. Stan言語でモデルを書く
1. モデルをコンパイルして機械語に翻訳 → 実行ファイル
1. 実行ファイルにデータを渡してMCMCサンプリング
1. 結果を見る

🔰
[`7-stan.ipynb`](7-stan.ipynb)
を開き、スライド説明に沿って実行しよう。


---
## 説明変数なしのベイズ推定: データ準備

表が出る確率 $p=0.7$ のイカサマコインをN回投げたデータを作る。<br>
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

``` r
model = cmdstanr::cmdstan_model("stan/coin.stan")
```

モデルとデータを使ってMCMCサンプリング:


``` r
fit = model$sample(coin_data, seed = 24601L)
```

いろいろオプションはあるけど、ここではデフォルトに任せる:<br>
`chains`, `inits`, `iter_warmup`, `iter_samples`, `thin`, ...

問題があったら警告してくれるので**ちゃんと読む**。

---
## 説明変数なしのベイズ推定: 結果を眺める

`parameters` ブロックに書いた変数の情報が出てくる。<br>
乱数を使った計算なので(乱数シードを固定しない限り)毎回変わる。


``` r
print(fit)
```

```
 variable   mean median   sd  mad     q5    q95 rhat ess_bulk ess_tail
     lp__ -25.64 -25.36 0.73 0.31 -27.12 -25.13 1.00     1991     2723
     p      0.72   0.72 0.07 0.07   0.60   0.82 1.00     1368     2272
```

真の値に近い $p \approx 0.7$ が得られた
(0.6 から
0.82 である確率が90%)。<br>
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

サンプルサイズNが小さいせいか裾野の広い推定結果。<br>
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

つまり、事前確率と尤度の対数の和を取っている。<br>
ベイズの定理により、事後確率はこれに比例する。<br>
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
 lp__      -79.46 -79.15  1.24  1.07 -81.91 -78.08 1.00     1203     1433
 intercept -69.94 -69.45 14.15 13.99 -93.41 -47.75 1.00     1199     1318
 slope      78.69  78.42  8.31  8.20  65.62  92.49 1.00     1193     1292
 sigma       3.08   3.05  0.32  0.32   2.61   3.66 1.00     1336     1434
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
        1 -79 -78 -80 -78
        2 -78 -78 -79 -79
        3 -79 -79 -78 -78
        4 -78 -79 -79 -78
        5 -79 -78 -79 -80

, , variable = intercept

         chain
iteration   1   2   3   4
        1 -55 -60 -86 -82
        2 -59 -58 -80 -79
        3 -54 -59 -59 -73
        4 -75 -59 -87 -73
        5 -57 -58 -79 -47

, , variable = slope

         chain
iteration  1  2  3  4
        1 70 73 89 86
        2 72 72 84 84
        3 70 73 73 81
        4 82 72 89 80
        5 72 72 84 65

, , variable = sigma

         chain
iteration   1   2   3   4
        1 3.0 3.0 2.9 3.0
        2 3.0 2.9 2.8 2.8
        3 3.2 3.1 2.9 3.0
        4 2.8 3.0 2.8 3.0
        5 3.3 3.1 3.3 2.9

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
1   -79       -55    70   3.0
2   -78       -59    72   3.0
3   -79       -54    70   3.2
4   -78       -75    82   2.8
5   -79       -57    72   3.3
6   -79       -47    65   3.0
7   -79       -48    66   3.0
8   -78       -64    75   3.2
9   -78       -68    78   3.2
10  -78       -65    76   3.0
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
## 変数と[ブロック](6-bayesian.html#/37)をうまく使って可読性アップ

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
1 -78.7     -55.0  70.1  3.01  65.4  70.0  58.4  62.6  65.3  59.2  70.1  62.3  59.7   64.5   67.9   63.1   62.0   65.3   63.4   63.3   67.3   62.1   58.5   57.4   62.2   64.4   65.4   66.7   64.5   62.4   64.2   59.9   71.1   64.4   72.3   67.7   65.1   64.5   68.8   67.2   56.8   66.0   69.3   55.3   65.1   67.6   61.5   62.6   61.0   64.7   68.6   67.2   66.3   62.5
2 -78.3     -58.8  72.1  3.03  65.0  69.7  57.8  62.2  64.9  58.6  69.8  61.8  59.2   64.1   67.7   62.6   61.6   64.9   63.0   62.8   67.0   61.6   57.9   56.8   61.8   64.1   65.0   66.4   64.1   61.9   63.9   59.4   70.9   64.0   72.1   67.4   64.7   64.1   68.5   66.9   56.2   65.7   69.1   54.6   64.7   67.3   61.0   62.2   60.5   64.4   68.3   66.9   65.9   62.0
3 -79.2     -54.1  69.6  3.24  65.5  70.0  58.5  62.7  65.4  59.3  70.1  62.4  59.9   64.6   68.0   63.2   62.1   65.4   63.5   63.4   67.4   62.2   58.7   57.5   62.4   64.6   65.5   66.8   64.6   62.5   64.4   60.1   71.2   64.5   72.3   67.8   65.2   64.6   68.9   67.3   57.0   66.1   69.4   55.5   65.2   67.7   61.6   62.8   61.1   64.9   68.6   67.3   66.4   62.6
4 -78.2     -75.0  81.7  2.77  65.3  70.6  57.1  62.0  65.1  58.0  70.7  61.6  58.7   64.3   68.2   62.6   61.3   65.1   63.0   62.8   67.5   61.4   57.2   55.9   61.6   64.2   65.3   66.8   64.2   61.8   63.9   58.9   72.0   64.0   73.2   68.0   64.9   64.2   69.2   67.4   55.3   66.0   69.9   53.5   64.9   67.9   60.7   62.0   60.1   64.5   68.9   67.4   66.3   61.9
5 -78.9     -57.4  71.5  3.26  65.5  70.1  58.3  62.7  65.3  59.1  70.2  62.3  59.7   64.6   68.1   63.1   62.0   65.4   63.5   63.3   67.5   62.1   58.5   57.3   62.3   64.5   65.5   66.8   64.5   62.4   64.3   59.9   71.4   64.4   72.5   67.8   65.2   64.5   69.0   67.4   56.8   66.1   69.5   55.2   65.2   67.8   61.5   62.7   61.0   64.8   68.7   67.4   66.4   62.5
6 -79.4     -47.1  65.2  2.97  64.9  69.2  58.4  62.3  64.8  59.1  69.3  62.0  59.7   64.1   67.3   62.8   61.8   64.8   63.1   62.9   66.7   61.8   58.5   57.5   62.0   64.0   64.9   66.2   64.0   62.1   63.9   59.8   70.3   64.0   71.3   67.1   64.6   64.0   68.1   66.6   57.0   65.5   68.6   55.5   64.6   67.0   61.3   62.4   60.8   64.3   67.9   66.6   65.7   62.2
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
のような乱数生成が使えるのは<br>
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
1 -78.7     -55.0  70.1  3.01  65.4  70.0  58.4  62.6  65.3  59.2  70.1  62.3  59.7   64.5   67.9   63.1   62.0   65.3   63.4   63.3   67.3   62.1   58.5   57.4   62.2   64.4   65.4   66.7   64.5   62.4   64.2   59.9   71.1   64.4   72.3   67.7   65.1   64.5   68.8   67.2   56.8   66.0   69.3   55.3   65.1   67.6   61.5   62.6   61.0   64.7   68.6   67.2   66.3   62.5    63.0    71.5    58.9    65.9    63.0    59.0    69.4    61.8    58.1     60.6     69.5     62.5     59.1     71.2     60.7     62.6     63.5     63.2     54.8     55.9     64.2     65.1     63.7     70.1     63.4     64.9     60.8     58.8     73.6     66.6     73.9     64.4     63.1     67.6     65.2     67.3     54.4     66.1     68.7     58.1     66.6     67.7     62.8     62.5     63.4     65.3     67.8     67.1     65.1     59.6
2 -78.8     -86.0  88.0  2.95  65.2  70.9  56.3  61.7  65.0  57.3  71.0  61.3  58.0   64.1   68.4   62.2   60.9   65.0   62.7   62.5   67.6   61.0   56.5   55.1   61.2   64.0   65.2   66.8   64.0   61.4   63.7   58.3   72.4   63.8   73.8   68.1   64.8   64.0   69.4   67.5   54.4   66.0   70.1   52.5   64.8   68.0   60.3   61.7   59.6   64.3   69.1   67.5   66.3   61.5    64.3    68.4    57.1    56.0    69.0    53.9    69.7    63.9    57.5     62.7     65.7     57.1     62.0     63.6     64.8     63.3     65.7     60.9     57.1     57.4     61.0     66.9     66.7     69.0     63.4     55.6     67.2     57.5     67.7     61.3     74.0     69.0     60.3     60.5     68.7     70.9     56.7     61.9     68.0     56.6     65.0     65.6     60.7     60.3     67.3     66.8     63.3     65.1     71.1     60.7
3 -78.5     -59.7  72.5  3.11  64.8  69.5  57.5  62.0  64.7  58.4  69.6  61.6  59.0   63.9   67.5   62.4   61.3   64.7   62.8   62.6   66.8   61.4   57.7   56.5   61.5   63.8   64.8   66.2   63.9   61.7   63.6   59.2   70.8   63.7   71.9   67.2   64.5   63.9   68.3   66.7   56.0   65.5   68.9   54.4   64.5   67.1   60.8   62.0   60.3   64.2   68.1   66.7   65.7   61.8    62.0    68.0    55.2    66.3    60.0    56.7    66.4    69.0    56.2     64.4     70.5     61.4     60.1     69.5     63.9     58.1     71.3     65.8     56.7     48.0     62.5     64.5     65.5     68.0     63.9     66.2     62.2     62.2     72.8     65.0     70.9     64.7     63.1     66.2     72.2     63.9     57.5     70.0     67.7     53.3     66.4     67.8     54.7     54.7     62.0     65.8     70.4     62.7     61.6     59.1
4 -78.4     -65.0  75.7  2.76  65.0  69.9  57.4  62.0  64.8  58.3  70.0  61.6  58.9   64.0   67.7   62.5   61.3   64.9   62.8   62.7   67.1   61.4   57.5   56.3   61.6   63.9   65.0   66.4   64.0   61.7   63.7   59.1   71.2   63.8   72.4   67.5   64.6   64.0   68.6   67.0   55.7   65.7   69.2   54.1   64.6   67.4   60.8   62.0   60.2   64.3   68.4   67.0   65.9   61.8    67.4    70.0    55.2    62.3    62.3    57.7    67.3    62.2    58.3     63.1     64.6     59.1     62.6     64.6     61.0     61.4     70.5     65.9     59.5     58.8     64.1     59.3     67.0     64.8     72.1     61.9     61.0     57.3     72.5     67.5     73.9     66.0     64.1     67.5     68.9     66.9     55.0     69.2     70.6     55.6     64.8     73.7     61.3     59.3     55.1     63.4     70.9     71.9     67.6     58.1
5 -79.4     -51.0  67.8  2.92  65.5  69.9  58.7  62.8  65.3  59.5  70.0  62.5  60.0   64.6   68.0   63.2   62.2   65.4   63.6   63.4   67.3   62.3   58.8   57.7   62.4   64.6   65.5   66.8   64.6   62.6   64.4   60.2   71.0   64.5   72.1   67.7   65.2   64.6   68.8   67.3   57.2   66.1   69.3   55.7   65.2   67.7   61.7   62.8   61.2   64.9   68.5   67.3   66.3   62.7    66.9    67.0    59.2    64.5    64.9    55.9    67.9    64.3    56.3     67.5     71.5     63.6     63.8     67.4     62.9     61.2     69.5     60.9     60.9     59.0     65.5     62.8     60.5     66.9     64.7     59.8     66.2     57.9     68.5     65.0     75.0     71.1     66.5     61.8     64.2     68.2     58.1     65.2     72.3     48.4     67.5     65.5     61.4     63.5     59.0     61.8     66.0     65.6     66.9     68.3
6 -79.1     -54.6  70.0  2.94  65.5  70.1  58.5  62.8  65.4  59.3  70.2  62.4  59.9   64.7   68.1   63.2   62.2   65.4   63.6   63.4   67.5   62.2   58.7   57.5   62.4   64.6   65.5   66.9   64.6   62.5   64.4   60.1   71.3   64.5   72.4   67.8   65.2   64.6   68.9   67.4   57.0   66.2   69.5   55.5   65.2   67.8   61.6   62.8   61.1   64.9   68.7   67.4   66.4   62.6    60.8    71.4    62.6    62.2    65.8    55.9    69.3    63.7    60.4     62.3     68.8     66.0     61.8     60.3     60.4     64.9     67.0     59.8     55.7     53.4     67.6     64.8     65.3     65.5     64.8     65.8     70.2     59.6     73.3     66.6     75.4     67.9     67.2     62.0     72.8     70.8     59.1     61.9     70.1     52.8     61.2     65.5     61.5     66.3     62.8     64.4     71.1     69.8     66.0     60.0
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

が、省略してもStanがデフォルトでうまくやってくれる。<br>
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

1.  収束が悪かったら**弱情報事前分布**を試す。<br>
    事後分布を更新していったとき**事前分布っぽさが残らない**のが良い。

    - 取りうる値を逃すような狭すぎる分布はダメ。
    - 狭すぎるよりはマシだが、広すぎても良くない。
    - 一様分布 $[a, b]$ は一見無情報っぽくて良さそうだが、<br>
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

🔰
[`7-stan.ipynb`](7-stan.ipynb)
を開いて実行していこう。

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

[GLM回](4-glm.html#/30)の練習を参照。

---
## 🔰 Stanでpenguinsの回帰分析をしてみよう

<a href="https://allisonhorst.github.io/palmerpenguins/">
<cite>https://allisonhorst.github.io/palmerpenguins/</cite><br>
<img src="/slides/image/rstats/lter_penguins.png" width="45%">
<img src="/slides/image/rstats/culmen_depth.png" width="45%">
</a>

`Stan does not support NA` と怒られるので欠損値を取り除いておく:

```python
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", True).data
penguins_dropna = penguins.dropna()
```







---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="8-hbm.html" class="readmore">
8. 階層ベイズモデル(HBM)
</a>
