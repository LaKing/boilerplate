/*jshint esnext: true */

const lib = ß.lib;

module.exports = function() {

    const app = ß.app;

    app.get('/', function(req, res, next) {
        //if (app.locals.settings)
        //if (app.locals.settings.debug) 
        lib.language.transpile('views');
        lib.language.transpile('public');
        lib.language.get_by_req(req);
        next();
    });

    app.get('/admin', function(req, res, next) {
        //if (app.locals.settings)
        //    if (app.locals.settings.debug) 
        lib.language.transpile('views');
        lib.language.transpile('public');
        lib.language.get_by_req(req);
        next();
    });

};
