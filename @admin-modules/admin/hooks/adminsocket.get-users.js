/*jshint esnext: true */

const fs = ß.fs;

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("get-users", function(arg) {
        User.find(arg, function(err, data) {
            socket.emit("users", data);
        });
    });
};
