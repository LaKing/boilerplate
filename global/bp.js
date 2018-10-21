/*jshint esnext: true */

/* @DOC

## THE ß object

The boilerplate module framework uses a "ß namespace" to store constants and references to functions across it's modules.  
This namespace is attached to the `ß` primary global variable, visible in the global scope. Frequently used node_modules can be attached directly.
You can pre-create the ß variable in your server.js file before loading the boilerplate, to pre-define global constants.

A custom `server.js` with debug-mode may look like this.  
```
// Pre-declare ß so constants and functions can be attached.
global.ß = {};
// Set the DEBUG constant to true
ß.DEBUG = true;
```
The entry point to boot the framework is then:
```
require("./boilerplate");
```
*/



// It would be safer to use localized versions of variables. ...
// we do not do this, but I keep it here for reference

// for data-only access
if (!ß.localize) ß.localize = function() {
    return JSON.parse(JSON.stringify(ß));
};

// for data and functions
if (!ß.local) ß.local = function() {
    return Object.assign({}, ß);
};

// to use a local version
//const _ß = ß.local(); // funtions and data
//const _ß = ß.localize(); // data only

if (!ß.debug_namespace) ß.debug_namespace = function() {
    const util = require('util');

    ß.fs.mkdirpSync(ß.VAR + '/debug');
    var config_file = ß.VAR + '/debug/boiler-namespace.txt';
    var data = '';

    for (let i in ß) {
        data += 'ß.' + i + ' = ' + util.inspect(ß[i]);
        data += '\n\n';
    }

    ß.fs.writeFileSync(config_file, data);
    console.log("- ß has " + Object.keys(ß).length + " keys, debug:", config_file);
};