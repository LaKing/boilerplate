/*jshint esnext: true */

// logging

const app = ß.app;
const fs = ß.fs;
const format = '[:date[clf]] :response-time ms :remote-addr :referrer :status :method :url';
app.enable('trust proxy');
app.set('trust proxy', function() {
    return true;
});

const morgan = require('morgan');

var now = new Date();

var month = (now.getMonth() + 1);
if (month < 10) month = '0' + month;

var day = now.getDate();
if (day < 10) day = '0' + day;

var dir = now.getFullYear() + '_' + month + '_' + day;

var hour = now.getHours();
if (hour < 10) hour = '0' + hour;

var min = now.getMinutes();
if (min < 10) min = '0' + min;

var sec = now.getSeconds();
if (sec < 10) sec = '0' + sec;

var time = hour + '_' + min + '_' + sec;

fs.mkdirpSync(ß.CWD + '/log/' + dir);
var accessLogStream = fs.createWriteStream(ß.CWD + '/log/' + dir + '/' + time + '.log', {
    flags: 'a'
});

console.log('- Morgan logging to /log/' + dir + '/' + time + '.log');

// setup the logger
app.use(morgan(format, {
    stream: accessLogStream
}));