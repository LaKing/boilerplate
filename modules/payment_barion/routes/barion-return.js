/*jshint esnext: true */


const app = ß.app;

 app.all("/barion-return", function(req, res) {
        console.log("barion-return", req.query);
        res.redirect("/");
    });
