DECK := $(notdir ${CURDIR})
DESTINATION := ../../content/${DECK}
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))

.DEFAULT_GOAL := all
.PHONY: all clean

all: ${KNITTED}
	@:

${DESTINATION}/%.md : %.Rmd | ${DESTINATION}
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

${DESTINATION}:
	mkdir -p $@

clean:
	$(RM) ${KNITTED}
