/* jshint esversion: 9 */

function finalize(sid, parameters) {
    ß.session_store.set(sid, parameters.session, function(err) {
        if (err) return đ(err);
        // process further
        ß.msg(parameters.simplepay.status + " simplepay payment " + parameters.simplepay.orderRef);
        ß.run_hook("payment", parameters);
    });
}

ß.app.all("/simplepay-ipn", function(req, res) {
    //Ł("@", req.headers, req.body);
    // Assuming to be behind the reverse proxy

    if (!ß.DEBUG) {
        if (req.headers["x-forwarded-for"] !== "94.199.53.96") {
            res.end("SIMPLEPAY_IP_MISSMATCH");
            return Ł("SIMPLEPAY_IP_MISSMATCH", req.headers["x-forwarded-for"]);
        }

        // check the signature - mandatory
        if (req.headers.signature !== ß.lib.simplepay.get_hash(ß.simplepay_config.secretKey, JSON.stringify(req.body))) {
            res.end("SIMPLEPAY_HASH_MISSMATCH");
            return Ł("SIMPLEPAY_HASH_MISSMATCH", ß.simplepay_config.secretKey, JSON.stringify(req.body));
        }
    }
  
    // register the successful payment
    let parameters = {};
    parameters.simplepay = req.body;

    // find the session we recieved the ipn for
    ß.session_store.all(function(err, sessions) {
        if (err) return đ(err);

        // so look at all sessions
        for (let i = 0; i < sessions.length; i++) {
            // that have a simplepay property array
            if (sessions[i].session.simplepay) {
                let sid = sessions[i]._id;
                let session = sessions[i].session;
                // find the payment in the simplepay array
                for (let a = 0; a < session.simplepay.length; a++) {
                    if (session.simplepay[a].orderRef === parameters.simplepay.orderRef) {
                        // bingo
                        let o = { ...session.simplepay[a], ...parameters.simplepay };
                        delete o.salt;
                        delete o.paymentUrl;

                        session.simplepay[a] = o;
                        parameters.session = session;
                        return finalize(sid, parameters);
                    }
                }
            }
        }
    });

    // calculate recieveDate
    const now = new Date();
    const time = now.toISOString().split(".")[0] + "+02:00";

    let data = req.body;
    data.receiveDate = time;

    const data_string = JSON.stringify(data);
    let signature = ß.lib.simplepay.get_hash(ß.simplepay_config.secretKey, data_string);

    res.set("Content-Type", "application/json");
    res.set("Content-Length", data_string.length);  
  	res.set("Signature", signature);

    res.send(data_string);
});

/*

┏━━━ Ł("@", req.headers, req.body);
┠─ @
┠─ { 'content-type': 'application/json',
signature:
'IGUayX5HHERDD68WlcroaUMoLfJE+8y5CEqbo/6EVrGKBT6Wnyw2C9z14kHApOtq',
'content-length': '238',
host: 'bp-devel.d250.hu',
'user-agent': 'Apache-HttpAsyncClient/4.1.1 (Java/1.8.0_232)',
'x-forwarded-for': '94.199.53.96',
connection: 'close' }
┠─ { salt: 'heVMuonSFvnzjd0PhyqqOo7Mkftw8Q6N',
orderRef: 'bmva51ywcfqwtnez',
method: 'CARD',
merchant: 'S117001',
finishDate: '2020-04-19T06:08:29+02:00',
paymentDate: '2020-04-19T06:08:02+02:00',
transactionId: 10267669,
status: 'FINISHED' }
┗━━━━ at /srv/codepad-project/@payment-modules/simplepay/routes/simplepay-ipn.js:13:4


*/
