/*jshint esnext: true */

const password_file = ß.CWD + '/config/admin-passwords.json';
const fs = ß.fs;

var passwords = {};

if (fs.existsSync(password_file)) {
    passwords = fs.readJsonSync(password_file);
} else {
    passwords.master = "******";
    passwords.devel = "***";
    fs.writeJsonSync(password_file, passwords);
}


// admin functions lib
module.exports = function(password) {
    if (password === passwords.master) return true;
    if (password === passwords.devel) return true;
    return false;
};
