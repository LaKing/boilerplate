/*jshint esnext: true */

/*
http://simplepartner.hu/download.php?target=sdk
http://simplepartner.hu/download.php?target=detailshu
http://simplepartner.hu/download.php?target=dochu
https://sandbox.simplepay.hu/admin
*/

/*jshint esnext: true */

const config_file = ß.CWD + '/config/payment_simplepay.json';

const fs = ß.fs;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.description = "Replace this to some real data";

    config.secretKey = 'The-secret-key-from-simplepay';
    config.merchant = 'S1234567';

    fs.writeJsonSync(config_file, config);
}

ß.simplepay_config = config;
