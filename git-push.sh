#!/bin/bash

if [[ -d .git ]]
then
    echo "Git commit"
    git add .
    git commit -m "$(cat /srv/codepad-project/version)"
fi