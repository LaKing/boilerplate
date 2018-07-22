/*jshint esnext: true */
const fs = ß.fs;
const lib = ß.lib;

// we use this special server for the language-specific rendered files.
function express_localized_file_handler(file) {
    const app = ß.app;
    const language = ß.language;

    app.get('/' + file, function(req, res) {
        var lang = lib.language.get_by_req(req);
        var path = ß.CWD + '/local/' + lang;

        // the admin editor is an exeption, we always give the admin the editable version
        if (req.session.is_admin && file.split('.').pop() === 'html') path = ß.CWD + '/editor/' + lang;

        fs.readFile(path + '/' + file, 'utf8', function(err, data) {
            if (err) {
                console.log('ERROR could not serve', path, file);
                res.send('ERROR');
                return;
            }
            res.send(data);
            
        });
    });
}

// this iterates in all the files    
module.exports = function() {
	console.log(" - Registering localized file handlers");
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
