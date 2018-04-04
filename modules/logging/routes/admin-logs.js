/*jshint esnext: true */

ß.app.get('/admin-logs.json', ß.lib.passport.isLoggedIn, function(req, res) {

    req.session.is_admin = false;

    if (req.session.passport)
        if (req.session.passport.user)
            req.session.is_admin = ß.lib.admin.check_if_admin(req.session.passport.user);

    if (req.session.is_admin) {
        let logfile = ß.CWD + '/log/' + ß.DATE + '/admin-log';
        ß.lib.logging.get_logs_json(logfile, function(err, data) {
            res.setHeader('Content-Type', 'application/json');
            if (err) {
                console.error("ERROR - could not get admin-logs");
                res.send(JSON.stringify({}));
            }
            res.send(JSON.stringify(data));
        });
    } else {
        req.logout();
        req.session.destroy(cb);
        res.redirect('/login');
    }

});