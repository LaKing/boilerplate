/*jshint esnext: true */

// ß.lib.passport.isLoggedIn,
ß.app.post('/update-email', ß.lib.passport.isLoggedIn, function(req, res, next) {

    Ł(req.body, req.user);

    const email = req.body.email;
    if (!email) {
      req.flash('userMessage', 'e-mail?');
      return res.redirect("/user");
    }
  
    ß.lib.verify.email(email, function(err, isok, info) {
        if (!isok) {
          req.flash('userMessage', 'E-mail ' + email + ' ERROR: ' + info.info);
	      res.redirect("/user");
          return;
        }
        
        Ł("isok:", isok, email);
        var user = req.user;
        user.local.email = email;
        user.local.verified = false;
        user.save(function(err) {
            req.flash('userMessage', 'OK - Email: ' + email);
            res.redirect("/user");
            ß.lib.passport_hash.send(user._id);
        });
    });

});