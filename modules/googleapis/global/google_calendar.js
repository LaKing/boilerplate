/*jshint esnext: true */

Ł(ß.modules);

ß.google = require('googleapis');

const keyfile = ß.CWD + "/config/google-privatekey.json";
var scopes = [];
var scope_modules = '';
Object.keys(ß).forEach(function(m) {
    if (m.substring(0, 11) === 'USE_GOOGLE_') {
        let scope = m.substring(11).toLowerCase();
        scopes.push('https://www.googleapis.com/auth/' + scope);
        scope_modules += scope + ', ';
    }
});


if (ß.fs.existsSync(keyfile)) {

    let privatekey = require(keyfile);


    ß.jwtClient = new ß.google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        scopes
    );

} else if (scopes.length > 0) {

    console.log('ERROR - googleapis has scopes enabled, but no JWT key found at ' + keyfile);
    console.log('# Select your project or create a new one at https://cloud.google.com/console');
    console.log('# go to APIs overwies, and enable APIS and services: ' + scope_modules);
    console.log('# under Credidentials, create credidential for a service-account in JSON format');
    console.log('# place this file at ' + keyfile);
}