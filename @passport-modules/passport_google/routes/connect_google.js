/*jshint esnext: true */

ß.app.get('/connect/google', ß.passport.authorize('google', {
    scope: ['profile', 'email']
}));

// the callback after google has authorized the user
ß.app.get('/connect/google/callback',
    ß.passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));