/*jshint esnext: true */

const fs = ß.fs;

var config_file = ß.CWD + '/config/language.json';

var configs = {};

if (fs.existsSync(config_file)) {
    configs = fs.readJsonSync(config_file);
} else {
    configs = {};

    configs.list = ['en', 'hu'];
    configs.default = 'en';
    // should be two characters
    configs.CHUNK_SEPERATOR = '##';
    // shoule be one character
    configs.LANGUAGE_PREFIX = '&';

    fs.writeJsonSync(config_file, configs);
}

if (!ß.language) ß.language = configs;