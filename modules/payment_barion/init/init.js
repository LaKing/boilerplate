/*jshint esnext: true */

const config_file = ß.CWD + '/config/payment_barion.json';

const fs = ß.fs;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.POSKey = "cf44edb114814e668fd94235b538233f";
    config.payee = "LaKing@D250.hu";
    config.test = true;

    fs.writeJsonSync(config_file, config);
}

if (config.test)
    ß.barion = new(require('barion-nodejs'))(BarionTest);
else
    ß.barion = new(require('barion-nodejs'))();

ß.barion_config = config;