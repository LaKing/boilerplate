/*jshint esnext: true */

const fs = ß.fs;

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("admin-delete-user", function(id) {
        //var name = data.Name;
        console.log("admin-delete-user", id);
        if (lib.admin.check_if_admin(id)) {
            socket.emit("danger", "NO! User is ADMIN!");
            return console.log("Cannot delete admin id ", id);
        }

        User.findByIdAndRemove(id, function(err) {
            if (err) return console.log(err);
            socket.emit("success", "OK");
            User.find({}, function(err, data) {
                socket.emit("users", data);
            });
        });

    });
};