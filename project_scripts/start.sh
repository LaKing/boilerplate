#!/bin/bash

## This script should help to go into production quickly.

## Please enter your notification email address
readonly email=

readonly NOW=$(date +%Y.%m.%d-%H:%M:%S)

#[[ -z "$email" ]] && echo 'No email address.' && exit 111

echo "enable node binding to privileged ports"
## Allow Node to bind to privileged ports (80 and 443 for example .)
setcap cap_net_bind_service=+ep /usr/bin/node

pid=/var/codepad/project.pid
log=/var/codepad/project.log

echo "START running the node loop as $USER, pid $$"

while true
do
    echo "________________________________________"

    if [[ -f $pid ]]
    then
        echo "Found pidfile, killing $(cat "$pid")"
        kill "$(cat "$pid")"
        rm -fr "$pid"
        sleep 1
    fi

    (echo >/dev/tcp/localhost/80) &>/dev/null && echo "TCP port 80 opened by an application" || echo "TCP port 80 available"
    (echo >/dev/tcp/localhost/443) &>/dev/null && echo "TCP port 443 opened by an application" && exit || echo "TCP port 443 available"

    echo "Starting the node process as codepad"
    cat "$log" >> "/var/codepad/service-$(date +%Y.%m.%d-%H:%M:%S).log"
    echo "RESTARTING project.service (pid $$)" > "$log"
    su codepad -s /bin/bash -c 'node server.js' >> "$log" 2>&1
    exit_code=$?
    echo "- the node process exited with $exit_code"
    sleep 1
    if [[ ! -z "$email" ]] && [[ $exit_code != 143 ]]
    then
        cat "$log" | mail -s "NodeJS ERROR in $HOSTNAME $NOW" "$email"
    fi
done
