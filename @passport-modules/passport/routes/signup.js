/*jshint esnext: true */


ß.app.get('/signup', function(req, res) {
    res.render(ß.views(req, 'signup.ejs'), {
        message: req.flash('signupMessage')
    });
});

ß.app.post('/signup', ß.passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));