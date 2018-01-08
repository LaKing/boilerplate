#!/bin/bash

## This script is for the development on codepad. Push action defines what has to happen when the push button is pressed.
check_typescript=false;

## get project directory - this file should reside in the project root folder
wd=/srv/codepad-project

log=/var/codepad/project.log
pid=/var/codepad/project.pid

chown -R codepad:codepad $wd 2> /dev/null
chmod -R +X $wd 2> /dev/null

NOW=$(date +%Y.%m.%d-%H:%M:%S)

## enforce codepad user
if [[ $USER != codepad ]]
then
    su codepad -s /bin/bash -c "$0"
    exit
fi

cd $wd

## INCREMENT VERSION

if ! [ -f "$wd/version" ]
then
    echo 0.0.0 > $wd/version
fi

## current version
# shellcheck disable=SC2006
# shellcheck disable=SC2002
cv=`cat $wd/version | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}'`
echo "$cv" > "$wd/version"
echo "PUSH VERSION $cv of $HOSTNAME:$wd $NOW"
echo "PUSH VERSION $cv of $HOSTNAME:$wd $NOW" > "$log"


if [ -f "$wd/server.js" ]
then
    
    echo "PUSH - RESTARTING server.js" >> "$log"
    
    [[ -f "$pid" ]] && kill "$(cat "$pid")"
    
    /bin/node "$wd/server.js" >> "$log" 2>&1 &
    echo $! > "$pid"
    cat "$pid"
fi

echo "Ready."

