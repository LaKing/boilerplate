/*jshint esnext: true */

const cb = function() {
    //Ł('session destriction cb');
};

ß.app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(cb);
    res.redirect('/');
});
