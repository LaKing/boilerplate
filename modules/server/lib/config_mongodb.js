/*jshint esnext: true */

const config_file = ß.CWD + '/config/sessions-mongodb.json';
const fs = ß.fs;

module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'url': 'mongodb://localhost/sessions'
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};
