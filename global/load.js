/*jshint esnext: true */

const fs = ß.fs;

/* @DOC 
## Module dir loading
There is a command to `require()` all files in a dir of all modules.  
This is done by passing a 'dir' name as an argument to `ß.load();`. 
It will load all the files in this, first in all the custom modules, then in the '@-modules' while honoring custom modules with priority.
```
/init
/server
/routes (via server/server.js)
/start
/debug (only if debug mode is on)
```
*/

function list_files(module, dir, bmf) {

    let folder = dir + '/' + bmf;
    if (fs.existsSync(folder)) {
        let path = fs.realpathSync(folder);
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.').reverse()[0] === 'js') {
                    require(path + '/' + files[i]);
                    reg(path + '/' + files[i]);
                }
            }
        }
    }
}


var log = '';
const logfile = ß.VAR + '/debug/load.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_dir(module, dir, bmf, that) {
    // that is the object that has keys representing the file, and value representing the path
    let folder = dir + '/' + bmf;
    if (fs.existsSync(folder)) {
        let path = fs.realpathSync(folder);
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.').reverse()[0] === 'js') {
                    let file = files[i];
                    if (!that[file]) that[file] = path + '/' + files[i];
                }
            }
        }
    }
}


if (!ß.load)
    ß.load = function(bmf) {
        reg('// ------------------- ' + bmf + ' ----------------------');

      	// load per modules
      
        for (let module in ß.modules) {
            let that = {};

            // priority
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === true)
                    load_module_dir(module, dir, bmf, that);
            }

            // standard
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === false)
                    load_module_dir(module, dir, bmf, that);
            }

            // that object has values populated, selection complete so do the job now
            for (let me in that) {
                require(that[me]);
                reg(module + ' ' + bmf + ' ' + me + ' is ' + that[me]);
            }
        }
        fs.writeFileSync(logfile, log);
        console.log('- Load ' + bmf + ' complete');

    };