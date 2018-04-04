/*jshint esnext: true */

var config_file = ß.CWD + '/config/passport_facebook.json';
var debug_file = ß.CWD + '/config/passport_facebook.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;


module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {

            'facebookAuth': {
                'clientID': 'secret-app-ID',
                'clientSecret': 'app-secret',
                'callbackURL': 'https://' + ß.HOSTNAME + '/auth/facebook/callback',
                'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
                'profileFields': ['id', 'email', 'name']
            }

        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
