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
	hugo --environment development

benchmark:
	hugo --templateMetrics --templateMetricsHints

watch:
	hugo --environment development --watch

server:
	hugo server -p 8080

clean:
	hugo --environment development --gc --cleanDestinationDir

public:
	hugo --cleanDestinationDir

image: ${IMG_DSTS}
	rsync -auvC ${SYNC_ROOT}-static/ static/

content/%/image: ${SYNC_ROOT}/%
	rsync -auvC $^/ $@/

${SYNC_ROOT}/%: | content/%
	mkdir $@

.PHONY: working module
working:
	@ls -l $@
	$(MAKE) -C $@
	$(MAKE) all

module:
	mv config/_default/module.toml config/_default/module-disabled.toml
	hugo mod get -u ./... && hugo mod tidy
	mv config/_default/module-disabled.toml config/_default/module.toml
