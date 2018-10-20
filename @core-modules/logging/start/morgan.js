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


var dir = ß.DATE;
var time = ß.TIME;

fs.mkdirpSync(ß.VAR + '/log/' + dir);
ß.accessLogStream = fs.createWriteStream(ß.VAR + '/log/' + dir + '/' + time + '.log', {
    flags: 'a'
});

console.log('- Morgan logging to ' + ß.VAR + '/log/' + dir + '/' + time + '.log');

// setup the logger
app.use(morgan(format, {
    stream: ß.accessLogStream
}));