DESTINATION := ..
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))
$(info SOURCES = ${SOURCES})
$(info KNITTED = ${KNITTED})

.DEFAULT_GOAL := all
.PHONY: all clean

all: ${KNITTED}
	@:

${DESTINATION}/%.md: %.Rmd setup.R metadata.csv header.md
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png
