+++
url = "makino2020r/4-statistics.html"
title = "Statistical analysis with R — Hands-on R Lecture for Makino Lab"
linktitle = "Statistical analysis with R"
date = 2020-06-03T23:59:59+09:00
type = "reveal"
draft = false
+++


# [Hands-on Introduction to R 2020](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki)
</div>

<div class="affiliation">
東北大学 生命科学研究科 進化ゲノミクス分野
</div>

<ol start="0">
<li><a href="0-why-r.html">Why do we use R?</a>
<li><a href="1-basic-r.html">R basics</a>
<li><a href="2-ggplot.html">Visualization with R</a>
<li><a href="3-tidy-data.html">Tidying and transforming data with R</a>
<li class="current-deck"><a href="4-statistics.html">Statistical analysis with R</a>
</ol>

<div class="footnote">
資料作成協力: 石川由希 (名古屋大学 理学研究科 脳回路構造学 講師)<br>
2020-06-03
</div>



---
## Today's topic

- <strike>Theoretical background of statistical analysis</strike>
- How to perform statistical analysis with R

<br><br>
Launch RStudio, and load `tidyverse`.

```r
library(tidyverse)
```

---
## Relationship between `cty` (燃費) & `displ` (排気量)?


```r
ggplot(mpg) + aes(displ, cty) + geom_point()
```

![plot of chunk plot-displ-cty](figure/plot-displ-cty-1.png)

---
## Basic form

```r
# Get the result as an object
formula = Y ~ X
model_object = model_function(formula, data = MYDATA)

# View its summary
summary(model_object)

# Get the estimated coefficients
coef(model_object)
```

where

- `DATA`: data.frame, e.g., `iris`, `diamonds`, **`mpg`**
- `Y`: response variable (a column in `DATA`), e.g., **`cty`**
- `X`: explanatory variable (a column in `DATA`), e.g., **`displ`**


---
## General Linear Model (一般線形モデル)

Estimates the coefficients (係数) and intercept (切片).<br>

$\text{cty} = - 2.63 \times \text{displ} + 25.99$


```r
fit = lm(cty ~ displ, data = mpg)
summary(fit)
```

```
## 
## Call:
## lm(formula = cty ~ displ, data = mpg)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -6.3109 -1.4695 -0.2566  1.1087 14.0064 
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)    
## (Intercept)  25.9915     0.4821   53.91   <2e-16 ***
## displ        -2.6305     0.1302  -20.20   <2e-16 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 2.567 on 232 degrees of freedom
## Multiple R-squared:  0.6376,	Adjusted R-squared:  0.6361 
## F-statistic: 408.2 on 1 and 232 DF,  p-value: < 2.2e-16
```

---
## General Linear Model (一般線形モデル)

Estimates the coefficients (係数) and intercept (切片).<br>

$\text{cty} = - 2.63 \times \text{displ} + 25.99$


```r
a = coef(fit)[[1]]
b = coef(fit)[[2]]
ggplot(mpg) + aes(displ, cty) + geom_point() +
  geom_abline(intercept = a, slope = b, color = "blue", size = 0.8)
```

![plot of chunk lm-abline](figure/lm-abline-1.png)

---
## General Linear Model (一般線形モデル)

Estimates the coefficients (係数) and intercept (切片).<br>

$\text{cty} = - 2.63 \times \text{displ} + 25.99$


```r
Y = predict(fit)
ggplot(mpg) + aes(displ, cty) + geom_point() +
  geom_line(aes(y = Y), color = "blue", size = 0.8)
```

![plot of chunk lm-predict](figure/lm-predict-1.png)

---
## General Linear Model (一般線形モデル)

Estimates the coefficients (係数) and intercept (切片).<br>

$\text{cty} = - 2.63 \times \text{displ} + 25.99$


```r
ggplot(mpg) + aes(displ, cty) + geom_point() +
  stat_smooth(method = lm, formula = y ~ x, se = FALSE)
```

![plot of chunk lm-smooth](figure/lm-smooth-1.png)

---
## General<u>ized</u> Linear Model (一般<u>化</u>線形モデル)

<div>\[\begin{aligned}
\text{link}(Y) &= c_0 + c_1 x_1 + c_2 x_2 + \ldots + \epsilon \\
\epsilon &\sim \text{error}(\ldots)
\end{aligned}\]</div>

- `formula`: linear predictor (線形予測子), e.g., `cty ~ displ`
- `family`: error structure (誤差構造), e.g., `gaussian`, `poisson`, `Gamma`
- `link`: link function (リンク関数), e.g., `"identity"`, `"log"`, `"inverse"`

LM is a special case of GLM:<br>
`glm(..., family = gaussian("identity"))`


---
## General<u>ized</u> Linear Model (一般<u>化</u>線形モデル)

$\log(\text{cty}) = -0.0155 \times \text{displ} + 3.344 + \epsilon$


```r
fit = glm(cty ~ displ, data = mpg, family = Gamma(link = "log"))
summary(fit)
```

```
## 
## Call:
## glm(formula = cty ~ displ, family = Gamma(link = "log"), data = mpg)
## 
## Deviance Residuals: 
##      Min        1Q    Median        3Q       Max  
## -0.40399  -0.08744  -0.01253   0.07447   0.55328  
## 
## Coefficients:
##              Estimate Std. Error t value Pr(>|t|)    
## (Intercept)  3.344162   0.027644  120.97   <2e-16 ***
## displ       -0.155497   0.007464  -20.83   <2e-16 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for Gamma family taken to be 0.02166931)
## 
##     Null deviance: 14.4350  on 233  degrees of freedom
## Residual deviance:  4.8065  on 232  degrees of freedom
## AIC: 1069.3
## 
## Number of Fisher Scoring iterations: 5
```

---
## General<u>ized</u> Linear Model (一般<u>化</u>線形モデル)

$\log(\text{cty}) = -0.0155 \times \text{displ} + 3.344 + \epsilon$


```r
ggplot(mpg) + aes(displ, cty) + geom_point() +
  geom_line(aes(y = exp(predict(fit))), color = "blue", size = 0.8)
```

![plot of chunk glm-gamma-log-plot](figure/glm-gamma-log-plot-1.png)

---
## General<u>ized</u> Linear Model (一般<u>化</u>線形モデル)

$(\text{cty})^{-1} = 0.010 \times \text{displ} + 0.027 + \epsilon$


```r
fit = glm(cty ~ displ, data = mpg, family = Gamma(link = "inverse"))
summary(fit)
```

```
## 
## Call:
## glm(formula = cty ~ displ, family = Gamma(link = "inverse"), 
##     data = mpg)
## 
## Deviance Residuals: 
##      Min        1Q    Median        3Q       Max  
## -0.38558  -0.08389  -0.01432   0.06985   0.51518  
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)    
## (Intercept) 0.026528   0.001471   18.04   <2e-16 ***
## displ       0.010207   0.000461   22.14   <2e-16 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for Gamma family taken to be 0.01922307)
## 
##     Null deviance: 14.4350  on 233  degrees of freedom
## Residual deviance:  4.3425  on 232  degrees of freedom
## AIC: 1045.5
## 
## Number of Fisher Scoring iterations: 4
```

---
## General<u>ized</u> Linear Model (一般<u>化</u>線形モデル)

$(\text{cty})^{-1} = 0.010 \times \text{displ} + 0.027 + \epsilon$


```r
ggplot(mpg) + aes(displ, cty) + geom_point() +
  geom_line(aes(y = 1 / predict(fit)), color = "blue", size = 0.8)
```

![plot of chunk glm-gamma-inverse-plot](figure/glm-gamma-inverse-plot-1.png)

---
## Non-linear Least-Square (非線形最小二乗法)

$\text{cty} = {28.7} / {\text{displ}} + 7.33$


```r
fit = nls(cty ~ k / displ + b, data = mpg, start = list(k = 1, b = 0))
summary(fit)
```

```
## 
## Formula: cty ~ k/displ + b
## 
## Parameters:
##   Estimate Std. Error t value Pr(>|t|)    
## k  28.7243     1.2000   23.94   <2e-16 ***
## b   7.3309     0.4253   17.24   <2e-16 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 2.29 on 232 degrees of freedom
## 
## Number of iterations to convergence: 1 
## Achieved convergence tolerance: 7.471e-09
```

---
## Non-linear Least-Square (非線形最小二乗法)

$\text{cty} = {28.7} / {\text{displ}} + 7.33$


```r
ggplot(mpg) + aes(displ, cty) + geom_point() +
  geom_line(aes(y = predict(fit)), color = "blue", size = 0.8)
```

![plot of chunk nls-plot](figure/nls-plot-1.png)

---
## Model comparison

There are many statistics, e.g., AIC, BIC, WAIC, etc.


```r
fit1 = lm(cty ~ displ, data = mpg) #family = gaussian("identity")
fit2 = glm(cty ~ displ, data = mpg, family = Gamma(link = "log"))
fit3 = glm(cty ~ displ, data = mpg, family = Gamma(link = "inverse"))
fit4 = nls(cty ~ k / displ + b, data = mpg, start = list(k = 1, b = 0))
AIC(fit1, fit2, fit3, fit4)
```

```
##      df      AIC
## fit1  3 1109.336
## fit2  3 1069.301
## fit3  3 1045.469
## fit4  3 1055.754
```

---
## Model comparison


```r
library(MASS)
full_model = glm(cty ~ displ + cyl + drv + class, data = mpg, family = Gamma(link = "inverse"))
stepAIC(full_model)
```

```
## Start:  AIC=943.41
## cty ~ displ + cyl + drv + class
## 
##         Df Deviance    AIC
## <none>       2.6029 943.41
## - displ  1   2.6322 943.90
## - drv    2   2.7778 954.27
## - cyl    1   2.9533 971.19
## - class  6   3.1371 976.80
## 
## Call:  glm(formula = cty ~ displ + cyl + drv + class, family = Gamma(link = "inverse"), 
##     data = mpg)
## 
## Coefficients:
##     (Intercept)            displ              cyl             drvf  
##        0.018435         0.002071         0.004419        -0.005448  
##            drvr     classcompact     classmidsize     classminivan  
##       -0.001596         0.010735         0.011227         0.017691  
##     classpickup  classsubcompact         classsuv  
##        0.019051         0.008377         0.016891  
## 
## Degrees of Freedom: 233 Total (i.e. Null);  223 Residual
## Null Deviance:	    14.43 
## Residual Deviance: 2.603 	AIC: 943.4
```

---
## `tidymodels` meta-package

For modeling and statistical analysis that share the underlying design philosophy, grammar, and data structures of the tidyverse.

```r
install.packages("tidymodels")
library(tidymodels)
```

- [`broom`](https://broom.tidyverse.org/)
- [`dplyr`](https://dplyr.tidyverse.org)
- [`ggplot2`](https://ggplot2.tidyverse.org)
- [`infer`](https://infer.netlify.com/)
- [`purrr`](https://purrr.tidyverse.org)
- [`recipes`](https://tidymodels.github.io/recipes/)
- [`rsample`](https://tidymodels.github.io/rsample/)
- [`tibble`](https://tibble.tidyverse.org)
- [`yardstick`](https://tidymodels.github.io/yardstick/)


---
## `broom` package

Transfroms the messy output of R stats functions to tidy data.frames.

[Available methods](https://broom.tidyverse.org/articles/available-methods.html)


---
## Extract results from `fit`


```r
fit = lm(Sepal.Width ~ Petal.Length + Petal.Width, data = iris)
summary(fit)
```

```
## 
## Call:
## lm(formula = Sepal.Width ~ Petal.Length + Petal.Width, data = iris)
## 
## Residuals:
##      Min       1Q   Median       3Q      Max 
## -1.06198 -0.23389  0.01982  0.20580  1.13488 
## 
## Coefficients:
##              Estimate Std. Error t value Pr(>|t|)    
## (Intercept)   3.58705    0.09373  38.272  < 2e-16 ***
## Petal.Length -0.25714    0.06691  -3.843  0.00018 ***
## Petal.Width   0.36404    0.15496   2.349  0.02014 *  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 0.3893 on 147 degrees of freedom
## Multiple R-squared:  0.2131,	Adjusted R-squared:  0.2024 
## F-statistic:  19.9 on 2 and 147 DF,  p-value: 2.238e-08
```

---
## Extract results from `fit`


```r
fit = lm(Sepal.Width ~ Petal.Length + Petal.Width, data = iris)
tidy(fit)
```

```
## # A tibble: 3 x 5
##   term         estimate std.error statistic  p.value
##   <chr>           <dbl>     <dbl>     <dbl>    <dbl>
## 1 (Intercept)     3.59     0.0937     38.3  2.51e-78
## 2 Petal.Length   -0.257    0.0669     -3.84 1.80e- 4
## 3 Petal.Width     0.364    0.155       2.35 2.01e- 2
```

---
## Tests 仮説検定

```r
chisq.test()
fisher.test()
kruskal.test()
ks.test()
t.test()
var.test()
wilcox.test()
# etc.
```

See [`stats` package](https://stat.ethz.ch/R-manual/R-patched/library/stats/html/00Index.html) for more details.


---
## Probability distributions 確率分布


```r
# 確率密度関数 (PDF)
dnorm(c(0, 1.96))
```

```
## [1] 0.39894228 0.05844094
```

```r
# 累積分布関数 (CDF)
pnorm(c(0, 1.96))
```

```
## [1] 0.5000000 0.9750021
```

```r
# 累積分布関数の逆関数
qnorm(c(0.5, 0.975))
```

```
## [1] 0.000000 1.959964
```

```r
# 乱数生成
rnorm(4)
```

```
## [1] -0.2561510  0.5834819  0.4735194 -1.8780212
```

---
## 計算機の限界に注意

`1 - pnorm(...)`や`log(pnorm(...))`のほうが直感的に分かりやすいので、
`lower.tail = FALSE`や`log.p = TRUE`は不要なようにも思われるが、
これらの引数で内部処理させたほうが浮動小数点型の限界付近での計算が正確。

```r
# complementary
1 - pnorm(10, 0, 1)                  # 0
pnorm(10, 0, 1, lower.tail = FALSE)  # 7.619853e-24

# log
log(pnorm(10, 0, 1))                 # 0
pnorm(10, 0, 1, log.p = TRUE)        # -7.619853e-24
```

---
## Discrete 離散

```r
_binom(size, prob)
_geom(prob)
_hyper(m, n, k)
_nbinom(size, prob, mu)
_pois(lambda)
_signrank(n)
_wilcox(m, n)
```

---
## Continuous 連続

```r
_beta(shape1, shape2)
_cauchy(location = 0, scale = 1)
_chisq(df)
_exp(rate = 1)
_f(df1, df2)
_gamma(shape, rate = 1, scale = 1 / rate)
_lnorm(meanlog = 0, sdlog = 1)
_logis(location = 0, scale = 1)
_norm(mean = 0, sd = 1)
_t(df)
_unif(min = 0, max = 1)
_weibull(shape, scale = 1)
```


---
## Reference

[`stats` package](https://stat.ethz.ch/R-manual/R-patched/library/stats/html/00Index.html)

[`tidymodels`](https://github.com/tidymodels/tidymodels)

[`broom`](https://broom.tidyverse.org/)

[`caret` package](http://caret.r-forge.r-project.org/)
for machine learning

[`stan` package](https://mc-stan.org/rstan/)
for Bayesian modeling and inference.

<a href="./" class="readmore">
目次に戻る
</a>


---
## 牧野研輪読会 補遺

["RとStanではじめる ベイズ統計モデリングによるデータ分析入門"](https://amzn.to/2TpZFJv)
第2部 第1--3章



---
## `ts`: time series (時系列型)

<span style="float: right;">2.1.13</span>

`vector` with labels and print format.


```r
timeser = ts(LETTERS, start = c(2020, 5), freq = 12)
timeser
```

```
##      Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
## 2020                   A   B   C   D   E   F   G   H
## 2021   I   J   K   L   M   N   O   P   Q   R   S   T
## 2022   U   V   W   X   Y   Z
```

```r
is(timeser)
```

```
## [1] "ts"        "structure" "oldClass"  "vector"
```

```r
is.character(timeser)
```

```
## [1] TRUE
```


---
## Random Number Generator (乱数生成器)

<span style="float: right;">2.1.15</span>

`r` + 分布の名前 + `(length, parameters, ...)`


```r
set.seed(24601)  # 乱数シードをセット
# 平均50、標準偏差10の正規分布から5個生成
rnorm(5L, mean = 50, sd = 10)
```

```
## [1] 47.43849 55.83482 54.73519 31.21979 47.25679
```

```r
# もう1回実行すると違う結果
rnorm(5L, mean = 50, sd = 10)
```

```
## [1] 43.63798 52.56991 47.42713 37.70879 17.77750
```

疑似乱数
: 内部状態に依存して**決定論的に**生成される数列。
: **乱数シード**は、内部状態を指定する「復活の呪文🏰」

---
## Random Number Generator (乱数生成器)

<span style="float: right;">2.1.15</span>

内部状態が同じなら、生成される乱数も同じ。


```r
set.seed(24601)  # 内部状態をリセット
rnorm(5L, 0, 1)  # 生成するときに内部状態が変化するけど
```

```
## [1] -0.2561510  0.5834819  0.4735194 -1.8780212 -0.2743209
```

```r
set.seed(24601)  # 内部状態をリセット
rnorm(5L, 0, 1)  # 同じ結果
```

```
## [1] -0.2561510  0.5834819  0.4735194 -1.8780212 -0.2743209
```

シミュレーションや解析に再現性を求める場合は設定必須。<br>
(どんなシードでも同じ結論になる、が理想ではあるけど)

「ほしい結果が出るような乱数シードを探す」
とかやっちゃ**ダメ絶対‼️**

---
## For-loop

<span style="float: right;">2.1.16</span>

Rではほぼ使わないけど、この教科書では使いたいらしい。


```r
for (i in seq(1, 3)) {
  print(i)
}
```

```
## [1] 1
## [1] 2
## [1] 3
```

---
## Histogram

<span style="float: right;">2.2.2</span>

連続値をいくつかのbinに区切って数えたもの


```r
ggplot(diamonds) + aes(x = price) +
  geom_histogram(bins = 40L)
```

![plot of chunk histogram](figure/histogram-1.png)

---
## Kernel Density Estimation (カーネル密度推定)

<span style="float: right;">2.2.3</span>

ヒストグラムを正規分布で滑らかにしたもの


```r
ggplot(diamonds) + aes(x = price) +
  geom_rug(size = 0.1, alpha = 0.05) +
  geom_density(size = 2) +
  geom_density(adjust = 1 / 4, color = "red") +
  geom_density(adjust = 4, color = "blue")
```

![plot of chunk kde](figure/kde-1.png)

---
## Summary Statistics (要約統計量)

<span style="float: right;">2.2.4, 5</span>


```r
# 平均値: 普通の算術平均。tailに引っ張られる。
mean(diamonds[["price"]])
```

```
## [1] 3932.8
```

```r
# 中央値: 順位で真ん中にある値。
median(diamonds[["price"]])
```

```
## [1] 2401
```

```r
# 四分位点: 上位・下位25%にある値。
quantile(diamonds[["price"]], probs = c(0.25, 0.75))
```

```
##     25%     75% 
##  950.00 5324.25
```

---
## Correlation (相関)

<span style="float: right;">2.2.6</span>


```r
# Covariance (共分散) > 0 なら、
# carat が大きくなるほど price も大きくなる
cov(diamonds[["carat"]], diamonds[["price"]])
```

```
## [1] 1742.765
```

↑この値だけ見てもその度合いは想像しにくいので、<br>
値が [-1, 1] になるように正規化したものが相関係数↓


```r
cor(diamonds[["carat"]], diamonds[["price"]])
```

```
## [1] 0.9215913
```

結構強い相関だな。

---
## Autocorrelation (自己相関)

<span style="float: right;">2.2.7</span>

時系列データにおいて、n時点前の値との相関を取ったもの。<br>
1次の自己相関 = 1時点前との相関


```r
ac = acf(Nile, lag.max = 10, plot = FALSE) %>% broom::tidy()
ggplot(ac) + aes(lag, acf) + geom_col() + scale_x_continuous(n.breaks = 10L)
```

![plot of chunk acf](figure/acf-1.png)
