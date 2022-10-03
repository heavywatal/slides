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
4.  The output and libraries are published via
    [`gh-pages` branch of this repository](https://github.com/heavywatal/slides/tree/gh-pages).

But I recommend using [Quarto Presentation](https://quarto.org/docs/presentations/) via [RStudio IDE](https://www.rstudio.com/products/rstudio/).
It is user-friendly and has decent defaults compared to older alternatives such as
[`xaringan`](https://slides.yihui.org/xaringan/),
[`rstudio/revealjs`](https://bookdown.org/yihui/rmarkdown/revealjs.html),
and [others supported in `rmarkdown` package](https://bookdown.org/yihui/rmarkdown/presentations.html).


## R packages used in `*.Rmd`

```r
install.packages("knitr")
install.packages("tidyverse")
install.packages("cowplot")
install.packages("ggrepel", "ggridges")
install.packages("tidymodels")
install.packages("cmdstanr", "bayesplot")
install.packages(c("rstan", "rstanarm", "tidybayes"))
install.packages("gifski")
install.packages("palmerpenguins")
install.packages("nycflights13")
install.packages("remotes")
remotes::install_github("heavywatal/rwtl")
```


## Save as PDF

1. Install [nvm](https://github.com/nvm-sh/nvm)
1. Install node: `nvm install --lts --latest-npm`
1. Setup node: `nvm use stable`
1. Change directory to this repo: `cd ~/git/slides/`
1. `npm install` ([decktape](https://github.com/astefanutti/decktape) via `package.json`)
1.  Run decktape:

    ```sh
    npm run decktape https://heavywatal.github.io/slides/tmd2021/1-introduction.html 1-introduction.pdf
    # or manually
    npx decktape -s 960x720 --chrome-arg=--disable-web-security reveal https://heavywatal.github.io/slides/tohoku2022r/1-introduction.html 1-introduction.pdf
    npx decktape -s 800x600 --chrome-arg=--disable-web-security generic https://comicalcommet.github.io/r-training-2021/R_training_2021_1.html R_training_2021_1.pdf
    ```
