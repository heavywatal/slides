+++
title = "Tokyo.R #71 Writing an R package interface to C++ libraries with Rcpp"
date = 2018-07-15T15:00:00+09:00
type = "reveal"
draft = false
+++

<h1 style="font-size: 2.2rem">
Writing an R package interface<br>to C++ libraries<br>with Rcpp
</h1>

<div class="author">
Watal M. Iwasaki
&nbsp;
<a href="https://twitter.com/heavywatal"><code>@heavywatal</code></a>
</div>

<div class="affiliation">
SOKENDAI, The Graduate University for Advanced Studies
</div>

<div class="footnote">
2018-07-15
<a href="https://tokyor.connpass.com/event/92522/">Tokyo.R #71</a>
</div>


---
## <img src="/slides/heavywatal.svg" height="48" style="vertical-align: text-bottom;"> @heavywatal

<img src="/slides/image/profile/google-map.png" height="580" style="float: right;">
Watal M. Iwasaki = 岩嵜 航<br>
https://heavywatal.github.io/

PhD in Life Sciences, Tohoku University, Sendai
: Evolutionary theory of complexity and diversity in biological systems.

Postdoc in SOKENDAI, Hayama
: Evolution of diversity within a tumor/cancer.

<img src="/slides/image/profile/bicycle.jpg" height="220" style="float: right; transform: translate(-10px, 40px);">

Likes
: 🍺 Beer, Sake, Whisky, Cooking
: ♬ Heavy Metal, Classical, Folk

---
## tumopp --- tumor growth simulator in C++

<figure>
<img src="/slides/image/tumopp/paper/Fig1.png" height="200">
<img src="/slides/image/tumopp/neighborhood.png" height="200">
<img src="/slides/image/tumopp/param-p.png" height="200">
<img src="/slides/image/tumopp/paper/Fig3.png" height="200">
<img src="/slides/image/tumopp/param-k.png" height="200">
<img src="/slides/image/tumopp/driver.gif" height="200"><br>
<img src="/slides/image/tumopp/Cmoore_Lconst.gif" height="100">
<img src="/slides/image/tumopp/Cmoore_Llinear.gif" height="100">
<img src="/slides/image/tumopp/Cmoore_Lstep.gif" height="100">
<img src="/slides/image/tumopp/Chex_Lconst.gif" height="100">
<img src="/slides/image/tumopp/Chex_Llinear.gif" height="100">
<img src="/slides/image/tumopp/Chex_Lstep.gif" height="100">
<figcaption><small>Iwasaki and Innan (2017)</small></figcaption>
</figure>

---
## tumopp --- tumor growth simulator in C++

