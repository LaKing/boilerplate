/*jshint esnext: true */

const config_file = ß.CWD + '/config/payment_braintree.json';

const fs = ß.fs;

var config = {};

if (fs.existsSync(config_file)) {
    config = fs.readJsonSync(config_file);
} else {

    config.description = "LaKing@D250.hu PayPal";
    config.sandbox = true;
    config.merchantId = "mjmdgkg9sp6qzqyk";
    config.publicKey = "vftb2w59vzzjgfp3";
    config.privateKey = "e8f3356437ea8d226811763d6806657f";

    fs.writeJsonSync(config_file, config);
}

if (config.sandbox) config.environment = ß.braintree.Environment.Sandbox;

ß.braintree_gateway = ß.braintree.connect(config);
