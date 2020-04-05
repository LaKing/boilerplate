// @DOC We create seperate webpack packers so that we have all languages statically translated.

const fs = require("fs");
const child_process = require("child_process");

const ß = require(process.env.VAR + "/boilerplate.es5.js");
//const language_process = require("../process.js");

let MODE = "development";
if (process.env.NODE_ENV === "production") MODE = "production";

const service_js = ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js";

/*
var language_object = {};
Object.keys(ß.PAGES).forEach(function(page) {
    if (ß.PAGES[page].lang) language_object[ß.PAGES[page].lang] = true;
});


Object.keys(language_object).forEach(function(lang) {
*/
Object.keys(ß.APP_LANGUAGES).forEach(function(lang) {

	// Write a file for the duration of vue build
    const index_dir = ß.VAR + "/vue/" + lang;

    fs.writeFileSync(
        ß.VAR + "/app/" + lang + ".html",
        '<head><META HTTP-EQUIV="refresh" CONTENT="1"></head><body><input type="button" value = "Vue build .. ' + lang + '" onclick="history.go(0)" /></body>'
    );

    const name = "vue-build-language-" + lang;

    var option = {
        env: { VUE_CLI_CONTEXT: ß.VAR + "/vue/" + lang },
        stdio: [
            0, // Use parent's stdin for child
            fs.openSync(ß.VAR + "/debug/fork-" + name + ".stdout.log", "w"), // stdout
            fs.openSync(ß.VAR + "/debug/fork-" + name + ".stderr.log", "w"), // stderr to a file
            "ipc" //Forked processes must have an IPC channel
        ]
    };

    var argv = [];
    argv.push("--mode", MODE);
    argv.push("--no-clean");
    argv.push("build");

    var child = child_process.fork(service_js, argv, option);

    fs.writeFileSync(ß.VAR + "/debug/fork-" + name + ".pid", child.pid);
    console.log("- forked", name, "with pid", child.pid);

    child.on("error", err => {
        ß.err("ERROR on", name, "subprocess. ", err);
    });

    child.on("close", code => {
        //if (code === 0) console.log('[ OK ]', name);
        if (code !== 0) console.log(name, " - exit with error code", code);
        fs.unlink(ß.VAR + "/debug/fork-" + name + ".pid", err => {
            if (err) console.log(err);
            delete child.pid;
        });
    });

    process.on("SIGTERM", function() {
        if (!child.pid) return;
        console.log("child process kill", name, child.pid);
        child.kill();
    });

    process.on("SIGUSR1", function() {
        if (!child.pid) return;
        console.log("child process kill", name, child.pid);
        child.kill();
    });
});
