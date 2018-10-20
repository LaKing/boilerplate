/*jshint esnext: true */

ß.app.get('/user', ß.lib.passport.isLoggedIn, function(req, res) {
  Ł("user", ß.USE_PASSPORT, ß.USE_PASSPORT_FACEBOOK);
    res.render(ß.views(req, 'user.ejs'), {
       message: req.flash('userMessage'),  
       user: req.user,
        ß:ß
    });
});
