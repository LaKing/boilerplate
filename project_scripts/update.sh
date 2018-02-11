#!/bin/bash

CWD="$PWD"

if [[ -w $CWD/boilerplate/modules ]]
then
    for f in "$CWD"/boilerplate/modules/*
    do
        echo ''
        if [[ -f $f/npm.sh ]]
        then
            cd $f 
            pwd
            bash npm.sh
        fi
    done
fi

if [[ -w $CWD/modules ]]
then
    for f in "$CWD"/modules/*
    do
        echo ''
        if [[ -f $f/npm.sh ]]
        then
            cd $f 
            pwd
            bash npm.sh
        fi
    done
fi
