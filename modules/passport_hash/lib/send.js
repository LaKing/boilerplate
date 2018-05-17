/*jshint esnext: true */

module.exports = function(id) {

    const transporter = ß.transporter;
    const User = ß.User;
    const lib = ß.lib;
    const HOSTNAME = ß.HOSTNAME;

    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("Error. Local-verification - user could not be located for ", id);
        
        //Ł(user, typeof user.local.email);
        
        if (user.local.email) {        
            if (user.local.email.indexOf('@') < 0) return console.log("Invali email address ", user.local.email);
        } else return console.log("ERROR No local email address ", user.local.email);
                  
        var link = "https://" + HOSTNAME + "/hash/" + user.local.email + "/" + id + '/' + lib.passport_hash.hash(user.local.email);

        var subject = "Login to " + HOSTNAME;
        var html = '';
        var test = '';

        var text = '';

        if (user.local.verified == false) {
            if (user.lang === 'hu') subject = "Regisztráció megerősítése, " + HOSTNAME;
            else subject = "Confirm registration to " + HOSTNAME;
        }

        if (user.lang === 'hu') text += 'Kérjük lépjen be ennek a linknek s használatával: ';
        else text += 'Please visit the following link, to log in: ';

        html += '<h2>' + subject + '</h2><br><b>' + text + '</b><a href = "' + link + '">' + link + '</a><br><br>';

        if (ß.mail_string) html += ß.mail_string;

        let mailOptions = {
            from: 'webmaster@' + HOSTNAME,
            to: user.local.email, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
            text: text + ' ' + link, // plain text body
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
