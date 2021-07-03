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
    It is included in [a Hugo theme](https://github.com/heavywatal/hugo-theme-reveal).


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
