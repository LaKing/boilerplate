/*jshint esnext: true */

const config_file = ß.CWD + '/config/passport_google.json';
const fs = ß.fs;

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
