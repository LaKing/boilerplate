#!/bin/bash

## make sure we are in the right folder
INSTALL_BIN="$(realpath "$BASH_SOURCE")"
INSTALL_DIR="${INSTALL_BIN:0:-8}"
cd "$INSTALL_DIR"

## process our pushfiles..
source boilerplate/pushlib.sh