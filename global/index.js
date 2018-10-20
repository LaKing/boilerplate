/*jshint esnext: true */

/* @DOC 
## Constants

`ß.DEBUG` is a boolean constant  
`ß.CWD` stands for the Current Work Directory  
`ß.BPD` is the Boilerplate Directory  
`ß.VAR` has the path for runtime variables  
`ß.HOSTNAME` should be the FQDN hostname  
`ß.MRD` is the module root directory  
*/

if (!global.ß) global.ß = {};


if (!ß.cli_commands) ß.cli_commands = [];
if (!ß.DEBUG) {
    ß.DEBUG = false;
    if (process.argv[2] === 'debug') {
        ß.DEBUG = true;
        console.log('- ß.DEBUG true');
    }
}

require("./node_modules.js");

// constants
// current working directory
if (!ß.CWD) ß.CWD = process.cwd();
// boilerplate directory
if (!ß.BPD) ß.BPD = ß.CWD + '/boilerplate';
if (!ß.fs.existsSync(ß.BPD)) throw ß.BPD + ' does not exists.';

// linux var folder for the boilerplate
if (!ß.VAR) ß.VAR = '/var/boilerplate';
ß.fs.mkdirp(ß.VAR);

// Global node modules directory
if (!ß.GND) ß.GND = process.config.variables.node_prefix + "/lib/node/node_modules/";
if (!ß.HOSTNAME) ß.HOSTNAME = require('os').hostname();

// Modules Root Directory
if (!ß.MRD) ß.MRD = ß.CWD;
ß.fs.mkdirp(ß.MRD);

// Configs dir
if (!ß.CFG) ß.CFG = ß.CWD + '/config';
ß.fs.mkdirp(ß.CFG);

require("./now.js");
require("./pid.js");

require("./lablib.js");
require("./codepad.js");
require("./process.js");

require("./modules.js");
require("./bp.js");
require("./load.js");

ß.load('global');

require("./lib.js");
require("./hook.js");


//ß.init_modules_libs(ß.modules);

//require("./user_model.js");

if (ß) console.log("- ß has", Object.keys(ß).length, 'keys defined');
else console.log("! ß is undefined");