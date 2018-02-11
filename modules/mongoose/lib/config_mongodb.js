/*jshint esnext: true */

const config_file = ß.CWD + '/config/mongodb.json';
const fs = ß.fs;



module.exports = function() {
    var configs = {};

    if (fs.existsSync(config_file)) {
        configs = fs.readJsonSync(config_file);
    } else {
        configs = {
            'url': 'mongodb://127.0.0.1/' + ß.HOSTNAME.split('.')[0]
        };

        fs.writeJsonSync(config_file, configs);
    }

    return configs;
};