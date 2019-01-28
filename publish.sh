#!/bin/bash

echo "git add ."
git add .
echo "git commit -m codepad"
git commit -m "$(cat version)"
echo "git push"
git push
echo "OK"
