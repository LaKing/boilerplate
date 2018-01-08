/*jshint esnext: true */
const fs = require('fs');
//const User = require('./user-model');
//const admin = require('./admin.js');


function get_socket_user(socket) {

    if (socket && socket.handshake && socket.handshake.session && socket.handshake.session.passport && socket.handshake.session.passport.user)
        return socket.handshake.session.passport.user;
    else {
        console.log("ERROR @ app/socket.io get_socket_user socket.handshake.session.passport", socket.handshake.session.passport);
        return undefined;
    }
}

const app = ß.app;
const io = ß.io;
const User = ß.User;
const session = ß.session;
const lib = ß.lib;

//const ss = require('socket.io-stream');

//const promo = require('./promo.js')(app, io);

io.on('connection', function(socket) {
    console.log('connection');

    var dir = socket.handshake.headers.referer.split('/')[3];
    var ip = socket.handshake.headers['x-forwarded-for'];
    var id = get_socket_user(socket);

    if (id === undefined) return console.log("ERROR @ app/socket.io connect - id undefined");

    if (socket.handshake.session.is_admin) {
        console.log('app io admin-connected (id ' + id + ') ip:' + ip + ' ' + JSON.stringify(socket.handshake.headers.referer, null, 2));
        //socket.emit("is_admin", true);
    } else console.log('app io user-connected (id ' + id + ') ip:' + ip + ' ' + JSON.stringify(socket.handshake.headers.referer, null, 2));
    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("Error. user could not be located for ", id);
        lib.session.update_user(socket.handshake.session, user);
        socket.emit('session-data', socket.handshake.session);

        socket.user = user;

        socket.on('log', function(msg) {
            console.log(msg);
        });

        ß.run_hooks('socket', socket);

        if (!socket.handshake.session.is_admin) return;
        
        ß.run_hooks('adminsocket', socket);

    });

});

