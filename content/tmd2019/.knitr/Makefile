DESTINATION := ..
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))

.DEFAULT_GOAL := all
.PHONY: all clean

all: ${KNITTED}
	@:

${DESTINATION}/%.md : %.Rmd
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png
