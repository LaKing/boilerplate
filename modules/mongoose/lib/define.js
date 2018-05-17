/*jshint esnext: true */

const fs = ß.fs;

const mongoose = require('mongoose');
ß.mongoose = mongoose;

mongoose.Promise = global.Promise;

module.exports = function(collection) {
    name = collection.toLowerCase();
    var nameModel = name + 'Model';
    var nameSchema = name + 'Schema';
    var name_model = name + '_model';
    var Name = name.charAt(0).toUpperCase() + name.slice(1);

    ß[nameModel] = {};

    ß.load(name_model + '/keys');

    ß[nameSchema] = mongoose.Schema(ß[nameModel]);

    ß.load(name_model + '/methods');

    ß[Name] = mongoose.model(name, ß[nameSchema], name);

    ß.mongoose_collections.push(name);
};