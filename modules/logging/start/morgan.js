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
fs.mkdirpSync(ß.CWD + '/log');
var accessLogStream = fs.createWriteStream(ß.CWD + '/log/' + new Date() + '.log', {
    flags: 'a'
});
// setup the logger
app.use(morgan(format, {
    stream: accessLogStream
}));