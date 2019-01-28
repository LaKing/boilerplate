/*ßoilerplate */

//const {google} = require('googleapis');

ß.google = require('googleapis').google;

const keyfile = ß.CWD + "/config/google-privatekey.json";

if (!ß.googleapis_scopes) 
  ß.googleapis_scopes = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/spreadsheets'];

if (ß.fs.existsSync(keyfile)) {

    let privatekey = require(keyfile);

    // ß.jwtClient = new ß.google.auth.JWT();
    ß.jwtClient = new ß.google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ß.googleapis_scopes
    );

    console.log(' - Googleapis enabled', ß.googleapis_scopes.join(' '));

} else {
    // https://console.developers.google.com/apis/dashboard ?
    ß.err('ERROR - googleapis is enabled, but no JWT key found at ' + keyfile);
    ß.ntc('# Select your project or create a new one at https://cloud.google.com/console');
    ß.ntc('# go to APIs overwies, and enable APIS and services: ' + scope_modules);
    ß.ntc('# under Credidentials, create credidential for a service-account in JSON format');
    ß.ntc('# place this file at ' + keyfile);
}