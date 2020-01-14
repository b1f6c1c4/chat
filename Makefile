LDFLAGS=-s -w -X main.buildstamp=$$(cat VERSION)

all: bin/keygen bin/server bin/tinode-db

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
