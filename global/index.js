/*jshint esnext: true */

if (!global.ß) global.ß = {};
if (!ß.cli_commands) ß.cli_commands = [];

// constants
if (!ß.CWD) ß.CWD = process.env.PWD;
if (!ß.BPD) ß.BPD = process.env.PWD + '/boilerplate';

if (!ß.HOSTNAME) ß.HOSTNAME = require('os').hostname();

require("./lablib.js");
require("./codepad.js");
require("./process.js");

require("./bp.js");
require("./frontendlib.js");

require("./node_modules.js");
require("./modules.js");

require("./lib.js");
require("./load.js");
require("./hook.js");


ß.load('global');

ß.init_modules_libs(ß.modules);

//require("./user_model.js");

if (ß) console.log("- ß has", Object.keys(ß).length, 'keys defined');
else console.log("! ß is undefined");