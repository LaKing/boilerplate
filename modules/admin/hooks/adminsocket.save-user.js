/*jshint esnext: true */

module.exports = function(socket) {

    const User = ß.User;
    const lib = ß.lib;

    socket.on("admin-save-user", function(data) {
        //var name = data.Name;
        console.log("admin-save-user", data);
        User.findById(data._id, function(err, user) {
            if (err) return console.log(err);
            if (!user) return console.log("Error. user could not be located for ", data._id);

            user.profile = data.profile;
            user.billing = data.billing;
            user.shipping = data.shipping;

            user.save(function(err) {
                if (err) return console.log(err);
                console.log("@admin save-user:", user);
                user.updateLocal(data.profile.email, data.profile.password);
                socket.emit("success", "OK");
            });
        });
    });
    
};

