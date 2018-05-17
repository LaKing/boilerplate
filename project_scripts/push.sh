#!/bin/bash

## get project directory - this file should reside in the project root folder
wd=/srv/codepad-project
cd "$wd"

project_log=/var/codepad/project.log
project_pid=/var/codepad/project.pid

NOW=$(date +%Y.%m.%d-%H:%M:%S)


function log() {
    local msg
    msg=$*
    echo "# $msg"
    echo "# $msg" >> "$project_log"
}


function run() {
    local cmd
    cmd=$*
    echo "# $cmd"
    echo "# $cmd" >> "$project_log"
    $* 2>&1 >> "$project_log"
}

function restart_service() {

    systemctl enable project.service

    if systemctl restart project.service
    then
       log "$USER successfully restarted project.service, push complete, exiting."
       systemctl status project
       make_docs
       exit 0
    else
       log "user $USER failed to push and restart the project.service"
    fi
}

function send_sigusr() {
    if [[ -f "$project_pid" ]]
    then
        lastpid="$(cat "$project_pid")"
        if ps -p "$lastpid" > /dev/null
        then
            log "Found pidfile, process running, sending SIGUSR1 to process $lastpid"
            run kill -SIGUSR1 "$lastpid"
            while ps -p "$lastpid" > /dev/null
            do
                log "pid $lastpid is still running"
                sleep 1 
            done
            log "pid $lastpid process finished"
        else
           log "no running process with pid $lastpid from project pidfile. Removing pidfile."
           rm -fr "$project_pid"
        fi
    else
        log "no pidfile"
    fi
}

function start_server() {
    if [ ! -f "$wd/server.js" ]
    then
        log "$wd/server.js not found"
        return
    fi

    log "$USER starting server.js as standalone process"

    (echo >/dev/tcp/localhost/80) &>/dev/null && log "TCP port 80 opened by an application" || log "TCP port 80 available"
    (echo >/dev/tcp/localhost/443) &>/dev/null && log "TCP port 443 opened by an application, exiting." && exit 1 || log "TCP port 443 available"

    log "Starting server.js as codepad process."
    if [[ $USER != codepad ]]
    then
       su codepad -s /bin/bash -c "/bin/node $wd/server.js" >> "$project_log" 2>&1 &
    else
        /bin/node server.js >> "$project_log" 2>&1 &
    fi
}

function increment_version() {
    cd "$wd"
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
    log "new verion is $cv"
}

function make_docs() {
    log "make-docs"
    /bin/bash /srv/codepad-project/make-docs.sh md > /srv/codepad-project/doc.md
    cat /srv/codepad-project/boilerplate/README.EN.md /srv/codepad-project/doc.md > /srv/codepad-project/README.md
}


echo "PUSH $cv of $HOSTNAME:$wd $NOW" > "$project_log"

if [[ $USER == root ]]
then
    chown -R codepad:codepad $wd 2> /dev/null
    chmod -R +X $wd 2> /dev/null

    setcap cap_net_bind_service=+ep /usr/bin/node
    log "push-as-root"

    ## in production you may want to restart the project as a service
    # send_sigusr
    # restart_service    
fi

if [[ $USER == codepad ]]
then
    increment_version
fi

send_sigusr

if [[ -f "$project_pid" ]] && ps -p "$(cat "$project_pid")" > /dev/null
then
    log "Project appears to be running"
else
    log "Project appears to be stopped"
    start_server
fi

log "pidof node: $(pidof node)"

log "push complete, exit 0"
exit 0
