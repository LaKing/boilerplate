/*jshint esnext: true */

ß.app.post('/request-email', function(req, res, next) {

    var email = req.body.email;

    ß.User.findOne({
        'local.email': email
    }, function(err, user) {
        if (err) {
            console.log("error at post-email", err);
            res.send('NO');
        }
        ß.lib.passport_hash.send(user._id);
        res.send('OK');
    });

});
