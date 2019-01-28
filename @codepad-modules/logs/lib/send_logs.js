/*ßoilerplate */

const loglength = 120;

module.exports = function send_logs(data) {
    if (!data) return;
    let prep = data.split('\n').slice(-loglength).join('\n');
    //let send = ß.lib.logs.term2html(prep).replace(/[\r\n]/g, "<br />");
	let send =  ß.lib.ansi.html(prep).replace(/[\r\n]/g, "<br />");
  
    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.logs_socket) socket.emit('logs', send);
    }
};
