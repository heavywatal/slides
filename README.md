# Slide decks

https://heavywatal.github.io/slides/


## Framework

1.  [knitr](https://yihui.org/knitr/)
    interprets code chunks in R Markdown source (`source/*/*.Rmd`),
    and generates Markdown files (`content/*/*.md`) and figures (`content/*/figure/*`).
2.  [Hugo](https://gohugo.io/)
    converts Markdown files (`content/*/*.md`) to HTML files (`public/*/*.html`).
3.  [reveal.js](https://revealjs.com/)
    helps rendering HTML as presentation slides.
    [KaTeX](https://katex.org/)
    renders math equations (`$ ... $` and `\[ ... \]`) embedded in HTML.
    They are included in [a Hugo theme](https://github.com/heavywatal/hugo-theme-reveal).
4.  The output and libraries are published via
    [`gh-pages` branch of this repository](https://github.com/heavywatal/slides/tree/gh-pages).

But I recommend using [Quarto Presentation](https://quarto.org/docs/presentations/) via [RStudio IDE](https://posit.co/products/open-source/rstudio/).
It is user-friendly and has decent defaults compared to older alternatives such as
[`xaringan`](https://slides.yihui.org/xaringan/),
[`rstudio/revealjs`](https://bookdown.org/yihui/rmarkdown/revealjs.html),
and [others supported in `rmarkdown` package](https://bookdown.org/yihui/rmarkdown/presentations.html).


## R packages used in `*.Rmd`

```r
install.packages("pak")
pak::pak("knitr")
pak::pak("tidyverse")
pak::pak("tidymodels")
pak::pak("cowplot")
pak::pak(c("ggrepel", "ggridges"))
pak::pak("nycflights13")
pak::pak("gifski")
pak::repo_add(stan = "https://stan-dev.r-universe.dev")
pak::pak(c("cmdstanr", "bayesplot"))
pak::pak(c("rstan", "rstanarm", "tidybayes"))
pak::pak("heavywatal/rwtl")
```


## Save as PDF

Use [decktape](https://github.com/astefanutti/decktape)
(See below for installation):
```sh
decktape --help

URL=https://heavywatal.github.io/slides/tohoku2026r/1-introduction.html
PDF=1-introduction.pdf
decktape -s 960x720 reveal "$URL" "$PDF"

# or directly
decktape -s 960x720 reveal https://heavywatal.github.io/slides/tohoku2026r/1-introduction.html 1-introduction.pdf
decktape -s 800x600 automatic https://comicalcommet.github.io/r-training-2025/R_training_2025_1.html R_training_1.pdf
```

### Install decktape with node

1. Install [pnpm](https://pnpm.io/):
   ```sh
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```
   Add the following lines to your shell profile (e.g., `~/.bashrc`):
   ```sh
   export PNPM_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/pnpm"
   PATH="$PNPM_HOME:$PATH"
   ```
1. Install [node](https://nodejs.org/):
   ```sh
   pnpm env use --global lts
   ```
1. Install [decktape](https://github.com/astefanutti/decktape):
   ```sh
   pnpm add -g decktape
   ```
1. Approve build scripts of puppeteer if prompted:
   ```sh
   pnpm approve-builds -g
   # pick puppeteer and approve it
   ```
