## mongodb repo installation

cat > /etc/yum.repos.d/mongodb-org-4.0.repo << EOF
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
EOF

## mongodb database installation


dnf -y remove mongodb mongodb-server
dnf -y remove mongo-tools

dnf -y install mongodb-org


systemctl enable mongod
systemctl start mongod
systemctl status mongod --no-pager