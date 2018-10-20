 #!/bin/bash

CWD="$PWD"

cd boilerplate/global
bash npm.sh

for f in "$CWD"/boilerplate/modules/*
do
    echo ''
    if [[ -f $f/npm.sh ]]
    then
        cd $f 
        pwd
        source npm.sh
    fi
done

if [[ -d $CWD/modules ]]
then
    for f in "$CWD"/modules/*
    do
        echo ''
        if [[ -f $f/npm.sh ]]
        then
            cd $f 
            pwd
            source npm.sh
        fi
    done
fi