/*jshint esnext: true */

const fs = require('fs-extra');

function get_modules() {

    var bpmodules = [];
    if (fs.existsSync(ß.BPD + '/modules')) bpmodules = fs.readdirSync(ß.BPD + '/modules');

    var cpmodules = [];
    if (fs.existsSync(ß.CWD + '/modules')) cpmodules = fs.readdirSync(ß.CWD + '/modules');

    return [...new Set([...bpmodules, ...cpmodules])];
}



ß.modules = get_modules();

var configfile = ß.CWD + '/config/active-modules.json';

fs.mkdirp(ß.CWD + '/config');

if (fs.existsSync(configfile)) ß.modules = fs.readJsonSync(configfile);
else {
    ß.modules = get_modules();
    fs.writeJsonSync(configfile, ß.modules);
}


/////////////////////////////////////////////////////////////////////////////////////////

//console.log("ß.modules:", ß.modules);