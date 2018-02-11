/*jshint esnext: true */

ß.app.post('/post-login', function(req, res, next) {

    ß.passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return res.send('Passport err:' + JSON.stringify(err));
        }
        if (!user) {
            if (req.session.lang) {
                if (req.session.lang === 'en') res.send('Sorry. No. Not with this combination.');
                if (req.session.lang === 'hu') res.send('Érvénytelen email-jelszó kombináció.');
            } else res.send('Sorry. No.');
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.send('OK');
        });
    })(req, res, next);
});