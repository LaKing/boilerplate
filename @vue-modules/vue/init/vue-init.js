const fs = ß.fs;
const destination = ß.VAR + "/vue";

// @DOC Based on `ß.vue_modules` we create a subset of node modules for vue
ß.modules_process(ß.vue_modules, link_node_modules);

function link_node_modules(module, module_dir) {
    const path = module_dir + "/node_modules";
    const dest = destination + "/node_modules";
    fs.inDirsSync(path, function(npd) {
        // process the node package directory
        if (npd.charAt(0) !== "@") return ß.link(path + "/" + npd, dest + "/" + npd);
        // proce node module collections
        fs.inDirsSync(path + "/" + npd, function(np) {
            return ß.link(path + "/" + npd + "/" + np, dest + "/" + npd + "/" + np);
        });
    });
}

// @DOC The `src` folder is actually a unified version of all vue folders
ß.modules_process(ß.vue_modules, link_vue);

function link_vue(module, module_dir) {
    const path = module_dir + "/vue";
    const dest = destination + "/src";

    ß.fs.traverse_path_process_files(path, function(file_path) {
        ß.link(path + file_path, dest  + file_path);
    });
}

// @DOC We need our detagger, a fake module for webpack. It will expose our `ß.lib.multilanguage.process` function.
var str = "";
const br = "\n";

str += br + "var process_data = require('./process.js');";
// the webpack relalted function
str += br + "function processChunk (source, map) {";
str += br + "  this.cacheable();";
// there is no argument, we return then without doing anything
str += br + "  if (!this.query) return this.callback(null, source, map);";
// there is a language tag passed as argument over webpack
str += br + "  const tag = this.query.substring(1);";
// return
str += br + "  this.callback(null, process_data(tag, source), map);";
str += br + "}";
// we will have to export this file in an node_module folder, so webpack can consume it
str += br + "module.exports = processChunk;";

ß.fs.mkdirpSync(destination + "/node_modules/webpack-detagger.js");
ß.fs.writeFileSync(destination + "/node_modules/webpack-detagger.js/index.js", str);
ß.link(ß.get_module_path("multilanguage", "/lib/process.js"), destination + "/node_modules/webpack-detagger.js/process.js");