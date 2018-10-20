#!/bin/bash

project_path='/srv/codepad-project';
up="$project_path/uplink.sh"

echo '#!/bin/bash' > "$up"

cd "$project_path"
mkdir -p @-modules

for m in boilerplate/@*-modules
do
    if [[ -d $m ]]
    then
       dir="$(basename $m)"
       echo "# -- $dir --" >> "$up"
       #echo "mkdir -p $dir" >> "$up"
       for n in $m/*
       do
           if [[ -d $n ]]
           then
              #echo "ln -s $project_path/$n $project_path/$dir/$(basename $n)" >> "$up"
               echo "ln -s $project_path/$n $project_path/@-modules/$(basename $n)" >> "$up"
           fi
       done
    fi
done

cat "$up"
