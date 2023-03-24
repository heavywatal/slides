library(conflicted)
tidyverse_msg = utils::capture.output(library(tidyverse), type = "message")
set.seed(24601)
knitr::opts_chunk$set(error = FALSE)  # stop on errors
knitr::opts_chunk$set(comment = NA)
knitr::opts_chunk$set(dev = "ragg_png")
knitr::opts_chunk$set(fig.retina = 100 / 72)  # change dpi without affecting out.width/height
knitr::opts_chunk$set(fig.process = wtl::oxipng)
grDevices::palette("Okabe-Ito")
options(
  devtools.install.args = c("--no-multiarch", "--no-test-load"),
  repos = c(CRAN = "https://cloud.r-project.org/"),
  menu.graphics = FALSE,
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
registerS3method("print", "tbl", wtl::printdf)
registerS3method("print", "tbl_df", wtl::printdf)
