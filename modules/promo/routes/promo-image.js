/*jshint esnext: true */

const app = ß.app;

app.get('/promo/:id/image.jpg', function(req, res) {
    var id = req.params.id;
    res.sendFile(ß.CWD + '/promo/' + id + '/image.jpg');
});