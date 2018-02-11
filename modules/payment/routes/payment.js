/*jshint esnext: true */

const app = ß.app;

app.get('/payment.html', function(req, res, next) {

    if (!req.session) return res.redirect('/');
    if (!req.session.passport) return res.redirect('/login');
    if (!req.session.passport.user) return res.redirect('/login');

    ß.lib.payment.initialize_payment(req.session, function(err) {
        if (err) {
            res.send("ERROR.Mission failed. Could not initialize payment.");
            console.log(err);
            return;
        }

        if (ß.USE_PAYMENT_BARION && ß.USE_PAYMENT_BRAINTREE && ß.USE_PAYMENT_SIMPLEPAY) {
            //console.log("USE_PAYMENT_BARION && USE_PAYMENT_BRAINTREE && USE_PAYMENT_SIMPLEPAY");
            ß.lib.payment.render_page(req, res, next);
            return;
        }

        if (ß.USE_PAYMENT_BARION) {
            //console.log("USE_PAYMENT_BARION");
            ß.lib.payment_barion.render_page(req, res, next);
            return;
        }

        if (ß.USE_PAYMENT_BRAINTREE) {
            //console.log("ß.USE_PAYMENT_BRAINTREE");
            ß.lib.payment_braintree.render_page(req, res, next);
            return;
        }

        if (ß.USE_PAYMENT_SIMPLEPAY) {
            //console.log("ß.USE_PAYMENT_SIMPLEPAY");
            ß.lib.payment.render_page(req, res, next);
            return;
        }



        console.log("ERROR in payment. No payment could be used.");

    });
});
