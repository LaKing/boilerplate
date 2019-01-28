/*ßoilerplate */

module.exports = function(session, q) {
    //var q = p.toObject();

    const HOSTNAME = ß.HOSTNAME;
    const paymentlib = ß.lib.payment.paymentlib;

    q.email = "user";
    if (session.user)
        if (session.user.profile) {
            if (session.user.profile.email) q.email = session.user.profile.email;
            // temporary fix for special users
            if (q.email.indexOf('@') < 0) q.email = session.user.profile.email + '@' + HOSTNAME;
        }

    paymentlib.calculate_item_totals(q);

    // store the payment as actual payment in the session.
    q.ref = session.passport.user + '-' + q._id;
    return q;
};