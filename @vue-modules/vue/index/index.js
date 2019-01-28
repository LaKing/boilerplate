/* ßoilerplate */

// @DOC The built files will reside in `ß.VAR/app`

const index_dir = ß.VAR + "/app";

ß.fs.removeSync(index_dir);
ß.fs.mkdirpSync(index_dir);

ß.fs.writeFileSync(index_dir + '/index.html', '<head><META HTTP-EQUIV="refresh" CONTENT="1"></head><body><input type="button" value = "Vue build index .." onclick="history.go(0)" /></body>');

// the express index dir will contain our possibly multilingual language pages
ß.app.use(ß.express.static(index_dir, ß.STATIC_OPTIONS));

console.log("- vue build @ ", ß.ansi_link("https://" + ß.HOSTNAME));
