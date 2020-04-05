/*ßoilerplate */

module.exports = function send_log() {
    ß.fs.readFile(ß.PROJECTLOG, "utf-8", (err, data) => {
        if (err) {
            if (err.message) ß.lib.logs.send_logs(err.message);
            if (err.code) ß.lib.logs.send_logline(err.code);
            return;
        }
        if (data) {
            ß.lib.logs.send_logs(data);
            ß.lib.logs.send_logline(data);
            return;
        } 
        ß.lib.logs.send_logs('No data in ' + ß.PROJECTLOG);
        ß.lib.logs.send_logline('no data');
    });
};
