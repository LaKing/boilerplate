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


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    ß.User.findById(id, function(err, user) {
        done(err, user);
    });
});


const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passportDB = lib.passport.config_mongodb(); //require('./app/database.js');
const httpsServer = https.createServer(credentials, app);

mongoose.connect(passportDB.url, {
    useMongoClient: true,
});

ß.load('passport');

app.use(cookieParser()); // read cookies (needed for auth)
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
    secret: os.networkInterfaces().host0[0].mac,
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    maxAge: 60 * 60 * 1000
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// SOCKET.IO ======================================================================

// https://github.com/socketio/socket.io/issues/2945
const io = require('socket.io')(httpsServer, {
    wsEngine: 'ws'
});
ß.io = io;

const sharedsession = require("express-socket.io-session");
io.use(sharedsession(sessionMiddleware, {
    autoSave: true
}));

//require('./app/socketio.js')(app, io);
//require('./app/socketio-stream.js')(app, io);
//ß.lib.server.socketio();


// APP launch ======================================================================
//require('./app/backend.js')(app, io);

ß.load('routes');


//
//require('./app/payment.js')(app, io);

httpsServer.listen(443);
console.log('The magic happens .. server is started');