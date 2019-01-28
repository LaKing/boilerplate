/*ßoilerplate */

const session = require("express-session");
const sessionDB = ß.lib.session.config_mongodb();
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore(sessionDB);

const os = require("os");
const secret = ß.secret || os.networkInterfaces().host0[0].mac;

// Catch errors
store.on("error", function(error) {
    console.log("ERROR in MongoDBStore", error);
});

module.exports = function() {
    // When the cookie maxAge is defined, express sessions are presistent across browser restarts.
    var session_days = 365;
    if (ß.app.locals.settings.session_days) session_days = ß.app.locals.settings.session_days;

    ß.sessionMiddleware = session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * session_days,
            secure: true
        },
        name: "app",
        secret: secret,
        store: store,
        proxy: true,
        resave: true,
        saveUninitialized: true,
        maxAge: 60 * 60 * 1000
    });
  
    ß.app.use(ß.sessionMiddleware);

    if (ß.passport) ß.app.use(ß.passport.initialize());
    if (ß.passport) ß.app.use(ß.passport.session()); // persistent login sessions
};
