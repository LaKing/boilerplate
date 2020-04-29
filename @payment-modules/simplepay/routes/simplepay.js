
// the simple payment will redirect back here
ß.app.all("/simplepay.html", function(req, res) {
    if (!req.query) return res.send("ERROR ?");
    if (!req.query.r) return res.send("ERROR ??");
    if (!req.query.s) return res.send("ERROR ???");

    let buff = Buffer.from(req.query.r, "base64");
    let text = buff.toString("utf-8");
    let r = JSON.parse(text);

    if (req.query.s !== ß.lib.simplepay.get_hash(ß.simplepay_config.secretKey, text)) return res.send("ERROR Signature check error.");
  
  	if (!req.session.simplepay) return res.send("ERROR No simplepay entries.");
    if (req.session.simplepay.length < 1) return res.send("ERROR Not enough simplepay entries."); 
  
  	let o = req.session.simplepay.find(function(x){
    	return x.transactionId === r.t;
    });
  
  	if (!o.status) o.status = r.e;
  	if (o.status === "STARTED") o.status = r.e;
  
    res.redirect("/payment");
});

/*

The response looks like

{ r: 0,
t: 10274870,
e: 'SUCCESS',
m: 'S117001',
o: 'fv8ruzt6u4n5kid5'
}

r: válaszkód (response code)
t: tranzakció SimplePay azonosítója (transaction id)
e: esemény (event)
m: kereskedői fiók azonosítója (merchant)
o: kereskedői tranzakció azonosító (order id)

*/
