/**
 * @file Barion BarionTransactionToRefund object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionTransactionToRefund
 * @see https://docs.barion.com/TransactionToRefund
 * @property {String} TransactionId - The unique identifier of the transaction in the Barion system.
 * @property {String} POSTransactionId - The unique identifier of the transaction at the shop that started the payment.
 * @property {Number} AmountToRefund - The amount to refund from the given transaction.
 * @property {String} Comment - A comment associated with the refund.
 */

/**
 * Creates an empty BarionTransactionToRefund object
 * @constructor
 * @see https://docs.barion.com/TransactionToRefund
 */
function BarionTransactionToRefundBuilder() {

    this.request = {};

	/**
	 * Sets the TransactionId field for the request.
	 * @param transactionId {String} The unique identifier of the transaction in the Barion system.
	 * @returns {BarionTransactionToRefundBuilder} The BarionTransactionToRefundBuilder object
	 */
	this.setTransactionId = function(transactionId) {
		this.request.TransactionId = transactionId;
		return this;
	};

	/**
	 * Sets the POSTransactionId field for the request.
	 * @param posTransactionId {String} The unique identifier of the transaction at the shop that started the payment.
	 * @returns {BarionTransactionToRefundBuilder} The BarionTransactionToRefundBuilder object
	 */
	this.setPOSTransactionId = function(posTransactionId) {
		this.request.POSTransactionId = posTransactionId;
		return this;
	};

	/**
	 * Sets the AmountToRefund field for the request.
	 * @param amountToRefund {Number} The amount to refund from the given transaction.
	 * @returns {BarionTransactionToRefundBuilder} The BarionTransactionToRefundBuilder object
	 */
	this.setAmountToRefund = function(amountToRefund) {
		this.request.AmountToRefund = amountToRefund;
		return this;
	};

	/**
	 * Sets the Comment field for the request.
	 * @param comment {String} A comment associated with the refund.
	 * @returns {BarionTransactionToRefundBuilder} The BarionTransactionToRefundBuilder object
	 */
	this.setComment = function(comment) {
		this.request.Comment = comment;
		return this;
	};        

    /**
     * Build and returns the BarionTransactionToRefund object
     * @returns {BarionTransactionToRefund} The result object
     */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionTransactionToRefundBuilder;