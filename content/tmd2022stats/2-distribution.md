+++
url = "tmd2022stats/2-distribution.html"
linktitle = "確率分布、擬似乱数生成"
title = "2. 確率分布、擬似乱数生成 — 統計モデリング実習 2022 TMDU"
date = 2023-03-11T14:40:00+09:00
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
<li class="current-deck"><a href="2-distribution.html">確率分布、擬似乱数生成</a>
<li><a href="3-likelihood.html">尤度、最尤推定</a>
<li><a href="4-glm.html">一般化線形モデル (GLM)</a>
<li><a href="5-glmm.html">個体差、一般化線形混合モデル (GLMM)</a>
<li><a href="6-bayesian.html">ベイズの定理、事後分布、MCMC</a>
<li><a href="7-stan.html">StanでGLM</a>
<li><a href="8-hbm.html">階層ベイズモデル (HBM)</a>
</ol>

<div class="footnote">
2023-03-11 東京医科歯科大学<br>
<a href="https://heavywatal.github.io/slides/tmd2022stats/">https://heavywatal.github.io/slides/tmd2022stats/</a>
</div>


---
## 何でもかんでも直線あてはめではよろしくない


![plot of chunk lm-bad](./figure/lm-bad-1.png)

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？


---
## 何でもかんでも直線あてはめではよろしくない

![plot of chunk glm-better](./figure/glm-better-1.png)

- 観察データは常に**正の値**なのに予測が負に突入してない？
- **縦軸は整数**。しかもの**ばらつき**が横軸に応じて変化？
- **データに合わせた統計モデルを使うとマシ**


---
## ちょっとずつ線形モデルを発展させていく

**線形モデル LM** (単純な直線あてはめ)

<span style="color: #888888;">&nbsp; &nbsp; ↓ いろんな<span class="fragment highlight-blue custom bold">確率分布</span>を扱いたい</span>

**一般化線形モデル GLM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ 個体差などの変量効果を扱いたい</span>

**一般化線形混合モデル GLMM**

<span style="color: #888888;">&nbsp; &nbsp; ↓ もっと自由なモデリングを！</span>

**階層ベイズモデル HBM**

