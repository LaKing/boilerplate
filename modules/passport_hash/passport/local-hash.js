/*jshint esnext: true */


const User = ß.User;
const lib = ß.lib;
const passport = ß.passport;

const CustomStrategy = require('passport-custom').Strategy;

passport.use('hash-login', new CustomStrategy(
    function(req, done) {

        var email = req.params.email;
        var id = req.params.id;
        var hash = req.params.hash;

        Ł(email, id, hash);

        if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {

            User.findById(id, function(err, user) {
                if (err) return done(null, false, req.flash('loginMessage', 'Oops! User bytes the dust.'));

                if (lib.passport_hash.hash(user.local.email) === hash) {

                    if (!user.local.verified) {
                        user.local.verified = true;
                        user.save(function(err) {
                            if (err) return done(null, false, req.flash('loginMessage', 'Oops! An error accoured in saving your verification.'));
                        });
                    }
                    //console.log("@ hash-login", user.local.email);
                    return done(null, user, req.flash('loginMessage', 'User login by hash!'));

                } else return done(null, false, req.flash('loginMessage', 'Oops! Not ready yet.'));

            });

        });

    }));