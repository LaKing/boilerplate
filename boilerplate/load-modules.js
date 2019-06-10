// run the loader tasks
try {
    ß.load_modules(ß.MRD);

    if (!ß.CLI) {
        let n = Object.keys(ß.modules).length;
        if (n < 1) ß.error("0 modules.");
        if (n == 1) ß.error("1 module only.");
        if (n <= 1) return ß.error("Check your installation. Module Root Directory (ß.MRD) is " + ß.MRD);
    }

    ß.debug_modules();

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