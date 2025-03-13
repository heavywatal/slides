DROPBOX := ${HOME}/Library/CloudStorage/Dropbox
SYNC_ROOT := ${DROPBOX}/slides/image
DECKS := $(wildcard content/*)
NAMES := $(notdir ${DECKS})
IMG_DSTS := $(addsuffix /image,${DECKS})
IMG_SRCS := $(addprefix ${SYNC_ROOT}/,${NAMES})

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

image: ${IMG_DSTS}
	rsync -auvC ${SYNC_ROOT}-static/ static/

content/%/image: ${SYNC_ROOT}/%
	rsync -auvC $^/ $@/

${SYNC_ROOT}/%: | content/%
	mkdir $@

.PHONY: working
working:
	@ls -l $@
	$(MAKE) -C $@/.knitr
	$(MAKE) all
