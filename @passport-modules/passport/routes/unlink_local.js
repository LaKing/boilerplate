/*jshint esnext: true */

ß.app.get('/unlink/local', ß.lib.passport.isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
});
