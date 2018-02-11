/*jshint esnext: true */
//const User = require('./user-model');

module.exports = function(ref) {
    const User = ß.User;

    // process successful payment by reference userid-paymentid

    const userid = ref.split('-')[0];
    const paymentid = ref.split('-')[1];

    //console.log("payment-success", userid, paymentid);
    User.findById(userid, function(err, user) {
        if (err) return console.log("ERROR payment-success process ERR", userid, paymentid, err);
        if (!user) return console.log("ERROR payment-success process USER not found", userid, paymentid);
        if (!user.setPaid(paymentid)) return console.log("ERROR payment-success PAYMENTID NOT FOUND ", userid, paymentid);
        console.log("OK! PAYMENT COMPLETE userid", userid, "payment-id", paymentid);

        ß.run_hooks('payment_success', ref);

    });
};
