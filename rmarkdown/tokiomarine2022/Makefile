DECK := $(notdir ${CURDIR})
DESTINATION := ../../content/${DECK}
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))
PYPERCENT := $(wildcard *.py)
NOTEBOOKS := $(addprefix ${DESTINATION}/,$(PYPERCENT:.py=.ipynb))

.DEFAULT_GOAL := all
.PHONY: all clean

all: ${KNITTED} ${NOTEBOOKS}
	@:

${DESTINATION}/%.md : %.Rmd | ${DESTINATION}
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

${DESTINATION}/%.ipynb : %.py | ${DESTINATION}
	jupytext --to ipynb --output - $< | jupyter nbconvert --to notebook --stdin --output $@

${DESTINATION}:
	mkdir -p $@

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png

stan:
	rsync -auv *.stan ${DESTINATION}
