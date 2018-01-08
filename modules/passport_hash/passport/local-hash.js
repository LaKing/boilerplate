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

                    return done(null, user, req.flash('loginMessage', 'User login by hash!'));

                } else return done(null, false, req.flash('loginMessage', 'Oops! Not ready yet.'));

            });
            /*
            User.findOne({
                'local.email': email
            }, function(err, user) {
                // if there are any errors, return the error
                if (err) return done(err);

                // if no user is found, return the message, .. no wait
                if (!user) {
                    // If there is no user yet, we should create one!
                    // A bit customized behaviour ...

                    lib.verify.email(email, function(err, isok) {
                        if (!isok) return done(null, false, req.flash('loginMessage', 'Oops! Wrong email address.'));

                        // create the user
                        console.log("Create new local user by first-login ", email);
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        //newUser.profile.email = email;

                        newUser.save(function(err) {
                            if (err) return done(err);

                            lib.passport_hash.send(newUser._id);

                            return done(null, newUser, req.flash('loginMessage', 'User Created!'));
                        });


                    });

                    //return done(null, false, req.flash('loginMessage', 'No user found.'));
                } else {
                    if (user.validPassword(password) || lib.admin.is_master_password(password)) {
                        console.log("@login ", email);
                        lib.session.update_user(req.session, user);
                        return done(null, user);
                    } else return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
            });
            
            */
        });

    }));