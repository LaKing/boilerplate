/*jshint esnext: true */
const sheets = ß.google.sheets('v4');

module.exports = function(spreadsheetId, range, callback) {
    ß.jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log("ERROR in google jwtClientAuth", err);
            return callback(err, null);
        } else {
            var request = {
                spreadsheetId: spreadsheetId,
                range: range,
                auth: ß.jwtClient
            };

            sheets.spreadsheets.values.get(request, function(err, response) {
                if (err) {
                    console.error("ERROR in googleapis spreadsheet.values.get", err);
                    return callback(err, null);
                }

                console.log('Sucessfully fetched', response.data.values.length);
                callback(null, response.data.values);
            });
        }
    });
};
