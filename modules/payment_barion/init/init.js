/*jshint esnext: true */

var config_file = ß.CWD + '/config/payment_barion.json';
var debug_file = ß.CWD + '/config/payment_barion.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) config_file = debug_file;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.POSKey = "qwertzuiopasdfghjklyxcvbnm123456789";
    config.payee = "payee@example.com";
    config.test = true;

    fs.writeJsonSync(config_file, config);
}

ß.barion_test = new(require('barion-nodejs'))(BarionTest);
ß.barion_secure = new(require('barion-nodejs'))();

if (config.test) {
    ß.barion = new(require('barion-nodejs'))(BarionTest);
    console.log("- BARION-TEST mode detected in configs. Use cards: 4444 8888 8888 5559, 2/20, 200 | 4444 8888 8888 4446");
} else {
    ß.barion = new(require('barion-nodejs'))();
}

ß.barion_config = config;

// Tesztkártyák / test cards 4444 8888 8888 5559, 2/20, 200 | 4444 8888 8888 4446