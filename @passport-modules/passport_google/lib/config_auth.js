/*jshint esnext: true */

var config_file = ß.CWD + '/config/passport_google.json';
var debug_file = ß.CWD + '/config/passport_google.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;


module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'googleAuth': {
                'clientID': 'your-secret-clientID-here',
                'clientSecret': 'your-client-secret-here',
                'callbackURL': 'http://localhost:8080/auth/google/callback'
            }
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
