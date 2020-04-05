const readChunk = require("read-chunk");
const fileType = require("file-type");
const mime = require("mime-types");

module.exports = function(file) {
    var file_mime = mime.lookup(file);

    // do a check based on file content?
    const ft = fileType(readChunk.sync(file, 0, fileType.minimumBytes));
    if (ft) if (ft.mime) file_mime = ft.mime;

    return file_mime;
};