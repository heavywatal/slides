# library(wtl)
set.seed(24601)
knitr::opts_chunk$set(comment = NA)
# knitr::opts_chunk$set(dev = "ragg_png")
options(
  devtools.install.args = c("--no-multiarch", "--no-test-load"),
  repos = c(CRAN = "https://cloud.r-project.org/"),
  menu.graphics = FALSE,
  mc.cores = parallel::detectCores(),
  wtl.printdf.summarize = FALSE,
  pillar.print_max = 8L,
  tibble.print_max = 8L,
  width = 9999L,
  cli.width = 60L,
  dplyr.summarise.inform = FALSE,
  readr.num_columns = 0L,
  readr.show_progress = FALSE,
  readr.show_col_types = FALSE,
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis"
)
# Set message = FALSE to prevent knitr
tidyverse_msg = utils::capture.output(library(tidyverse), type = "message")
registerS3method("print", "tbl", wtl::printdf)
registerS3method("print", "tbl_df", wtl::printdf)
