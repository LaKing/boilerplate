ß.app.all("/start-payment.json", function(req, res) {
    ß.lib[ß.PAYMENT].start_payment(req.session, function(err, json) {
        if (err) return res.json(err);
        else res.json(json || "no-response");
    });
});
