/*ßoilerplate */

ß.app.post("/paypal-payment.json", function(req, res) {
  	let parameters = {};
  	parameters.paypal = {};
  	parameters.paypal.order = req.body;
  	parameters.session = req.session;
  
  	ß.msg("Recieved paypal payment " + parameters.paypal.order.id);
  
    ß.lib.paypal.approve(parameters, function(err, msg) {
        res.json(msg);
    });
});
