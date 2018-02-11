/*jshint esnext: true */

// provides two log functions and a stack trace


if (process.env.USER === 'codepad') ß.codepadlog = true;
if (ß.codepadlog) console.log("- Using codepad HTML-format logging");

function link_html(str) {
    var ix = str.indexOf('/');
    if (ix < 1) return str;

    var sub = str.substring(ix);
    if (sub.substring(0, ß.CWD.length) === ß.CWD) {

        var a = sub.substring(ß.CWD.length).split(':');
        var file = a[0];
        var line = a[1];
        var char = a[2];
        var link = file + '?line=' + line;

        return '<a href="/p' + link + '">/p' + link + '</a>';

    }
    return '';
}

function with_html(str) {
    var html = '';

    var lines = str.split('\n');
    for (var i = 0; i < lines.length; i++) {
        html += '┠─ ' + lines[i] + link_html(lines[i]) + '\n';
    }
    return html;
}

const Console = require('console').Console;
const logger = new Console(process.stdout, process.stderr);

if (ß.codepadlog)
    process.on('uncaughtException', (err) => {
        logger.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━ Exception ━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        logger.log(with_html(err.stack));
        process.exit(100);
    });


global.ł = function() {
    logger.log(...arguments);
};

if (ß.codepadlog)
    global.Ł = function() {

        var stack = new Error().stack;
        logger.log('┏━━━ ŁOG @', link_html(stack.split('\n')[2]));

        for (let arg in arguments) {
            logger.log('┠─  <span style="background: rgba(100,100,100,0.4);">', arguments[arg], '</span>');
        }
        logger.log('┗━━━━');

    };

//if (ß.codepadlog) {
//    console.log = ł;
//    console.error = Ł;
//}

logger.log("- Logging functions ł and Ł are available.");