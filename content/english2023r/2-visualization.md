+++
url = "english2023r/2-visualization.html"
linktitle = "Data visualization and reporting"
title = "2. Data visualization and reporting — Hands-on Introduction to R 2023"
date = 2023-11-28T16:00:00+09:00
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
<li class="current-deck"><a href="2-visualization.html">Data visualization and reporting</a>
<li><a href="3-structure1.html">Data transformation 1: extract, summarize</a>
<li><a href="4-structure2.html">Data transformation 2: join, pivot</a>
<li><a href="5-content.html">Data cleansing and conversion: numbers, text</a>
<li><a href="6-input.html">Data input and interpretation</a>
<li><a href="7-distribution.html">Statistical modeling 1: probability distribution, likelihood</a>
<li><a href="8-glm.html">Statistical modeling 2: linear regression</a>
</ol>

<div class="footnote">
2023-11-28 Tohoku University<br>
<a href="https://heavywatal.github.io/slides/english2023r/">https://heavywatal.github.io/slides/english2023r/</a>
</div>


---
## Outline of data analysis

1. Setup computer environment
1. Get and read input data
1. Exploratory data analysis
    - **Preparation** (harder than it seems) 👈 lecture #3--5
    - **Visualization**, generating hypotheses (fun!) 👈 today
    - **Statistical analysis**, testing hypotheses
1. Report

<figure>
<a href="https://r4ds.hadley.nz/intro">
<img src="/slides/image/r4ds/data-science.png" width="720">
<figcaption class="url">https://r4ds.hadley.nz/intro</figcaption>
</a>
</figure>

---
## Visualization helps overviewing data structure

Reduction and reorganization of information → **intuitive understanding**

<img src="figure/simplify-diamonds-1.png" alt="plot of chunk simplify-diamonds">

The larger `carat`, the higher `price`.<br>
The slope seems to differ by `clarity`.

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
## Visualization requires an innate sense of beauty?

<figure style="float: right; width: 670px; margin: 1rem 0;">
<a href="https://tsutawarudesign.com/">
<img src="/slides/image/tsutawaru/title-13.svg" style="margin: 0 -20px 0 0;">
<img src="/slides/image/tsutawaru/hajimeni-03.svg" style="margin: 0 -20px 0 0;">
<figcaption class="url">https://tsutawarudesign.com/</figcaption>
</a>
</figure>

NO!

To some extent,<br>
it is about knowledge and skills.

You can improve it<br>
once you know the basic design rules.


---
## Today's lesson: data visualization and reporting with R

### ✅ <del>Outline of data analysis: visualization is important</del>

### ⬜ Draw graphs in a consistent manner with ggplot2

### ⬜ Embed R code and results into a report with Quarto


---
## `iris`: an example dataset

4 numeric and 1 factor vectors with the length of 150:


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
## Base R graphics

**inconsistent** and **difficult to customize** details.


```r
boxplot(Petal.Width ~ Species, data = iris)
plot(iris$Sepal.Length, iris$Sepal.Width)
hist(iris$Petal.Length)
```

![plot of chunk base-plot-iris](./figure/base-plot-iris-1.png)![plot of chunk base-plot-iris](./figure/base-plot-iris-2.png)![plot of chunk base-plot-iris](./figure/base-plot-iris-3.png)

Any useful package to draw beautiful graphs easily?


---
## ggplot2: a tidyverse member in charge of graphics

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

- can draw many types of graphs in a **rational** and **consistent** manner.
- based on "The <strong><u>G</u></strong>rammar of <strong><u>G</u></strong>raphics" (Wilkinson 2005).

<br>

![plot of chunk ggplot-iris](./figure/ggplot-iris-1.png)![plot of chunk ggplot-iris](./figure/ggplot-iris-2.png)![plot of chunk ggplot-iris](./figure/ggplot-iris-3.png)


---
## ggplot2: a tidyverse member in charge of graphics

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

- can draw many types of graphs in a **rational** and **consistent** manner.
- based on "The <strong><u>G</u></strong>rammar of <strong><u>G</u></strong>raphics" (Wilkinson 2005).

<figure>
<!--
<img src="/slides/image/nagoya/iris.png" width="24%">
<img src="/slides/image/nagoya/binhex.png" width="24%">
<img src="/slides/image/nagoya/faithful.png" width="24%">
-->
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
## Learn ggplot2 without knowing base R graphics

