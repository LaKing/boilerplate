#!/bin/bash

## enforce codepad user
if [[ $UID != 0 ]]
then
    echo "This install script has to run with root privileges. Currently running as $USER"
    exit 1
fi

INSTALL_BIN="$(realpath "$BASH_SOURCE")"
INSTALL_DIR="${INSTALL_BIN:0:-11}"

## ensure user is using the /srv directory
INSTALL_SRV="$(dirname $(dirname "$INSTALL_DIR"))"
if [[ $INSTALL_SRV == /srv ]]
then
    echo "Installing in /srv - OK"
else
    echo "Installing shall be done into the folder /srv, please move the boilerplate into that folder and rename it according to your project name. Exiting for now."
    exit 7
fi

## by default we enforce running as user codepad - for historic reasons, could be a system user with another name.
user=codepad

## using codepad user or not, we have that silly requirement of having a codepad user on the system. 
echo "Checking if codepad user id is 104?"
if id -u "$user"
then
    echo "Using default user codepad"
else
    echo "Adding user and group codepad with uid and gid 104 as default user"
    
    groupadd -r -g 104 codepad
    useradd -r -u 104 -g 104 -s /bin/bash -d /var/codepad codepad
fi

cd ..
NAME=${PWD##*/}

## we assume our codepad-based project directory structure by default
if [[ -f install-defaults.sh ]]
    then
    if source install-defaults.sh
    then
	    echo "Loaded install-defaults. NAME: $NAME , user and group: $user"
    else
	    echo "Could not load install defaults."
        exit 12
    fi
fi

CWD=/srv/"$NAME"
VAR=/var/"$NAME"
NOW=$(date +%Y.%m.%d-%H:%M:%S)

## working directory
echo "Started $NAME install.sh $NOW"
project_log="/$VAR/project.log"
mkdir -p "$VAR"
echo '' > "$project_log"

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

if [[ ! -d $CWD ]]
then
    log "Target working directory is $CWD"
    mkdir -p $CWD
fi

chown -R "$user:$user" "$CWD"
chmod -R +X "$CWD"

## we also set up a directory in /var for localized files, logs, editor files - wich are disposable files
mkdir -p "$VAR"
if [[ -L $CWD/var ]]
then
    echo "link to /var exists"
else
    ln -s "$VAR" "$CWD/var"
fi

chown -R "$user:$user" "$VAR"

## on other distros this might be different
log "Disabling httpd apache webserver: httpd"
   systemctl disable httpd
   systemctl stop httpd


log "Running git user configurations"

   git config --global user.email "$user@$HOSTNAME"
   git config --global user.name "$user"


## copy all files froom install dir into the working directory
if [[ -d $INSTALL_DIR/install ]]
then
    log "Copy install script files"
    for f in "$INSTALL_DIR"/install/*
    do
    	file="$(basename "$f")"
        if [[ -f $CWD/$file ]]
        then
            echo " @ install/$file already exists"
        else
            echo " @ Creating $f"
            cat "$f" >> "$CWD/$file"
        fi
    done

    ## make shell scripts executeable
    chmod 744 "$CWD"/*.sh

fi

log "enable node binding to privileged ports"
    ## Allow Node to bind to privileged ports (80 and 443 for example .)
    setcap cap_net_bind_service=+ep /usr/bin/node


log "Create project service"
cat > /etc/systemd/system/project.service << EOF
## srvctl generated
[Unit]
Description=$NAME
After=syslog.target network.target
OnFailure=notify.service
[Service]
PermissionsStartOnly=true
Type=simple
WorkingDirectory=$CWD
ExecStartPre=/bin/bash -c 'echo SERVICE-RESTART > $project_log'
ExecStartPre=/usr/sbin/setcap cap_net_bind_service=+ep /usr/bin/node
ExecStart=/bin/node --preserve-symlinks $CWD/server.js
PIDFile=/var/$NAME/project.pid
User=$user
Group=$user
Restart=always
RestartSec=3
SyslogIdentifier=project

# Environment variables:
Environment=NODE_ENV=production
# Allow many incoming connections
LimitNOFILE=infinity
# Allow core dumps for debugging
LimitCORE=infinity
StandardInput=null
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
EOF

## cat /etc/systemd/system/project.service

## if the app crashes we can send an email via systemd notify service
cat > /etc/systemd/system/notify.service << EOF
[Unit]
Description=Unit Status Mailer Service
After=network.target
[Service]
Type=simple
ExecStart=/bin/bash $CWD/notify.sh
EOF

## cat /etc/systemd/system/notify.service

## syslog routes our console log to a file and to journald.
syslogconf="/etc/rsyslog.d/project.conf"

if [[ -d /etc/rsyslog.d ]]
then
	echo "rsyslog already installed. good."
else
	echo "Attemt to install rsyslog"
    dnf -y install rsyslog
fi

{
    echo '$template plainFormat,"%msg%\n"'
    echo 'if $programname == "project" then /var/'"$NAME"'/project.log;plainFormat'
    echo 'if $programname == "project" then stop'
} > "$syslogconf"


log "rsyslog configuration"
systemctl restart rsyslog.service
systemctl status rsyslog.service

log "daemon-reload"
systemctl daemon-reload

systemctl status project.service

## we will delete previousley created files to recreate them - in case installation dir changes for example.
rm -fr /bin/ß
rm -fr /bin/push
rm -fr /bin/publish

if [[ ! -e "$CWD"/boilerplate ]]
then
    log "Create boilerplate symlink"
    ln -s "$INSTALL_DIR" "$CWD/boilerplate"
fi


if [[ -e "$CWD"/boilerplate/cli.sh ]] && [[ ! -f /bin/ß ]]
then
    log "Create ß cli command"
    ln -s "$CWD"/boilerplate/cli.sh /bin/ß
    chmod +x /bin/ß
fi

## create a symlink to push.sh.
if [[ -e "$CWD"/boilerplate/push.sh ]] && [[ ! -f "$CWD"/push.sh ]]
then
    log "Create push symlink"
    ln -s "$CWD"/boilerplate/push.sh "$CWD"/push.sh
    chmod +x /bin/push
fi

## create symlink to the hard link
if [[ -e "$CWD"/push.sh ]] && [[ ! -f /bin/push ]]
then
    log "Create push command"
    ln -s "$CWD"/push.sh /bin/push
    chmod +x /bin/push
fi

if [[ -e "$CWD"/publish.sh ]] && [[ ! /bin/publish ]]
then
    log "Create publish command"
    ln -s "$CWD"/publish.sh /bin/publish
    chmod +x /bin/publish
fi
	
## create a key for root
if [[ ! -f /root/.ssh/id_rsa ]]
then
    ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N '' -C "boilerplate@$HOSTNAME"
fi


## if codepad exists symlink log and pid files
if [[ -d /var/codepad ]]
then
    rm -fr /var/codepad/project.pid
    rm -fr /var/codepad/project.log
    ln -s "$project_log" /var/codepad/project.log
    ln -s /var/"$NAME"/project.pid /var/codepad/project.pid
	
    ## we need to be able to connect with the user via ssh as root to be able to push and to run install commands properly
    if [[ -d /var/codepad/.ssh ]] && [[ -f /var/codepad/.ssh/id_rsa.pub ]]
    then
        if [[ -f /root/.ssh/authorized_keys ]] && grep -q "$(cat /var/codepad/.ssh/id_rsa.pub)" /root/.ssh/authorized_keys
        then
            echo 'codepad already authorized to root ssh'
        else
            cat /var/codepad/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
        fi
    else
        echo 'Check codepad ssh configurations in your installation.'
    fi

fi

log "Finished install.sh $NOW"

## continiue install process within the boilerplate cli
/bin/ß help
