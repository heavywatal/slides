# library(wtl)
set.seed(24601)
knitr::opts_chunk$set(comment = NA)
# knitr::opts_chunk$set(dev = "ragg_png")
options(
  mc.cores = parallel::detectCores(),
  wtl.printdf.summarize = FALSE,
  tibble.print_max = 8L,
  width = 9999L,
  dplyr.summarise.inform = FALSE,
  readr.num_columns = 0L,
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis"
)
registerS3method("print", "tbl_df", wtl::printdf)
