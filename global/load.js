/*jshint esnext: true */

const fs = require('fs-extra');

// @DOC ## ßoilerplate/global/load.js
// @DOC Simply requiring files
// @DOC Passing a 'dir' as an argument to ß.load()
// @DOC It will load all the files in 'dir', first in our modules folder - if that not exists, it will use ßoilerplate/modules

function acquire_module_dir(m, dir) {

    var p = '/modules/' + m + '/' + dir;

    var cpfiles = [];
    if (fs.existsSync(ß.CWD + p)) cpfiles = fs.readdirSync(ß.CWD + p);

    var bpfiles = [];
    if (fs.existsSync(ß.BPD + p)) bpfiles = fs.readdirSync(ß.BPD + p);

    var files = [...new Set([...cpfiles, ...bpfiles])];

    for (var i = 0; i < files.length; i++) {
        if (cpfiles.indexOf(files[i]) >= 0) require(ß.CWD + p + '/' + files[i]);
        else
        if (bpfiles.indexOf(files[i]) >= 0) require(ß.BPD + p + '/' + files[i]);
    }
}

// load is basicallay an acquire for all files

ß.load = function(dir) {

    for (var i = 0; i < ß.modules.length; i++) {
        acquire_module_dir(ß.modules[i], dir);
    }

    if (fs.existsSync(ß.CWD + '/' + dir)) {
        var files = fs.readdirSync(ß.CWD + '/' + dir);
        for (var j = 0; j < files.length; j++) {
            if (files[j].split('.').reverse()[0] === 'js')
                require(ß.CWD + '/' + dir + '/' + files[j]);
        }
    }

    console.log('- Load', dir, 'complete');
};