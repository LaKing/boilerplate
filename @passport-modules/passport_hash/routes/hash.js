/*jshint esnext: true */

ß.app.get('/hash/:email/:id/:hash', ß.passport.authenticate('hash-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));