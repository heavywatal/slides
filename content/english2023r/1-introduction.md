+++
url = "english2023r/1-introduction.html"
linktitle = "Introduction: what is data analysis and R basics"
title = "1. Introduction: what is data analysis and R basics — Hands-on Introduction to R 2023"
date = 2023-11-27T16:00:00+09:00
draft = false
css = "style.css"
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
<li class="current-deck"><a href="1-introduction.html">Introduction: what is data analysis and R basics</a>
<li><a href="2-visualization.html">Data visualization and reporting</a>
<li><a href="3-structure1.html">Data transformation 1: extract, summarize</a>
<li><a href="4-structure2.html">Data transformation 2: join, pivot</a>
<li><a href="5-content.html">Data cleansing and conversion: numbers, text</a>
<li><a href="6-input.html">Data input and interpretation</a>
<li><a href="7-distribution.html">Statistical modeling 1: probability distribution, likelihood</a>
<li><a href="8-glm.html">Statistical modeling 2: linear regression</a>
</ol>

<div class="footnote">
2023-11-27 Tohoku University<br>
<a href="https://heavywatal.github.io/slides/english2023r/">https://heavywatal.github.io/slides/english2023r/</a>
</div>


---
## Menu: basics of data handling

- Recognize the importance of data analysis in biological research
  - What is "to understand"
- Learn R programming to be lazy in the long term
  - data visualization
  - data preparation
  - reporting
- Introduction to data analysis
  - Statistical modelling
  - Data interpretation and pitfalls


---
## Basic steps in biological research

1. Find problems and make hypotheses.
1. Collect data from experimentation🧫, observation🔬, literature📚.
1. **Analyze the data and test the hypotheses**
1. **Report results**. Go back to 1.

<br>

- Experimentation and observation are only the first half.
- The other half involves data preparation, analyses, reporting.<br>
  → but tend to be understated. We want to do it **properly and easily**.


---
## Is data analysis necessary? Why not just raw data?

Raw data are often too complex and have too much information to make sense.


```r
print(ggplot2::diamonds)
```

```
      carat       cut color clarity depth table price    x    y    z
    1  0.23     Ideal     E     SI2  61.5    55   326 3.95 3.98 2.43
    2  0.21   Premium     E     SI1  59.8    61   326 3.89 3.84 2.31
    3  0.23      Good     E     VS1  56.9    65   327 4.05 4.07 2.31
    4  0.29   Premium     I     VS2  62.4    58   334 4.20 4.23 2.63
   --                                                               
53937  0.72      Good     D     SI1  63.1    55  2757 5.69 5.75 3.61
53938  0.70 Very Good     D     SI1  62.8    60  2757 5.66 5.68 3.56
53939  0.86   Premium     H     SI2  61.0    58  2757 6.15 6.12 3.74
53940  0.75     Ideal     D     SI2  62.2    55  2757 5.83 5.87 3.64
```

A data set of diamonds (53,940 observations, 10 variables).


---
## Take a look at summary statistics

**average**, **standard deviation**, etc. of each column:


```
  stat carat depth table    price
1 mean  0.80 61.75 57.46  3932.80
2   sd  0.47  1.43  2.23  3989.44
3  max  5.01 79.00 95.00 18823.00
4  min  0.20 43.00 43.00   326.00
```

`carat` and `price` looks positively correlated:

```
      carat depth table price
carat  1.00                  
depth  0.03  1.00            
table  0.18 -0.30  1.00      
price  0.92 -0.01  0.13  1.00
```

<hr>

OK, summary stats may help better understanding than raw data do.

But be aware......

---
## Never trust summary statics alone

Interesting relationships may be overlooked without visualization.

<figure style="position: relative;">
<a href="https://www.autodesk.com/research/publications/same-stats-different-graphs">
<img src="/slides/image/rstats/datasaurus.png" width="86%">
<figcaption class="url">https://www.autodesk.com/research/publications/same-stats-different-graphs</figcaption>
</a>
<img src="/slides/image/rstats/DataDino-600x455.gif" width="20%"
     style="position: absolute; left: 0; top: 0; z-index: 255;">
</figure>


---
## Data visualization is the first step of understanding

Reduction and reorganization of information → **intuitive understanding**