Available via [Homebrew](https://brew.sh/)/[Linuxbrew](http://linuxbrew.sh/):
```sh
brew install heavywatal/tap/tumopp
tumopp -N10000 -D3 -Chex -k100 -d0.1 -m0.5 -o OUTPUT_DIR
```

Dependencies:

- Unix-like OS (macOS, Linux, etc.)
- C++14 compiler (clang++ >= Apple LLVM 8.1, g++ >= 5.3)
- [CMake](https://cmake.org/) (>= 3.1)
- [Boost C++ Libraries](http://www.boost.org/) (>= 1.65.0)
- [sfmt-class](https://github.com/heavywatal/sfmt-class)
- [cxxwtl](https://github.com/heavywatal/cxxwtl)

https://github.com/heavywatal/tumopp

---
## tumopp --- tumor growth simulator in C++

Library structure:
```
CMAKE_INSTALL_PREFIX/
├── bin/
│   └── tumopp
├── include/
│   └── tumopp/
│       ├── cell.hpp
│       ├── simulation.hpp
│       └── tissue.hpp
└── lib/
    └── libtumopp.dylib    # libtumopp.so on Linux
```

Output structure:
```
OUTPUT_DIR/
├── drivers.tsv.gz
├── population.tsv.gz
├── program_options.conf
└── snapshots.tsv.gz
```

---
## Workflow

1. Run tumopp with some parameter sets from the command line.
1. **Write results to TSV files**
1. Start R
1. **Read TSV files as data.frames**
1. Visualize and analyze with tidyverse packages

Not too bad.<br>
But it will be more convenient if I can run tumopp in R:

```r
library(tumopp)
results = tumopp(some_parameter_sets) %>% print()
```
```
     max  coord dimensions shape delta0  rho0 population  drivers
   <int> <char>      <int> <int>  <num> <num>     <list>   <list>
1: 10000    hex          3   100    0.1   0.5   <tbl_df> <tbl_df>
```

---
## Seamless R and C++ integration with [Rcpp](http://www.rcpp.org/)

It is typically used to eliminate bottlenecks in R code.<br>
Many online examples show the ways to define a short function:
```r
library(Rcpp)

Rcpp::cppFunction('
int fibonacci(int x) {
  if (x < 2) return x;
  return fibonacci(x - 1) + fibonacci(x - 2);
}
')

fibonacci(8L)
```
```
[1] 21
```

But I already have C++ functions in my library.<br>
How can I use them in R?

---
## Create an R+Rcpp package from scratch

Package components
<small>(See http://r-pkgs.had.co.nz/ for details)</small>:
```
DESCRIPTION  # Package metadata
LICENSE
NAMESPACE    # List of objects to import/export
R/           # R code (*.R)
man/         # Object documentation (*.Rd)
src/         # C++ source code (*.cpp)
vignettes/   # Long-form guide
```

Use [devtools](https://devtools.r-lib.org/) and/or
[usethis](http://usethis.r-lib.org/) to setup a skeleton:
```r
usethis::create_package("tumopp")
usethis::use_mit_license()
usethis::use_roxygen_md()
usethis::use_package_doc()
usethis::use_rcpp()
usethis::use_git()
```

Then, modify `DESCRIPTION`, `R/`, and `src/`.
<!-- or `Rcpp::Rcpp.package.skeleton()`? -->

---
## Package-wide settings in `R/tumopp-package.R`

```r
#' @useDynLib tumopp, .registration = TRUE
#' @importFrom Rcpp sourceCpp
#' @importFrom magrittr %>%
#' @aliases NULL tumopp-package
#' @keywords internal
"_PACKAGE"

.onUnload = function(libpath) {
  library.dynam.unload("tumopp", libpath)
}
```

- `@useDynLib` is needed to import compiled C++ functions.
- `@importFrom Rcpp sourceCpp` seems necessary to load Rcpp.
- `"_PACKAGE"` is a special string to generate package documentation.
- `.onUnload` is recommended in http://adv-r.had.co.nz/Rcpp.html,<br>
  but not used in the major packages these days...?<br>
  **Hadley said**: *"It is polite to define it, but easy to forget."*


---
## Define Rcpp function to use external libraries

Create `src/run.cpp`:
```cpp
// [[Rcpp::plugins(cpp14)]]
#include <Rcpp.h>
#include <tumopp/simulation.hpp>

//' Run C++ simulation
//' @param args command line arguments as a string vector
// [[Rcpp::export]]
Rcpp::CharacterVector
cpp_tumopp(const std::vector<std::string>& args) {
    tumopp::Simulation simulation(args);
    simulation.run();
    return Rcpp::CharacterVector::create(
        Rcpp::Named("config", simulation.config_string()),
        Rcpp::Named("specimens", simulation.specimens()),
        Rcpp::Named("drivers", simulation.drivers())
    );
}
```

Try `devtools::check()`.

---
## Configure compile options

Error: R does not know where my C++ library is located:
```
run.cpp:3:10: fatal error: 'tumopp/simulation.hpp' file not found
#include <tumopp/simulation.hpp>
         ^~~~~~~~~~~~~~~~~~~~~~~
```

Write compile options to `src/Makevars` directly:
```makefile
CXX_STD=CXX14
PKG_CPPFLAGS=-DSTRICT_R_HEADERS -I/usr/local/include
PKG_LIBS=-L/usr/local/lib -Wl,-rpath,/usr/local/lib -ltumopp
```

Or use `configure`/`CMake` script to generate it from `src/Makevars.in`:
```makefile
CXX_STD=CXX14
PKG_CPPFLAGS=-DSTRICT_R_HEADERS @CPPFLAGS@
PKG_LIBS=@LDFLAGS@ @LDLIBS@
```

<small><https://cran.r-project.org/doc/manuals/r-release/R-exts.html#Configure-and-cleanup></small>

---
## Transform C++ strings to data.frame

Create `R/tumopp`:
```r
#' `tumopp()` returns full results with config columns in a data.frame
#' @param args command line arguments as a string vector
#' @export
tumopp = function(args = character(0L)) {
  result = cpp_tumopp(c(0L, 0L, args))
  population = readr::read_tsv(result["specimens"])
  drivers = readr::read_tsv(result["drivers"])
  readr::read_tsv(result["config"]) %>%
    dplyr::mutate(population = list(population)) %>%
    dplyr::mutate(drivers = list(drivers))
}
```

```
     max  coord dimensions shape delta0  rho0 population  drivers
   <int> <char>      <int> <int>  <num> <num>     <list>   <list>
1: 10000    hex          3   100    0.1   0.5   <tbl_df> <tbl_df>
```

There must be some more efficient ways...
[feather](https://github.com/wesm/feather)?
[arrow](https://arrow.apache.org/)?

---
## Workflow improvement

**Before using Rcpp**:

1. Run tumopp with some parameter sets
1. **Write results to TSV files**
1. Start R
1. **Read TSV files as data.frames**
1. Visualize and analyze

**Thanks to Rcpp**:

1. Start R
1. Run tumopp with some parameter sets in R
1. **Get results in a nested data.frame**
1. Visualize and analyze

---
## Problem: Modern C++11/14/17 supported?

- Rcpp [0.12.10](https://github.com/RcppCore/Rcpp/blob/master/inst/NEWS.Rd): C++17
- R [3.4.0](https://cran.r-project.org/doc/manuals/r-release/NEWS.html): C++17
- OS and compiler
    - macOS [(clang)](https://trac.macports.org/wiki/XcodeVersionInfo): C++17
    - Ubuntu [18.04 (gcc-7.3)](https://packages.ubuntu.com/bionic/gcc): C++17
    - Ubuntu [16.04 (gcc-5.3)](https://packages.ubuntu.com/xenial/gcc): C++14
    - CentOS 7 + [Linuxbrew (gcc-5.5)](https://github.com/Linuxbrew/homebrew-core/blob/master/Formula/gcc.rb): C++14
    - **Windows + [Rtools (gcc-4.9)](https://cran.r-project.org/bin/windows/Rtools/): C++11** ❌
    - Windows + WSL + Ubuntu: ❓❓❓

<small><http://gallery.rcpp.org/articles/rcpp-and-c++11-c++14-c++17/></small>

🚧 **[Rtools 4 with gcc 8](https://github.com/rwinlib/gcc-8) is under development.**
(Thanks, Yutani-san!)

---
## Tasks and Questions

✅ Core C++ library for tumor growth simulation<br>
✅ R interface package using **Rcpp** and **devtools**<br>
🚧 Visualization and analysis using **tidyverse** packages<br>
🚧 Documentation using **roxygen2**, **rmarkdown**, and **pkgdown**<br>
🚧 Tests using **testthat**<br>
⬜ Hexagonal logo<br>
✅ Publication `doi:10.1371/journal.pone.0184229`<br>
✅ Advertisement in conferences (GSJ2017, SMBE2018, Tokyo.R#71)<br>
⬜ Better way to transfer C++ data to R data.frames:
[feather](https://github.com/wesm/feather)?
[arrow](https://arrow.apache.org/)?<br>
⬜ C++ and R on Windows: WSL? Cygwin? MSYS? Docker?<br>
✅ Talk over beers with YOU! 🍻



---
## Reference

- https://github.com/heavywatal/tumopp
- https://github.com/heavywatal/rtumopp
- http://www.rcpp.org/
- http://adv-r.had.co.nz/Rcpp.html
- https://cran.r-project.org/doc/manuals/r-release/R-exts.html
- https://devtools.r-lib.org/
- https://usethis.r-lib.org/
- https://teuder.github.io/rcpp4everyone_ja/
- https://clang.llvm.org/cxx_status.html
- https://gcc.gnu.org/projects/cxx-status.html
- https://github.com/rwinlib/gcc-8
