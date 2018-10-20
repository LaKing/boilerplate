#!/bin/bash

## get project directory - this file should reside in the project root folder
wd=/srv/codepad-project
cd "$wd"

if [[ ! -d $wd ]]
then
	echo "Project Working Directory not found. Nothing to push. ?"
    exit
fi

project_log=/var/codepad/project.log
project_pid=/var/codepad/project.pid
push_lock=/var/codepad/push_lock

[[ -f $push_lock ]] && exit 11

NOW=$(date +%Y.%m.%d-%H:%M:%S)
echo "$NOW" > "$push_lock"

function push_unlock() {
    rm -fr "$push_lock"
}

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
       push_unlock
       exit 0
    else
       log "user $USER failed to push and restart the project.service"
    fi
}

function terminate_process() {
    local var lastpid
    if [[ -f "$project_pid" ]]
    then
        lastpid="$(cat "$project_pid")"
        if ps -p "$lastpid" > /dev/null
        then
            log "Found pidfile, process running, sending SIGUSR1 to process $lastpid"
            run kill -SIGUSR1 "$lastpid"
            sleep 0.1
            var=1
            while ps -p "$lastpid" > /dev/null
            do
                log "pid $lastpid is still running ($var)"
                sleep 1
                ((var++))
                run kill -SIGUSR1 "$lastpid"
                [[ $var == 3 ]] && log "$lastpid still runnin, not normal! check your event loop."
                [[ $var == 5 ]] && run kill -SIGINT "$lastpid"
                [[ $var == 10 ]] && run kill -KILL "$lastpid"
                [[ $var == 15 ]] && run kill -TERM "$lastpid"
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
        push_unlock
        exit 87
    fi

    log "$USER starting server.js as standalone process"

    (echo >/dev/tcp/localhost/80) &>/dev/null && log "TCP port 80 opened by an application" || log "TCP port 80 available"
    (echo >/dev/tcp/localhost/443) &>/dev/null && log "TCP port 443 opened by an application, exiting." && push_unlock && exit 80 || log "TCP port 443 available"

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
    log "push-as-root, chown project"

    chown -R codepad:codepad $wd 2> /dev/null
    chmod -R +X $wd 2> /dev/null

    setcap cap_net_bind_service=+ep /usr/bin/node

    ## in production you may want to restart the service
    #terminate_process
    #restart_service    
fi

if [[ $USER == codepad ]]
then
    increment_version
fi

terminate_process

if [[ -f "$project_pid" ]] && ps -p "$(cat "$project_pid")" > /dev/null
then
    log "Project appears to be running"
else
    log "Project appears to be stopped"
    start_server
fi

log "pidof node: $(pidof node)"

push_unlock

## adjust to project compile/startup-time
sleep 4

if [[ -f "$project_pid" ]] && ps -p "$(cat "$project_pid")" > /dev/null
then
    log "Project appears to be running"
    exit 0
else
    exit 1
fi


