#!/bin/bash

echo "enable node binding to privileged ports"
## Allow Node to bind to privileged ports (80 and 443 for example .)
setcap cap_net_bind_service=+ep /usr/bin/node

echo "running npm installer"
npm install

echo "Install mongodb"
dnf -y install mongodb mongodb-server



## ez nem 100% hogy kell TODO kell?
dnf -y install mongoose

echo "start mongodb"
systemctl enable mongod
systemctl start mongod
systemctl status mongod --no-pager

echo "Disabling httpd apache webserver"
systemctl disable httpd
systemctl stop httpd

echo "Running git configurations"

git config --global user.email "codepad@localhost"
git config --global user.name "Codepad"

echo "Create project service"

cat > "/usr/lib/systemd/system/project.service" << EOF
## srvctl generated
[Unit]
Description=Codepad project in production.
After=syslog.target network.target

[Service]
Type=simple
WorkingDirectory=/srv/codepad-project
ExecStart=/bin/bash /srv/codepad-project/start.sh
#User=codepad
#Group=codepad

[Install]
WantedBy=multi-user.target

EOF

systemctl daemon-reload

echo "READY"
