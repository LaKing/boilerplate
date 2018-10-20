/**
 * @file Barion BarionPaymentTransaction object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionPaymentTransaction
 * @see https://docs.barion.com/PaymentTransaction
 * @property {String} POSTransactionId - The unique identifier of the transaction at the shop that started the payment.
 * @property {String} Payee - The recipient user of the transaction. 
 * @property {Number} Total - The total amount of the transaction.
 * @property {String} Comment - A comment associated with the transaction.
 * @property {BarionPayeeTransaction[]} PayeeTransactions - An array containing possible sub-transactions, which are executed after the payment was completed. 
 * @property {BarionItem[]} Items - An array containing the items (products or services) included in the transaction.
 */

/**
 * Creates an empty BarionPaymentTransaction object
 * @constructor
 * @see https://docs.barion.com/PaymentTransaction
 */
function BarionPaymentTransactionBuilder() {

    this.request = {};

    /**
     * Sets the POSTransactionId field for the request.
     * @param posTransactionId {String} The unique identifier of the transaction at the shop that started the payment.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setPOSTransactionId = function(posTransactionId) {
        this.request.POSTransactionId = posTransactionId;
        return this;
    };

    /**
     * Sets the Payee field for the request.
     * @param payee {String} The recipient user of the transaction. 
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setPayee = function(payee) {
        this.request.Payee = payee;
        return this;
    };

    /**
     * Sets the Total field for the request.
     * @param total {Number} The total amount of the transaction.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setTotal = function(total) {
        this.request.Total = total;
        return this;
    };

    /**
     * Sets the Comment field for the request.
     * @param comment {String} A comment associated with the transaction.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setComment = function(comment) {
        this.request.Comment = comment;
        return this;
    };

    /**
     * Sets the PayeeTransactions field for the request.
     * @param payeeTransactions {BarionPayeeTransaction[]} An array containing possible sub-transactions, which are executed after the payment was completed. 
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setPayeeTransactions = function(payeeTransactions) {
        this.request.PayeeTransactions = payeeTransactions;
        return this;
    };

    /**
     * Adds a payee transaction to the PayeeTransactions field for the object.
     * @param payeeTransaction {BarionPayeeTransaction} A payee transaction contained in the transaction.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.addPayeeTransaction = function(payeeTransaction) {
        if(this.request.PayeeTransactions === undefined) {
            this.request.PayeeTransactions = [];
        }
        this.request.PayeeTransactions.push(payeeTransaction);
        return this;
    };

    /**
     * Sets the Items field for the request.
     * @param items {BarionItem[]} An array containing the items (products or services) included in the transaction.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.setItems = function(items) {
        this.request.Items = items;
        return this;
    };

    /**
     * Adds an item to the Items field for the object.
     * @param item {BarionItem} An item contained in the transaction.
     * @returns {BarionPaymentTransactionBuilder} The BarionPaymentTransactionBuilder object
     */
    this.addItem = function(item) {
        if(this.request.Items === undefined) {
            this.request.Items = [];
        }
        this.request.Items.push(item);
        return this;
    };

    /**
     * Build and returns the BarionPaymentTransaction object
     * @returns {BarionPaymentTransaction} The result object
     */
    this.build = function() {
        return this.request;
    };
}

module.exports = BarionPaymentTransactionBuilder;