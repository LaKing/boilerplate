/*jshint esnext: true */

const fs = ß.fs;

const mongoose = require('mongoose');
ß.mongoose = mongoose;

mongoose.Promise = global.Promise;

module.exports = function(name) {

    var nameModel = name.toLowerCase() + 'Model';
    var nameSchema = name.toLowerCase() + 'Schema';
    var name_model = name.toLowerCase() + '_model';
    var Name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    ß[nameModel] = {};

    ß.load(name_model + '/keys');

    ß[nameSchema] = mongoose.Schema(ß[nameModel]);

    ß.load(name_model + '/methods');

    ß[Name] = mongoose.model(name, ß[nameSchema]);

};