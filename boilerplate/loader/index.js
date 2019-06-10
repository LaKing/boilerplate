/*ßoilerplate */
if (!global.ß) global.ß = {};
if (!ß.cli_commands) ß.cli_commands = [];

// load the loader libs
try {
  
  	// the order matters
    require("./es2017.js");
  
    require("./fs.js");
    require("./node_modules.js");
    require("./init.js");

    require("./now.js");
    require("./pid.js");

    require("./lablib.js");
    require("./logger.js");
    require("./det.js");
    require("./process.js");

    require("./bp.js");
    require("./load.js");
    require("./spawn.js");
    require("./exec.js");
    require("./fork.js");
    require("./symlink.js");
    require("./modulelib.js");

    if (ß.CLI) require("./clilib.js");

    require("./lib.js");
    require("./hook.js");

    require("./modules.js");
} catch (err) {
    console.error(err);
    console.log("ERROR, EXITING due to a failure in the boilerplate-loader");
    process.exit(93);
}


