/*ßoilerplate */

module.exports = function(socket) {
    let user = socket.get_user(function(user) {
        ß.lib.session.update_user(socket.handshake.session, user);
        socket.emit("session-data", socket.handshake.session);
    });
};
