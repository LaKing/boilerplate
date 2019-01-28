/*ßoilerplate */

// @DOC At startup, a backup script is generated.

var collections = ß.mongoose_collections;
var url = ß.lib.mongoose.config_mongodb().url;

console.log(' - mongoose ' + url + ' collections:', collections.join(' '));

var str = '#!/bin/bash \n';

for (var c in collections) {
    str += 'mongoexport --jsonArray --uri ' + url + ' --collection ' + collections[c] + ' --out exports_' + collections[c] + '.json \n';
}

ß.fs.writeFile('export_mongodb.sh', str, function(err) {
    Đ(err);
});
