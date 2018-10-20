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

## publish folders/files from project root

publish boilerplate
publish @-modules
publish modules
publish static

ssh "$scuser@$schost" "ssh $container sc project restart"

