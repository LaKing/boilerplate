/*jshint esnext: true */


module.exports = function(req, res, next, callback) {
    // we store some userdata in the session
    var braintree_option = {};
    if (req.session.braintree_customerId) braintree_option.customerId = req.session.braintree_customerId;

    ß.braintree_gateway.clientToken.generate(braintree_option, function(err, response) {
        if (err) console.log(err);
        var braintree_token = response.clientToken;
        req.session.braintree_token = braintree_token;
        callback(req, res, next);
    });
};