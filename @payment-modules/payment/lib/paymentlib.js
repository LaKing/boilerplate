/*ßoilerplate */

// paymentthat
// functions common around the payment functionality

that = {};

that.round = function(number) {
    return Math.floor(number);
};

that.get_item_vat = function(item) {
    return that.round(item.net * item.vat / 100);
};

that.get_item_brutto_unitprice = function(item) {
    return that.round(item.net + that.get_item_vat(item));
};

that.get_item_netto_sum = function(item) {
    return that.round(item.qty * item.net);
};

that.get_item_vat_sum = function(item) {
    return that.round(item.qty * that.get_item_vat(item));
};

that.get_item_brutto_sum = function(item) {
    return that.round(item.qty * that.get_item_brutto_unitprice(item));
};

that.getHRDate = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = '0' + (date.getMonth() + 1); // "+ 1" becouse the 1st month is 0
    var day = '0' + date.getDate();
    var hour = '0' + date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();
    var ret = year + '-' + month.slice(-2) + '-' + day.slice(-2) + ' ' + hour.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
    return ret;
};

that.calculate_item_totals = function(p) {
    p.netto = 0;
    p.vatsum = 0;
    p.brutto = 0;
    for (var i = 0; i < p.items.length; i++) {

        p.items[i].brutto_sum = that.get_item_brutto_sum(p.items[i]);

        p.netto += that.get_item_netto_sum(p.items[i]);
        p.vatsum += that.get_item_vat_sum(p.items[i]);
        p.brutto += that.get_item_brutto_sum(p.items[i]);
    }
    return p;
};

module.exports = that;