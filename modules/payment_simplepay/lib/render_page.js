/*jshint esnext: true */

module.exports = function(req, res, next) {
    Ł(ß.modules);

    const User = ß.User;
    const HOSTNAME = ß.HOSTNAME;

    const generate_simplepay_formdata = ß.lib.payment_simplepay.generate_formdata;

    var ejsfile = ß.views(req, 'simplepay.ejs');

    User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.log("ERROR in render payment", err);
            res.send("Mission Failed. Error.");
            return;
        }
        if (!user) {
            console.log("ERROR in render payment - no ruser");
            res.send("Mission Failed. No user.");
            return;
        }

        if (user.payments.length < 1) {
            console.log("ERROR in render payment - no ruser");
            res.send("Mission Failed. No payment.");
            return;
        }

        var p = ß.lib.payment.calculate_parameters(req.session, user.payments[user.payments.length - 1]);
        res.status(200);
        res.render(ejsfile, {
            lang: req.session.lang.toUpperCase(),
            host: HOSTNAME,
            p: p,
            f: generate_simplepay_formdata(p)
        });
    });
};
