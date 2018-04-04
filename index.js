/*jshint esnext: true */

console.log("Starting ßoilerplate");

require('./global');

ß.load('init');

ß.load('server');

ß.load('start');

// application started.
if (ß.DEBUG) ß.load('debug');