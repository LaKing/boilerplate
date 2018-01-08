/*jshint esnext: true */

const app = ß.app;

const BarionError = ß.barion.BarionError;
const BarionRequestBuilderFactory = ß.barion.BarionRequestBuilderFactory;

app.all("/barion-callback", function(req, res) {
        console.log("barion-callback", req.query);

        var ref = req.query.ref;
        var paymentId = req.query.paymentId;
        var userId = ref.split('-')[0];

        var getPaymentStateRequestBuilder = new BarionRequestBuilderFactory.BarionGetPaymentStateRequestBuilder();
        var getPaymentStateOptionsWithObject = {
            POSKey: POSKey,
            PaymentId: paymentId
        };
        if (userId && paymentId)
            barion.getPaymentState(getPaymentStateOptionsWithObject, function(err, data) {
                if (err) {
                    res.send("Failure.");
                    return console.log("ERROR barion getPaymentState", err);
                }
                console.log("barion-callback-ok", data);
                res.send("OK");

                require("./payment-success.js")(ref);

            });
        else res.send("Some parameters are missing.");

    });
