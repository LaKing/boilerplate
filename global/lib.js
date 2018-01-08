/*jshint esnext: true */

const fs = require('fs-extra');

if (!ß.lib) ß.lib = {};


function get_module_libs(m) {

    var r = {};
    var p = '/modules/' + m + '/lib';

    var cpfiles = [];
    if (fs.existsSync(ß.CWD + p)) cpfiles = fs.readdirSync(ß.CWD + p);

    var bpfiles = [];
    if (fs.existsSync(ß.BPD + p)) bpfiles = fs.readdirSync(ß.BPD + p);

    var files = [...new Set([...cpfiles, ...bpfiles])];

    for (var i = 0; i < files.length; i++) {
        if (cpfiles.indexOf(files[i]) >= 0) r[files[i].split('.')[0]] = require(ß.CWD + p + '/' + files[i]);
        else
        if (bpfiles.indexOf(files[i]) >= 0) r[files[i].split('.')[0]] = require(ß.BPD + p + '/' + files[i]);
    }


    return r;
}

ß.init_modules_libs = function(modules) {
    for (var i = 0; i < modules.length; i++) {
        ß.lib[modules[i]] = get_module_libs(modules[i]);
    }
};


/*

// global level and boilerplate level libs - outdated by module level libs

var bplib = [];
if (fs.existsSync(ß.BPD + '/lib')) bplib = fs.readdirSync(ß.BPD + '/lib');

var cplib = [];
if (fs.existsSync(ß.CWD + '/lib')) cplib = fs.readdirSync(ß.CWD + '/lib');

var libs = [...new Set([...bplib, ...cplib])];

function add_lib(lib) {

    //console.log("@add_lib", lib);

    ß.lib[lib] = {};

    var bpfiles = [];
    if (fs.existsSync(ß.BPD + '/lib/' + lib)) bpfiles = fs.readdirSync(ß.BPD + '/lib/' + lib);

    var cpfiles = [];
    if (fs.existsSync(ß.CWD + '/lib/' + lib)) cpfiles = fs.readdirSync(ß.CWD + '/lib/' + lib);

    var files = [...new Set([...bpfiles, ...cpfiles])];

    for (var i = 0; i < files.length; i++) {
        if (files[i] !== 'index.js') {
            if (cpfiles.indexOf(files[i]) >= 0) ß.lib[lib][files[i].split('.')[0]] = require(ß.CWD + '/lib/' + lib + '/' + files[i]);
            else
            if (bpfiles.indexOf(files[i]) >= 0) ß.lib[lib][files[i].split('.')[0]] = require(ß.BPD + '/lib/' + lib + '/' + files[i]);
        }
    }
}

for (var i = 0; i < libs.length; i++) {
    add_lib(libs[i]);
}

*/

//----------------

