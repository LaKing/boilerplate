const loglength = 120;

module.exports = function get_log_page(page, callback) {
    ß.fs.readFile(ß.PROJECTLOG, "utf-8", (err, data) => {
        if (err) {
            đ(err);
            return callback(err, null);
        }
        if (data) {
            let prep = data
                .split("\n")
                .slice((page-1) * loglength, (page) * loglength)
                .join("\n");
           // let send = ß.lib.ansi.html(prep).replace(/[\r\n]/g, "<br />");
         let send={};
            const html = ß.lib.ansi.html(prep).replace(/[\r\n]/g, "<br />");
          	send.html=html;
            send.pages = data.split("\n").length / loglength;
            return callback(null, send);
        }
    });
};
