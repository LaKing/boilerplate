/*jshint esnext: true */

ß.app.get('/profile.ejs', ß.lib.passport.isLoggedIn, function(req, res) {
    res.render(ß.views(req, 'profile.ejs'), {
        user: req.user
    });
});

ß.app.get('/profile', ß.lib.passport.isLoggedIn, function(req, res) {
    res.redirect('/#!#profile');
});