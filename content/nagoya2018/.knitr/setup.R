set.seed(24601)
knitr::opts_chunk$set(comment = NA)
library(tidyverse)
options(
  wtl.printdf.summarize = FALSE,
  tibble.print_max = 8L,
  width = 9999L,
  dplyr.summarise.inform = FALSE,
  readr.num_columns = 0L
)
registerS3method("print", "tbl_df", wtl::printdf)
