/*jshint esnext: true */

const keyfile = ß.CWD + "/config/google-privatekey.json";

module.exports = function() {
    if (ß.fs.existsSync(keyfile)) return true;
    console.log("- googleapis has no privatekey. Module will be disabled.");
    return false;
}