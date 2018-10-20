/*jshint esnext: true */

console.log("Starting ßoilerplate on node", process.versions.node, process.platform, process.env.NODE_ENV || '#development');

require('./global');

ß.load('init');
ß.load('server');
ß.load('start');

// application started.
if (ß.DEBUG) {
  ß.load('debug');
  ß.debug_namespace();
}