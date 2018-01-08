/*jshint esnext: true */

const app = ß.app;


app.get('/payment.html', function(req, res, next) {

    if (!req.session) return res.redirect('/');
    if (!req.session.passport) return res.redirect('/login');
    if (!req.session.passport.user) return res.redirect('/login');

    ß.lib.payment.initialize_payment(req.session, function(err) {
        if (err) {
            res.send("Mission failed. Could not initialize payment.");
            console.log(err);
            return;
        }
        ß.lib.payment.render_page(req, res, next);
    });

});