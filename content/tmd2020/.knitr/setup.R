library(wtl)
set.seed(24601)
knitr::opts_chunk$set(comment = NA)
options(
  wtl.printdf.summarize = FALSE,
  pillar.print_max = 8L,
  tibble.print_max = 8L,
  width = 9999L,
  dplyr.summarise.inform = FALSE,
  readr.num_columns = 0L,
  readr.show_progress = FALSE,
  readr.show_col_types = FALSE,
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis"
)
registerS3method("print", "tbl_df", wtl::printdf)
registerS3method("print", "tbl", wtl::printdf)