No problem. Underlying systems are fundamentally different:

<figure>
<img src="/slides/image/rstats/r-graphics.svg" height="600">
<figcaption><cite>「Rグラフィックス」Murrell著 久保訳 より改変</cite></figcaption>
</figure>

---
## Basic usage: join layers with `+` operator

<img src="/slides/image/rstats/ggplot-layers.png" height="930">

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds)             # prepare canvas with diamonds data
# aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
# geom_point() +                    # draw scatter plot
# facet_wrap(vars(clarity)) +       # split panels according to clarity
# stat_smooth(method = lm) +        # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus1](./figure/ggplot-plus1-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price)         # map (carat, price) to (x, y) axes
# geom_point() +                    # draw scatter plot
# facet_wrap(vars(clarity)) +       # split panels according to clarity
# stat_smooth(method = lm) +        # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus2](./figure/ggplot-plus2-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point()                      # draw scatter plot
# facet_wrap(vars(clarity)) +       # split panels according to clarity
# stat_smooth(method = lm) +        # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus3](./figure/ggplot-plus3-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point() +                    # draw scatter plot
  facet_wrap(vars(clarity))         # split panels according to clarity
# stat_smooth(method = lm) +        # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus4](./figure/ggplot-plus4-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point() +                    # draw scatter plot
  facet_wrap(vars(clarity)) +       # split panels according to clarity
  stat_smooth(method = lm)          # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus5](./figure/ggplot-plus5-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point() +                    # draw scatter plot
  facet_wrap(vars(clarity)) +       # split panels according to clarity
  stat_smooth(method = lm) +        # add linear regression
  coord_cartesian(ylim = c(0, 2e4))   # adjust y-axis range
# theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus6](./figure/ggplot-plus6-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point() +                    # draw scatter plot
  facet_wrap(vars(clarity)) +       # split panels according to clarity
  stat_smooth(method = lm) +        # add linear regression
  coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
  theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus7](./figure/ggplot-plus7-1.png)

---
## Basic usage: join layers with `+` operator


```r
ggplot(data = diamonds) +           # prepare canvas with diamonds data
  aes(x = carat, y = price) +       # map (carat, price) to (x, y) axes
  geom_point() +                    # draw scatter plot
# facet_wrap(vars(clarity)) +       # split panels according to clarity
# stat_smooth(method = lm) +        # add linear regression
# coord_cartesian(ylim = c(0, 2e4)) + # adjust y-axis range
  theme_classic(base_size = 20)     # adjust non-data components
```

![plot of chunk ggplot-plus8](./figure/ggplot-plus8-1.png)


---
## Intermediate states can be saved as objects


```r
p1 = ggplot(data = diamonds)
p2 = p1 + aes(x = carat, y = price)
p3 = p2 + geom_point()
p4 = p3 + facet_wrap(vars(clarity))
print(p3)
```

![plot of chunk ggplot-object](./figure/ggplot-object-1.png)

We are going to use this `p3` later.

---
## Let's try ggplot

using `mpg`, a dataset of fuel economy:


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 Scatter-plot the relationship of `displ` and `cty`<br>
(engine **displacement** in litres and **city** miles per gallon)

![plot of chunk ggplot-mpg](./figure/ggplot-mpg-1.png)

---
## Common errors

No function is named `ggplot2`:
```
> ggplot2(diamonds)
Error in ggplot2(diamonds) : could not find function "ggplot2"
```

`ggplot2` is a package, which has a function named `ggplot`.<br>
OK, but still R cannot find the function:
```
> ggplot(diamonds)
Error in ggplot(diamonds) : could not find function "ggplot"
```

Don't forget to load the package every time you launch R/RStudio:
```r
library(conflicted) # charm for safe coding
library(tidyverse)  # load packages including ggplot2
ggplot(diamonds)    # OK!
```


---
## `ggplot()` requires "tidy data"

- Each column is a variable.
- Each row is an observation.
- Each cell is a single value.


```r
print(diamonds)
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

<cite>
<a class="url" href="https://r4ds.hadley.nz/data-tidy.html">https://r4ds.hadley.nz/data-tidy.html</a>
</cite>


---
## Map variables to aesthetics

by specifying column names in `aes()`:


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(mapping = aes(color = clarity, size = cut))
```

