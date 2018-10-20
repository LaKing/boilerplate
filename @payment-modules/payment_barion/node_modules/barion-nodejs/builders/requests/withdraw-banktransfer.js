/**
 * @file Barion Withdraw/BankTransfer request builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionWithdrawBankTransferRequest
 * @see https://docs.barion.com/Withdraw-BankTransfer-v2
 * @property {String} UserName - Your e-mail address in the Barion system.
 * @property {String} Password - Your password in the Barion system.
 * @property {String} Currency - The currency of the bank transfer.
 * @property {Number} Amount - The total amount to withdraw, excluding fees.
 * @property {String} RecipientName - The name of the recipient of the bank transfer.
 * @property {String} Comment - The comment of the bank transfer.
 * @property {BarionBankAccount} BankAccount - Information about the recipient's bank account.
 */ 

/**
 * Creates an empty Barion Withdraw/BankTransfer request
 * @constructor
 * @see https://docs.barion.com/Withdraw-BankTransfer-v2
 */
function BarionWithdrawBankTransferRequestBuilder() {

    this.request = {};

    /**
     * Sets the UserName field for the request.
     * @param userName {String} Your e-mail address in the Barion system.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setUsername = function(userName) {
        this.request.UserName = userName;
        return this;
    };

    /**
     * Sets the Password field for the request.
     * @param password {String} Your password in the Barion system.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setPassword = function(password) {
        this.request.Password = password;
        return this;
    };

    /**
     * Sets the Currency field for the request.
     * @param currency {String} The currency of the bank transfer. Must be supplied in ISO 4217 format.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setCurrency = function(currency) {
        this.request.Currency = currency;
        return this;
    };

    /**
     * Sets the Amount field for the request.
     * @param amount {Number} The total amount to withdraw, excluding fees.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setAmount = function(amount) {
        this.request.Amount = amount;
        return this;
    };

    /**
     * Sets the RecipientName field for the request.
     * @param recipientName {String} The name of the recipient of the bank transfer.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setRecipientName = function(recipientName) {
        this.request.RecipientName = recipientName;
        return this;
    };

    /**
     * Sets the Comment field for the request.
     * @param comment {String} The comment of the bank transfer.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setComment = function(comment) {
        this.request.Comment = comment;
        return this;
    };
 
    /**
     * Sets the BankAccount field for the request.
     * @param bankAccount {BarionBankAccount} Information about the recipient's bank account.
     * @returns {BarionWithdrawBankTransferRequestBuilder} The BarionWithdrawBankTransferRequestBuilder object
     */
    this.setBankAccount = function(bankAccount) {
        this.request.BankAccount = bankAccount;
        return this;
    };

	/**
    * Build and returns the request for the Withdraw/BankTransfer API call.
    * @returns {BarionWithdrawBankTransferRequest} The request object
    */
	this.build = function() {
		return this.request;
	};
}

BarionWithdrawBankTransferRequestBuilder.prototype.BarionBankAccountBuilder  = require('../objects/banktransfer-bankaccount.js');

module.exports = BarionWithdrawBankTransferRequestBuilder;