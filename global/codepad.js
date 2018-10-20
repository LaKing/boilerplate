/*jshint esnext: true */

// not used at the moment, but works, ...
function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function(err, stack) {
            return stack;
        };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if (currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}


// provides two log functions and a stack trace


if (ß.codepadlog !== false && process.env.USER === 'codepad') ß.codepadlog = true;
if (ß.codepadlog) console.log("- Using codepad HTML-format logging");



function link_html(str) {
    if (!str) return '';
    if (!ß.codepadlog) return '';
    var ix = str.indexOf('/');
    if (ix < 0) return '';

    var sub = str.substring(ix);
    if (sub.substring(0, ß.CWD.length) === ß.CWD) {

        var a = sub.substring(ß.CWD.length).split(':');
        var file = a[0];
        var line = a[1];
        //var char = a[2].split(')')[0];
        var link = file + '?line=' + line; // + '?char=' + char;

        return '<a href="/p' + link + '">/p' + link + '</a>';

    }
    return '';
}

function with_html(str) {
    if (!str) return '';
    var html = '';

    var lines = str.split('\n');
    for (var i = 0; i < lines.length; i++) {
        html += '┠─ ' + lines[i] + ' ' + link_html(lines[i]) + '\n';
    }
    return html;
}

const Console = require('console').Console;
const logger = new Console(process.stdout, process.stderr);

if (ß.codepadlog)
    process.on('uncaughtException', (err) => {
        logger.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━ Exception ' + err.name + ' ━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.log('┠────  ', err.message);
        if (err.stack) logger.log(with_html(err.stack));
        logger.log('┗━━━━ EXITING with code 100');
        process.exit(100);
    });


/* @DOC 
## Logging, Throwing
### Global logging  ```ł``` and ```Ł``` functions to be used in development
Place temporary ```console.log()``` functions with short special characters, they can be tracked down within the project.  
```ł()``` is an alias for a simple console-log.  
```Ł()``` is an enhanced console-log that prints arguments in seperate lines, and indicates where it has been called from.  
When codepad-style logging is enabled it is printed in html form.
*/

global.ł = function() {
    logger.log(...arguments);
};

global.Ł = function() {

    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    logger.log('┏━━━ ŁOG ', ß.now());

    for (let arg in arguments) {
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
        else logger.log('┠─  ', arguments[arg]);
    }
    logger.log('┗━━━━ @', from);

};

if (ß.codepadlog) logger.log("- Logging functions ł and Ł are available, with codepad html-extended log");
else logger.log("- Logging functions ł and Ł are available.");

/* @DOC 
### Global  determinator ```đ``` and the detonator ```Đ``` error-handlers.
Should the determinator function ```đ(err);``` recieve an error as argument, it will log the error, then execution will continiue.
On the other hand the detonator ```Đ(err);``` will log the error and ```thow```, thus exit the current process.
Both functions can display codepad-styled html with link to the execution stack sourcefile. 
*/

// The determinator displays the error in the logs, but execution will continue, ...
global.đ = function() {
    if (arguments.length === 1) {
        if (arguments[0] === null) return;
        if (arguments[0] === undefined) return;
    }
    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.log('┏━━━ đeterminate ', ß.now());
        logger.log('┠─── ' + err.name + ' ' + link_html(err.stack.split('\n')[1]) + '</span>');
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(200,000,000,0.4);">', err.message, '</span>');
        else logger.log('┠─  ', err.message);
        logger.log('┗━━━━ @', from);

    } else {
        logger.log('┏━━━ đeterminate ', ß.now());
        for (let arg in arguments) {
            if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
            else logger.log('┠─  ', arguments[arg]);
        }
        logger.log('┗━━━━ @', from);
    }
    return arguments;
};

// The detonator function will blow up current execution
global.Đ = function() {

    if (arguments.length === 1) {
        if (arguments[0] === null) return;
        if (arguments[0] === undefined) return;
    }
    var stack = new Error().stack;
    var from = link_html(stack.split('\n')[2]);

    // A special format if used to message a simple error.
    if (arguments[0] instanceof Error && arguments.length === 1) {
        var err = arguments[0];
        logger.log('┏━━━ ĐETONATE ', ß.now());
        logger.log('┠─── ' + err.name + ' ' + link_html(err.stack.split('\n')[1]) + '</span>');
        if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(200,000,000,0.4);">', err.message, '</span>');
        else logger.log('┠─  ', err.message);
        logger.log('┗━━━━ @', from);
        throw err;
    } else {
        logger.log('┏━━━ ĐETONATE ', ß.now());
        for (let arg in arguments) {
            if (ß.codepadlog) logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
            else logger.log('┠─  ', arguments[arg]);
        }
        logger.log('┗━━━━ @', from);
      	throw new Error('The Đetonator function got a non-null error, therefore throws an exception.');
    }
};



if (ß.codepadlog) logger.log("- Determinator functions đ and Đ are available, with codepad html-extended log");
else logger.log("- Determinator functions đ and Đ are available.");
