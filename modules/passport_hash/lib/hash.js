/*jshint esnext: true */

const HOSTNAME = require('os').hostname();
const crypto = require('crypto');

module.exports = function(str) {
    var secret = "@" + HOSTNAME;
    return crypto.createHash('md5').update(str + secret).digest("hex");
};
