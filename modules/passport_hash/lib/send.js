/*jshint esnext: true */

module.exports = function(id) {

    const transporter = ß.transporter;
    const User = ß.User;
    const lib = ß.lib;
    const HOSTNAME = ß.HOSTNAME;

    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("Error. Local-verification - user could not be located for ", id);

        link = "https://" + HOSTNAME + "/hash/" + user.local.email + "/" + id + '/' + lib.passport_hash.hash(user.local.email);

        let mailOptions = {
            from: 'webmaster@' + HOSTNAME,
            to: user.local.email, // list of receivers
            subject: "Confirm " + HOSTNAME, // Subject line
            text: 'please visit this link: ' + link, // plain text body
            html: '<b>Please visit </b><a href = "' + link + '">' + link + '</a>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Verification Message sent:', user.local.email, info.messageId, link);
        });
    });
};
