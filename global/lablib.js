/*jshint esnext: true */
const os = require('os');
const HOSTNAME = os.hostname();

// javascript lablib
const $RED = '\x1b[31m';
const $GREEN = '\x1b[32m';
const $YELLOW = '\x1b[33m';
const $BLUE = '\x1b[34m';
const $GRAY = '\x1b[37m';
const $CLEAR = '\x1b[0m';
const $TAG = $BLUE + '[ ' + HOSTNAME.split('.')[0] + ' ]';

/* @DOC
## Lablib - builtin logging

There are four builtin logging functions in the ß namespace, that even have nice colors when codepad-formatted html logging is enabled.  
These logs are written to a file, and should contain business-logic logs.

`ß.log()` a gray logmessage
`ß.msg()` logs a green message  
`ß.ntc()` a yellow notice  
`ß.err()` red error  
`ß.debug()` only if debug mode is enabled, logs with a blue line  

*/

ß.fs.mkdirpSync(ß.CWD + '/log/' + ß.DATE);

// logsilent is more or less private, but can be accessed programatically
ß.logs = function(type) {
    let logfile = ß.CWD + '/log/' + ß.DATE + '/admin.log';

    let logdata = type + ' ' + ß.now();

    for (let i = 1; i < arguments.length; i++) {
        logdata += ' ' + arguments[i];
    }

    ß.fs.appendFile(logfile, logdata + '\n', function(err) {
        if (err) throw err;
    });
};

ß.log = function msg() {
    ß.logs('LOG', ...arguments);
    if (ß.cli) return console.log($TAG + $GRAY, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(100,100,100,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.msg = function msg() {
    ß.logs('MSG', ...arguments);
    if (ß.cli) return console.log($TAG + $GREEN, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(0,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.ntc = function ntc() {
    ß.logs('NTC', ...arguments);
    if (ß.cli) return console.log($YELLOW, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.err = function err() {
    ß.logs('ERR', ...arguments);
    if (ß.cli) return console.log($RED + 'ß-ERROR', ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,0,0,0.8);"> ß-ERROR', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.debug = function debug() {
    if (ß.DEBUG) {
        ß.logs("DBG", ...arguments);
        if (ß.cli) return console.log($TAG + $GRAY, ...arguments, $CLEAR);
        if (ß.codepadlog) return console.log('<span style="color: rgba(200,200,250,0.8);"> ß-DEBUG', ...arguments, '</span>');
        return console.log(...arguments);
    }
};

console.log('- lablib loaded: ß.msg() ß.ntc(), ß.err(), ß.debug()');

/*
A note on logging. According to https://stackoverflow.com/questions/41502564/journalctl-user-units-output-disappears  
user-services do not appear on unit logs. As a workaround use journalctl without unit definitions. For example jurnalctl -f
*/