![plot of chunk simplify-diamonds](./figure/simplify-diamonds-1.png)

The larger `carat`, the higher `price`.<br>
The slope seems to differ by `clarity`.

---
## Statistical analysis

is the process of summarizing data and making inferences based on it.

- **Descriptive statistics**: summarizes data themselves
    - summary stats (e.g., average, standard deviation, etc.)
    - making figures and tables
- **Inferential statistics**: considers processes behind data
    - mathematical models
    - probability distributions
    - parameters

**Modelling** is necessary if you want more than "intuitive understanding"

---
## Model

Simplified and idealized structures to represent a target system.

Mathematical Models<img src="../tokiomarine2021/image/hill-equation.png" width="210" align="right" style="margin: 0 -5px;">
: abstract structures written as mathematical representations.
: e.g., Lotka-Volterra eq., <span style="color: #888;">Hill eq.</span>
: <br>

Computational Models<img src="/slides/image/tumopp/Chex_Lconst.gif" width="210" align="right">
: sets of procedures to describe the behavior of a system
: e.g., Schelling’s Segregation Model, <span style="color: #888;"><em>tumopp</em></span>
: <br>

Concrete Models<img src="../tokiomarine2021/image/weisberg-sfbay.jpg" width="330" align="right">
: made of physical objects
: e.g., San Francisco Bay-Delta Model

<cite>
Weisberg 2012 "Simulation and Similarity" (科学とモデル)
</cite>

???
数理モデルが決定論的、数値計算が確率論的、になる場合が多いけど必ずしもそうではない。
解析的に解くことを諦めて計算機にやらせるという点で実装方法は異なるが、
数理的に記述して解釈するという大枠では同じとみなしたほうがいいかもしれない。

プラモデル: 車や飛行機の重さ・材質は無視して色や形を模倣

---
## Mathematical models in data science

Mathematical expression of assumptions to simulate data generation<br>
&nbsp;

<figure>
<img src="../english2023r/image/math-model.drawio.svg" width="1100"><br>
<figcaption><cite>「データ分析のための数理モデル入門」江崎貴裕 2020 より改変</cite></figcaption>
</figure>


???

確率モデル: 決定論的なモデルじゃなくて確率論的なゆらぎを導入したもの。
ただし、大塚淳さんの定義は異なる。
帰納推論を可能にする枠組みとして自然の斉一性(ヒューム)を仮定した上で、
データを生成している真の現象を確率用語で記述したものが確率モデルだ、という感じ。
そこからさらに強い仮定としてパラメトリックな確率分布を生成元としたのが統計モデル。

---
## Mathematical models in data science

Mathematical expression of assumptions to simulate data generation<br>
e.g., the larger the more expensive: $\text{price} = A \times \text{carat} + B + \epsilon$

![plot of chunk lm-diamonds](./figure/lm-diamonds-1.png)

We now described diamonds price with a very simple equation.<br>
→ Improving the model may lead to more accurate understanding.


---
## Wet-lab experimentation is also a kind of modelling

to clearly show "altering X causes phenotype Y".

- Reduce noises
  - **Uniform environment**: nutrients, temperature, etc.
  - **Uniform genetic background**: inbred lines
- Alter a few factors of interest
  - Overfeed or deplete a specific **nutrient**
  - Modify a few **genes**

Dry-lab theoreticians are tend to be called "modellers",<br>
but all the biological researchers are modellers in a broad sense.


---
## Standing on the shoulders of giants

<figure style="position: absolute; top: 2em; right: 1.5em;">
<a href="https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants">
<img src="/slides/image/free/Orion_aveugle_cherchant_le_soleil.jpg" width="320">
<figcaption class="url">
https://en.wikipedia.org/wiki/<br>Standing_on_the_shoulders_of_giants
</figcaption>
</a>
</figure>

A new discovery is always based on the previous studies.

Recording and reporting are very important
: every detail of experiments and observations
: multiple backups of raw data

Data analysis and visualization are essential, but...
: people tend to do it with unreproducible artisanship
: selecting from menu, adjusting colors and positions...

- What if your research is under suspicion?
- What if somebody want to inherit your research?

**Reproducible research** makes the giants bigger.

---
## An example of unreproducible research

