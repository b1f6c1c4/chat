LDFLAGS=-s -w -X main.buildstamp=$$(cat VERSION)

all: backend

dc: dc-frontend dc-backend

dc-frontend: frontend
	docker-compose build nginx

frontend: # TODO

dc-backend: backend
	rm -rf bin/entrypoint.sh bin/Makefile bin/VERSION bin/templ
	cp -R entrypoint.sh Makefile VERSION src/server/templ bin/
	docker-compose build tinode

backend: bin/keygen bin/server bin/tinode-db

bin/keygen: FORCE VERSION
	go install -ldflags "$(LDFLAGS)" keygen

bin/server: FORCE VERSION
	go install -ldflags "$(LDFLAGS)" -tags rethinkdb server

bin/tinode-db: FORCE VERSION
	go install -ldflags "$(LDFLAGS)" -tags rethinkdb tinode-db

VERSION: FORCE
	-./version.sh

FORCE:

clean:
	rm -rf bin/
