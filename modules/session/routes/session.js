/*jshint esnext: true */

const app = ß.app;

// EXPRESS requests
app.get('/session', function(req, res, next) {

    if (!req.session) {
        res.setHeader('Content-Type', 'application/json');
        res.send('{}');
        return;
    }
    if (!req.session.passport) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.session));
        return;
    }

    ß.User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.error("ERROR in session request", err);
            res.send("Mission Failed. Error.");
            return;
        }
        if (!user) {
            console.error("ERROR in session request - no ruser");
            res.send("Mission Failed. No user.");
            return;
        }

        ß.lib.session.update_user(req.session, user);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.session));
    });
});
app.post('/session-data', function(req, res, next) {
    console.log('POST', req.body);
    req.session.data = req.body;
    //req.session.save();
    res.send('OK');
    Ł(req.body, req.session);
});