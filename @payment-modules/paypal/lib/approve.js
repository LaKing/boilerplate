module.exports = function(parameters, callback) {
  	
    var client_message = {};
  
  	//client_message.dispatch = "server/session_reload";
  
    ß.run_hook("payment", parameters);
    callback(null, client_message);
};

/*
┏━━━ approve
┠─ { create_time: '2020-04-03T03:31:04Z',
update_time: '2020-04-03T03:31:44Z',
id: '18N57416SN462815C',
intent: 'CAPTURE',
status: 'COMPLETED',
payer:
{ email_address: 'sb-vzdpx1253361@personal.example.com',
payer_id: 'CMPCFX6CGLJUQ',
address: { country_code: 'HU' },
name: { given_name: 'John', surname: 'Doe' } },
purchase_units:
[ { description: 'Some payment',
reference_id: 'default',
soft_descriptor: 'PAYPAL *MRXLXSTESTS',
amount: [Object],
payee: [Object],
shipping: [Object],
payments: [Object] } ],
links:
[ { href:
'https://api.sandbox.paypal.com/v2/checkout/orders/18N57416SN462815C',
rel: 'self',
method: 'GET',
title: 'GET' } ] }
┗━━━━ at /srv/codepad-project/@payment-modules/paypal-checkout-vue/routes/paypal-payment.js:4:2
  */
