/*jshint esnext: true */

module.exports = function(user) {

    const expire_time = 60 * 60 * 1000;
    const now = new Date().getTime();

    if (user.payments)
        for (var i = 0; i < user.payments.length; i++) {
            if (!user.payments[i].paid) {
                // no date
                if (!user.payments[i].date) user.payments.splice(i, 1);

                let at = Number(user.payments[i].date);
                let ex = at + expire_time;

                if (now <= ex) console.log("Payment not expired", user.payments[i]._id);
                else {
                    console.log("Payment expired", user.payments[i]._id);
                    user.payments.splice(i, 1);
                }
            }
        }
};