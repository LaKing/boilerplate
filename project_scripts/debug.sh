#!/bin/bash

pid=/var/codepad/project.pid
[[ -f "$pid" ]] && kill "$(cat "$pid")"

setcap cap_net_bind_service=+ep /usr/bin/node

node server.js

sleep 3