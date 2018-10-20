/*jshint esnext: true */

const User = ß.User;
const lib = ß.lib;
const passport = ß.passport;

const LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({
                    'local.email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
                    } else {

                        ß.lib.verify.email(email, function(err, isok) {
                            if (!isok) return done(null, false, req.flash('loginMessage', 'Oops! Wrong email address.'));

                            console.log("Create new local user by signup", email);
                            // create the user
                            var newUser = new User();

                            newUser.lang = req.session.lang;
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);
                            //newUser.profile.email = email;

                            newUser.save(function(err) {
                                if (err) return done(err);
                                ß.run_hooks("user_registration", newUser);
                                return done(null, newUser);
                            });

                        });
                    }

                });
                // if the user is logged in but has no local account...
            } else if (!req.user.local.email) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({
                    'local.email': email
                }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        console.log("local-signup user", user, "luser", req.user);
                        var luser = req.user;
                        luser.lang = req.session.lang;
                        luser.local.email = email;
                        luser.local.password = luser.generateHash(password);
                        luser.save(function(err) {
                            if (err) return done(err);
                            ß.run_hooks("user_registration", luser);
                            return done(null, luser);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));
