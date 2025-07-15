+++
url = "tokiomarine2022/6-stan-hbm.html"
title = "6. Stanで階層ベイズモデル — 統計モデリング概論 DSHC 2022"
linktitle = "Stanで階層ベイズモデル"
date = 2022-08-24T15:30:00+09:00
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
<li><a href="4-bayesian.html">ベイズ推定とMCMC</a>
<li><a href="5-stan-glm.html">StanでGLM</a>
<li class="current-deck"><a href="6-stan-hbm.html">Stanで階層ベイズモデル</a>
</ol>

<div class="footnote">
2022-08-24 東京海上 Data Science Hill Climb
<a href="https://heavywatal.github.io/slides/tokiomarine2022/">https://heavywatal.github.io/slides/tokiomarine2022/</a>
</div>





---
## GLMMで登場した個体差を階層ベイズモデルで

<figure>
<a href="https://kuboweb.github.io/-kubo/ce/LinksGlm.html">
<img src="../tokiomarine2021/image/kubo-p2.png" width="100%">
<figcaption class="url">久保さん https://kuboweb.github.io/-kubo/ce/LinksGlm.html</figcaption>
</a>
</figure>


---
## GLMMで登場した個体差を階層ベイズモデルで

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #3366ff;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。個体差？

<img src="figure/overdispersion-1.png" alt="plot of chunk overdispersion">



---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$をそのままパラメータにすると**過剰適合**。<br>
「パラメータ数 ≥ サンプルサイズ」の“データ読み上げ”モデル。<br>
i.e., この個体は4個生き残って生存率0.5だね。次の個体は2個体だから......

<img src="figure/saturated-glmm-1.png" alt="plot of chunk saturated-glmm">

個体の生存能力をもっと少ないパラメータで表現できないか？


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$が能力値$z_i$のシグモイド関数で決まると仮定。<br>
その能力値は全個体共通の正規分布に従うと仮定:
$z_i \sim \mathcal{N}(\hat z, \sigma)$

<img src="figure/sigmoid-1.png" alt="plot of chunk sigmoid">

パラメータ2つで済む: 平均 $\hat z$, ばらつき $\sigma$ 。

前者は標本平均 $\hat p$ から求まるとして、後者どうする？

---
## 個体能力のばらつき $\sigma$ が大きいと両端が増える

普通の二項分布は個体差無し $\sigma = 0$ を仮定してるのと同じ。

<img src="figure/alter-sigma-1.png" alt="plot of chunk alter-sigma">

<img src="figure/alter-sigma-2.png" alt="plot of chunk alter-sigma">

---
## zの値で色分けしてみると想像しやすい

正規分布と二項分布の混ぜ合わせ......?

<img src="figure/alter-sigma-z-1.png" alt="plot of chunk alter-sigma-z">

<img src="figure/alter-sigma-z-2.png" alt="plot of chunk alter-sigma-z">

---
## 階層ベイズモデルのイメージ図

事前分布のパラメータに、さらに事前分布を設定するので階層ベイズ

<figure>
<img src="../tokiomarine2022/hbm.drawio.svg">
</figure>


---
## さっきの図をStan言語で記述すると

`10` とか `3` とか、エイヤっと決めてるやつが超パラメータ。


```{.stan .stan}
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


```
Running MCMC with 4 chains, at most 6 in parallel...

Chain 1 finished in 0.4 seconds.
Chain 2 finished in 0.4 seconds.
Chain 3 finished in 0.4 seconds.
Chain 4 finished in 0.4 seconds.

All 4 chains finished successfully.
Mean chain execution time: 0.4 seconds.
Total execution time: 0.5 seconds.
```


```
 variable    mean  median   sd  mad      q5     q95 rhat ess_bulk ess_tail
    lp__  -455.91 -455.40 9.20 9.28 -471.72 -442.03 1.00      901     1283
    z_hat    0.25    0.25 0.31 0.31   -0.26    0.76 1.00      669     1152
    sigma    2.78    2.75 0.33 0.33    2.28    3.36 1.00     1245     1425
    r[1]    -0.24   -0.24 0.78 0.77   -1.51    1.04 1.00     3474     2795
    r[2]     1.76    1.69 1.04 1.01    0.17    3.54 1.00     4261     2733
    r[3]     1.78    1.69 1.07 1.02    0.23    3.71 1.00     4065     2639
    r[4]    -3.77   -3.54 1.64 1.51   -6.65   -1.49 1.00     3422     2092
    r[5]    -2.21   -2.12 1.05 1.00   -4.10   -0.66 1.00     4879     2579
    r[6]    -2.18   -2.10 1.05 1.03   -4.01   -0.59 1.00     4225     2830
    r[7]     0.91    0.90 0.86 0.87   -0.42    2.38 1.00     3393     2735

 # showing 10 of 303 rows (change via 'max_rows' argument or 'cmdstanr_max_rows' option)
```

---
## 抜粋して作図。悪くない。

データ生成の真のパラメータ値は $\hat z = 0.5,~\sigma = 3.0$ だった。


```
Warning: The following arguments were unrecognized and ignored: bins
```

```
`stat_bin()` using `bins = 30`. Pick better value with `binwidth`.
```

![plot of chunk stan-glmm](figure/stan-glmm-1.png)


---
## 🔰 階層ベイズモデルの練習問題

[`6-stan-hbm.ipynb`](6-stan-hbm.ipynb)
をJupyterで開き、スライド説明に沿って実行していこう。

<!-- TODO: 時間が余った場合の練習問題 -->


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
  real<lower=0> a;
  real<lower=0> d;
  real<lower=0,upper=a> c;
  real<lower=0,upper=d> b;
  real shape;
  vector[Ninds] intercept;
}

model {
  vector[N] mu = a * exp(-b * x) - (a - c) * exp(-d * x) + intercept[id];
  y ~ gamma(shape, shape ./ mu);
  a ~ normal(0, 100);
  b ~ normal(0, 100);
  c ~ normal(0, 100);
  d ~ normal(0, 100);
  shape ~ normal(0, 100);
  intercept ~ normal(0, 0.005);
}
```



---
## 階層ベイズモデルのほかの応用先

- 時系列モデル (状態空間モデル)
- 空間構造のあるモデル (e.g., CARモデル)
- 欠損値の補完



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
