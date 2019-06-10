/*ßoilerplate */

const drive = ß.google.drive("v3");

module.exports = function(callback) {
    if (!callback) callback = function() {};

    // TODO await ß.isDefined('googleapis_authorised');

    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth.authorize", err);
            return callback(err, null);
        } else {
            var request = {};

            drive.files.list(request, function(err, response) {
                if (err) {
                    console.error("ERROR in google drive.files.list", err);
                    return callback(err, null);
                }

                console.log("Sucessfully fetched", response.data.values.length);
                callback(null, response.data.values);
            });
        }
    });
};
