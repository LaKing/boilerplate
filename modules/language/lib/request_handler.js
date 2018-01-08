/*jshint esnext: true */
const fs = ß.fs;
const lib = ß.lib;

// we use this special server for the language-specific rendered files.
function express_localized_file_handler(file) {
    const app = ß.app;
    const language = ß.language;
    const lang_dir = ß.CWD + '/local';

    app.get('/' + file, function(req, res) {
        var lang = lib.language.get_by_req(req);
        res.sendFile(lang_dir + '/' + lang + '/' + file, function(err) {
            if (err) {
                console.log('ERROR could not serve', lang, file);
            }
            //console.log("serving:", lang_dir + '/' + lang + '/' + file);
        });
    });
}

// this iterates in all the files    
module.exports = function() {

    // we assume the default langue folder has all the files
    const lang = ß.language.default;
    const lang_dir = ß.CWD + '/local';

    fs.readdir(lang_dir + '/' + lang, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
            express_localized_file_handler(file);
        });
    });
};