![plot of chunk aes-map](./figure/aes-map-1.png)

---
## Set constant/independent aesthetics

by specifying values out of `aes()`:


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(color = "darkorange", size = 6, alpha = 0.4)
```

![plot of chunk aes-nomap](./figure/aes-nomap-1.png)


---
## Outer `aes()` propagates to all `geom_*()`


```r
ggplot(diamonds) +
  aes(x = carat, y = price) +
  geom_point(aes(color = clarity)) +
  geom_line()             # NO color
ggplot(diamonds) +
  aes(x = carat, y = price, color = clarity) +
  geom_point() +          # color
  geom_line()             # color
```

![plot of chunk aes-global-local](./figure/aes-global-local-1.png)![plot of chunk aes-global-local](./figure/aes-global-local-2.png)

---
## [aesthetics](https://ggplot2.tidyverse.org/articles/ggplot2-specs.html) list

- [Color related](https://ggplot2.tidyverse.org/reference/aes_colour_fill_alpha.html)
  - `color`: outline color of points, lines, and characters
  - `fill`: fill color of shapes
  - [`alpha`](https://ggplot2.tidyverse.org/reference/scale_alpha.html): opacity (0 = transparent, 1 = opaque)
- [Differentiation related](https://ggplot2.tidyverse.org/reference/aes_linetype_size_shape.html)
  - [`size`](https://ggplot2.tidyverse.org/reference/scale_size.html),
    [`shape`](https://ggplot2.tidyverse.org/reference/scale_shape.html): of points and shapes
  - [`linewidth`](https://ggplot2.tidyverse.org/reference/scale_linewidth.html),
    [`linetype`](https://ggplot2.tidyverse.org/reference/scale_linetype.html)
- [Grouping](https://ggplot2.tidyverse.org/reference/aes_group_order.html)
  - `group`: to separate lines and polygons
- [Position related](https://ggplot2.tidyverse.org/reference/aes_position.html)
  - **`x`**, **`y`**, `xmin`, `xmax`, `ymin`, `ymax`, `xend`, `yend`


---
## `color` for points, lines, characters; `fill` for areas

`alpha` for opacity.


```r
ggplot(diamonds) +
  aes(cut, carat) +
  geom_boxplot(color = "royalblue", fill = "gold", alpha = 0.5, linewidth = 2)
```

![plot of chunk fill](./figure/fill-1.png)

---
## Practice to change colors

using `mpg`, a dataset of fuel economy:


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 Draw scatter plot of `displ` and `cty` with **blue points**.<br>
🔰 **Color-code** points according to `drv` and `cyl` (drive train and # of cylinders).

![plot of chunk ggplot-mpg-color](./figure/ggplot-mpg-color-1.png)

---
## Diversity in color vision

The previous graph with 3 colors,
<span style="color: #F8766D;">red</span>
<span style="color: #00BA38;">green</span>
<span style="color: #619CFF;">blue</span>, is no problem for many people.<br>
But for ~5% people, it looks like two-color:
<span style="color: #B6A86A;">red</span>
<span style="color: #AC9C45;">green</span>
<span style="color: #5A96FD;">blue</span> or
<span style="color: #FF6074;">red</span>
<span style="color: #00B5A0;">green</span>
<span style="color: #00B2C1;">blue</span>.

![plot of chunk color-vision-diversity](./figure/color-vision-diversity-1.png)![plot of chunk color-vision-diversity](./figure/color-vision-diversity-2.png)![plot of chunk color-vision-diversity](./figure/color-vision-diversity-3.png)

You can simulate color vision with a Mac/iOS app, [Sim Daltonism](https://michelf.ca/projects/sim-daltonism/).<br>
[Color Oracle](https://colororacle.org/) is a Windows app.

---
## Some palettes are designed with consideration

Sequential palette:<br>
![plot of chunk palette-sequential](./figure/palette-sequential-1.png)![plot of chunk palette-sequential](./figure/palette-sequential-2.png)![plot of chunk palette-sequential](./figure/palette-sequential-3.png)

Diverging palette:<br>
![plot of chunk palette-diverging](./figure/palette-diverging-1.png)![plot of chunk palette-diverging](./figure/palette-diverging-2.png)![plot of chunk palette-diverging](./figure/palette-diverging-3.png)

Qualitative (categorical, discrete) palette:<br>
![plot of chunk palette-qualitative](./figure/palette-qualitative-1.png)![plot of chunk palette-qualitative](./figure/palette-qualitative-2.png)![plot of chunk palette-qualitative](./figure/palette-qualitative-3.png)

---
## Change color palette with `scale_color_*()`

[viridis](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html)
and
[ColorBrewer](https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=5)
are included in ggplot2.<br>
Find names from the link above, and specify it with `option =` or `palette =`.


```r
ggplot(diamonds) + aes(carat, price) +
  geom_point(mapping = aes(color = clarity)) +
  scale_color_viridis_d(option = "inferno")
# scale_color_brewer(palette = "YlGnBu")
```

![plot of chunk scale-color](./figure/scale-color-1.png)![plot of chunk scale-color](./figure/scale-color-2.png)

---
## Distinguish continuous and discrete variables

and choose a `scale_*` function accordingly, or you will get<br>
`Error: Continuous value supplied to discrete scale`


```r
ggplot(diamonds) + aes(carat, price) +
  geom_point(mapping = aes(color = price)) +
  scale_color_viridis_c(option = "inferno")
# scale_color_distiller(palette = "YlGnBu")
```

![plot of chunk scale-color-continuous](./figure/scale-color-continuous-1.png)![plot of chunk scale-color-continuous](./figure/scale-color-continuous-2.png)

- discrete: `scale_color_viridis_d()`, `scale_color_brewer()`
- continuous: `scale_color_viridis_c()`, `scale_color_distiller()`
- binned: `scale_color_viridis_b()`, `scale_color_fermenter()`

---
## Useful palettes other than viridis and brewer

Try built-in `palette.colors()` and
[colorspace package](https://colorspace.r-forge.r-project.org/articles/ggplot2_color_scales.html).


```r
okabe_ito = palette.colors(9L, "Okabe-Ito")
ggplot(mpg) +
  aes(x = displ, y = cty) +
  geom_point(aes(color = drv), size = 4, alpha = 0.66) +
  scale_color_discrete(type = unname(okabe_ito)[-1])
# scale_color_discrete(type = palette.colors(8L, "R4")[-1])
# colorspace::scale_colour_discrete_divergingx("Zissou 1")
```

![plot of chunk other-palettes](./figure/other-palettes-1.png)![plot of chunk other-palettes](./figure/other-palettes-2.png)![plot of chunk other-palettes](./figure/other-palettes-3.png)

These palettes are carefully designed.


---
## Global options to omit `scale_color_*`

An example setting to use viridis and Okabe-ito by default:
```r
grDevices::palette("Okabe-Ito")
options(
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis",
  ggplot2.discrete.colour = grDevices::palette()[-1],
  ggplot2.discrete.fill = grDevices::palette()[-1]
)
```

Settings by `options()` are effective until an R session ends.


---
## Facet: splitting a plot into a sequence of panels

One of the biggest benefits of using ggplot!


```r
p3 + facet_wrap(vars(clarity), ncol = 4L)
```

![plot of chunk facet-wrap](./figure/facet-wrap-1.png)

---
## Facet: splitting a plot into a 2d grid of panels

One of the biggest benefits of using ggplot!


```r
p3 + facet_grid(vars(clarity), vars(cut))
```

![plot of chunk facet-grid](./figure/facet-grid-1.png)

---
## Overviewing multivariate data with "aes" + "facet"

![plot of chunk facet-diamonds](./figure/facet-diamonds-1.png)

---
## Practice of faceting

using `mpg`, a dataset of fuel economy:


```
    manufacturer  model displ year cyl      trans drv cty hwy fl   class
  1         audi     a4   1.8 1999   4   auto(l5)   f  18  29  p compact
  2         audi     a4   1.8 1999   4 manual(m5)   f  21  29  p compact
 --                                                                     
233   volkswagen passat   2.8 1999   6 manual(m5)   f  18  26  p midsize
234   volkswagen passat   3.6 2008   6   auto(s6)   f  17  26  p midsize
```

🔰 Try faceting by `drv`, `cyl`, and both.

![plot of chunk ggplot-mpg-facet](./figure/ggplot-mpg-facet-1.png)


---
## Modify coordinate axes with [`scale_*`](https://ggplot2.tidyverse.org/reference/#section-scales), [`coord_*`](https://ggplot2.tidyverse.org/reference/#section-coordinate-systems)


```r
ggplot(diamonds) + aes(carat, price) + geom_point(alpha = 0.25) +
  scale_x_log10() +
  scale_y_log10(breaks = c(1, 2, 5, 10) * 1000) +
  coord_cartesian(xlim = c(0.1, 10), ylim = c(800, 12000)) +
  labs(title = "Diamonds", x = "Size (carat)", y = "Price (USD)")
```

![plot of chunk scale-axis](./figure/scale-axis-1.png)

---
## Customize non-data components with `theme`

Choose [a complete `theme_*()`](https://ggplot2.tidyverse.org/reference/ggtheme.html),
and adjust each element with [`theme()`](https://ggplot2.tidyverse.org/reference/theme.html).


```r
p3 + theme_bw(base_size = 18) + theme(
  panel.background = element_rect(fill = "khaki"),      # box
  panel.grid       = element_line(color = "royalblue"),
  axis.title.x     = element_text(size = 32),
  axis.text.y      = element_blank()                    # remove
)
```

![plot of chunk theme](./figure/theme-1.png)

---
## Basic usage: join layers with `+` operator

<img src="/slides/image/rstats/ggplot-layers.png" height="930">

---
## Combine separate plots into one as in papers

with the help of another package such as
[cowplot](https://wilkelab.org/cowplot/)
and
[patchwork](https://patchwork.data-imaginist.com/):


```r
pAB = cowplot::plot_grid(p3, p3, labels = c("A", "B"), nrow = 1L)
cowplot::plot_grid(pAB, p3, labels = c("", "C"), ncol = 1L)
```

![plot of chunk cowplot](./figure/cowplot-1.png)

---
## Save plots in a reproducible way

RStudio's "Export" button is affected by the window size.<br>
Adjust and fix the size with `ggsave()`.

```r
# 7 inch x 300 dpi = 2100 px square (default)
ggsave("dia1.png", p3) # width = 7, height = 7, dpi = 300
# 4      x 300     = 1200  (Zoom in x7/4)
ggsave("dia2.png", p3, width = 4, height = 4) # dpi = 300
# 2      x 600     = 1200  (Zoom in x7/2)
ggsave("dia3.png", p3, width = 2, height = 2, dpi = 600)
# 4      x 300     = 1200  (Magnify characters in theme components)
ggsave("dia4.png", p3 + theme_bw(base_size = 22), width = 4, height = 4)
```

<figure>
<img src="../sendair2/image/dia1.png" width="24%">
<img src="../sendair2/image/dia2.png" width="24%">
<img src="../sendair2/image/dia3.png" width="24%">
<img src="../sendair2/image/dia4.png" width="24%">
</figure>


---
## Show multi-byte characters properly, not tofu ◻◻

Preferences → General → Graphics → Backend: [**AGG**](https://ragg.r-lib.org/)

<figure>
<img src="/slides/image/rstudio/options-graphics-agg.png" width="80%">
</figure>

(Using non-ASCII characters should be avoided in the first place...)

---
## What kind of `geom_*()` are available?

See [the official document](https://ggplot2.tidyverse.org/reference/index.html).

<figure>
<img src="/slides/image/rstats/ggplot2-reference-geoms.png" width="80%">
</figure>

---

<figure style="margin: 0;">
<a href="https://ggplot2.tidyverse.org/">
<img src="/slides/image/cheatsheet/data-visualization.png" width="100%">
<figcaption class="url">https://ggplot2.tidyverse.org/</figcaption>
</a>
</figure>

---
## Final code can be overwhelmingly long...

Yes. But you can validate and reuse it later.

```r
set.seed(1)
p = ggplot(diamonds) +
  aes(x = cut, y = price) +
  geom_jitter(aes(color = cut), height = 0, width = 0.2, alpha = 0.1, stroke = 0) +
  geom_boxplot(fill = NA, outlier.shape = NA) +
  scale_color_viridis_d(option = "plasma") +
  facet_wrap(vars(clarity)) +
  coord_flip(xlim = c(0.5, 5.5), ylim = c(0, 20000), expand = FALSE) +
  labs(title = "Diamonds", x = "Cut", y = "Price (USD)") +
  theme_bw(base_size = 20) +
  theme(legend.position = "none",
        axis.ticks = element_blank(),
        panel.grid.major.y = element_blank(),
        panel.spacing.x = grid::unit(3, "lines"),
        plot.margin = grid::unit(c(1, 2, 0.5, 0.5), "lines"))
print(p)
ggsave("diamonds-cut-price.png", p, width = 12, height = 9)
```

---
## Advanced usage

[ggplot2 extensions](https://exts.ggplot2.tidyverse.org/)
: [gganimate](https://gganimate.com/): Animation
: [ggrepel](https://ggrepel.slowkow.com/): Repel overlapping text labels away
: [ggraph](https://ggraph.data-imaginist.com/): Networks
: [ggtree](https://github.com/YuLab-SMU/ggtree): Phylogenetic trees
: [ggpubr](https://github.com/kassambara/ggpubr): Academic publication

<img src="/slides/image/tumopp/driver.gif" align="right" height="320">

ggplot2 does not support 3D plotting.
: Really need 3D? Aes and facet will do in most cases.
: Try other packages:
  [rgl](https://cran.r-project.org/web/packages/rgl/vignettes/rgl.html),
  [plotly](https://plotly.com/r/3d-charts/),
  [rayshader](https://www.rayshader.com), etc.

---
## 🔰 Today's challenge 1: reproduction

Draw the same figures as follows:

![plot of chunk ggplot-homework](./figure/ggplot-homework-1.png)

Take a close look at the details 👀


---
## Today's lesson: data visualization and reporting with R

### ✅ <del>Outline of data analysis: visualization is important</del>

### ✅ Draw graphs in a consistent manner with ggplot2

<a href="https://ggplot2.tidyverse.org/">
<img src="/_img/hex-stickers/ggplot2.webp" width="180" align="right">
</a>

- Aesthetic mapping and faceting play key roles
- Diversity in color vision
- Save images in a reproducible way

### ⬜ Embed R code and results into a report with Quarto



---
## If you want to see the results of an R script

Execute lines in the script again — **cumbersome**

See the image files written by `ggsave()` — **which is from which code?**

→ Any format to take a glace at code and its result at the same time?


```r
3 * 14
ggplot(mpg) + aes(displ, hwy) + geom_point(aes(color = drv))
```

```
[1] 42
```

![plot of chunk hello](./figure/hello-1.png)


---
## Quarto Document

<a href="https://quarto.org/">
<img src="/_img/hex-stickers/quarto.webp" width="160" align="right">
</a>

You can unify management of programming and reporting.

- Create a text file (.qmd) with body text and R code.
- Translate it to a rich format such as HTML and PDF
  - **Figures** and **tables** can be embedded as well as R code.

<hr>

<a href="https://rmarkdown.rstudio.com/">
<img src="/_img/hex-stickers/rmarkdown.webp" width="160" align="right">
</a>

Quarto Markdown (`.qmd`)
: A subspecies of **Markdown**; `.Rmd` is almost the same.
: Can execute R code and embed the results.

Markdown (`.md`)
: The most popular **lightweight markup language**.
: There are some different flavors. Quarto uses Pandoc Markdown.

(See [the gallery](https://quarto.org/docs/gallery/) for examples.)

---
## Markup languages

Set of rules to express document structures and layouts.<br>
e.g., **HTML**+CSS, XML, LaTeX

```html
<h3>Heading level 3</h3>
<p>This is a paragraph.
<em>emphasis (italic)</em>,
<strong>strong (bold)</strong>,
<a href="https://www.lifesci.tohoku.ac.jp/">link</a>, etc.
</p>
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>Heading level 3</h3>
<p>This is a paragraph.
<em>emphasis (italic)</em>,
<strong>strong (bold)</strong>,
<a href="https://www.lifesci.tohoku.ac.jp/">link</a>, etc.
</p>
</div>

Expressive and powerful, but too complex for humans to read/write.

(Try viewing the source code of your favorite websites.)


---
## Lightweight markup languages

**Markup languages** that are easy for humans to read and write.<br>
e.g., **Markdown**, reStructuredText, various wiki notations

```md
### Heading level 3

This is a paragraph.
*emphasis (italic)*,
**strong (bold)**,
[link](https://www.lifesci.tohoku.ac.jp/), etc.
```

<div style="border: solid 1px #888888; padding: 0 4px;">
<h3>Heading level 3</h3>
<p>This is a paragraph.
<em>emphasis (italic)</em>,
<strong>strong (bold)</strong>,
<a href="https://www.lifesci.tohoku.ac.jp/">link</a>, etc.
</p>
</div>


---
## You already have Quarto environment



- **R (≥ 4.3.2)**: "Latest – 0.1" is acceptable.
- **RStudio (≥ 2023.09.1+494)**: including Quarto CLI
- **tidyverse (≥ 2.0.0)**: installs the following two:
  - rmarkdown (≥ 2.25)
  - knitr (≥ 1.45)

(The versions shown above are not requirement, but my current values.)

<hr>

- [Quarto CLI](https://quarto.org/docs/get-started/):
  if you really want the bleeding edge version.
- [`install.packages("quarto")`](https://github.com/quarto-dev/quarto-r):
  unnecessary for most people;
  just provides R functions to call Quarto CLI.
- [pandoc](https://pandoc.org/): installed along with Quarto CLI.
  not sure if the manually installed version is used by RStudio+Quarto.

---
## Try writing and translating Markdown

1. RStudio > New File > Markdown File
   <img src="/slides/image/rstudio/new-markdown.png" width="60%">
1. [Search "markdown syntax"](https://duckduckgo.com/?q=markdown+syntax) and write something.
   Include the following elements at least:
   - Heading level 1, 2, 3
   - Code blocks, inline code
   - Bullet lists (with and without item number)
1. Push <kbd>Preview</kbd> button and check the result.

---
## Try writing a Quarto Document

RStudio > New File > Quarto Document...<br>
Select "Document" and "HTML"; fill "Title" and "Author"; create.

<img src="/slides/image/rstudio/new-quarto-document.png" width="100%">

---
## New features in qmd, not in md

Header (front matter)
: Surrounded by `---` at the top.
  Metadata of a whole document.
: Options differ depending on output formats.
  e.g., [`html`](https://quarto.org/docs/output-formats/html-basics.html)

R code chunks
: Code blocks that start like `` ```{r} ``.
: The result of the code is also embedded into the product.
: [Many options](https://quarto.org/docs/computations/execution-options.html)。e.g.,
  - `echo: false`: Hide code, but execute and show its results.
  - `eval: false`: Show code without execution.
  - `include: false`: Execute code, but hide it and its results.
  - `fig.width: 7`, `fig.height: 7`: Adjust image size.

Don't care about the details for now.

---
## Try translating qmd to HTML

qmd on the left is a source code. HTML on the right is its product.

<div>
<img src="/slides/image/rstudio/quarto-viewer.png" width="100%">
</div>

---
## Try translating qmd to HTML

1. Save a source code with <kbd>command</kbd><kbd>s</kbd><br>
   e.g., `report.qmd`
1. Push <kbd>⚙️</kbd> button, and select "Preview in Viewer Pane"
1. Push <kbd>→Render</kbd> button.
   - Embedded R code is executed.
   - Markdown with the results is generated.
   - Markdown is translated to HTML, e.g., `report.html`
   - Preview is shown on the right automatically.
1. Repeat editing → saving → "Render" to make a satisfactory report.


---
## An example of reports

Create qmd on the left; push "Render" and submit HTML on the right.

<div>
<img src="../tohoku2023r/image/report-example.webp" width="90%"></img>
</div>


---
## 参考

R for Data Science --- Hadley Wickham et al.
: <https://r4ds.hadley.nz>
: [Paperback](https://amzn.to/4cpL6w8)
: [日本語版書籍(Rではじめるデータサイエンス)](https://amzn.to/2yyFRKt)

Older versions
: 「[Rにやらせて楽しよう — データの可視化と下ごしらえ](https://heavywatal.github.io/slides/nagoya2018/)」
   岩嵜航 2018
: 「Rを用いたデータ解析の基礎と応用」石川由希 2019 名古屋大学
: 「[Rによるデータ前処理実習](https://heavywatal.github.io/slides/tmd2022/)」
   岩嵜航 2022 東京医科歯科大
: 「[Rを用いたデータ解析の基礎と応用](https://comicalcommet.github.io/r-training-2023/)」
   石川由希 2023 名古屋大学

ggplot2 official document
: https://ggplot2.tidyverse.org/

<a href="3-structure1.html" class="readmore">
3. Data transformation 1: extract, summarize
</a>
