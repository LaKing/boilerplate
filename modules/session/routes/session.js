/*jshint esnext: true */

    const app = ß.app;

    // EXPRESS requests
    app.get('/session', function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.session));
    });
    app.post('/session-data', function(req, res, next) {
        //console.log('POST', req.body);
        req.session.data = req.body;
        res.send('OK');
    });

