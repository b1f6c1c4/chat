#!/bin/sh

echo "This is chat docker on $(hostname), version $(cat VERSION)"

if [ "$#" -eq 0 ]; then
	echo "Error: no cmd found"
	exit 127
fi

set -x

pwd
ls -lhA /root
uname -a
cat /etc/*-release
ls -lhA /etc/chat

sleep 3

/root/tinode-db -config "/etc/chat/tinode.conf" || echo "Seems already created"

exec "$@"
