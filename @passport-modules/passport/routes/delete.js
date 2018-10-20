/*jshint esnext: true */

const cb = function() {
    //Ł('session destriction cb');
};

ß.app.get('/delete', function(req, res) {
    Ł();
    if (!req.session) return res.redirect('/');
    if (!req.session.passport) return res.redirect('/');
    if (!req.session.passport.user) return res.redirect('/');

    const id = req.session.passport.user;
    if (ß.lib.admin.check_if_admin(id)) return res.send("Admin can not be deleted.");

    ß.User.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send("ERROR. Sorry.");
            return console.log('delete-by-route', id, err);
        }
      	res.send(id + " deleted.");
        req.logout();
        req.session.destroy(cb);
    });
});