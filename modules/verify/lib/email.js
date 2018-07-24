/*jshint esnext: true */

const verifier = require('email-verify');
var infoCodes = verifier.infoCodes;

if (!ß.verify_email_options) ß.verify_email_options = {};
if (!ß.verify_email_options.sender) ß.verify_email_options.sender = "test@" + ß.HOSTNAME;
if (!ß.verify_email_options.fqdn) ß.verify_email_options.fqdn = ß.HOSTNAME;

module.exports = function(address, callback) {

    verifier.verify(address, ß.verify_email_options, function(err, info) {
        if (err) callback(err, false, "");
        else {
            if (!info.success) console.log("Verify failed on " + address + "Info: " + info.info + " #code:" + info.code);
            callback(null, info.success, info);
        }
    });

};
