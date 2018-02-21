/*jshint esnext: true */

require('./global');

ß.load('init');

ß.load('server');

ß.load('start');

// application started.
if (ß.debug_on) ß.load('debug');
