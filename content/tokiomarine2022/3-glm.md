+++
url = "tokiomarine2022/3-glm.html"
title = "3. 一般化線形モデル、混合モデル — 統計モデリング概論 DSHC 2022"
linktitle = "一般化線形モデル、混合モデル"
date = 2022-08-17T14:00:00+09:00
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
<li class="current-deck"><a href="3-glm.html">一般化線形モデル、混合モデル</a>
<li><a href="4-bayesian.html">ベイズ推定とMCMC</a>
<li><a href="5-stan-glm.html">StanでGLM</a>
<li><a href="6-stan-hbm.html">Stanで階層ベイズモデル</a>
</ol>

<div class="footnote">
2022-08-17 東京海上 Data Science Hill Climb
<a href="https://heavywatal.github.io/slides/tokiomarine2022/">https://heavywatal.github.io/slides/tokiomarine2022/</a>
</div>





---
## 前章で見た統計モデル

確率変数$X$はパラメータ$\theta$の確率分布$f$に“従う”:&nbsp;
$X \sim f(\theta) $

e.g., ある植物が作る種の数$X$は平均値$\lambda$のポアソン分布に従う:

<div>\[\begin{split}
X \sim \text{Poisson}(\lambda)
\end{split}\]</div>

![plot of chunk only-dist](figure/only-dist-1.png)

これを一般化線形モデル(GLM)として見ることもできる。

---
## 一般化線形モデル(GLM)として記述してみる

個体$i$の種子数$y_i$は平均値$\lambda_i$のポアソン分布に従う。<br>
平均値$\lambda_i$は**他のデータによらず$\beta_0$で一定**。

<div>\[\begin{split}
y_i &\sim \text{Poisson}(\lambda_i) \\
\lambda_i &= \beta_0
\end{split}\]</div>

![plot of chunk glm-without-x](figure/glm-without-x-1.png)

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

![plot of chunk glm-poisson](figure/glm-poisson-1.png)

  </div>
</div>

この場合は**単回帰**。説明変数が複数あると**重回帰**。


---
## 複数の説明変数を同時に扱う重回帰

<p>\[\begin{split}
y_i &\sim \text{Poisson}(\lambda_i) \\
\log(\lambda_i) &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \ldots
\end{split}\]</p>

気温も湿度も高いほどビールが売れる、とか

![plot of chunk multiple-regression](figure/multiple-regression-1.png)

今度は**確率分布**と**リンク関数**を変えてみよう。


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

![plot of chunk glm-logistic](figure/glm-logistic-1.png)

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

![plot of chunk wind](figure/wind-1.png)

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

![plot of chunk glm-weight](figure/glm-weight-1.png)

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
y_i &= \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i}
\end{split}\]</p>

  </div>
  <div class="column" style="flex-shrink: 1.3;">

![plot of chunk glm-anova](figure/glm-anova-1.png)

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
y_i &= \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \beta_3 x_{3i}
\end{split}\]</p>

  </div>
  <div class="column" style="flex-shrink: 1.3;">


![plot of chunk glm-ancova](figure/glm-ancova-1.png)

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
y_i &= \mathcal{N}(\mu_i,\sigma^2) \\
\mu_i &= \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \beta_{1,2} x_{1i} x_{2i}
\end{split}\]</p>

雨の日は $x_{1i} = 0$ のため $\beta_0,~\beta_2$ の項だけ。<br>
晴れの日はそれに加えて $\beta_1,~\beta_{1,2}$ の項も。

  </div>
  <div class="column" style="flex-shrink: 1.3;">

![plot of chunk interaction](figure/interaction-1.png)

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
## statsmodelsにおけるGLMのやりかた

