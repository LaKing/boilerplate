/*jshint esnext: true */

const verifier = require('email-verify');
var infoCodes = verifier.infoCodes;

module.exports = function(address, callback) {

    verifier.verify(address, function(err, info) {
        if (err) callback(err, false);
        else {
            //console.log("Success (T/F): " + info.success);
            //console.log("Info: " + info.info);
            callback(null, true);
        }
    });

};
