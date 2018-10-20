/*jshint esnext: true */

module.exports = function(ref) {

    const userid = ref.split('-')[0];
    const paymentid = ref.split('-')[1];

    ß.lib.szamlazz.makeInvoice(userid, paymentid);

};

