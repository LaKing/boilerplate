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


        var now = new Date();
        if (user.payments)
            for (var i = 0; i < user.payments.length; i++) {
                //console.log("payments", user.payments[i]);
                if (!user.payments[i].paid)
                    if (user.payments[i].date) {
                        if (user.payments[i].date.getTime() + 24 * 60 * 60 * 1000, now.getTime()) {
                            console.log("Payment expired", user.payments[i]._id);
                            user.payments.splice(i, 1);
                        }
                    }

            }

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
        p.markModified('items');

        user.save(function(err) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};