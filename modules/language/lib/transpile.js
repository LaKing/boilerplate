/*jshint esnext: true */
const lib = ß.lib;
const fs = ß.fs;

// this iterates in all languages    
module.exports = function(folder) {

    var cpfiles = ß.get_files_array(ß.CWD, folder);
    var bpfiles = ß.get_files_array(ß.BPD, folder);
    var files = [...new Set([...cpfiles, ...bpfiles])];

    const language = ß.language;

    for (let l = 0; l < language.list.length; l++) {
        fs.mkdirpSync(ß.CWD + '/local/' + language.list[l]);
    }

    for (let i = 0; i < files.length; i++) {
        let file = ß.find_file_path(folder, files[i]);

        for (let l = 0; l < language.list.length; l++) {
            ß.lib.language.render_file(language.list[l], file);
        }
    }
};