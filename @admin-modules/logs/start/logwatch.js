/*ßoilerplate */

// Symbolic links seem to be resolved at startup. https://github.com/nodejs/node/issues/25440

var online = false;
var watch = null;

function add_watch() {
    const logfile = ß.PROJECTLOG;

    if (online) return;
    if (!ß.fs.existsSync(logfile)) return console.log('logfile dont exist:', ß.PROJECTLOG);
    online = true;
    ß.lib.logs.send_log();
  	console.log("- start watch:", logfile);
    watch = ß.fs.watch(logfile, (eventType, filename) => {
        if (eventType === "change") return ß.lib.logs.send_log();
        // else our file disappeared
        console.log("- stop watch:", logfile);
        online = false;
        watch.close();
    });
}

if (!ß.fs.existsSync(ß.PROJECTLOG)) console.log('logfile dont exist:', ß.PROJECTLOG);

add_watch();
setInterval(add_watch, 1000);
