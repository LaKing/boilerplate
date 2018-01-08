/*jshint esnext: true */


module.exports = function(socket) {

    socket.on('test', function(data) {
        socket.data = data;
        socket.handshake.session.data = data;
        socket.handshake.session.save();
        //socket.emit('test', socket.handshake.session.data);
    });

};