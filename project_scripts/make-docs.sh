#!/bin/bash

md=false

if [[ $1 == md ]]
then
    md=true
fi

module_exports_prefix="module.exports = function"

function process() {
    local g f m
    ## global-scope
    g="$1"
    ## folder
    f="$2"
    ## module 
    m="$( basename "$f")" 
    echo "## $m - $g module"
    echo ''
    
    [[ -f "$f/module-condition.js" ]] && echo "- activation based on a condition."
    [[ -f "$f/npm.sh" ]] && echo "- uses npm packages."
    [[ -d "$f/user_model/keys" ]] && echo "- defines keys the user model."
    [[ -d "$f/user_model/methods" ]] && echo "- defines methods for the user model."
    [[ -d "$f/public" ]] && echo "- contains multilingual public frontend files."
    [[ -d "$f/static" ]] && echo "- contains static frontend assets."
    [[ -d "$f/routes" ]] && echo "- contains route definitions for the frontend."
    [[ -d "$f/init" ]] && echo "- backend init process functions."
    [[ -d "$f/server" ]] && echo "- backend server process functions."
    [[ -d "$f/start" ]] && echo "- backend start process functions."
    [[ -d "$f/debug" ]] && echo "- backend debug process functions."

    echo ''

    if [[ -d "$f/global" ]]
    then
        echo '  exposes into the global ß scope:'
        [[ $md == true ]] && echo '```javascript' || echo ''
        for i in $f/global/*
        do  
            if [[ -f $i ]]
            then
                echo "    $(cat "$i" | grep 'ß' | grep '=' | awk '{print $1;}')"
            fi
        done
        [[ $md == true ]] && echo '```' || echo ''
    fi
    
    
    cd "$f" 
    find . | grep -hir '// @DOC' | cut -c 9- > doc.md
    
    if [[ -d "$f/lib" ]]
    then
        echo '  boiler-lib-functions:'
        [[ $md == true ]] && echo '```javascript' || echo ''
        cd "$f/lib"
        for i in $f/lib/*
        do  
            if [[ -f $i ]]
            then
                fn="$( basename "$i")"
                line="$(grep "module.exports" "$i")"
                args="${line#$module_exports_prefix}"
                echo "    ß.lib.$m.${fn:0: -3}${args// {};"
            fi
        done
        [[ $md == true ]] && echo '```' || echo ''
    fi
    
    if [[ -d "$f/hooks" ]]
    then
        echo '  hook.functions:'
        [[ $md == true ]] && echo '```javascript' || echo ''
        cd "$f/hooks"
        for i in $f/hooks/*
        do  
            if [[ -f $i ]]
            then
                fn="$( basename "$i")"
                line="$(grep "module.exports" "$i")"
                args="${line#$module_exports_prefix}"
                echo "    ${fn:0: -3}${args// {};"
            fi
        done
        [[ $md == true ]] && echo '```' || echo ''
    fi
    
    cd $f
    if [[ ! -z "$(find . | grep -hir 'ß.run_hook' | xargs)" ]]
    then
        echo '  calling hooks:'
        [[ $md == true ]] && echo '```javascript' || echo ''
        for t in "$(find . | grep -hir 'ß.run_hook' | tr -d ' ')"
        do
            echo "    $t"
        done
        [[ $md == true ]] && echo '```' || echo ''
    fi
    
    cd "$f"
    cat doc.md
    echo ''
}


CWD="$PWD"

echo "# The global ßoiler mechanism"
echo ''

if [[ -w $CWD/boilerplate/global ]]
then
    cd $CWD/boilerplate/global
    find . | grep -hir '// @DOC' | cut -c 9- > doc.md
    cat doc.md
fi

echo ''
echo "# The global ßoilerplate modules"
echo ''

if [[ -w $CWD/boilerplate/modules ]]
then
    for f in "$CWD"/boilerplate/modules/*
    do   
        process boilerplate "$f" 
    done
fi

if [[ -d  $CWD/modules ]]
then

    echo ''
    echo "# The local project modules"
    echo ''

    if [[ -w $CWD/modules ]]
    then
        for f in "$CWD"/modules/*
        do
            process project "$f" 
        done
    fi

fi
