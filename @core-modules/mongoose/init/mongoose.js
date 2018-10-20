/*jshint esnext: true */

const mongo_config = ß.lib.mongoose.config_mongodb();

// WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
//ß.mongoose.connect(mongo_config.url, {
//    useMongoClient: true,
//});

ß.mongoose.connect(mongo_config.url, {});