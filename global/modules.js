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

const configfile = ß.CWD + '/config/active-modules.json';
const blacklistfile = ß.CWD + '/config/blacklist-modules.json';
var blacklist = [];

fs.mkdirp(ß.CWD + '/config');

ß.modules = get_modules();

if (fs.existsSync(blacklistfile)) {
    blacklist = fs.readJsonSync(blacklistfile);
} else {
    fs.writeJsonSync(blacklistfile, blacklist);
}

// remove files listed in the blacklist array
const modules_set = new Set(ß.modules);
const blacklist_set = new Set(blacklist);
const difference = new Set([...modules_set].filter((x) => !blacklist_set.has(x)));
ß.modules = Array.from(difference);

for (let i = 0; i < ß.modules.length; i++) ß["USE_" + ß.modules[i].toUpperCase()] = true;

fs.writeJsonSync(configfile, ß.modules);


/////////////////////////////////////////////////////////////////////////////////////////

//console.log("ß.modules:", ß.modules);