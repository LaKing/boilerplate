/*jshint esnext: true */

//////////////////////////////////////////////////////////////////////////////////////////

const fs = ß.fs;

// we need to process the sourcefile directory
function get_hookfiles_array(base) {

    var files = [];

    if (fs.existsSync(base + '/hooks')) files = fs.readdirSync(base + '/hooks');

    for (let m = 0; m < ß.modules.length; m++) {
        var mfiles = [];
        var path = base + '/modules/' + ß.modules[m] + '/hooks';
        if (fs.existsSync(path)) mfiles = fs.readdirSync(path);
        files = [...new Set([...files, ...mfiles])];
    }

    return files;
}

function find_hook_file_path(file) {

    if (fs.existsSync(ß.CWD + '/hooks/' + file)) return ß.CWD + '/hooks/' + file;
    for (let m = 0; m < ß.modules.length; m++) {
        if (fs.existsSync(ß.CWD + '/modules/' + ß.modules[m] + '/hooks/' + file)) return ß.CWD + '/modules/' + ß.modules[m] + '/hooks/' + file;
    }
    if (fs.existsSync(ß.BPD + '/hooks/' + file)) return ß.BPD + '/hooks/' + file;
    for (let m = 0; m < ß.modules.length; m++) {
        if (fs.existsSync(ß.BPD + '/modules/' + ß.modules[m] + '/hooks/' + file)) return ß.BPD + '/modules/' + ß.modules[m] + '/hooks/' + file;
    }
    return '/tmp/point-of-no-return';
}


var cpfiles = get_hookfiles_array(ß.CWD);
var bpfiles = get_hookfiles_array(ß.BPD);
var files = [...new Set([...cpfiles, ...bpfiles])];

for (let i = 0; i < files.length; i++) {
    let hook = files[i].split('.')[0];
    let name = files[i].split('.')[1];
    let file = find_hook_file_path(files[i]);

    if (!ß.hooks) ß.hooks = {};
    if (!ß.hooks[hook]) ß.hooks[hook] = {};
    if (!ß.hooks[hook][name]) ß.hooks[hook][name] = require(file);

}


ß.run_hook = function(hook, arg) {
    if (ß.hooks[hook])
        for (var h in ß.hooks[hook]) {
            ß.hooks[hook][h](arg);
        }
};

ß.run_hooks = function(hook, arg) {
    ß.run_hook('pre_' + hook, arg);
    ß.run_hook(hook, arg);
    ß.run_hook('post_' + hook, arg);
};
