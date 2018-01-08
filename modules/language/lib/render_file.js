/*jshint esnext: true */

const fs = ß.fs;


function process_data(lang, data) {

    const CHUNK_SEPERATOR = ß.language.CHUNK_SEPERATOR;
    const LANGUAGE_PREFIX = ß.language.LANGUAGE_PREFIX;

    // create chunks array
    var ca = data.split(CHUNK_SEPERATOR);
    // resulting string will be here
    var r = '';
    // iterate through the chunks
    for (var i = 0; i < ca.length; i++) {
        // if this chunk starts with @ it is a language specific chunk
        if (ca[i].charAt(0) === LANGUAGE_PREFIX) {
            // check if need to keep it, other
            if (ca[i].substring(0, LANGUAGE_PREFIX.length + lang.length + 1) === LANGUAGE_PREFIX + lang + ' ') r += ca[i].substring(LANGUAGE_PREFIX.length + lang.length + 1, ca[i].length - 1);
        } else {
            // if it is not a language specific chunk, we have to keep it
            r += ca[i];
        }
    }
    return r;
}


// for a given language, we need to process a given sourcefile
module.exports = function(lang, file) {
    const lang_dir = ß.CWD + '/local';

    //var f = ß.BPD + '/' + dir + '/' + file;
    //if (fs.existsSync(ß.CWD + '/' + dir + '/' + file)) f = ß.CWD + '/' + dir + '/' + file;

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) console.log(err);

        var filename = file.split('/').pop();

        // ok, content is ready to be written.
        fs.writeFile(lang_dir + '/' + lang + '/' + filename, process_data(lang, data), function(err) {
            if (err) return console.log(err);
            //console.log("render", lang + '/' + file, "complete");
        });
    });
};