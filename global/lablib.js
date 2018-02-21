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

ß.msg = function msg() {
    if (ß.cli) return console.log($TAG + $GREEN, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(0,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.ntc = function ntc() {
    if (ß.cli) return console.log($YELLOW, ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,250,0,0.8);">', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.err = function err() {
    if (ß.cli) return console.log($RED + 'ß-ERROR', ...arguments, $CLEAR);
    if (ß.codepadlog) return console.log('<span style="color: rgba(250,0,0,0.8);"> ß-ERROR', ...arguments, '</span>');
    return console.log(...arguments);
};

ß.debug = function debug() {
    if (ß.debug_on) {
        if (ß.cli) return console.log($TAG + $GRAY, ...arguments, $CLEAR);
        if (ß.codepadlog) return console.log('<span style="color: rgba(200,200,250,0.8);"> ß-ERROR', ...arguments, '</span>');
        return console.log(...arguments);
    }
};

console.log('- lablib loaded: ß.msg() ß.ntc(), ß.err(), ß.debug');
