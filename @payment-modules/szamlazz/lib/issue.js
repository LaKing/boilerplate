// new method

/*

input arg: paymentid - string

callback arg: file


*/

module.exports = function(prepared_parameters) {
  
    const client = new ß.szamlazz.Client(ß.szamlazz_config.client);

    client.issueInvoice(prepared_parameters, (err, result) => {
        if (err) return đ(err);

        ß.msg("Created invoice " + result.invoiceId);

        ß.run_hook("invoice", result);
    });
};
