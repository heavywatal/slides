# Slide decks

https://heavywatal.github.io/slides/


## Framework

1.  [knitr](https://yihui.org/knitr/)
    interprets code chunks in R Markdown source (`rmarkdown/**.Rmd`),
    and generates Markdown files (`content/**.md`) and figures (`content/*/figure/*`).
2.  [Hugo](https://gohugo.io/)
    converts Markdown files (`content/**.md`) to HTML files (`public/**.html`).
3.  [reveal.js](https://revealjs.com/)
    helps rendering HTML as presentation slides.
    [KaTeX](https://katex.org/)
    renders math equations (`$ ... $` and `\[ ... \]`) embedded in HTML.
    They are included in [a Hugo theme](https://github.com/heavywatal/hugo-theme-reveal).

But I would rather recommend using other user-friendly frameworks such as
[`xaringan`](https://slides.yihui.org/xaringan/),
[`rstudio/revealjs`](https://bookdown.org/yihui/rmarkdown/revealjs.html),
and [others supported in `rmarkdown` package](https://bookdown.org/yihui/rmarkdown/presentations.html).


## R packages used in `*.Rmd`

```r
install.packages("knitr")
install.packages("tidyverse")
install.packages("ggridges")
install.packages("tidymodels")
install.packages("rstan", "rstanarm", "tidyvayes")
install.packages("DiagrammeR", "DiagrammeRsvg")
install.packages("palmerpenguins")
install.packages("nycflights13")
install.packages("remotes")
remotes::install_github("heavywatal/rwtl")
```
