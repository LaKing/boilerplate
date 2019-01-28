
ß.app.post('/session-data', function(req, res, next) {

    //console.log('POST', req.body);
    req.session.data = req.body;
    //req.session.save();
    res.send('OK');
    ß.debug('+ POST session-data: ' + JSON.stringify(req.body));
    //Ł(req.body, req.session);
});