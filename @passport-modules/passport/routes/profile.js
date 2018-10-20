/*jshint esnext: true */

ß.app.get('/profile', ß.lib.passport.isLoggedIn, function(req, res) {
    res.redirect('/#!#profile');
});