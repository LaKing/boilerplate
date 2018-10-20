/*jshint esnext: true */

const dir = __dirname.substring(0,__dirname.lastIndexOf('/')) + '/node_modules';

ß.app.use('/fonts', ß.express.static(dir + '/font-awesome/css', ß.static_options));
ß.app.use('/fonts', ß.express.static(dir + '/font-awesome/fonts', ß.static_options));
ß.app.use(ß.express.static(dir + '/font-awesome/css', ß.static_options));
