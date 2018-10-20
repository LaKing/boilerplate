/*jshint esnext: true */

ß.app.get('/connect/local', function(req, res) {
    res.render(ß.views(req, 'connect-local.ejs'), {
        message: req.flash('loginMessage')
    });
});

ß.app.post('/connect/local', ß.passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));