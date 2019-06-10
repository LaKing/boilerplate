// @DOC each language will have it's own src folder for the vue build process

// create a language object first
var language_object = {};
Object.keys(ß.PAGES).forEach(function(page) {
    if (ß.PAGES[page].lang) language_object[ß.PAGES[page].lang] = true;
});

// then for each language, do the processing
Object.keys(language_object).forEach(function(lang) {

    ß.modules_process(ß.vue_modules, build_vue_src_priority);
    ß.modules_process(ß.vue_modules, build_vue_src_standard);

    function build_vue_src_priority(module, module_dir, priority) {
       if (priority) build_vue_src(module, module_dir);
    }

    function build_vue_src_standard(module, module_dir, priority) {
       if (!priority) build_vue_src(module, module_dir);
    }
  
    function build_vue_src(module, module_dir) {
        const path = module_dir + "/vue";
        const dest = ß.VAR + "/vue/" + lang + "/src";

        ß.fs.traverse_path_process_files(path, function(file_path) {
            let source = path + file_path;
            let target = dest + file_path;
            let ext = ß.path.extname(source); 
          	// translate files 
            if (ext === ".vue" || ext === ".js") {
                let data = ß.fs.readFileSync(source, 'utf-8');
                let processed_data = ß.lib.multilanguage.process(lang, data);
              	let target_dir = ß.path.dirname(target);
              	ß.fs.mkdirpSync(target_dir);
              	if (!ß.fs.existsSync(target)) ß.fs.writeFileSync(target, processed_data);
                return;
            }
            // and use links for non translateable files
            ß.link(source, target);
        });
    }
  
});
