/*jshint esnext: true */

ß.app.post('/post-email', function(req, res, next) {

    var email = req.body.email;
  	if (!email) return res.send('No email.');

    ß.User.findOne({
        'local.email': email
    }, function(err, user) {
        if (err) {
            console.log("error at post-email", err);
            res.send('NO');
        }
        if (user === null) {
            ß.lib.verify.email(email, function(err, isok) {
                if (!isok) res.send('BADFORMAT');
                else res.send('GOODFORMAT');
            });
        }
        if (user) res.send('OK');
    });

});