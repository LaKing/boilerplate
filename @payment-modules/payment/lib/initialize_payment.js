/*jshint esnext: true */

module.exports = function(session, callback) {

    const User = ß.User;
    const Payment = ß.Payment;


    User.findById(session.passport.user, function(err, user) {
        if (err) {
            console.log("ERROR in initialize payment", err);
            return callback(err);
        }
        if (!user) {
            console.log("ERROR in initialize payment - no ruser");
            err = new Error('No user');
            return callback(err);
        }
        if (!session) {
            console.log("ERROR in initialize payment - no session");
            err = new Error('No session');
            return callback(err);
        }

        // on a new payment, clear expired payments
        ß.lib.payment.purge(user);

        var p = new Payment();

        //p.items = items;
        p.items = [{
            name: "Teszt-termék",
            code: "TT0001",
            info: "Teszttermék",
            unit: "db",
            qty: 1,
            net: 1200,
            vat: 27
        }];

        if (p.items.length < 1) {
            console.log("ERROR in initialize payment - no items");
            err = new Error('No items');
            return callback(err);
        }

        user.payments.push(p);

        session.payment = p;
        session.save();

        p.markModified('items');

        user.save(function(err) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};
