/*jshint esnext: true */

const app = ß.app;
const User = ß.user;

app.get('/clearpayment', function(req, res, next) {

    if (ß.debug)
        User.findById(req.session.passport.user, function(err, user) {
            if (err) return console.log("ERROR payment ERR", err);
            if (!user) return console.log("ERROR payment-success process USER not found");

            user.payments = [];
            user.markModified("payments");
            user.save(function(err) {
                if (err) return console.log("user.save", err);
                console.log("PAYMENTS CLEAR", user);
                res.send("OK, ..");
            });
        });

    if (!ß.debug) res.send("No. Debug mode is false, ..");

});