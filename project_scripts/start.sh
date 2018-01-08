#!/bin/bash

## This script should help to go into production quickly.

## Please enter your notification email address
readonly email=

readonly NOW=$(date +%Y.%m.%d-%H:%M:%S)

[[ -z "$email" ]] && exit 111

echo "enable node binding to privileged ports"
## Allow Node to bind to privileged ports (80 and 443 for example .)
setcap cap_net_bind_service=+ep /usr/bin/node

pid=/var/codepad/project.pid
kill "$(cat "$pid")"
rm -fr "$pid"

echo "START running the node loop as $USER"
while true
do
    echo "Starting the node process as codepad"
    su codepad -s /bin/bash -c 'node server.js'
    echo "THE NODE PROCESS EXITED WITH CODE $?"
    sleep 1
    journalctl -u project -n 20 | mail -s "NodeJS ERROR in $HOSTNAME $NOW" "$email"
done
