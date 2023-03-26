grDevices::palette("Okabe-Ito")
withr::local_options(
  mc.cores = parallel::detectCores(),
  wtl.printdf.summarize = FALSE,
  wtl.printdf.classes = FALSE,
  pillar.print_max = 8L,
  tibble.print_max = 8L,
  width = 9999L,
  cli.width = 60L,
  dplyr.summarise.inform = FALSE,
  readr.num_columns = 0L,
  readr.show_progress = FALSE,
  readr.show_col_types = FALSE,
  ggplot2.continuous.colour = "viridis",
  ggplot2.continuous.fill = "viridis",
  ggplot2.discrete.colour = grDevices::palette()[-1],
  ggplot2.discrete.fill = grDevices::palette()[-1]
)
withr::local_package("tibble")
withr::local_package("ggplot2")
registerS3method("print", "tbl", wtl::printdf)
registerS3method("print", "tbl_df", wtl::printdf)
knitr::opts_chunk$set(comment = "")
knitr::opts_chunk$set(dev = "ragg_png")
knitr::opts_chunk$set(fig.retina = 100 / 72)  # change dpi without affecting out.width/height
knitr::opts_chunk$set(fig.process = wtl::oxipng)
knitr::opts_chunk$set(cache = TRUE, autodep = TRUE)
set.seed(24601)
