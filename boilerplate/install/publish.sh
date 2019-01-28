#!/bin/bash
## propduction server
schost="r2.d250.hu"
## user on the production server
scuser="project-devel"
## container on the production server
container="example.com"
## project in the container
publishdir="/srv/codepad-project"

echo "PUBLISHING FROM $HOSTNAME"
function publish() {
    echo "PUBLISH $1"
    rsync --delete -avz -e "ssh -A $scuser@$schost ssh" "$publishdir/$1" "root@$container:$publishdir"
}

## publish the stack
bpd=/usr/local/share/boilerplate/boilerplate
bmd=/usr/local/share/boilerplate/@vue-modules

ssh $scuser@$schost 'mkdir -p /usr/local/share/boilerplate'
rsync -avz -e "ssh -A $scuser@$schost ssh" "$bpd" "root@$container:/usr/local/share/boilerplate"
rsync -avz -e "ssh -A $scuser@$schost ssh" "$bmd" "root@$container:/usr/local/share/boilerplate"

## publish folders/files from project root

publish boilerplate
publish *modules

ssh "$scuser@$schost" "ssh $container /bin/srvctl project restart"