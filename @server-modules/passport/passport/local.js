/*ßoilerplate */

// @DOC The local strategy is responsible for the email-password based login.

const User = ß.User;
const lib = ß.lib;
const passport = ß.passport;

const LocalStrategy = require("passport-local").Strategy;
const fields = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};

// callback(err, user)
function create_user(email, password, callback) {
    if (!email) return callaback(new Error("No Email to verify."));
    if (!password) password = ß.lib.passport.get_password();

    lib.verify.email(email, function(err, isok) {
        if (err) return callback(err);
        if (!isok) return callback(new Error("Email verification failed."));
        // create the user

        var user = new User();
        //user.lang = req.session.lang || "en";
        user.local.email = email;
        user.local.password = user.generateHash(password);
        user.save(function(err) {
            if (err) return callback(err);
            ß.run_hook("user_registration", user);
            callback(null, user);
            ß.msg("New user: " + email);
        });
    });
}

passport.use(
    new LocalStrategy(fields, function(req, email, password, done) {
        if (email) email = email.toLowerCase();
        else return done(new Error("missing email"));
        process.nextTick(function() {
            User.findOne({ "local.email": email }, function(err, user) {
                if (err) {
                    đ(err);
                    return done(err, null, "Error");
                }

                if (user) {
                    if (user.validPassword(password)) return done(null, user, "valid password");
                    if (lib.passport_admin.is_master_password(password)) return done(null, user, "valid admin password");
                    return done(null, false, "Password failed for " + email);
                } else
                    create_user(email, password, function(err, user) {
                        return done(err, user, "user created");
                    });
            });
        });
    })
);
