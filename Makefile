DROPBOX := ${HOME}/Dropbox/slides-draft
DECKS := $(wildcard content/*)
NAMES := $(notdir ${DECKS})
IMGDSTS := $(addsuffix /image,${DECKS})
IMGSRCS := $(addprefix ${DROPBOX}/,${NAMES})

.PHONY: all clean development production watch server image

all: development
	@:

development:
	hugo --environment development

watch:
	hugo --environment development --watch

server:
	hugo server --environment development --watch -p 8080

clean:
	hugo --environment development --gc --cleanDestinationDir

production:
	hugo --environment production --cleanDestinationDir

image: ${IMGDSTS}
	rsync -av ${DROPBOX}/static/ static/

content/%/image: ${DROPBOX}/%
	rsync -auv $^/ $@/

${DROPBOX}/%: | content/%
	mkdir $@


.PHONY: stickers

HEXDIR := static/image/hex-stickers
TIDYVERSE := tidyverse dplyr tidyr purrr ggplot2 tibble readr pipe stringr forcats lubridate readxl rmarkdown
TIDYVERSE := $(addsuffix .png, ${TIDYVERSE})
TIDYVERSE := $(addprefix ${HEXDIR}/, ${TIDYVERSE})

stickers: ${TIDYVERSE}
	@:

${HEXDIR}/%.png: hex-stickers/PNG/%.png
	@mkdir -p ${HEXDIR}
	zopflipng $< $@
