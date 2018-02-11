/*jshint esnext: true */

module.exports = function(req, res, next) {
    Ł(ß.modules);

    const User = ß.User;
    const HOSTNAME = ß.HOSTNAME;

    const prepare_token = ß.lib.payment_braintree.prepare_token;

    // if we use braintree, we need to pass the token as well
    if (req.session.braintree_token === undefined) {
        prepare_token(req, res, next, ß.lib.payment.render_page);
        return console.log("need braintree token");
    }

    var ejsfile = ß.views(req, 'braintree.ejs');

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

        res.render(ejsfile, {
            lang: req.session.lang.toUpperCase(),
            host: HOSTNAME,
            braintree_token: req.session.braintree_token,
            p: p
        });
    });
};
