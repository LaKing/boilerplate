## mongodb database installation
   
   dnf -y install mongodb mongodb-server
   dnf -y install mongo-tools
   
   systemctl enable mongod
   systemctl start mongod
   systemctl status mongod --no-pager