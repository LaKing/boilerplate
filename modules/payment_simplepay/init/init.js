/*jshint esnext: true */

/*
http://simplepartner.hu/download.php?target=sdk
http://simplepartner.hu/download.php?target=detailshu
http://simplepartner.hu/download.php?target=dochu
https://sandbox.simplepay.hu/admin
*/

/*jshint esnext: true */

const config_file = ß.CWD + '/config/simplepay.json';

const fs = ß.fs;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.description = "D250BOILERONE";

    config.secretKey = 'E2B90EFvh1j2vg2vTQ2we5V7OgzgW3Jw';
    config.merchant = 'S117001';

    fs.writeJsonSync(config_file, config);
}

ß.simplepay_config = config;
