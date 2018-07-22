/*jshint esnext: true */

console.log("Starting ßoilerplate on node", process.versions.node, process.platform);

// @DOC ## ßoilerplate/index.js
// @DOC Here we require (import) the ßoilerplate/global folder
// @DOC Using a special global method load contents
// @DOC ß.load defined in global/load.js

require('./global');

ß.load('init');

ß.load('server');

ß.load('start');

// application started.
if (ß.DEBUG) ß.load('debug');