/*jshint esnext: true */

ß.app.get('/login', function(req, res) {
    res.render(ß.views(req, 'login.ejs'), {
        message: req.flash('loginMessage')
    });
});

ß.app.post('/login', ß.passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));