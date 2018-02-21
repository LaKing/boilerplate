/*jshint esnext: true */

const fs = require('fs-extra');

function get_modules() {

    var bpmodules = [];
    if (fs.existsSync(ß.BPD + '/modules')) bpmodules = fs.readdirSync(ß.BPD + '/modules');

    var cpmodules = [];
    if (fs.existsSync(ß.CWD + '/modules')) cpmodules = fs.readdirSync(ß.CWD + '/modules');

    return [...new Set([...bpmodules, ...cpmodules])];
}

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

for (let i = 0; i < ß.modules.length; i++) {
    let condition_file = ß.BPD + '/modules/' + ß.modules[i] + '/module-condition.js';
    if (fs.existsSync(condition_file))
        if (require(condition_file)() !== true) ß.modules.splice(i, 1);
}

for (let i = 0; i < ß.modules.length; i++) ß["USE_" + ß.modules[i].toUpperCase()] = true;
//for (let i = 0; i < ß.modules.length; i++) console.log("- USE_" + ß.modules[i].toUpperCase());

fs.writeJsonSync(configfile, ß.modules);


////////////////////////////////////////CLI/////////////////////////////////////////////////

ß.cli_commands.push('blacklist MODULE');
if (ß.CMD === 'blacklist') {
     if (ß.fs.existsSync(ß.BPD + "/modules/" + ß.ARG) || ß.fs.existsSync(ß.CWD + "/modules/" + ß.ARG)) {
        blacklist.push(ß.ARG.toLowerCase());
        fs.writeJsonSync(blacklistfile, blacklist);
        ß.msg('OK');
        process.exit();
     }
}

ß.cli_commands.push('whitelist MODULE');
if (ß.CMD === 'whitelist') {
     if (ß.fs.existsSync(ß.BPD + "/modules/" + ß.ARG) || ß.fs.existsSync(ß.CWD + "/modules/" + ß.ARG)) {
        blacklist.splice(blacklist.indexOf(ß.ARG.toLowerCase()), 1);
        fs.writeJsonSync(blacklistfile, blacklist);
        ß.msg('OK');
        process.exit();
     }
}


//console.log("ß.modules:", ß.modules);


