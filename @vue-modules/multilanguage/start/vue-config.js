// @DOC Each nlanguage needs a vue-cli webpack configuration as well.

const br = "\n";
const webpack_dev_server_client = ß.VAR + "/node_modules/webpack-dev-server/client";
const util = require("util");
const fs = require("fs");

if (!ß.PAGES) return console.log("LANGUAGE requires PAGES");

// We assume that in ß.PAGES if the key and the lang under the key are identical, then it's the language entrypoint itself
// However, we just make a collection here based on pages.lang, ...
var language_object = {};
Object.keys(ß.PAGES).forEach(function(page) {
    if (ß.PAGES[page].lang) language_object[ß.PAGES[page].lang] = true;
});

Object.keys(language_object).forEach(function(lang) {
    var str = "";

    var LANG_PAGES = {};
    Object.keys(ß.PAGES).forEach(function(page) {
        if (ß.PAGES[page].lang === lang) LANG_PAGES[page] = ß.PAGES[page];
    });

    str += br + "var webpack = require('webpack');";
    str += br + "var wp_lang = new webpack.DefinePlugin({'LANG': JSON.stringify('" + lang + "')});";
    str += br + "var wp_build = new webpack.DefinePlugin({'BUILD_MODULE': JSON.stringify('" + ß.MODE + "')});";
    str += br + "var wp_boilerplate = new webpack.ProvidePlugin({ß: ['" + ß.VAR + "/boilerplate.js', 'default']});";
    str += br + "var wp_debuglog = new webpack.ProvidePlugin({Ł: ['" + ß.VAR + "/debuglog.js', 'default']});";

    str += br;

    str += br + "module.exports = {";
    str += br + "    pages: " + util.inspect(LANG_PAGES, { depth: Infinity }) + ",";
    str += br + "    configureWebpack: (conf) => {";

    str += br + "        conf.plugins.push(wp_lang);";
    str += br + "        conf.plugins.push(wp_build);";
    str += br + "        conf.plugins.push(wp_boilerplate);";
    str += br + "        conf.plugins.push(wp_debuglog);";

    str += br + "        conf.resolve.symlinks = false;";
    str += br + "    },";
    str += br + "    chainWebpack: config => {";
    str += br + "        config.resolve.alias.set('ß', '/var/codepad-project/boilerplate.js');";

    // use preloader language processor
    if (ß.USE_MULTILANGUAGE) {
        str += br + "        config.module.rule('vue').use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end()";
        str += br + "        config.module.rule('js').test(/.js$/).use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end()";
    }

    str += br + "    },";
    str += br + "    outputDir: '" + ß.VAR + "/app'";
    str += br + "};";
    str += br;

    ß.fs.mkdirpSync(ß.VAR + "/vue/" + lang);
    ß.fs.writeFileSync(ß.VAR + "/vue/" + lang + "/vue.config.js", str);
});
