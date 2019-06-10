/*ßoilerplate */

if (!global.ß) global.ß = {};

if (!ß.MODE) {
	if (process.env.NODE_ENV === "production") ß.MODE = "production";
	else ß.MODE = "development";
}

console.log("Starting ßoilerplate on node", process.versions.node, process.platform, ß.MODE, process.cwd());

require('./loader');

// We already have a module list, start loading modules.
// run the loader tasks

// TODO - where should we try and catch, where should we leave free flow?

try {

    // @DOC The `/global` folder in a module should contain simple scripts to attach values to the global `ß` namespace.
    ß.load("global");

    // @DOC After the global `ß` values are set, libs and hooks are loaded.
    ß.load_lib(ß.modules);
    ß.load_hooks();

} catch (err) {
    đ(err);
    console.log("ERROR, EXITING due to a failure in the boilerplate initialization");
    process.exit(95);
}

//ß.debug("- " + Object.keys(ß).length + " ß.keys defined");

ß.load('init');
ß.load('server');
ß.load('start');

// background subprocesses may be defined in fork directories
ß.fork("fork");

// application started.
if (ß.DEBUG) {
    ß.load('debug');
    ß.debug_namespace();
}