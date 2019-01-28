/*ßoilerplate */

// @DOC The `post-email-request.json` request creates a new user if ncessery, and sends out an email.

ß.app.post("/post-email-request.json", function(req, res, next) {

    var email = req.body.email;

    if (!ß.lib.passport_hash.okey_today(email)) return res.json("We have sent you an email today already.");

    ß.User.findOne({ "local.email": email }, function(err, user) {
        Ł(err, email, user);
        if (err) {
            console.log("error at post-email-request", err);
            return res.status(500).json("ERROR");
        }
        if (user)
            ß.lib.passport_hash.send(user._id, function(err) {
                if (err) return res.status(500).json("ERROR");
                return res.json("OK");
            });

        // another form of registration
        if (!user)
            ß.passport.authenticate("local", function(err, user, info) {
                if (err) {
                    console.log("Passport error in post-email-request:", err);
                    return res.status(500).json("Sorry, there was an error.");
                }
                if (!user) {
                    console.log("Passport error in post-email-request, no user", info);
                    return res.status(500).json("Sorry, there was an error.");
                }

                if (user)
                    ß.lib.passport_hash.send(user._id, function(err) {
                        if (err) return res.status(500).json("ERROR");
                        return res.json("OK");
                    });
            })(req, res, next);
    });
});
