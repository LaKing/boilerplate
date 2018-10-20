/**
 * @file Barion BarionPaymentTransaction object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionPayeeTransaction
 * @see https://docs.barion.com/PayeeTransaction
 * @property {String} POSTransactionId - The unique identifier of the transaction at the shop that started the payment.
 * @property {String} Payee - The recipient's e-mail address.
 * @property {Number} Total - The total amount of the transaction.
 * @property {String} Comment - Comment of the transaction. This is shown to the recipient.
 */ 

/**
 * Creates an empty BarionPayeeTransaction object
 * @constructor
 * @see https://docs.barion.com/PayeeTransaction
 */
function BarionPayeeTransactionBuilder() {

    this.request = {};

    /**
     * Sets the POSTransactionId field for the request.
     * @param posTransactionId {String} The unique identifier of the transaction at the shop that started the payment.
     * @returns {BarionPayeeTransactionBuilder} The BarionPayeeTransactionBuilder object
     */
    this.setPOSTransactionId = function(posTransactionId) {
        this.request.POSTransactionId = posTransactionId;
        return this;
    };

    /**
     * Sets the Payee field for the request.
     * @param payee {String} The recipient's e-mail address.
     * @returns {BarionPayeeTransactionBuilder} The BarionPayeeTransactionBuilder object
     */
    this.setPayee = function(payee) {
        this.request.Payee = payee;
        return this;
    };
    
    /**
     * Sets the Total field for the request.
     * @param total {Number} The total amount of the transaction.
     * @returns {BarionPayeeTransactionBuilder} The BarionPayeeTransactionBuilder object
     */
    this.setTotal = function(total) {
        this.request.Total = total;
        return this;
    };

    /**
     * Sets the Comment field for the request.
     * @param comment {String} Comment of the transaction. This is shown to the recipient.
     * @returns {BarionPayeeTransactionBuilder} The BarionPayeeTransactionBuilder object
     */
    this.setComment = function(comment) {
        this.request.Comment = comment;
        return this;
    };

    /**
     * Build and returns the BarionPayeeTransaction object
     * @returns {BarionPayeeTransaction} The result object
     */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionPayeeTransactionBuilder;