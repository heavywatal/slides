+++
url = "english2023r/7-distribution.html"
linktitle = "Statistical modeling 1: probability distribution, likelihood"
title = "7. Statistical modeling 1: probability distribution, likelihood — Hands-on Introduction to R 2023"
date = 2023-12-05T16:00:00+09:00
draft = false
dpi = 108
+++

# [Hands-on Introduction to R 2023](.)

<div class="author">
岩嵜 航 (Watal M. Iwasaki, PhD)
</div>

<div class="affiliation">
Graduate School of Life Sciences, Tohoku University
</div>

<ol>
<li><a href="1-introduction.html">Introduction: what is data analysis and R basics</a>
<li><a href="2-visualization.html">Data visualization and reporting</a>
<li><a href="3-structure1.html">Data transformation 1: extract, summarize</a>
<li><a href="4-structure2.html">Data transformation 2: join, pivot</a>
<li><a href="5-content.html">Data cleansing and conversion: numbers, text</a>
<li><a href="6-input.html">Data input and interpretation</a>
<li class="current-deck"><a href="7-distribution.html">Statistical modeling 1: probability distribution, likelihood</a>
<li><a href="8-glm.html">Statistical modeling 2: linear regression</a>
</ol>

<div class="footnote">
2023-12-05 Tohoku University<br>
<a href="https://heavywatal.github.io/slides/english2023r/">https://heavywatal.github.io/slides/english2023r/</a>
</div>


---
## Purposes of this hands-on lectures

### ✅ <del>Every biological research involves data and models</del>

### ✅ <del>You want to do reproducible analysis</del>

### ✅ <del>Learn how to do it and how to learn more</del>

### ⬜ Glance at the basics of data analysis

<hr>

You don't have to remember every command.<br>
Just repeat forgetting and searching.

---
## What do you want to do with data?

- to **understand** phenomena
- to **predict** future
- to **classify** objects
- to **control** behavior
- to **generate** something new

Is analysis necessary for that?<br>
Why not just raw data?

---
## Look back day 1

<iframe width="600" height="450" src="./1-introduction.html#/4"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/5"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/6"></iframe>
<iframe width="600" height="450" src="./1-introduction.html#/7"></iframe>

---
## Mathematical models in data science

Mathematical expression of assumptions to simulate data generation<br>
e.g., the larger the more expensive: $\text{price} = A \times \text{carat} + B + \epsilon$

![plot of chunk lm-diamonds](./figure/lm-diamonds-1.png)

Regression
: express y as a function of x.


---
## Extending linear regression

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="280" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

**Linear Model (LM)** 👈 #7 today

<span style="color: #888888;">&nbsp; &nbsp; ↓ probability distribution</span>

**Generalized Linear Model (GLM)** [--- #8 next time](8-glm.html)

<span style="color: #888888;">&nbsp; &nbsp; ↓ individual difference, random effect</span>

**Generalized Linear Mixed Model (GLMM)**

<span style="color: #888888;">&nbsp; &nbsp; ↓ flexible modelling</span>

**Hierarchical Bayesian Model (HBM)**

<small>「<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ)</cite>」久保拓弥 2012 より改変</small>


---
## Two parts to a regression model

1. Define a **family of models**: express generic pattern
    - straight line: $y = a_1 + a_2 x$
    - log curve: $\log(y) = a_1 + a_2 x$
    - quadratic curve: $y = a_1 + a_2 x^2$

2. Generate a **fitted model**: adjust parameters to get closer to the data
    - $y = 3x + 7$
    - $y = 9x^2$

<small><https://r4ds.had.co.nz/model-basics.html></small>

---
## Can see a strong pattern: the taller the heavier

The relationship looks linear, $y = a x + b$.<br>
&nbsp;


![plot of chunk weight-height](./figure/weight-height-1.png)


---
## Can see a strong pattern: the taller the heavier

The relationship looks linear, $y = a x + b$.<br>
OK, let's try random slope *a* and intersect *b*:

![plot of chunk weight-lines](./figure/weight-lines-1.png)

Need to find a good slope and intersect.

---
## Ordinary Least Square (OLS)

minimizes the <strong style="color: #E69F00">residual</strong> sum of squares (RSS)
from <span style="color: #3366ff">the regression line</span>.

![plot of chunk weight-residual](./figure/weight-residual-1.png)



---
## Searching for models to minimize RSS

Try random values, and pick the best ones.<br>
May need to generate much more to find good one.

![plot of chunk weight-goodlines](./figure/weight-goodlines-1.png)

---
## Searching for models to minimize RSS

**Grid search**: generate an evenly spaced grid of points.<br>
Slightly more efficient than random search?

![plot of chunk weight-grid](./figure/weight-grid-1.png)

There are many other **optimization** techniques although not covered here.


---
## R can find the optimum in an instant


``` r
par_init = c(intercept = 0, slope = 0)
result = optim(par_init, fn = rss_weight, data = df_weight)
result$par
```

```
intercept     slope 
-69.68394  78.53490 
```

![plot of chunk weight-lm](./figure/weight-lm-1.png)

The code above is for general optimization.<br>
For simple linear regression, an easier way is as follows...

---
## `lm()` function to fit linear models


``` r
fit = lm(data = mpg, formula = hwy ~ displ)
broom::tidy(fit)
```

```
         term  estimate std.error statistic       p.value
1 (Intercept) 35.697651 0.7203676  49.55477 2.123519e-125
2       displ -3.530589 0.1945137 -18.15085  2.038974e-46
```

``` r
mpg_added = modelr::add_predictions(mpg, fit, type = "response")
ggplot(mpg_added) + aes(displ, hwy) + geom_point() +
  geom_line(aes(y = pred), linewidth = 1, color = "#3366ff")
```

![plot of chunk lm-mpg](./figure/lm-mpg-1.png)

🔰 Try `lm()` with `diamonds` and `iris`.


---
## Straight LM does not fit all


![plot of chunk lm-bad](./figure/lm-bad-1.png)

- Prediction goes below zero whereas all the observations are **positive**.
- Y values are **integer**. Their **dispersion** is larger when X is larger.


---
## Straight LM does not fit all

![plot of chunk glm-better](./figure/glm-better-1.png)

- Prediction goes below zero whereas all the observations are **positive**.
- Y values are **integer**. Their **dispersion** is larger when X is larger.
- Let's learn statistical modelling for better fitting to the data.

---
## Extending linear regression

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="280" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

**Linear Model (LM)** 👈 #7 today

<span style="color: #888888;">&nbsp; &nbsp; ↓ <span class="fragment highlight-blue custom bold">probability distribution</span></span>

**Generalized Linear Model (GLM)** [--- #8 next time](8-glm.html)

<span style="color: #888888;">&nbsp; &nbsp; ↓ individual difference, random effect</span>

**Generalized Linear Mixed Model (GLMM)**

<span style="color: #888888;">&nbsp; &nbsp; ↓ flexible modelling</span>

**Hierarchical Bayesian Model (HBM)**

<small>「<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ)</cite>」久保拓弥 2012 より改変</small>


---
## Probability distribution

The relationship between phenomena and their frequencies.

empirical distribution
: created by collecting samples.<br>
: e.g., rolling a dice 12 times, heights of 1000 students:

![plot of chunk distribution](./figure/distribution-1.png)

theoretical distribution
: described with math equation and a few parameters.


---
## Random variable $X$ follows probability distribution $f$

$X \sim f(\theta)$

e.g.,<br>
The number of heads in tossing 3 fair coins $X$ **follows binomial distribution**.<br>
$X \sim \text{Binomial}(n = 3, p = 0.5)$

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">

![plot of chunk dbinom](./figure/dbinom-1.png)

  </div>
  <div class="column" style="padding-top: 10px;">
\[\begin{split}
\Pr(X = k) &= \binom n k p^k (1 - p)^{n - k} \\
k &\in \{0, 1, 2, \ldots, n\}
\end{split}\]
  </div>
</div>

Let's experiment.


---
## Record repeated trials

The number of heads observed in tossing 3 fair coins: $X$

trial 1: **H** T **H** → $X = 2$<br>
trial 2: T T T → $X = 0$<br>
trial 3: **H** T T → $X = 1$, subsequently, $2, 1, 3, 0, 2, \ldots$

![plot of chunk rbinom](./figure/rbinom-1.png)

<div style="text-align: right;">
It approaches asymptotically to <b>binomial distribution</b>.<br>
0 and 3 are rare. 1 and 2 are three times more likely.
</div>

---
## Similar values can be generated without tossing coins

- The number of heads $X$ observed in tossing 3 fair coins.
- Random samples $X$ from the binomial distribution with $n = 3, p = 0.5$.

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">
<img src="figure/dbinom-1.png" alt="plot of chunk dbinom">
  </div>
  <div class="column" style="padding-top: 10px;">
$X \sim \text{Binomial}(n = 3, p = 0.5)$

&nbsp;&nbsp; ↓ sample

{2, 0, 1, 2, 1, 3, 0, 2, ...}
  </div>
</div>

These are so similar that we can say<br>
"The number of heads in *n* tosses follows binomial distribution."

Conversely, we can understand it like<br>
"Random variable of binomial distribution is the number of successes in *n* trials."

---
## A kind of statistical modelling

Tossing 3 fair coins repeatedly {2, 0, 1, 2, 1, 3, 0, 2, ...}

&nbsp;&nbsp; ↑ simulate phenomena with a few parameters

Sample from binomial distribution with $n = 3, p = 0.5$

<figure>
<img src="../english2023r/image/math-model.drawio.svg" width="900"><br>
<figcaption><small>「<a href="https://amzn.to/3uCxTKo"><cite>データ分析のための数理モデル入門</cite></a>」江崎貴裕 2020 より改変</small></figcaption>
</figure>

Any other probability distributions related to real phenomena like this?

???
ただし「これが3連コイントスの真理だ」ではない。<br>
あくまで「こう単純化して理解できそう・使えそう」なだけ。

ほかの仮定: コインが立つかも。偏ったコインかも。両表かも。

二項分布はn枚コイントスをたった2パラメータで説明する優秀モデル


---
## Major probability distributions and related phenomena

Discrete uniform distribution
: tossing fair coins, rolling fair dice

Negative binomial distribution<br>(Geometric distribution if n = 1)
: failures before the n-th success in trials with p

Binomial distribution
: successes in n trials with p

Poisson distribution
: occurrences of a Poisson process with $\lambda$

Gamma distribution (Exponential distribution if k = 1)
: waiting time until k-th occurrence of a Poisson process with $\lambda$

Normal/Gaussian distribution
: sum of random variables, sample means, etc.


---
## Discrete uniform distribution

Every X in n values has equal probability $1/n$.

e.g., fair coin [0,1], fair dice [1,6]

![plot of chunk dunif](./figure/dunif-1.png)

🔰 Other examples of discrete uniform distribution?


---
## Geometric distribution $~\text{Geom}(p)$

$X$ failures before the first success with success probability $p$ for each trial.

e.g., How many tails before first head with a coin?

![plot of chunk geometric](./figure/geometric-1.png)

\\[
\Pr(X = k \mid p) = p (1 - p)^k
\\]

There is another definition: $X$ trials until the first success.

🔰 Other examples?


---
## Negative binomial distribution $~\text{NB}(n, p)$

$X$ failures before the n-th success with success probability $p$ for each trial.<br>
(identical to geometric distribution when n = 1)

![plot of chunk nbinom](./figure/nbinom-1.png)

\\[
\Pr(X = k \mid n,~p) = \binom {n + k - 1} k p^n (1 - p)^k
\\]

There is another definition: $X$ trials until the n-th success.

🔰 Other examples?

<!--
平均$\lambda$がガンマ分布でばらついたポアソン分布、とも解釈できる。<br>
($k \to \infty$でポアソン分布と一致)
-->


---
## Binomial distribution $~\text{Binomial}(n,~p)$

$X$ successes in $n$ trials with success probability $p$ for each trial.

![plot of chunk dbinom-n](./figure/dbinom-n-1.png)

\\[
\Pr(X = k \mid n,~p) = \binom n k p^k (1 - p)^{n - k}
\\]

🔰 Other examples?


---
## Poisson distribution $~\text{Poisson}(\lambda)$

$X$ occurrences of a **Poisson process** in a fixed interval of time (space).<br>
**Poisson process**: Events occur at a constant rate $\lambda$

e.g., messages received per hour, number of individuals in a quadrat

![plot of chunk dpoisson](./figure/dpoisson-1.png)

\\[
\Pr(X = k \mid \lambda) = \frac {\lambda^k e^{-\lambda}} {k!}
\\]

The limit of binomial distribution $(\lambda = np;~n \to \infty;~p \to 0)$<br>
≈ many trials of extremely rare events.


---
## Exponential distribution $~\text{Exp}(\lambda)$

Interval $X$ between occurrences of a **Poisson process**.<br>
**Poisson process**: Events occur at a constant rate $\lambda$

e.g., intervals between messages received, between gloves left on a road

![plot of chunk dexp](./figure/dexp-1.png)

\\[
\Pr(x \mid \lambda) = \lambda e^{-\lambda x}
\\]

The continuous counterpart of geometric distribution.

🔰 Other examples?


---
## Gamma distribution $~\text{Gamma}(k,~\lambda)$

Waiting time $X$ until $k$-th occurrence of a **Poisson process**.
**Poisson process**: Events occur at a constant rate $\lambda$

e.g., Waiting time until receiving two messages

![plot of chunk dgamma](./figure/dgamma-1.png)

\\[
\Pr(x \mid k,~\lambda) = \frac {\lambda^k x^{k - 1} e^{-\lambda x}} {\Gamma(k)}
\\]

Identical when shape parameter $k = 1$.


---
## Normal/Gaussian distribution $~\mathcal{N}(\mu,~\sigma)$

Beautiful distribution with two parameters: mean $\mu$, standard deviation $\sigma$.<br>
e.g., $\mu = 50, ~\sigma = 10$:

![plot of chunk gaussian](./figure/gaussian-1.png)

\\[
\Pr(x \mid \mu,~\sigma) = \frac 1 {\sqrt{2 \pi \sigma^2}} \exp \left(\frac {-(x - \mu)^2} {2\sigma^2} \right)
\\]

---
## Many distributions approach normal distribution

Distribution of sample means (**central limit theorem**);
e.g., average of 40 samples from uniform distribution [0, 100):

![plot of chunk central-limit](./figure/central-limit-1.png)

Binomial distribution with large $n$:

![plot of chunk binom-normal](./figure/binom-normal-1.png)

---
## Many distributions approach normal distribution

Poisson distribution with large $\lambda$:

![plot of chunk poisson-normal](./figure/poisson-normal-1.png)

Gamma distribution with large $k$:

![plot of chunk gamma-normal](./figure/gamma-normal-1.png)


---
## Major probability distributions and related phenomena

<figure style="float: right;">
<img src="../english2023r/image/math-model.drawio.svg" width="420"><br>
</figure>

Discrete uniform distribution
: tossing fair coins, rolling fair dice

Negative binomial distribution<br>(Geometric distribution if n = 1)
: failures before the n-th success in trials with p

Binomial distribution
: successes in n trials with p

Poisson distribution
: occurrences of a Poisson process with $\lambda$

Gamma distribution (Exponential distribution if k = 1)
: waiting time until k-th occurrence of a Poisson process with $\lambda$

Normal/Gaussian distribution
: sum of random variables, sample means, etc.


---
## Real data rarely follow theoretical distributions

Collect and sow 8 seeds from each of 100 plant individuals.<br>
The number of survived seeds per parent should follow $\text{Binomial}(n = 8, p)$.<br>
But extreme cases (all survived, all dead) were frequently observed.


![plot of chunk overdispersion](./figure/overdispersion-1.png)

"Why? What other factors affect?" is the question of statistical modelling.<br>
It requires the understanding of the **null distribution**.


---
## Pseudo Random Number Generator

Algorithm to generate a sequence of random**-ish** numbers.<br>
Its computation is not stochastic, but **deterministic**.<br>
Exactly same values are generated if the same **seed** is set.

```r
set.seed(42)
runif(3L)
# 0.9148060 0.9370754 0.2861395
runif(3L)
# 0.8304476 0.6417455 0.5190959
set.seed(42)
runif(6L)
# 0.9148060 0.9370754 0.2861395 0.8304476 0.6417455 0.5190959
```

Reproducible results can be obtained by fixing a seed.<br>
Do NOT search for the seeds that produce favorable results.

Possible to generate various random numbers that follows probability distributions.

---
## Generate random numbers from various distributions

```r
n = 100
x = sample.int(6, n, replace = TRUE)
x = runif(n, min = 0, max = 1)
x = rgeom(n, prob = 0.5)
x = rbinom(n, size = 3, prob = 0.5)
x = rpois(n, lambda = 10)
x = rnorm(n, mean = 50, sd = 10)
print(x)

p1 = ggplot(data.frame(x)) + aes(x)
p1 + geom_histogram() # for continuous values
p1 + geom_bar()       # for discrete values
```

🔰 Observe the effects of altering sample size `n`.

🔰 Observe the effects of altering parameters for each distribution.

(Use Quarto effectively)



---
## Fitting probability distributions to data

The number of seeds were counted for each of 50 plant individuals.<br>
Individual A has 2 seeds, B has 4 seeds, ...


![plot of chunk poisson-seed](./figure/poisson-seed-1.png)

This count data looks <span class="fragment custom blur">Poisson</span>-distributed.<br>
What is the optimal $\lambda$ value?



---
## Fitting probability distributions to data

The number of seeds were counted for each of 50 plant individuals.<br>
Individual A has 2 seeds, B has 4 seeds, ...

![plot of chunk poisson-seed-lambda](./figure/poisson-seed-lambda-1.png)

This count data looks Poisson-distributed.<br>
What is the optimal $\lambda$ value?

Observations in black.
<span style="color: #56B4E9;">Poisson distribution in blue</span>.
$\lambda = 3$ looks good.


---
## Likelihood: a measure for goodness-of-fit

The probability to observe the data $D$ given the model $M$.<br>
$\Pr(D \mid M)$

**Likelihood function** is the same probability from different viewpoints:

- as a function of model $M$ given the data $D$,<br>
  $L(M \mid D)$<br>
- as a function of parameters $\theta$,<br>
  $L(\theta \mid D)$ or $L(\theta)$


---
## Example of likelihood calculation

Data $D$: 4 heads (H) and 1 tail (T) in tossing a coin 5 times

Assuming the probability of coming up head $p = 0.5$:
<div>\[\begin{split}
L(0.5 \mid D)
  &= \binom 5 1 \times \Pr(H \mid 0.5) ^ 4 \times \Pr(T \mid 0.5) ^ 1 \\
  &= 5 \times 0.5 ^ 4 \times 0.5 ^ 1 = 0.15625
\end{split}\]</div>

Assuming the probability of coming up head $p = 0.8$:
<div>\[\begin{split}
L(0.8 \mid D)
  &= \binom 5 1 \times \Pr(H \mid 0.8) ^ 4 \times \Pr(T \mid 0.8) ^ 1 \\
  &= 5 \times 0.8 ^ 4 \times 0.2 ^ 1 = 0.4096
\end{split}\]</div>

$L(0.8 \mid D) > L(0.5 \mid D)$

$p = 0.8$ is more likely.



---
## Likelihood in the example of Poisson distribution

The number of seeds were counted for each of 50 plant individuals.

<div>\[\begin{split}
L(\lambda \mid D)
  = \prod _i ^n \Pr(X_i \mid \lambda)
  = \prod _i ^n \frac {\lambda ^ {X_i} e ^ {-\lambda}} {X_i !}
\end{split}\]</div>

![plot of chunk poisson-seed-likelihood](./figure/poisson-seed-likelihood-1.png)

OK, $\lambda = 3$ is better than the other two. What is the best.

---
## <u>M</u>aximum <u>L</u>ikelihood <u>E</u>stimation

**Log likelihood** is often easier to handle.<br>
Solving the differential equation for $\lambda$ ...... finds **the sample mean**

<div>\[\begin{split}
\log L(\lambda \mid D)
  &= \sum _i ^n \left[ X_i \log (\lambda) - \lambda - \log (X_i !) \right] \\
\frac {\mathrm d \log L(\lambda \mid D)} {\mathrm d \lambda}
  &= \frac 1 \lambda \sum _i ^n X_i - n = 0 \\
\hat \lambda &= \frac 1 n \sum _i ^n X_i
\end{split}\]</div>


![plot of chunk poisson-mle](./figure/poisson-mle-1.png)

---
## MLE does not give you “true λ”

The data was actually generated from “$X \sim \text{Poisson}(\lambda = 3.0)$”.

By replicating "sample 50 individuals → MLE" 1,000 times,<br>
we find great variability in estimation and empirical distributions:

![plot of chunk poisson-mle-repl](./figure/poisson-mle-repl-1.png)

Note: Fitting to each sample looks not bad!


---
## Alleviated by increasing sample size

1,000 replications of MLE with $n$ individuals from $X \sim \text{Poisson}(\lambda = 3.0)$:

![plot of chunk poisson-mle-nsam](./figure/poisson-mle-nsam-1.png)

Q. How much is enough?<br>
A. Depends on what you estimate, acceptable error range, etc.


---
## Mathematical models in data science

> All models are wrong, but some are useful. --- George E. P. Box

<figure>
<img src="../english2023r/image/math-model.drawio.svg" width="900"><br>
<figcaption><small>「<a href="https://amzn.to/3uCxTKo"><cite>データ分析のための数理モデル入門</cite></a>」江崎貴裕 2020 より改変</small></figcaption>
</figure>


---
## Toolbox of statistical modelling

- **Random variable** $X$
- **Probability distribution** $X \sim f(\theta)$
    - **parameters** $\theta$
- **Likelihood**
    - The probability to observe the data given the model: $\Pr(D \mid M)$
    - as a function of model given the data<br>
      → **likelihood function** $L(M \mid D),~L(\theta \mid D)$
    - **Maximum Likelihood Estimation** to fit parameters $\hat \theta$


---
## 🔰 Challenge: likelihood and MLE by hand

Rolling a dice 10 times, 3 sixes were observed.

1. Calculate likelihood assuming the probability to come up 6 $p = 1/6$.

1. Calculate likelihood assuming the probability to come up 6 $p = 0.2$.

1. **Draw a graph** with $p$ as horizontal axis, log likelihood as vertical axis.

1. Estimate $p$ with MLE.<br>
   Excellent, if solved with math; Good, if solved with R; OK, by eye or intuition.

Hint
: $\binom 5 2 = {}_5 \mathrm{C} _2 = 10$ can be achieved with `choose(5, 2)` in R.




---
## Reference

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
- [科学とモデル---シミュレーションの哲学 入門](https://amzn.to/2Q0f6JQ) Michael Weisberg 2017<br>
  (原著: [Simulation and Similarity](https://amzn.to/3bdvhuI) 2013)

<a href="8-glm.html" class="readmore">
8. Statistical modeling 2: linear regression
</a>
