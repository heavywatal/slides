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
knitr::opts_chunk$set(message = NA)
knitr::opts_chunk$set(warning = NA)
knitr::opts_chunk$set(dev = "ragg_png")
knitr::opts_chunk$set(dpi = 108)
knitr::opts_chunk$set(fig.process = wtl::oxipng)
knitr::opts_chunk$set(cache = TRUE, autodep = TRUE)
set.seed(24601)

src_alt_fig_chunk = function(label, ext = "png", number = 1L) {
  src = knitr::fig_chunk(label, ext, number)
  paste0('src="', src, '" alt="plot of chunk ', label, '"')
}

.meta = list()
.meta$course = "Hands-on Introduction to R 2023"
.meta$prefix = normalizePath("..") |> basename()
.meta$data = "metadata.csv" |>
  readr::read_csv(locale = readr::locale(tz = "Asia/Tokyo")) |>
  tibble::rowid_to_column("id") |>
  dplyr::mutate(
    infile = fs::dir_ls(regexp = "^\\d+-\\w+\\.Rmd$"),
    outfile = fs::path_ext_set(infile, ".html"),
    url = file.path(.meta$prefix, outfile),
    title = stringr::str_glue("{id}. {linktitle} — {.meta$course}"),
    this = (infile == knitr::current_input()),
    attr = ifelse(this, " class=\"current-deck\"", ""),
    li = stringr::str_glue("<li{attr}><a href=\"{outfile}\">{linktitle}</a>")
  )
.meta$toc = paste(c("<ol>", .meta$data$li, "</ol>"), collapse = "\n")
.meta$footnote = .meta$data |> dplyr::filter(this) |>
  dplyr::pull(date) |> as.Date() |>
  paste0(" Tohoku University<br>")
.meta$next_link = '<a href="{outfile}" class="readmore">\n{id}. {linktitle}\n</a>' |>
  stringr::str_glue_data(.x = dplyr::filter(.meta$data, id == id[this] + 1))
.meta$front_matter = .meta$data |>
  dplyr::filter(this) |>
  dplyr::select(url, linktitle, title, date, draft) |>
  dplyr::mutate(
    css = "style.css",
    dpi = knitr::opts_chunk$get("dpi") |> as.integer() |> dplyr::na_if(72L)
  ) |>
  wtl::toTOML()

readr::read_file("header.md") |>
  stringr::str_glue_data(.x = .meta) |>
  cat()
