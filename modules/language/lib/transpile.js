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
            //if (fs.lstatSync(file).isDirectory()) ß.lib.language.transpile(file);
            //if (fs.lstatSync(file).isFile())
            let ext = file.split('.').reverse()[0];
            if (ext === 'html' || ext === 'ejs' || ext === 'js' || ext === 'json' || ext === 'txt')
                ß.lib.language.render_file(language.list[l], file);
            else console.log("ERROR in ßoilerplate module structure. File is not translateable.", file);
        }
    }
};
