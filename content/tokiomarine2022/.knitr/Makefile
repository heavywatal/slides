DESTINATION := ..
SOURCES := $(wildcard *.Rmd)
KNITTED := $(addprefix ${DESTINATION}/,$(SOURCES:.Rmd=.md))
PYPERCENT := $(wildcard *.py)
NOTEBOOKS := $(addprefix ${DESTINATION}/,$(PYPERCENT:.py=.ipynb))

.DEFAULT_GOAL := all
.PHONY: all clean stan

all: ${KNITTED} ${NOTEBOOKS}
	@:

${DESTINATION}/%.md : %.Rmd
	Rscript --no-init-file -e "wtl::exec_knit('$<', '$@')"

${DESTINATION}/%.ipynb : %.py
	jupytext --to ipynb --output - $< | jupyter nbconvert --to notebook --stdin --stdout | grep -v '"id":' > $@

clean:
	$(RM) -r ${KNITTED} cache ${DESTINATION}/figure/*-1.png

stan:
	rsync -auv stan/ ${DESTINATION}/stan/
