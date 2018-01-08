/*jshint esnext: true */

const fs = require('fs');

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("save-profile", function(data) {

        var user = socket.user;

        if (data.profile)
            user.profile = data.profile;

        if (data.billing)
            user.billing = data.billing;

        if (data.shipping)
            user.shipping = data.shipping;


        lib.session.update_user(socket.handshake.session, user);
        socket.emit('session-data', socket.handshake.session);

        user.save(function(err) {
            if (err) return console.log(err);
            if (data.profile)
                user.updateLocal(data.profile.email, data.profile.password);

            socket.emit("success", "Profil saved");
        });
    });

};