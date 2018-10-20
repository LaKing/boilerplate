/*jshint esnext: true */

module.exports = function(req, res, next) {
    if (req.isAuthenticated())
        if (req.session.passport)
            if (ß.lib.admin.check_if_admin(req.session.passport.user))
                return next();
    res.redirect('/');
};
