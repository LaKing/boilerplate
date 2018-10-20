/*jshint esnext: true */

ß.app.get('/auth/google', ß.passport.authenticate('google', {
    scope: ['profile', 'email']
}));

ß.app.get('/auth/google/callback',
    ß.passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));