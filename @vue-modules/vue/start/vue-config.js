// @DOC The default index build is a single-language, but has hot reload for development. It will work with simlinks to the original sourcefiles. Push only needed if the file-structure changes.

const br = "\n";
const webpack_dev_server_client = ß.VAR + "/node_modules/webpack-dev-server/client";
const util = require("util");

build_vue_config_js_file();

function build_vue_config_js_file() {
    var str = "";
    const lang = ß.DEFAULT_LANG || "en";
    //str += br + "";
    str += br + "var fs = require('fs');";
    str += br + "var webpack = require('webpack');";
    str += br + "var wp_lang = new webpack.DefinePlugin({'LANG': JSON.stringify('" + lang + "')});";
    str += br + "var wp_build = new webpack.DefinePlugin({'BUILD_MODULE': JSON.stringify('INDEX')});";
    str += br + "var wp_boilerplate = new webpack.ProvidePlugin({ß: ['" + ß.VAR + "/boilerplate.js', 'default']});";
    str += br + "var wp_debuglog = new webpack.ProvidePlugin({Ł: ['" + ß.VAR + "/debuglog.js', 'default']});";

    str += br;
    str += br + "module.exports = {";

    if (ß.PAGES) {
        var LANG_PAGES = {};

// app index used in development
LANG_PAGES.index = {
    entry: "src/app.js",
    template: "src/index.html",
    filename: "index.html"
};

      // in live development with hot modules, we only use non-language pages
        Object.keys(ß.PAGES).forEach(function(page) {
            if (ß.PAGES[page].lang) return;
            //console.log("SKIPPING LANGUAGE-SPECIFIC", page, " IN DEFAULT BUILD");
            else LANG_PAGES[page] = ß.PAGES[page];
        });
        str += br + "    pages: " + util.inspect(LANG_PAGES, { depth: Infinity }) + ",";
    }

    str += br + "    configureWebpack: (conf) => {";

    str += br + "        conf.plugins.push(wp_lang);";
    str += br + "        conf.plugins.push(wp_build);";
    str += br + "        conf.plugins.push(wp_boilerplate);";
    str += br + "        conf.plugins.push(wp_debuglog);";

    str += br + "        conf.resolve.symlinks = false;";
    str += br + "    },";
    str += br + "    chainWebpack: config => {";
    str += br + "        config.resolve.alias.set('ß', '" + ß.VAR + "/boilerplate.js');";

    // use preloader language processor
    if (ß.USE_MULTILANGUAGE) {
        str += br + "        config.module.rule('vue').use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end();";
        str += br + "        config.module.rule('js').test(/.js$/).use('webpack-detagger').loader('webpack-detagger').options('" + lang + "').end();";
    }

    str += br + "    },";
    str += br + "    devServer: {";
    str += br + "        host: '0.0.0.0',";
    str += br + "        port: 9000,";
    str += br + "        disableHostCheck: true,";
    //str += br + "        https: true,";

    str += br + "        https: {";
    let cert_path = ß.get_module_path('server', 'cert');
    str += br + "           key: fs.readFileSync('" + cert_path + "/localhost.key'),";
    str += br + "           cert: fs.readFileSync('"+ cert_path + "/localhost.crt'),";
    //str += br + "           ca: fs.readFileSync('/path/to/ca.pem'),";
    str += br + "        },";

    //str += br + "        clientLogLevel: 'info',";
    str += br + "        public: 'https://" + ß.HOSTNAME + ":9000'";
    str += br + "    },";
    str += br + "    outputDir: '" + ß.VAR + "/app'";
    str += br + "};";
    str += br;

    ß.fs.mkdirpSync(ß.VAR + "/vue/index");
    ß.fs.writeFileSync(ß.VAR + "/vue/index/vue.config.js", str);

    ß.link(ß.VAR + "/vue/src", ß.VAR + "/vue/index/src");

    //ß.link(ß.VAR + '/vue/node_modules', ß.VAR + "/vue/index/node_modules");

    console.log("- vue serve @ ", ß.ansi_link("https://" + ß.HOSTNAME + ":9000"));
}

// something like this might be useful for some custom files
//str += br + "const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');";
//str += br + "function my(input) { console.log(input); return input; }";
//str += br + "var ppp = new WebpackFilePreprocessorPlugin({ debug: true, pattern: /.html$/, process: (source) => my(source.toString())})";
