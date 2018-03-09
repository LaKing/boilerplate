/*jshint esnext: true */
const fs = require('fs');
//const User = require('./user-model');
//const admin = require('./admin.js');


function get_socket_user(socket) {

    if (!socket) return console.log('Missing socket?');
    if (!socket.handshake) return console.log('Mising handshake?');
    if (!socket.handshake.session) return console.log('Missing session?');
    if (!socket.handshake.session.passport) return console.log('Missing session.passport.');
    if (!socket.handshake.session.passport.user) return console.log('Missing session.passport.user?');

    return true;
}

const app = ß.app;
const io = ß.io;
const User = ß.User;
const session = ß.session;
const lib = ß.lib;

//const ss = require('socket.io-stream');

//const promo = require('./promo.js')(app, io);

io.on('connection', function(socket) {

    if (get_socket_user(socket) !== true) return console.log("@server.start.socket - abort at connection");

    var dir = socket.handshake.headers.referer.split('/')[3];
    var ip = socket.handshake.headers['x-forwarded-for'];

    const id = socket.handshake.session.passport.user;

    if (id === undefined) return console.log("! ERROR @ server/start/socketio.js connect - ID UNDEFINED", ip);
    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("ERROR user could not be located for ", id);

        var email = "unknown";
        if (user.local.email) email = user.local.email;
        //if (socket.handshake.session.user.profile.email) email = socket.handshake.session.user.profile.email;

        if (socket.handshake.session.is_admin) {
            console.log('+ admin-connected ', email, ' (id ' + id + ') ip:' + ip + ' ', socket.handshake.headers.referer);
            //socket.emit("is_admin", true);
        } else console.log('+ user-connected ', email, ' (id ' + id + ') ip:' + ip + ' ', socket.handshake.headers.referer);

        //lib.session.update_user(socket.handshake.session, user);
        //Ł();
        //socket.emit('session-data', socket.handshake.session);

        socket.user_id = id;

        socket.get_user = function(callback) {
            ß.User.findById(id, function(err, user) {
                if (err) {
                    socket.emit("danger", "ERROR");
                    return console.log("ERROR in get_user.", err);
                }
                if (!user) {
                    socket.emit("danger", "ERROR");
                    return console.log("ERROR get_user could not locate user for ", id);
                }
                callback(user);
            });
        };


        socket.on('log', function(msg) {
            console.log(msg);
        });

        socket.on('Ł', function(msg) {
            Ł(msg);
        });

        ß.run_hooks('socket', socket);

        if (!socket.handshake.session.is_admin) return;

        ß.run_hooks('adminsocket', socket);

    });

});
