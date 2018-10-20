#!/bin/bash

## This scriptr assumes you have a /srv/codepad-project/boilerplate - that you wantto get running

if [[ ! -d /srv/codepad-project ]]
then
    echo "This is not a codepad-project. exiting."
    exit
fi  
  
if [[ ! -d /srv/codepad-project/boilerplate ]]
then
    echo "This is not a ßoilerplate based codepad-project. exiting."
    exit
fi    

if [[ $PWD != /srv/codepad-project/boilerplate/project_scripts ]]
then
    echo "The location you call this script from should be /srv/codepad-project/boilerplate/project_scripts"
    exit
fi

for f in *
do
    if [[ $f == install_project_scripts.sh ]]
    then
        continue
    fi
    
    if [[ -f /srv/codepad-project/$f ]]
    then
        echo " @ $f"
        diff "/srv/codepad-project/boilerplate/project_scripts/$f" "/srv/codepad-project/$f" 
    else
        echo " @ Creating $f"
        cat "/srv/codepad-project/boilerplate/project_scripts/$f" > "/srv/codepad-project/$f"
    fi
done

cat /srv/codepad-project/boilerplate/project_scripts/.gitignore > /srv/codepad-project/.gitignore
chmod 744 /srv/codepad-project/*.sh

