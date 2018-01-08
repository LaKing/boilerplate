/*jshint esnext: true */

const config_file = ß.CWD + '/config/passport_facebook.json';
const fs = ß.fs;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {

            'facebookAuth': {
                'clientID': 'secret-app-ID',
                'clientSecret': 'app-secret',
                'callbackURL': 'http://localhost:8080/auth/facebook/callback',
                'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
                'profileFields': ['id', 'email', 'name']
            }

        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
