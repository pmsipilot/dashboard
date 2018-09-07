DASHBOARD_ENV ?= dev

SRC_JS ?= app/js
SRC_ASSETS ?= app/scss
DIST_DIR ?= dist
NODE_MODULES ?= node_modules
BIN_DIR ?= node_modules/.bin
DOCKERFILE ?= Dockerfile

ALL_SRC_JS ?= $(call recurse,$(SRC_JS),*.js)
ALL_SRC_ASSETS ?= $(call recurse,$(SRC_ASSETS),*.scss)

recurse=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call recurse,$d/,$2))

NPM ?= npm
DOCKER ?= docker
BROWSERIFY ?= $(BIN_DIR)/browserify
NODE-SASS ?= $(BIN_DIR)/node-sass

.SUFFIXES:
.PHONY: up js assets docker clean
.LOW_RESOLUTION_TIME:

up: js assets
js: $(DIST_DIR)/dashboard.js
assets: $(DIST_DIR)/dashboard.css
docker: $(DOCKERFILE)
	$(DOCKER) build -t dashboard-image .
clean:
	-@rm -rf $(DIST_DIR)
	@/bin/echo -e "dist removed"
	-@rm -rf $(NODE_MODULES)
	@/bin/echo -e "node modules removed"

#########

$(NODE_MODULES): package.json package-lock.json
	$(NPM) install --ignore-scripts && $(NPM) rebuild node-sass

#########

$(DIST_DIR)/dashboard.js: $(DIST_DIR) $(NODE_MODULES) $(ALL_SRC_JS)
ifeq ($(DASHBOARD_ENV),dev)
	$(BROWSERIFY) $(SRC_JS)/client/client.jsx --debug --outfile $(DIST_DIR)/dashboard.js --transform [babelify]
else
	$(BROWSERIFY) $(SRC_JS)/client/client.jsx --transform [babelify] | $(BIN_DIR)/uglifyjs --compress --output $(DIST_DIR)/dashboard.js
endif

$(DIST_DIR)/dashboard.css: $(DIST_DIR) $(NODE_MODULES) $(ALL_SRC_ASSETS)
	$(NODE-SASS) $(SRC_ASSETS)/app.scss $(DIST_DIR)/dashboard.css

#########

$(DIST_DIR):
	@mkdir -p $@
