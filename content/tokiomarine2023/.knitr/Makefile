DESTINATION := ..
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))
PYPERCENT := $(wildcard *.py)
NOTEBOOKS := $(addprefix ${DESTINATION}/,$(PYPERCENT:.py=.ipynb))

.DEFAULT_GOAL := all
.PHONY: all clean stan

all: ${KNITTED} ${NOTEBOOKS}
	@:

${DESTINATION}/%.md: %.Rmd setup.R metadata.csv header.md
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

${DESTINATION}/%.ipynb: %.py
	jupytext --to ipynb --output - $< | jupyter nbconvert --to notebook --stdin --stdout | grep -v '"id":' > $@

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png
	$(RM) -r ${NOTEBOOKS} stan

stan:
	rsync -auvC stan/ ${DESTINATION}/stan/

BASEURL := https://heavywatal.github.io/slides
PARENTDIR = $(dir $(CURDIR))
SLUG := $(notdir $(PARENTDIR:/=))
PDFNAMES := $(filter-out _%,$(SOURCES:.Rmd=.pdf))
EXPORTED := $(addprefix ../../../pdf/${SLUG}/,${PDFNAMES})
.PHONY: pdf

pdf: ${EXPORTED}
	@:

../../../pdf/${SLUG}/%.pdf: %.Rmd
	npm run decktape ${BASEURL}/${SLUG}/$(<:.Rmd=.html) pdf/${SLUG}/$(<:.Rmd=.pdf)
