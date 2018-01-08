/*jshint esnext: true */

const settings_file = ß.CWD + '/config/settings.json';
const fs = ß.fs;

var settings = {};

if (fs.existsSync(settings_file)) {
    settings = fs.readJsonSync(settings_file);
} else {
    settings.admins = ["5a15e5e8cc49250916238ae8"];
    settings.offline = false;
    settings.debug = true;
    settings.session_days = 365;

    fs.writeJsonSync(settings_file, settings);
}

ß.debug = settings.debug;
