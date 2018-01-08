
/*jshint esnext: true */

const app = ß.app;
const barion_locales = ["hu-HU", "en-US", "de-DE", "fr-FR", "es-ES", "sk-SK", "sl-SI"];

app.post("/barion-payment", function(req, res) {

        var userId = req.session.passport.user;
        var userEmail = req.session.user.profile.email;
        var language = req.session.lang;
        var p = req.session.payment;
        console.log("@barion payment req.session.payment", p);
        var locale = "en-US";

        for (var l = 0; l < barion_locales.length; l++) {
            if (barion_locales[l].substring(0, 2) === language) locale = barion_locales[l];
        }

        // TODOvLAB ref-et hozzáadni?
        var ref = userId + "-" + req.session.payment._id;

        var paymentStartOptionsWithObject = {
            CallbackUrl: "https://" + HOSTNAME + "/barion-callback?ref=" + ref,
            RedirectUrl: "https://" + HOSTNAME + "/barion-return?ref=" + ref,
            POSKey: POSKey,
            PaymentType: "Immediate",
            GuestCheckOut: true,
            FundingSources: ["All"],
            //PaymentRequestId: "D250b3efb3f443328c246b13dcbaffff",
            Locale: locale,
            Currency: p.currency,
            Transactions: [{
                //POSTransactionId: "aaaa-aaaa-aaaa-aaaa-0000",
                Payee: payee,
                Total: p.brutto,
                Items: barion_get_payment_items(p)
            }]
        };

        barion.startPayment(paymentStartOptionsWithObject, function(err, data) {
            if (err) {
                res.status(503).send("ERROR in barion.startPayment");
                return console.log("ERROR barion.startPayment", err);
            }
            //console.log(data);

            // req.session.payment.barion_data = data;
            // data.PaymentId: '315fd8e5b9c44c07b839b6d1131ac6e8',
            // data.PaymentRequestId: 'D250b3efb3f443328c246b13dcbaffff',
            // data.Status: 'Prepared',
            req.session.payment.barion = {};
            req.session.payment.barion.status = data.Status;
            req.session.payment.barion.PaymentId = data.paymentId;

            var result = {};
            result.redirect = data.GatewayUrl;
            res.send(result);
        });
    });
