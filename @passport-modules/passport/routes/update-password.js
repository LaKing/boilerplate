/*jshint esnext: true */

// ß.lib.passport.isLoggedIn,
ß.app.post('/update-password', ß.lib.passport.isLoggedIn, function(req, res, next) {
    const password = req.body.password;
  
    var user = req.user;
        user.local.password = user.generateHash(password);
        user.save(function(err) {
            req.flash('userMessage', 'Password-update OK');
            res.redirect("/user");
        });
  
});