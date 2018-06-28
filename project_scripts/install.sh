#!/bin/bash

bash make-cert.sh

## get project directory - this file should reside in the project root folder
wd=/srv/codepad-project
cd "$wd"

project_log=/var/codepad/project.log
mkdir -p /var/codepad

chown -R codepad:codepad $wd 2> /dev/null
chmod -R +X $wd 2> /dev/null

NOW=$(date +%Y.%m.%d-%H:%M:%S)

## enforce codepad user
if [[ $UID != 0 ]]
then
    echo "This script has to run as root. Currently running as $USER"
    exit 1
fi

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

function install_dependencies() {

   log "Running the installer"
   npm install

   log "Install mongodb"
   dnf -y install mongodb mongodb-server
   dnf -y install mongo-tools

   ## ez nem 100% hogy kell TODO kell?
   #dnf -y install mongoose

   log "start mongodb"
   systemctl enable mongod
   systemctl start mongod
   systemctl status mongod --no-pager


   log "Disabling httpd apache webserver"
   systemctl disable httpd
   systemctl stop httpd

   log "Running git user configurations"

   git config --global user.email "codepad@$HOSTNAME"
   git config --global user.name "Codepad"

}

echo '' > "$project_log"
log 'Started the ßoilerplate installer'
chown -R codepad:codepad /var/codepad
chown -R codepad:codepad "$wd"

install_dependencies

log "enable node binding to privileged ports"
## Allow Node to bind to privileged ports (80 and 443 for example .)
setcap cap_net_bind_service=+ep /usr/bin/node

echo "Create project service"

cat > "/etc/systemd/system/project.service" << EOF
## srvctl generated
[Unit]
Description=Codepad/ßoilerplate project in production
After=syslog.target network.target
OnFailure=notify.service
[Service]
PermissionsStartOnly=true
Type=simple
WorkingDirectory=/srv/codepad-project
ExecStartPre=/bin/bash -c 'echo SERVICE-RESTART > /var/codepad/project.log'
ExecStartPre=/usr/sbin/setcap cap_net_bind_service=+ep /usr/bin/node
ExecStart=/bin/node /srv/codepad-project/server.js
PIDFile=/var/codepad/project.pid
User=codepad
Group=codepad
Restart=always
RestartSec=3
SyslogIdentifier=project
[Install]
WantedBy=multi-user.target
EOF

cat > "/etc/systemd/system/notify.service" << EOF
[Unit]
Description=Unit Status Mailer Service
After=network.target
[Service]
Type=simple
ExecStart=/bin/bash /srv/codepad-project/notify.sh
EOF

## There is a bug, or something. This has to go to the main conf ...
syslogconf="/etc/rsyslog.d/project.conf"

{
    echo '$template plainFormat,"%msg%\n"'
    echo 'if $programname == "project" then /var/codepad/project.log;plainFormat'
    echo 'if $programname == "project" then ~'
} > "$syslogconf"


log "rsyslog configuration"
systemctl restart rsyslog.service
systemctl status rsyslog.service

log "daemon-reload"
systemctl daemon-reload

# log "enable and start project"
# systemctl enable project.service
# systemctl restart project.service
# sleep 2

systemctl status project.service

echo "ls /var/codepad"
ls /var/codepad

echo "pidof node"
pidof node

sleep 2
#journalctl -u project -f -n 40 --no-pager
cat /var/codepad/project.log

systemctl status project.service

echo "Create ß cli command"
if [[ -f "$wd"/boilerplate/cli.sh ]] && [[ ! -f /bin/ß ]]
then
    ln -s "$wd"/boilerplate/cli.sh /bin/ß
    chmod +x /bin/ß
fi


echo "Create push command"
if [[ -f "$wd"/push.sh ]] && [[ ! -f /bin/push ]]
then
    ln -s "$wd"/push.sh /bin/push
    chmod +x /bin/push
fi

echo "Create publish command"
if [[ -f "$wd"/publish.sh ]] && [[ ! /bin/publish ]]
then
    ln -s "$wd"/publish.sh /bin/publish
    chmod +x /bin/publish
fi

if [[ ! -f /root/.ssh/id_rsa ]]
then
    ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N '' -C "boilerplate@$HOSTNAME"
fi

    echo "NOTE root ssh publickey:"
    cat /root/.ssh/id_rsa.pub


echo "READY"
