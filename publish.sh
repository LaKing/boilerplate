#!/bin/bash

version="$(cat version)"

echo "git add ."
git add .
echo "git commit -m $version"
git commit -m "$version"
echo "git push"
git push
echo "OK"