<cite>[データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012 より改変</cite>


---
## 確率分布

発生する事象(値)と頻度の関係。

手元のデータを数えて作るのが**経験分布**<br>
e.g., サイコロを12回投げた結果、学生1000人の身長

![plot of chunk distribution](./figure/distribution-1.png)

一方、少数のパラメータと数式で作るのが**理論分布**。<br>
(こちらを単に「確率分布」と呼ぶことが多い印象）

---
## 確率変数$X$はパラメータ$\theta$の確率分布$f$に従う...?

$X \sim f(\theta)$

e.g.,<br>
コインを3枚投げたうち表の出る枚数 $X$ は**二項分布に従う**。<br>
$X \sim \text{Binomial}(n = 3, p = 0.5)$

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">

![plot of chunk dbinom](./figure/dbinom-1.png)

  </div>
  <div class="column" style="padding-top: 10px;">
\[\begin{split}
\text{Prob}(X = k) &= \binom n k p^k (1 - p)^{n - k} \\
k &\in \{0, 1, 2, \ldots, n\}
\end{split}\]
  </div>
</div>

一緒に実験してみよう。

---
## 試行を繰り返して記録してみる

コインを3枚投げたうち表の出た枚数 $X$

試行1: **表** 裏 **表** → $X = 2$<br>
試行2: 裏 裏 裏 → $X = 0$<br>
試行3: **表** 裏 裏 → $X = 1$ 続けて $2, 1, 3, 0, 2, \ldots$

![plot of chunk rbinom](./figure/rbinom-1.png)

<div style="text-align: right;">
試行回数を増やすほど<b>二項分布</b>の形に近づく。<br>
0と3はレア。1と2が3倍ほど出やすいらしい。
</div>

---
## コイントスしなくても $X$ らしきものを生成できる

- コインを3枚投げたうち表の出る枚数 $X$
- $n = 3, p = 0.5$ の二項分布からサンプルする乱数 $X$

<div class="column-container">
  <div class="column" style="flex-shrink: 2.0;">
<img src="figure/dbinom-1.png" alt="plot of chunk dbinom">
  </div>
  <div class="column" style="padding-top: 10px;">
$X \sim \text{Binomial}(n = 3, p = 0.5)$

&nbsp;&nbsp; ↓ サンプル

{2, 0, 1, 2, 1, 3, 0, 2, ...}
  </div>
</div>

これらはとてもよく似ているので<br>
**「コインをn枚投げたうち表の出る枚数は二項分布に従う」**<br>
みたいな言い方をする。逆に言うと<br>
**「二項分布とはn回試行のうちの成功回数を確率変数とする分布」**<br>
のように理解できる。

---
## 統計モデリングの一環とも捉えられる

コイン3枚投げを繰り返して得たデータ {2, 0, 1, 2, 1, 3, 0, 2, ...}

&nbsp;&nbsp; ↓ たった2つのパラメータで記述。情報を圧縮。

$n = 3, p = 0.5$ の二項分布で説明・再現できるぞ

<figure>
<img src="../tokiomarine2021/math-model.drawio.svg" width="900"><br>
<figcaption><cite>「データ分析のための数理モデル入門」江崎貴裕 2020 より改変</cite></figcaption>
</figure>

こういうふうに現象と対応した確率分布、ほかにもある？

???
ただし「これが3連コイントスの真理だ」ではない。<br>
あくまで「こう単純化して理解できそう・使えそう」なだけ。

ほかの仮定: コインが立つかも。偏ったコインかも。両表かも。

二項分布はn枚コイントスをたった2パラメータで説明する優秀モデル


---
## 有名な確率分布、それに「従う」もの

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
: 確率変数の和、平均値

---
## 離散一様分布

同じ確率で起こるn通りの事象のうちXが起こる確率

e.g., コインの表裏、サイコロの出目1–6

![plot of chunk dunif](./figure/dunif-1.png)

🔰 一様分布になりそうな例を考えてみよう


---
## 幾何分布 $~\text{Geom}(p)$

成功率pの試行が初めて成功するまでの失敗回数

e.g., コイントスで表が出るまでに何回裏が出るか

![plot of chunk geometric](./figure/geometric-1.png)

\\[
\text{Prob}(X = k \mid p) = p (1 - p)^k
\\]

「初めて成功するまでの試行回数」とする定義もある。

🔰 幾何分布になりそうな例を考えてみよう

---
## 二項分布 $~\text{Binomial}(n,~p)$

確率$p$で当たるクジを$n$回引いてX回当たる確率。平均は$np$。

![plot of chunk dbinom-n](./figure/dbinom-n-1.png)

\\[
\text{Prob}(X = k \mid n,~p) = \binom n k p^k (1 - p)^{n - k}
\\]

🔰 二項分布になりそうな例を考えてみよう


---
## ポアソン分布 $~\text{Poisson}(\lambda)$

平均$\lambda$で単位時間(空間)あたりに発生する事象の回数。

e.g., 1時間あたりのメッセージ受信件数、メッシュ区画内の生物個体数

![plot of chunk dpoisson](./figure/dpoisson-1.png)

\\[
\text{Prob}(X = k \mid \lambda) = \frac {\lambda^k e^{-\lambda}} {k!}
\\]

二項分布の極限 $(\lambda = np;~n \to \infty;~p \to 0)$。<br>
めったに起きないことを何回も試行するような感じ。


---
## 指数分布 $~\text{Exp}(\lambda)$

ポアソン過程の事象の発生間隔。平均は $1 / \lambda$ 。

e.g., メッセージの受信間隔、道路沿いに落ちてる手袋の間隔

![plot of chunk dexp](./figure/dexp-1.png)

\\[
\text{Prob}(x \mid \lambda) = \lambda e^{-\lambda x}
\\]

幾何分布の連続値版。

🔰 ポアソン分布・指数分布になりそうな例を考えてみよう


---
## ガンマ分布 $~\text{Gamma}(k,~\lambda)$

ポアソン過程の事象k回発生までの待ち時間

e.g., メッセージを2つ受信するまでの待ち時間

![plot of chunk dgamma](./figure/dgamma-1.png)

\\[
\text{Prob}(x \mid k,~\lambda) = \frac {\lambda^k x^{k - 1} e^{-\lambda x}} {\Gamma(k)}
\\]

指数分布をkのぶん右に膨らませた感じ。<br>
shapeパラメータ $k = 1$ のとき指数分布と一致。


---
## 正規分布 $~\mathcal{N}(\mu,~\sigma)$

平均 $\mu$、標準偏差 $\sigma$ の美しい分布。よく登場する。<br>
e.g., $\mu = 50, ~\sigma = 10$ (濃い灰色にデータの95%, 99%が含まれる):

![plot of chunk gaussian](./figure/gaussian-1.png)

\\[
\text{Prob}(x \mid \mu,~\sigma) = \frac 1 {\sqrt{2 \pi \sigma^2}} \exp \left(\frac {-(x - \mu)^2} {2\sigma^2} \right)
\\]

---
## 正規分布に近づくものがいろいろある

標本平均の反復(**中心極限定理**);
e.g., 一様分布 [0, 100) から40サンプル

![plot of chunk central-limit](./figure/central-limit-1.png)

大きい$n$の二項分布

![plot of chunk binom-normal](./figure/binom-normal-1.png)

---
## 正規分布に近づくものがいろいろある

大きい$\lambda$のポアソン分布

![plot of chunk poisson-normal](./figure/poisson-normal-1.png)

平均値固定なら$k$が大きくなるほど左右対称に尖るガンマ分布

![plot of chunk gamma-normal](./figure/gamma-normal-1.png)


---
## 有名な確率分布対応関係ふりかえり

<figure style="float: right;">
<img src="../tokiomarine2021/math-model.drawio.svg" width="420"><br>
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
## 現実には、確率分布に「従わない」ことが多い

植物100個体から8個ずつ種子を取って植えたら全体で半分ちょい発芽。<br>
親1個体あたりの生存数は<span style="color: #56B4E9;">n=8の二項分布</span>になるはずだけど、<br>
極端な値(全部死亡、全部生存)が多かった。

<img src="figure/overdispersion-1.png" alt="plot of chunk overdispersion">

「それはなぜ？」と考えて要因を探るのも統計モデリングの仕事。<br>
**「普通はこれに従うはず」を理解してこそ**できる思考。


---
## 疑似乱数生成器 Pseudo Random Number Generator

コンピューター上でランダム**っぽい**数値を出力する装置。<br>
実際には**決定論的**に計算されているので、<br>
シード(出発点)と呼び出し回数が同じなら出る数も同じになる。

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

シードに適当な固定値を与えておくことで再現性を保てる。<br>
ただし「このシードじゃないと良い結果が出ない」はダメ。

さまざまな「分布に従う」乱数を生成することもできる。

---
## いろんな乱数を生成・可視化して感覚を掴もう


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

🔰 小さい `n` から徐々に大きくして変化を確認しよう。

🔰 ほかのオプションもいろいろ変えて変化を確認しよう。

🔰 1%の当たりを狙って10連ガチャを回す人が100万人いたら、<br>
   全部はずれ、1つ当たり、2つ当たり... の人はどれくらいいるか？



---
## いろいろ試した結果をとっておきたい

スクリプト.Rさえ保存しておけばいつでも実行できるけど... **面倒**

`ggsave()` で画像を書き出しておけるけど... **どのコードの結果か分からない**

→ **スクリプトと実行結果を一緒に見渡せる形式**が欲しい。


```r
3 * 14
ggplot(mpg) + aes(displ, hwy) + geom_point(aes(color = drv))
```

```
[1] 42
```

![plot of chunk hello](./figure/hello-1.png)


---
## Quarto Document として研究ノートを作る

<a href="https://quarto.org/">
<img src="/_img/hex-stickers/quarto.webp" width="160" align="right">
</a>

プログラミングからレポート作成まで一元管理できて楽ちん。

- 本文とRコードを含むテキストファイル.qmdを作る。
- HTML, PDFなどリッチな形式に変換して読む。
  - コードだけでなく実行結果の**図**や**表**も埋め込める。

<hr>

<a href="https://rmarkdown.rstudio.com/">
<img src="/_img/hex-stickers/rmarkdown.webp" width="160" align="right">
</a>

Quarto Markdown (`.qmd`)
: RやPythonのコードと図表を埋め込める**Markdown**亜種。
: Quarto登場前にほぼR専用だった `.Rmd` と使い勝手は同じ。

Markdown (`.md`)
: 最もよく普及している**軽量マークアップ言語**のひとつ。
: 微妙に異なる方言がある。qmdで使うのは Pandoc Markdown 。

🔰 どんなものが作れるのか
[作成例ギャラリー](https://quarto.org/docs/gallery/)
を見てみよう。

---
## マークアップ言語

文書の構造や視覚的修飾を記述するための言語。<br>
e.g., **HTML**+CSS, XML, LaTeX

```html
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
</div>

表現力豊かで強力だが人間が読み書きするには複雑すぎ、機械寄り。

🔰 好きなウェブサイトのソースコード(HTML)を見てみよう。


---
## 軽量マークアップ言語

**マークアップ言語**の中でも人間が読み書きしやすいもの。<br>
e.g., **Markdown**, reStructuredText, 各種Wiki記法など

```md
### 見出し3

ここは段落。
*強調(italic)*、
**強い強調(bold)**、
[リンク](https://www.lifesci.tohoku.ac.jp/)とか。
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>見出し3</h3>
<p>ここは段落。
<em>強調(italic)</em>、
<strong>強い強調(bold)</strong>、
<a href="https://www.lifesci.tohoku.ac.jp/">リンク</a>とか。
</p>
</div>


---
## Quartoする環境は既に整っているはず



- **R (≥ 4.2.3)**: 最新版 – 0.1 くらいまでが許容範囲
- **RStudio (≥ 2023.03.0+386)**: Quarto CLI を同梱
- **tidyverse (≥ 2.0.0)**: 次の2つを自動インストール
  - rmarkdown (≥ 2.21)
  - knitr (≥ 1.42)

(示してあるバージョンは最低要件ではなく私の現在の環境の)

<hr>

- [Quarto CLI](https://quarto.org/docs/get-started/):
  最新版を求めるなら手動で入れる。
- [`install.packages("quarto")`](https://github.com/quarto-dev/quarto-r):
  多くの人には不要。
  Quarto CLIをRコマンドで呼べるようにするだけ。
- [pandoc](https://pandoc.org/): Quarto CLI に同梱。
  手動で最新版を入れてもRStudio+Quartoがそれを使うかは不明。

---
## Markdown記法で書いてみよう

1. RStudio > New File > Markdown File
   <img src="/slides/image/rstudio/new-markdown.png" width="60%">
1. ["markdown 記法"とかで検索](https://duckduckgo.com/?q=markdown+syntax)しつつ何か書く。
   - 見出し1, 2, 3
   - 箇条書き (番号あり・なし)
   - インラインコード、コードブロック
1. <kbd>Preview</kbd>ボタンで確認

---
## Quarto Document を作ってみよう

RStudio > New File > Quarto Document...<br>
(DocumentとHTMLを選択し、)タイトルと著者を埋めて、OK。

<img src="/slides/image/rstudio/new-quarto-document.png" width="100%">

---
## 普通のmdには無いqmdの特徴

**ヘッダー**
: 最上部の `---` で挟まれた部分。
  文書全体に関わるメタデータを入力。
: オプションは出力形式によって異なる。
  e.g., [`html`](https://quarto.org/docs/output-formats/html-basics.html)

**R code chunk**
: `` ```{r} `` のように始まるブロック。
: コードの実行結果を最終産物に埋め込める。
: [オプションがいろいろある](https://quarto.org/docs/computations/execution-options.html)。e.g.,
  - `echo: false`: コードを非表示。結果は表示。
  - `eval: false`: コードを実行せず表示だけ。
  - `include: false`: コードも結果も表示せず、実行だけする。
  - `fig.width: 7, fig.height: 7`: 図の大きさを制御。

まあ細かいことは必要になってから調べるとして...

---
## qmdをHTMLに変換してみよう

<div>
<img src="/slides/image/rstudio/quarto-viewer.png" width="100%">
</div>

---
## qmdをHTMLに変換してみよう

1. ソースコードに名前をつけて保存 <kbd>command</kbd><kbd>s</kbd><br>
   e.g., `report.qmd`
1. ⚙️ ボタンから "Preview in Viewer Pane" を選択。
1. <kbd>→Render</kbd> を押す。
   - 埋め込まれたRコードが実行される。
   - 実行結果を含むMarkdownが作られる。
   - MarkdownからHTMLに変換される。 e.g., `report.html`
   - プレビューが自動的に開く。

🔰 編集 → Render を繰り返して変化を確認しよう


---
## 🔰 疑似乱数生成をいろいろ試した研究ノートを作ろう

さっきはこんな汚いスクリプトだった:


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

1. ひとつの分布につきひとつの図を描くqmdに書き換える。
1. コードチャンクを分けたり見出しを付けたりして整理する。
1. パラメータをいろいろ変えた結果も加えていく。


---
## 本講義のお品書き

<figure style="float: right;">
<a href="https://kuboweb.github.io/-kubo/ce/IwanamiBook.html">
<img src="../tokiomarine2021/image/kubo-book.jpg" width="400" alt="データ解析のための統計モデリング入門 久保拓弥 2012">
</a>
</figure>

久保先生の"緑本"こと<br>
「データ解析のための統計モデリング入門」<br>
をベースに回帰分析の概要を紹介。

1. イントロ
1. Rの基礎を駆け足で
1. 統計モデルの基本
    - 直線回帰
    - 確率変数・**確率分布** 👈 ここまで
    - 尤度・最尤推定
1. 一般化線形モデル、混合モデル
1. ベイズ統計、階層ベイズモデル

回帰のキモは**線ではなく分布**


---
## 参考文献

- [データ解析のための統計モデリング入門](https://amzn.to/33suMIZ) 久保拓弥 2012
- [StanとRでベイズ統計モデリング](https://amzn.to/3uwx7Pb) 松浦健太郎 2016
- [RとStanではじめる ベイズ統計モデリングによるデータ分析入門](https://amzn.to/3o1eCzP) 馬場真哉 2019
- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [分析者のためのデータ解釈学入門](https://amzn.to/3uznzCK) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020

<a href="3-likelihood.html" class="readmore">
3. 尤度、最尤推定
</a>
