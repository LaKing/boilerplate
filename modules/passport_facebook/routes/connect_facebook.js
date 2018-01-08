/*jshint esnext: true */

ß.app.get('/connect/facebook', ß.passport.authorize('facebook', {
    scope: ['public_profile', 'email']
}));

ß.app.get('/connect/facebook/callback',
    ß.passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));