/*jshint esnext: true */

ß.userSchema.methods.clearPayments = function(paymentid) {
    this.payments = [];
    this.markModified("payments");
    this.save();
};
