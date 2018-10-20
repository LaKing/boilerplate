 #!/bin/bash

CWD="$PWD"

if [[ -f npm.sh ]]
then
    pwd
    source npm.sh
fi

if [[ -f boilerplate/global/npm.sh ]]
then
    cd boilerplate/global
    pwd
    source npm.sh
fi

cd "$CWD"

for f in "$CWD"/*-modules/*
do
    echo ''
    if [[ -f $f/npm.sh ]]
    then
        cd $f 
        pwd
        source npm.sh
    fi
done
