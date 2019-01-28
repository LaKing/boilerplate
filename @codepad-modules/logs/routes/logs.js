/*ßoilerplate */

const ejsfile = ß.get_module_path('logs','public/logs.ejs');
const logfile = ß.PROJECTLOG;

ß.app.get('/logs', function(req, res, next) {

    res.render(ejsfile, {
        theme: ß.THEME
    });

    ß.lib.send_log();

});

ß.app.get('/log', function(req, res, next) {

    ß.fs.readFile(logfile, 'utf-8', (err, data) => {
        if (err) throw err;
        res.send('<html><pre>' + data + '</pre></html>');
    });

});