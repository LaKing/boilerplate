/*jshint esnext: true */

function boiler_login(req, res, next) {
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
}


ß.app.post('/post-login', function(req, res, next) {
    var session_days = 365;
    if (ß.app.locals.settings.session_days) session_days = ß.app.locals.settings.session_days;
    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * session_days;
    boiler_login(req, res, next);
});

ß.app.post('/post-session-login', function(req, res, next) {
    req.session.cookie.expires = false;
    boiler_login(req, res, next);
});