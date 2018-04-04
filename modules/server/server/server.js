/*jshint esnext: true */

const lib = ß.lib;
const fs = ß.fs;
const express = ß.express;
const mongoose = ß.mongoose;
const passport = ß.passport;
const session = ß.session;
// Basic includes
const os = require('os');
const https = require('https');
const flash = require('connect-flash');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const secret = os.networkInterfaces().host0[0].mac;

// https certificate stuff
const privateKey = fs.readFileSync('/etc/pki/tls/private/localhost.key', 'utf8');
const certificate = fs.readFileSync('/etc/pki/tls/certs/localhost.crt', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

// create our main express app, and share it in the bp object
const app = express();
ß.app = app;

app.locals.settings = ß.lib.settings.readSync();

//const passportDB = lib.passport.config_mongodb(); //require('./app/database.js');
const httpsServer = https.createServer(credentials, app);

ß.load('passport');

//app.use(cookieParser()); // read cookies (needed for auth) // tryeed alaso with secret in argument
// since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. 

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating

const sessionDB = lib.server.config_mongodb();
const MongoStore = require('connect-mongo')(session);
const mongoStore = new MongoStore(sessionDB);

// When the cookie maxAge is defined, express sessions are presistent across browser restarts.
var session_days = 365;
if (app.locals.settings.session_days) session_days = app.locals.settings.session_days;

const sessionMiddleware = session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * session_days
    },
    name: 'app',
    secret: secret,
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    maxAge: 60 * 60 * 1000
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// https://github.com/socketio/socket.io/issues/2945
const io = require('socket.io')(httpsServer, {
    wsEngine: 'ws'
});
ß.io = io;

const sharedsession = require("express-socket.io-session");
io.use(sharedsession(sessionMiddleware, {
    autoSave: true
}));

ß.load('routes');

httpsServer.listen(443, function(err) {
    if (err) ß.err("Server failed to start on the HTTPS port.");
    console.log('- Server is started on port 443, mem usage:', process.memoryUsage().rss);
    if (ß.DEBUG) ß.ntc("Server (re)start DEBUG");
    else ß.ntc("Server (re)start");
});

process.on('SIGTERM', function() {
    if (ß.io)
        Object.keys(ß.io.sockets.sockets).forEach(function(s) {
            var socket = ß.io.sockets.sockets[s];
            socket.get_user(function(user) {
                console.log("-- disconnecting socket", user._id);
            });
            socket.disconnect(true);
        });
    
    
    httpsServer.close(function() {
        console.log("Server closed via SIGTERM");
        process.exit(0);
    });
});

process.on('SIGUSR1', function() {
    if (ß.io)
        Object.keys(ß.io.sockets.sockets).forEach(function(s) {
            var socket = ß.io.sockets.sockets[s];
            socket.get_user(function(user) {
                console.log("-- disconnecting socket", user._id);
            });
            socket.disconnect(true);
        });
    
    httpsServer.close(function() {
        console.log("Server closed via SIGUSR1");
        process.exit(0);
    });
});
