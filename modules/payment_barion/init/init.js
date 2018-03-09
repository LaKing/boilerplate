/*jshint esnext: true */

const config_file = ß.CWD + '/config/payment_barion.json';

const fs = ß.fs;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.POSKey = "qwertzuiopasdfghjklyxcvbnm123456789";
    config.payee = "payee@example.com";
    config.test = true;

    fs.writeJsonSync(config_file, config);
}

if (config.test)
    ß.barion = new(require('barion-nodejs'))(BarionTest);
else
    ß.barion = new(require('barion-nodejs'))();

ß.barion_config = config;

// Tesztkártyák / test cards 4444 8888 8888 5559, 2/20, 200 | 4444 8888 8888 4446
