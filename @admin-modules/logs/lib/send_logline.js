/*ßoilerplate */

// ez valszeg nem kell, de maradhat

module.exports = function send_logline(data) {
 	if (!data) return;
    let last = data.split('\n').slice(-2)[0];
    //let lend = ß.lib.logs.term2html(last).replace(/[\r\n]/g, "<br />");
	//ß.ansi_to_html
    let lend = ß.lib.ansi.html(last).replace(/[\r\n]/g, "<br />");
  
    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.main_socket) socket.emit('logline', lend);
    }
};