A magnum opus thesis based on a massive data<br>
from observation of animals' behaviors and positions in a zoological park.

<figure>
<img src="/slides/image/messy/thesis.png" width="1200">
</figure>

---
## Raw data: not so bad, so far

The position and behavior of every individual were recorded.<br>

<figure style="position: relative; margin: 20px 0;">
<img src="/slides/image/messy/dir-0826.png" class="screenshot" height="750">
<img src="/slides/image/messy/file-0826-zebra.png" class="screenshot" height="660"
     style="position: absolute; left: 270px; top: 50px;">
</figure>

---
## Aggregating by copy-and-paste for each condition

Many files and many tabs —— are they all correct?

<figure style="position: relative;">
<img src="/slides/image/messy/dir-z.png" class="screenshot" height="800"
     style="position: absolute; z-index: 100;">
<img src="/slides/image/messy/file-z-book1.png" class="screenshot" height="720"
     style="position: absolute; left: 250px; top: 50px;">
</figure>

---
## Aggregating by copy-and-paste for each condition

Many files and many tabs —— are they all correct?

<figure style="position: relative;">
<img src="/slides/image/messy/dir-z.png" class="screenshot" height="800"
     style="position: absolute; z-index: 100;">
<img src="/slides/image/messy/file-z-book1.png" class="screenshot" height="720"
     style="position: absolute; left: 250px; top: 50px;">
<img src="/slides/image/messy/file-z-z-behavior-z1e.png" class="screenshot" height="720"
     style="position: absolute; left: 30px; top: 20px; z-index: 200;">
<img src="/slides/image/messy/file-z-z-behavior-z1p.png" class="screenshot" height="720"
     style="position: absolute; left: 260px; top: 40px; z-index: 300;">
</figure>

---
## Manually counting and painting in a grayscale

The files are the crystal of blood, sweat, and tears,<br>
but cannot be opened after free trial of the app.

<figure style="position: relative; margin: 1em 0;">
<img src="/slides/image/messy/file-z-z2-habitat.png" class="screenshot" width="105%">
<img src="/slides/image/messy/photoshop.jpg" width="780"
     style="position: absolute; left: 200px; top: -10px;">
</figure>
<img src="/slides/image/messy/zebra_AM.jpg" width="450">
<img src="/slides/image/messy/zebra_PM.jpg" width="450">

---
## It is like Sisyphus's endless task

<figure style="float: right; margin: 0.7rem 0 0;">
<a href="https://en.wikipedia.org/wiki/Sisyphus">
<img src="/slides/image/free/Punishment_sisyph.jpg" alt="Punishment sisyph.jpg" height="420">
<figcaption class="url">https://en.wikipedia.org/wiki/Sisyphus</figcaption>
</a>
</figure>

- **Repeating simple tasks** is painful.
- Human error is inevitable.
- Reducing mistakes involves painful works too.
- Improving manual skills does not alleviate the pain.
- Even yourself may forget it.
- Finding mistakes → **start over from the beginning**
- Additional data → **start over from the beginning**
- **Cannot be validated later**:
  "prize for effort" may be acceptable for undergraduate thesis,
  but not for scientific methods.

---
## Handling massive data files with programming

The dataset is larger than the previous example.<br>
But I made less effort to handle it.

<figure>
<img src="/slides/image/tek/finder.png" height="640">
<img src="/slides/image/tek/fig5.png" height="640">
<figcaption class="url">Iwasaki, Kijima, Innan (2019)</figcaption>
</figure>

---
## R can draw beautiful figures easily

<figure>
<img src="/slides/image/tumopp/paper/Fig1.png" height="400">
<img src="/slides/image/tumopp/param-p.png" height="400">
<img src="/slides/image/tumopp/param-k.png" height="400"><br>
<img src="/slides/image/tumopp/paper/Fig3.png" height="200">
<img src="/slides/image/tumopp/Cmoore_Lconst.gif" height="200">
<img src="/slides/image/tumopp/Cmoore_Llinear.gif" height="200">
<img src="/slides/image/tumopp/Chex_Lconst.gif" height="200">
<img src="/slides/image/tumopp/Chex_Llinear.gif" height="200">
<figcaption class="url">Iwasaki and Innan (2017)</figcaption>
</figure>

---
## Be lazy and let R do your job

- Machines are better at repetitive boring tasks
- **Programs can be reused** for different data.
- **Somebody else can reproduce and validate** your analyses.
- R can draw **beautiful figures easily**
- You can try many conditions by making partial modification.<br>
  → it helps not only **testing hypothesis** but also **generating hypotheses**
- Your skills continue improving. It gets easier and easier!

<figure>
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption class="url">https://r4ds.hadley.nz/intro</figcaption>
</a>
</figure>

---
## R is a programming language/environment

for statistical computing and graphics

<figure style="float: right;">
<a href="https://cran.r-project.org/">
<img src="/slides/image/rstats/Rlogo.svg" height="300">
<figcaption class="url">https://cran.r-project.org/</figcaption>
</a>
</figure>

Cross-platform
: Linux, Mac, Windows

Open source
: Free of charge.
: Improved by collective intelligence.

Community
: Easy to find many websites and people to consult.

There are some alternatives.<br>
[Python](https://www.python.org/) is comparable.
[Julia](https://julialang.org/) is rising.


---
## Purposes of this hands-on lectures

### ✅ <del>Every biological research involves data and models</del>

### ✅ <del>You want to do reproducible analysis</del>

### ⬜ Learn how to do it and how to learn more

- Overview what R can do
- Know where to consult when you have a problem.

### ⬜ Glance at the basics of data analysis

<hr>

You don't have to remember every command.<br>
Just repeat forgetting and searching.


---
## Second half of today's lesson: R basics

✅ <del>R is a programming language/environment for data analysis</del>

⬜ Setup R environment

⬜ Make conversation with R

⬜ Create a "project" and "scripts"

⬜ Data types and operations

⬜ R packages

⬜ Solve errors and questions


---
## Keyboard shortcuts

Action | <iconify-icon icon="mdi:apple"></iconify-icon> Mac | <iconify-icon icon="mdi:microsoft"></iconify-icon> Windows
------ | ------- | ----
Switch apps | <kbd>command</kbd><kbd>tab</kbd> | <kbd>alt</kbd><kbd>tab</kbd>
Quit apps | <kbd>command</kbd><kbd>q</kbd>     | <kbd>alt</kbd><kbd>F4</kbd>
Spotlight | <kbd>command</kbd><kbd>space</kbd>
Cut, Copy, Paste | <kbd>command</kbd><kbd>x</kbd>, -<kbd>c</kbd>, -<kbd>v</kbd> | <kbd>ctrl</kbd><kbd>x</kbd>, -<kbd>c</kbd>, -<kbd>v</kbd>
Select all | <kbd>command</kbd><kbd>a</kbd>    | <kbd>ctrl</kbd><kbd>a</kbd>
Undo | <kbd>command</kbd><kbd>z</kbd>    | <kbd>ctrl</kbd><kbd>z</kbd>
Find | <kbd>command</kbd><kbd>f</kbd>    | <kbd>ctrl</kbd><kbd>f</kbd>
Save | <kbd>command</kbd><kbd>s</kbd>    | <kbd>ctrl</kbd><kbd>s</kbd>

See https://support.apple.com/HT201236


---
## Setup R environment

[R](https://cran.rstudio.com/)
: Core software to interpret and execute commands.
: Standard packages and functions are included.

[RStudio Desktop](https://www.rstudio.com/)
: Integrated environment to help users interact with R.
: Not necessary, but many people like it.

<img src="/slides/image/rstudio/rstudio-300x260.png">


---
## Launch RStudio and play with Console

**Workspace (Environment)** = a collection of temporary objects on memory

<img src="/slides/image/rstudio/console.png" class="screenshot" width="90%">




---
## Configure RStudio to always start with a clean workspace

<iconify-icon icon="mdi:apple"></iconify-icon> RStudio → Preferences &nbsp; <kbd>command</kbd><kbd>,</kbd><br>
<iconify-icon icon="mdi:microsoft"></iconify-icon> Tools → Global options

Uncheck "Restore ...". Set "Save workspace ..." to **Never**.

<figure style="margin: 0;">
<a href="https://r4ds.hadley.nz/workflow-scripts.html#fig-blank-slate">
<img src="/slides/image/rstudio/preferences-workspace.png"
  style="object-fit: cover; object-position: top; width: 32em; height: 16em;">
<figcaption class="url">https://r4ds.hadley.nz/workflow-scripts.html#fig-blank-slate</figcaption>
</a>
</figure>


---
## Create a new "Project"

File → New Project... → New Directory → New Project →<br>
→ Directory name: `r-training-2023`<br>
→ as subdirectory of: `~/project` or `C:/Users/yourname/project`

<img src="/slides/image/rstudio/create-new-project.png" class="screenshot"
  width="90%" style="object-fit: cover; object-position: top; height: 16em;">

📁 directory = folder. `~/` = home directory.

---
## Write R script, and send it to Console

File → New File → R script

<img src="/slides/image/rstudio/newfile.png" width="100%">

---
## Write R script, and send it to Console

File → New File → R script

<img src="/slides/image/rstudio/script-console.png" width="100%">

---
## Write R script, and send it to Console

Select text with <kbd>shift</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>↑</kbd><kbd>→</kbd><br>
Execute them with <kbd>ctrl</kbd><kbd>return</kbd>

<img src="/slides/image/rstudio/101.png" width="100%">

---
## Save R script

- Steps
    - <kbd>command</kbd><kbd>s</kbd> or File → Save
    - Name: `hello.R`
    - Place: in the project (by default)
- **Save all the code you write!**
    - You can reuse them in other projects.
    - The code you can reuse is your skill already.

🔰 Try basic arithmetic operations and save them to `hello.R`.<br>
e.g., `1 + 2 + 3`, `3 * 7 * 2`, `4 / 2`, `4 / 3`, etc.

---
## Organize the project directory 📁

- There are only two files for now, but many more in the future.
- Gathering all the relevant files here makes programming easier.
- Separating with subdirectories helps you keep files organized.

```
r-training-2023/           # the root of the project
├── r-training-2023.Rproj  # double-click this to launch RStudio
├── hello.R
├── transform.R            # script for data preparation
├── visualize.R            # script for data visualization
├── data/                  # input
│   ├── iris.tsv
│   └── diamonds.xlsx
└── results/               # output
    ├── iris-petal.png
    └── iris-summary.tsv
```

The next topics are **working directory** and **relative path**.


---
## Working directory: starting point of relative paths

The project root is the working directory by default. **Never change it**.

✅ Good: `read_tsv("data/iris.tsv")`<br>
❌ Bad: `setwd("data"); read_tsv("iris.tsv")`

<img src="/slides/image/rstudio/getwd.png" style="width: 100%;">


---
## Attitude toward programming in R

<figure>
<img src="/slides/image/free/akusyu_uchuujin.png" height="200">
</figure>

Don't fear errors
: Even experts cause errors very often.
: An error is a message from R. Try to understand it.
: Experience point of programming ≈ exp. of error handling.

Search on the web
: Some R users in the world have already solved your problems.
: Queries can be 日本語, English, or whole error message.


---
## How to use this hands-on lecture

1.  Find commands in slides, and copy-n-paste them **to your R script**:
    ```r
    head(iris)
    ```
1.  **Execute it** in the Console.
1.  **Check the output**.<br>
    Read `error` and `warning` if any.
1.  Try practice exercises (marked with 🔰)

<hr>

Feel free to interrupt me any time.

---
## Create variables/objects


```r
x = 2        # Create x
x            # What's in x?
```

```
[1] 2
```

```r
y = 5        # Create y
y            # What's in y?
```

```
[1] 5
```

R accepts `<-` as an assignment operator, but I recommend `=`.<br>
Texts following `#` are ignored. Useful for comments.


```r
x + y
```

```
[1] 7
```

🔰 Try subtraction, multiplication, and division with `x` and `y`.


---
## Basic operations

Symbols like `+` and `*` are called **operators**.

```r
10 + 3    # addition
10 - 3    # subtraction
10 * 3    # multiplication
10 / 3    # division
10 %/% 3  # integer division
10 %% 3   # modulus 剰余
10 ** 3   # exponent 10^3
```

🔰 Check the results of the commands above.

---
## Functions

Receive some variables, do some job, and return something.


```r
x = seq(1, 3)  # receives 1 and 3, and returns a vector.
x
```

```
[1] 1 2 3
```

```r
sum(x)         # receives a vector, and returns a sum
```

```
[1] 6
```

```r
square = function(something) {  # define a new function
  something ** 2
}
square(x)                       # use it
```

```
[1] 1 4 9
```

🔰 Create your own function.
e.g., a function named `twice` to return doubled numbers.


---
## Create variable/objects, part 2


```r
x = 42       # Create x
x            # What's in x?
```

```
[1] 42
```

```r
y = "24601"  # Create y
y            # What's in y?
```

```
[1] "24601"
```

R cannot calculate the sum of them:


```r
x + y        # Error! Why?
```

```
Error in x + y: non-numeric argument to binary operator
```

---
## Data types


```r
class(x)
```

```
[1] "numeric"
```

```r
is.numeric(x)
```

```
[1] TRUE
```

```r
is.character(x)
```

```
[1] FALSE
```

```r
as.character(x)
```

```
[1] "42"
```

🔰 Apply the same functions to `y`.

---
## Data types

- atomic vector: one-dimensional array. very basic.
    - `logical`: (`TRUE` or `FALSE`)
    - `numeric`: (integer `42L` or real number `3.1416`)
    - `character`: (`"a string"`)
    - `factor`: (hybrid of character and integer)
- `array`: multi-dimensional array.
    - `matrix`: two-dimensional array.
- `list`: subspecies of vector that can be heterogenous.
- **`data.frame`: Rectangular table of the vectors. important** <br>
  There are alternatives called **`tibble`** and **`tbl_df`**.


---
## vector: one-dimensional array

R is good at **element-wise operation** on vectors.<br>
There is no scalar type; it is treated as a vector of length 1.


```r
x = c(1, 2, 9)  # length of 3
x + x           # the same length
```

```
[1]  2  4 18
```

```r
y = 10          # length of 1
x + y           # the shorter vector is recycled
```

```
[1] 11 12 19
```

```r
x < 5           # is it smaller than 5?
```

```
[1]  TRUE  TRUE FALSE
```

🔰 Try other operations on these `x` and `y`.


---
## Subsetting/subscripting vectors

Use `[]` to extract a subset. Indices starts from 1.


```r
letters
```

```
 [1] "a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z"
```

```r
letters[3]
```

```
[1] "c"
```

```r
letters[seq(4, 6)]       # 4 5 6
```

```
[1] "d" "e" "f"
```

```r
letters[seq(1, 26) < 4]  # TRUE TRUE TRUE FALSE FALSE ...
```

```
[1] "a" "b" "c"
```

---
## Two major groups of numeric functions

element-wise:

```r
x = c(1, 2, 9)
y = sqrt(x)     # square root
y
```

```
[1] 1.000000 1.414214 3.000000
```

aggregate (use all values to generate one output):

```r
z = sum(x)
z
```

```
[1] 12
```

🔰 Try `log()`, `exp()`, `length()`, `max()`, `mean()` and classify them.


---
## matrix: two-dimensional array

A rectangular made by folding a vector.<br>
Often used in machine learning and image processing.


```r
v = seq(1, 8)              # c(1, 2, 3, 4, 5, 6, 7, 8)
x = matrix(v, nrow = 2)    # 2行に畳む。列ごとに詰める
x
```

```
     [,1] [,2] [,3] [,4]
[1,]    1    3    5    7
[2,]    2    4    6    8
```

```r
y = matrix(v, nrow = 2, byrow = TRUE)  # 行ごとに詰める
y
```

```
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
```

🔰 Try `x + y`, `dim(x)`, `nrow(x)`, `ncol(x)`.


---
## How to remember the directions of row and column

<div class="column-container">
  <div class="column">
    <figure>
    <a href="https://commons.wikimedia.org/wiki/File:2012_Super_GT_Sugo_starting_grid.jpg">
    <img src="/slides/image/free/front-row.jpg" height="720">
    <figcaption class="url">https://commons.wikimedia.org/wiki/File:2012_Super_GT_Sugo_starting_grid.jpg</figcaption>
    </a>
    </figure>
  </div>
  <div class="column">
    <figure>
    <a href="https://en.wikipedia.org/wiki/Rhodes">
    <img src="/slides/image/free/apollon-columns.jpg" height="720">
    <figcaption class="url">https://en.wikipedia.org/wiki/Rhodes</figcaption>
    </a>
    </figure>
  </div>
</div>


---
## data.frame: rectangular table (important!)

A set of vertical vectors with the same length.<br>
e.g., 4 numeric and 1 factor vectors with the length of 150:


```r
print(iris)
```

```
    Sepal.Length Sepal.Width Petal.Length Petal.Width   Species
  1          5.1         3.5          1.4         0.2    setosa
  2          4.9         3.0          1.4         0.2    setosa
  3          4.7         3.2          1.3         0.2    setosa
  4          4.6         3.1          1.5         0.2    setosa
 --                                                            
147          6.3         2.5          5.0         1.9 virginica
148          6.5         3.0          5.2         2.0 virginica
149          6.2         3.4          5.4         2.3 virginica
150          5.9         3.0          5.1         1.8 virginica
```


---
## Various ways to view a data.frame

Overview:
```r
head(iris, 6)   # First N rows. tail() for last rows.
nrow(iris)      # Number of ROWs
ncol(iris)      # Number of COLumns
names(iris)     # of columns
summary(iris)   # mean, quantiles, etc.
View(iris)      # in RStudio/VSCode
```

```r
str(iris)       # structure
```

```
tibble [150 × 5] (S3: tbl_df/tbl/data.frame)
 $ Sepal.Length: num [1:150] 5.1 4.9 4.7 4.6 5 5.4 4.6 5 4.4 4.9 ...
 $ Sepal.Width : num [1:150] 3.5 3 3.2 3.1 3.6 3.9 3.4 3.4 2.9 3.1 ...
 $ Petal.Length: num [1:150] 1.4 1.4 1.3 1.5 1.4 1.7 1.4 1.5 1.4 1.5 ...
 $ Petal.Width : num [1:150] 0.2 0.2 0.2 0.2 0.2 0.4 0.3 0.2 0.2 0.1 ...
 $ Species     : Factor w/ 3 levels "setosa","versicolor",..: 1 1 1 1 1 1 1 1 1 1 ...
```

🔰 Try some other data.frames
e.g., `mtcars`, `quakes`, [`data()`](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/00Index.html)

---
## Various ways to view a data.frame

Subset:
```r
iris[2, ]                  # 2nd row
iris[2:5, ]                # 2nd to 5th rows
iris[, 3:4]                # 3rd to 4th columns
iris[2:5, 3:4]             # 2nd to 5th rows, 3rd to 4th columns
```

Extract a column **as vector**:
```r
iris[[3]]                  # 3rd column
iris$Petal.Length          # a column named Petal.Length
iris[["Petal.Length"]]     # a column named Petal.Length
iris[["Petal.Length"]][2]  # 2nd element of Petal.Length
```

Unrecommended. Hard to know if the result is data.frame or vector:
```r
iris[, 3]                  # data.frame with a single column?
iris[, "Petal.Length"]     # data.frame with a single column?
iris[2, "Petal.Length"]    # data.frame with a single cell?
```

---
## Create a new data.frame

Combine **column vectors** with the same length:

```r
x = c(1, 2, 3)
y = c("A", "B", "C")
mydata = data.frame(x, y)
print(mydata)
```

```
  x y
1 1 A
2 2 B
3 3 C
```

🔰 Create a data.frame named `theDF` as follows:
```
 i s
24 x
25 y
26 z
```
Hint: you can do it with and without `c()`.


---
## Reading and writing data.frame

R has built-in functions such as `read.csv()` and `write.csv()`,

```r
write.csv(iris, "iris.csv")
```

```
"","Sepal.Length","Sepal.Width","Petal.Length","Petal.Width","Species"
"1",5.1,3.5,1.4,0.2,"setosa"
"2",4.9,3,1.4,0.2,"setosa"
"3",4.7,3.2,1.3,0.2,"setosa"
```

<a href="https://readr.tidyverse.org/">
<img src="/_img/hex-stickers/readr.webp" width="180" align="right">
</a>

but they are difficult to use properly.<br>
Use `readr` package instead.

```r
readr::write_csv(iris, "iris.csv")
```

```
Sepal.Length,Sepal.Width,Petal.Length,Petal.Width,Species
5.1,3.5,1.4,0.2,setosa
4.9,3,1.4,0.2,setosa
4.7,3.2,1.3,0.2,setosa
```

---
## R package

A collection of useful functions and datasets.

Standard Packages
: Installed as a part of R.

Contributed Packages
: Written by many different authors.
  Available for download from
  [CRAN](https://cran.rstudio.com/web/packages/index.html)
  and other repositories.
: Commands for installing and loading:

```r
install.packages("readr")  # once per computer
library(readr)             # every time you start R
update.packages()          # once in a while
```

Wait. Using packages before understanding base R?
: No problem. No body is a master of base R.
: R without packages = Cooking without fire or knives

---
## tidyverse: a collection of R packages for data science

<a href="https://www.tidyverse.org/">
<img src="/slides/image/rstats/hex-badges8.png" width="33%" align="right">
</a>

```r
install.packages("tidyverse")
library(conflicted) # charm for safe coding
library(tidyverse)  # load core packages at once
```

```
── Attaching core tidyverse packages ──── tidyverse 2.0.0 ──
✔ dplyr     1.1.4     ✔ readr     2.1.4
✔ forcats   1.0.0     ✔ stringr   1.5.1
✔ ggplot2   3.4.4     ✔ tibble    3.2.1
✔ lubridate 1.9.3     ✔ tidyr     1.3.0
✔ purrr     1.0.2     
```

Consistently designed to cover all the processes in data analysis.

<figure style="margin-block: 0;">
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="800">
<figcaption class="url">https://r4ds.hadley.nz/intro</figcaption>
</a>
</figure>


---
## 疑問やエラーの解決方法

- Most errors derive from easy mistakes.
    - Read error messages: `No such file or directory`
    - Check your objects: `str(iris)`, `attributes(iris)`
    - [よくあるエラー集 (石川由希さん@名古屋大)](https://comicalcommet.github.io/r-training-2023/R_training_2023_7.html)
- Search web by copy-and-paste error messages<br>
  → [StackOverflow](https://stackoverflow.com/questions/tagged/r)
  and blogs often provide solutions
- Post questions with minimal reproducible examples
  [(reprex)](https://reprex.tidyverse.org/).<br>
  (It also helps you isolate the problems and find solutions by yourself.)
- Read the official documents of packages.
- Read helps in R(Studio): `?sum`, `help.start()`


---
## Second half of today's lesson: R basics

✅ R is a programming language/environment for data analysis.

✅ Create a **"project"** first to organize your files.

✅ Save commands to **scripts** before executing in the **console**.

✅ Data types: numeric, character, **data.frame**, etc.

✅ Useful R packages: tidyverse, etc.

✅ How to solve questions and errors.

<hr>

You don't have to remember every command.<br>
Just repeat forgetting and searching.

---
## Outline of data analysis

1. Setup computer environment
1. Get and read input data
1. Exploratory data analysis
    - **Preparation** (harder than it seems) 👈 lecture 3--5
    - **Visualization**, generating hypotheses (fun!) 👈 tomorrow
    - **Statistical analysis**, testing hypotheses
1. Report

<figure>
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption class="url">https://r4ds.hadley.nz/intro</figcaption>
</a>
</figure>


---
## Reference

R for Data Science --- Hadley Wickham et al.
: <https://r4ds.hadley.nz>
: [Paperback](https://amzn.to/4cpL6w8)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

- [データ分析のための数理モデル入門](https://amzn.to/3uCxTKo) 江崎貴裕 2020
- [統計学を哲学する](https://amzn.to/3ty80Kv) 大塚淳 2020
- [科学とモデル---シミュレーションの哲学 入門](https://amzn.to/2Q0f6JQ) Michael Weisberg 2017<br>
  (原著: [Simulation and Similarity](https://amzn.to/3bdvhuI) 2013)

Other versions
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2022/)」
   岩嵜航 2022 東京医科歯科大
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2023/)」
   石川由希 2023 名古屋大学

<a href="2-visualization.html" class="readmore">
2. Data visualization and reporting
</a>
