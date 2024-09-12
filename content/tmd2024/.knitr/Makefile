DESTINATION := ..
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))
PARENTDIR = $(dir $(CURDIR))
SLUG := $(notdir $(PARENTDIR:/=))
SHARE_DIR := ${HOME}/My\ Drive/Shared/${SLUG}

.DEFAULT_GOAL := all
.PHONY: all clean

all: ${KNITTED}
	@:

${DESTINATION}/%.md: %.Rmd setup.R metadata.csv header.md
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png

BASEURL := https://heavywatal.github.io/slides
PDFNAMES := $(filter-out _%,$(SOURCES:.Rmd=.pdf))
PRODUCT_PDFS := $(addprefix pdf/,${PDFNAMES})
.PHONY: pdf

pdf: ${PRODUCT_PDFS}
	@:

${SHARE_DIR}/%.pdf: pdf/%.pdf | ${SHARE_DIR}
	cp -av $< "$@"

pdf/%.pdf: %.Rmd
	mkdir -p pdf
	decktape -s 960x720 reveal ${BASEURL}/${SLUG}/$(<:.Rmd=.html) pdf/$(<:.Rmd=.pdf)
	cp -av $@ ${SHARE_DIR}

${SHARE_DIR}:
	mkdir -p "$@"
