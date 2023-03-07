DROPBOX := ${HOME}/Library/CloudStorage/Dropbox/slides-draft
DECKS := $(wildcard content/*)
NAMES := $(notdir ${DECKS})
IMGDSTS := $(addsuffix /image,${DECKS})
IMGSRCS := $(addprefix ${DROPBOX}/,${NAMES})

.PHONY: all clean development public watch server image

all: development
	@:

development:
	hugo

benchmark:
	hugo --templateMetrics --templateMetricsHints

watch:
	hugo --watch

server:
	hugo server -p 8080

clean:
	hugo --gc --cleanDestinationDir

public:
	hugo --cleanDestinationDir --environment public

image: ${IMGDSTS}
	rsync -av ${DROPBOX}/static/ static/

content/%/image: ${DROPBOX}/%
	rsync -auv $^/ $@/

${DROPBOX}/%: | content/%
	mkdir $@
