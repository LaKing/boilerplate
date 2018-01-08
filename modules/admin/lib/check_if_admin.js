/*jshint esnext: true */

const passport_file = ß.CWD + '/config/admin-passports.json';
const fs = ß.fs;

var passports = {};

if (fs.existsSync(passport_file)) {
    passports = fs.readJsonSync(passport_file);
} else {
    passports.primary = "5a29e7a52d3c7141834599ca";
    passports.secondary = "5a29e7a52d3c7141834599cb";

    fs.writeJsonSync(passport_file, passports);
}

module.exports = function(id) {

    var arr = Object.keys(passports);

    for (var i = 0; i < arr.length; i++) {
        if (passports[arr[i]] === String(id)) return true;
    }

    return false;
};
