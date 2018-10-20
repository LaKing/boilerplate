/**
 * @file Barion Transfer/Send request builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionTransferSendRequest
 * @property {String} userName - Your e-mail address in the Barion system.
 * @property {String} password - Your password in the Barion system.
 * @property {String} currency - The currency of the money transfer.
 * @property {Number} amount - The total amount to transfer.
 * @property {String} recipient - The e-mail address of the recipient of the transfer.
 * @property {String} comment - The comment of the money transfer.
 */

/**
* Creates an empty Barion Transfer/Send request
* @constructor
* @see https://docs.barion.com/Transfer-Send-v1
*/
function BarionTransferSendRequestBuilder() {

    this.request = {};

    /**
    * Sets the UserName field for the request.
    * @param userName {String} Your e-mail address in the Barion system.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setUsername = function(userName) {
        this.request.UserName = userName;
        return this;
    };

    /**
    * Sets the Password field for the request.
    * @param password {String} Your password in the Barion system.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setPassword = function(password) {
        this.request.Password = password;
        return this;
    };

    /**
    * Sets the Currency field for the request.
    * @param currency {String} The currency of the money transfer.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setCurrency = function(currency) {
        this.request.Currency = currency;
        return this;
    };

    /**
    * Sets the Amount field for the request.
    * @param amount {Number} The total amount to transfer.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setAmount = function(amount) {
        this.request.Amount = amount;
        return this;
    };

    /**
    * Sets the Recipient field for the request.
    * @param recipient {String} The e-mail address of the recipient of the transfer.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setRecipient = function(recipient) {
        this.request.Recipient = recipient;
        return this;
    };

    /**
    * Sets the Comment field for the request.
    * @param comment {String} The comment of the money transfer.
    * @returns {BarionTransferSendRequestBuilder} The BarionTransferSendRequestBuilder object
    */
    this.setComment = function(comment) {
        this.request.Comment = comment;
        return this;
    };

    /**
    * Build and returns the request for the Transfer/Send API call.
    * @returns {BarionTransferSendRequest} The request object
    */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionTransferSendRequestBuilder;