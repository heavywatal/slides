# Slide decks

https://heavywatal.github.io/slides/


## Framework

1.  [knitr](https://yihui.org/knitr/)
    interprets code chunks in R Markdown source (`content/*/.knitr/**.Rmd`),
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
pak::repo_add(stan = "https://stan-dev.r-universe.dev")
pak::pkg_install("knitr")
pak::pkg_install("tidyverse")
pak::pkg_install("tidymodels")
pak::pkg_install("cowplot")
pak::pkg_install(c("ggrepel", "ggridges"))
pak::pkg_install("palmerpenguins")
pak::pkg_install("nycflights13")
pak::pkg_install("gifski")
pak::pkg_install(c("cmdstanr", "bayesplot"))
pak::pkg_install(c("rstan", "rstanarm", "tidybayes"))
pak::pkg_install("heavywatal/rwtl")
```


## Save as PDF

Use [decktape](https://github.com/astefanutti/decktape):
```sh
nvm use stable
decktape --help

URL=https://heavywatal.github.io/slides/tohoku2024r/1-introduction.html
PDF=1-introduction.pdf
decktape -s 960x720 reveal "$URL" "$PDF"

# or directly
decktape -s 960x720 reveal https://heavywatal.github.io/slides/tohoku2024r/1-introduction.html 1-introduction.pdf
decktape -s 800x600 automatic https://comicalcommet.github.io/r-training-2024/R_training_2024_1.html R_training_1.pdf
```

### Install decktape with node

1. Install [nvm](https://github.com/nvm-sh/nvm).
   Your shell profile (e.g., `~/.bashrc`) will be updated automatically to add following lines:
   ```sh
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use
   ```
1. Restart your shell/terminal to reload the updated profile.
1. Install [node](https://nodejs.org/): `nvm install --lts --latest-npm`
1. Activate the installed node temporarily: `nvm use stable`
1. Install [decktape](https://github.com/astefanutti/decktape):
   `npm install -g decktape`
1. Run `hash -r` or restart your shell/terminal to reload `$PATH`.