[`smf.glm`](https://www.statsmodels.org/stable/generated/statsmodels.formula.api.glm.html)
の使い方はOLSとほぼ同じ


```python
import statsmodels.formula.api as smf
formula = "weight ~ height"
model = smf.glm(formula, data=r.df_weight)
result = model.fit()
print(model.family)
```

```
<statsmodels.genmod.families.family.Gaussian object at 0x12b9eeb50>
```

何も指定しない場合は正規分布・恒等リンク。<br>
`family=` オプションで
[確率分布](https://www.statsmodels.org/stable/glm.html#families)
と
[リンク関数](https://www.statsmodels.org/stable/glm.html#link-functions)
を明示的に指定:

```python
import statsmodels.api as sm
identity = sm.families.links.identity()
gaussian = sm.families.Gaussian(link=identity)
model = smf.glm(formula, data=r.df_weight, family=gaussian)
```


---
## 🔰 とにかくGLMを使ってみる練習

🔰
[`3-glm.ipynb`](./3-glm.ipynb)
をJupyterで開き、順々に実行してみよう。<br>
ここまでに登場した回帰分析のPythonコードが書いてあります。

とりあえず当てはめと作図だけ。<br>
結果の解釈やモデルの評価はこの後。

<hr>

☕️ 休憩 + 質疑応答


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

```py
result = model.fit()
result.llf  # log likelihood
```

---
## たしかに尤度はあてはまりの良さを表してそう

この場合は直線回帰よりもポアソン回帰が良さそう:

![plot of chunk compare-loglik](figure/compare-loglik-1.png)

この調子で、より尤度の高いモデルを探していけばいいだろうか？

---
## あてはまりが良ければいいってもんでもない

過剰適合 / 過学習 / overfitting
: パラメータを増やせば**現データへの**適合度・尤度を高くできるが、<br>
  予測・理解の役には立たなくなる。

![plot of chunk saturated-model](figure/saturated-model-1.png)

**帰無モデル**: 説明変数なし。切片のみ。<br>
**飽和モデル**: データ点の数 ≤ パラメータの数。“データ読み上げ”的モデル


---
## 無駄な説明変数を加えても尤度は上がる

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。<br>
観察時に着てた服の色 $x_2$ を追加すると尤度が上がる......?

![plot of chunk many-models](figure/many-models-1.png)



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


```py
result = model.fit()
result.aic
```

???
https://www.slideshare.net/logics-of-blue/1-6aic


---
## 無駄な説明変数の追加でAIC増加

ある植物が作る種の数 $y$ は個体のサイズ $x$ に応じて増える。<br>
観察時に着てた服の色 $x_2$ を追加したモデルはAICが増加。

![plot of chunk many-models-aic](figure/many-models-aic-1.png)

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
<img src="../tokiomarine2021/math-model.drawio.svg" width="600"><br>
<figcaption><small>「<a href="https://amzn.to/3uCxTKo"><cite>データ分析のための数理モデル入門</cite></a>」江崎貴裕 2020 より改変</small></figcaption>
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

<hr>

☕️ 休憩 + 質疑応答

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


```python
import statsmodels.api as sm
penguins = sm.datasets.get_rdataset("penguins", "palmerpenguins", True).data
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
       species     island  bill_length_mm  bill_depth_mm  flipper_length_mm  body_mass_g     sex  year
0       Adelie  Torgersen            39.1           18.7              181.0       3750.0    male  2007
1       Adelie  Torgersen            39.5           17.4              186.0       3800.0  female  2007
2       Adelie  Torgersen            40.3           18.0              195.0       3250.0  female  2007
3       Adelie  Torgersen             NaN            NaN                NaN          NaN     NaN  2007
4       Adelie  Torgersen            36.7           19.3              193.0       3450.0  female  2007
..         ...        ...             ...            ...                ...          ...     ...   ...
339  Chinstrap      Dream            55.8           19.8              207.0       4000.0    male  2009
340  Chinstrap      Dream            43.5           18.1              202.0       3400.0  female  2009
341  Chinstrap      Dream            49.6           18.2              193.0       3775.0    male  2009
342  Chinstrap      Dream            50.8           19.0              210.0       4100.0    male  2009
343  Chinstrap      Dream            50.2           18.7              198.0       3775.0  female  2009

[344 rows x 8 columns]
```

---
## 🔰 penguinsでGLMの練習

🔰
[`3-glm.ipynb`](./3-glm.ipynb)
に戻り、次の課題を解いてみよう。<br>
(次ページ以降に解答。まずは自力で。)

1. `body_mass_g` を横軸、 `flipper_length_mm` を縦軸に、まず作図。
1. 単回帰して、切片と傾きを求める。そして作図。
1. `species` で色分けして作図。
1. `species` も説明変数に加えて重回帰し、切片と傾きを求める。そして作図。
1. 余裕があれば、クチバシの長さと深さを縦横軸にして同様の解析。


---
## 単回帰の練習: 1. まず作図

どうやら、重いペンギンほど翼長も長い。

```python
import seaborn as sns
grid = sns.FacetGrid(penguins)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
```

![plot of chunk penguins-weight](figure/penguins-weight-1.png)


---
## 単回帰の練習: 2. モデル作成、フィッティング

とりあえずデフォルトの正規分布・恒等リンク。
$y = 136.7 + 0.0153 x$



```python
import statsmodels.formula.api as smf
formula = "flipper_length_mm ~ body_mass_g"
model1 = smf.glm(formula, data=penguins)
results1 = model1.fit()
print(results1.params)
```

```
Intercept      136.729559
body_mass_g      0.015276
dtype: float64
```

```python
print(results1.llf)
```

```
-1145.5175473095946
```

```python
print(results1.aic)
```

```
2295.0350946191893
```

---
## 単回帰の練習: 3. フィッティング結果を作図

結果とデータから予測値を作って回帰線を引く。

```python
pen_pred = penguins.assign(pred=results1.predict(penguins))
grid = sns.FacetGrid(pen_pred)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
```

![plot of chunk penguins-weight-glm](figure/penguins-weight-glm-1.png)

---
## 重回帰の練習: 1. まず作図

種によって色分けしてみると、傾向の違いが見える。

```python
palette = {"Adelie": "#ff6600", "Gentoo": "#c35bcc", "Chinstrap": "#007174"}
grid = sns.FacetGrid(penguins, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
```

![plot of chunk penguins-weight-sp](figure/penguins-weight-sp-1.png)


---
## 重回帰の練習: 2. モデル作成、フィッティング

Adelieを基準に、ChinstrapとGentooはそれより長め。<br>
体重の効果は単回帰のとき(0.0153)より小さい。



```python
formula = "flipper_length_mm ~ body_mass_g + species"
model2 = smf.glm(formula, data=penguins)
results2 = model2.fit()
print(results2.params)
```

```
Intercept               158.860261
species[T.Chinstrap]      5.597440
species[T.Gentoo]        15.677470
body_mass_g               0.008402
dtype: float64
```

```python
print(results2.llf)
```

```
-1059.7183131897373
```

```python
print(results2.aic)
```

```
2127.4366263794745
```

---
## 重回帰の練習: 3. フィッティング結果を作図

```python
pen_pred = penguins.assign(pred=results2.predict(penguins))
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
```

![plot of chunk penguins-weight-sp-glm](figure/penguins-weight-sp-glm-1.png)

**傾き**も種によって違うかも。**交互作用**を入れてみたい。


---
## 交互作用の練習: モデル作成、フィッティング

Adelieを基準に、Chinstrapの傾きが結構違う。<br>
切片の違いは解釈しにくくなった。



```python
formula = "flipper_length_mm ~ body_mass_g + species + body_mass_g:species"
model3 = smf.glm(formula, data=penguins)
results3 = model3.fit()
print(results3.params)
```

```
Intercept                           165.244813
species[T.Chinstrap]                -13.863939
species[T.Gentoo]                     6.059376
body_mass_g                           0.006677
body_mass_g:species[T.Chinstrap]      0.005228
body_mass_g:species[T.Gentoo]         0.002362
dtype: float64
```

```python
print(results3.llf)
```

```
-1055.7107640450004
```

```python
print(results3.aic)
```

```
2123.4215280900007
```

---
## 交互作用の練習: フィッティング結果を作図

```python
pen_pred = penguins.assign(pred=results3.predict(penguins))
grid = sns.FacetGrid(pen_pred, hue="species", palette=palette)
grid.map(sns.scatterplot, "body_mass_g", "flipper_length_mm")
grid.map(sns.lineplot, "body_mass_g", "pred")
```
![plot of chunk penguins-interaction](figure/penguins-interaction-1.png)

---
## ここまでの3つのモデルでどれがいいか？

AICで選ぶなら交互作用入り重回帰が良さそう。

```python
results1.aic
results2.aic
results3.aic
```

![plot of chunk penguins-aic](figure/penguins-aic-1.png)


---
## 余裕があったら追加の練習

🔰クチバシの長さと深さで同じ解析をやってみよう。

![plot of chunk penguins-bill](figure/penguins-bill-1.png)

🔰余裕があったら性別や年なども説明変数に入れてみよう。


---
## 🔰 手元のデータ、公共データなどでGLMしてみよう

正規分布・恒等リンクじゃないものだとなお良し。

Pythonパッケージから読み込めるものを探すのもあり。<br>
e.g., [`sm.datasets.get_rdataset(item, package)`](https://vincentarelbundock.github.io/Rdatasets/articles/data.html)

```python
import seaborn as sns
sns.get_dataset_names()
titanic = sns.load_dataset("titanic")

import statsmodels.api as sm
iris = sm.datasets.get_rdataset("iris").data
diamonds = sm.datasets.get_rdataset("diamonds", "ggplot2").data
```

<!-- TODO: 練習に適した課題データ -->


---
## n個のうちy個生存。二項分布に従......わない！

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #3366ff;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。個体差？

![plot of chunk overdispersion](figure/overdispersion-1.png)


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$をそのままパラメータにすると**過剰適合**。<br>
「パラメータ数 ≥ サンプルサイズ」の“データ読み上げ”モデル。<br>
i.e., この個体は4個生き残って生存率0.5だね。次の個体は2個体だから......

![plot of chunk saturated-glmm](figure/saturated-glmm-1.png)

個体の生存能力をもっと少ないパラメータで表現できないか？


---
## 個体差をモデルに組み込みたい

各個体の生存率$p_i$が能力値$z_i$のシグモイド関数で決まると仮定。<br>
その能力値は全個体共通の正規分布に従うと仮定:
$z_i \sim \mathcal{N}(\hat z, \sigma)$

![plot of chunk sigmoid](figure/sigmoid-1.png)

パラメータ2つで済む: 平均 $\hat z$, ばらつき $\sigma$ 。

前者は標本平均 $\hat p$ から求まるとして、後者どうする？

---
## 個体能力のばらつき $\sigma$ が大きいと両端が増える

普通の二項分布は個体差無し $\sigma = 0$ を仮定してるのと同じ。

![plot of chunk alter-sigma](figure/alter-sigma-1.png)![plot of chunk alter-sigma](figure/alter-sigma-2.png)

---
## zの値で色分けしてみると想像しやすい

正規分布と二項分布の混ぜ合わせ......?

![plot of chunk alter-sigma-z](figure/alter-sigma-z-1.png)![plot of chunk alter-sigma-z](figure/alter-sigma-z-2.png)

---
## 混合分布。ただの二項分布よりも良いあてはまり。

パラメータp(を決めるz)ごとに二項分布を作って、重み付けして足したもの。

![plot of chunk before-mixing](figure/before-mixing-1.png)

<div align="center">

![plot of chunk after-mixing](figure/after-mixing-1.png)

</div>

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

---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="4-bayesian.html" rel="next" class="readmore">
4. ベイズ推定、階層ベイズモデル
</a>
