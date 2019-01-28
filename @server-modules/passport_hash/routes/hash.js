/*ßoilerplate */
/*
ß.app.get('/hash/:email/:id/:hash', ß.passport.authenticate('hash-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
*/
ß.app.get("/hash/:email/:id/:hash", function(req, res, next) {
    ß.passport.authenticate("hash", function(err, user, info) {
        if (err) {
            console.log("Passport hash error", req.params, info);
            res.status(500).end("Sorry, there was an error.");
            return;
        }
        if (!user) {
            console.log("Passport hash no-user", req.params, info);
            res.status(500).end("Mission Failed.");
            return;
        }
        // on success
        res.redirect('/login-profile');
    })(req, res, next);
});
