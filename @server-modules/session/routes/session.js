// EXPRESS requests

// @DOC The session data can be accessed by the frontend on the `session.json` uri.

ß.app.all("/session.json", function(req, res, next) {
    res.setHeader("Content-Type", "application/json");

    if (!req.session) {
        res.json({});
        return;
    }

    if (!req.user) {
        res.send(JSON.stringify(req.session));
        return;
    }

    let ret = Object.assign(req.session, { user: req.user });
    return res.json(ret);

});