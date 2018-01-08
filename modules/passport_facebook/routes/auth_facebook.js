/*jshint esnext: true */

ß.app.get('/auth/facebook', ß.passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

ß.app.get('/auth/facebook/callback',
    ß.passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));