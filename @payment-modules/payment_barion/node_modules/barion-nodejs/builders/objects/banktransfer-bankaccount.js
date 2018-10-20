/**
 * @file Barion BarionBankAccount object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionBankAccount
 * @see https://docs.barion.com/BankAccount
 * @property {String} Country - The country of the bank.
 * @property {Number} Format - The format of the bank account number. 
 * @property {String} AccountNumber - The bank account number itself.
 * @property {String} Address - The address of the recipient.
 * @property {String} BankName - The name of the recipient's bank.
 * @property {String} BankAddress - The address of the recipient's bank.
 */

/**
 * Creates an empty BarionBankAccount object
 * @constructor
 * @see https://docs.barion.com/BankAccount
 */
function BarionBankAccountBuilder() {

    this.request = {};

    /**
     * Sets the Country field for the request.
     * @param country {String} The country of the bank.
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setCountry = function(country) {
        this.request.Country = country;
        return this;
    };

    /**
     * Sets the Format field for the request.
     * @param format {Number} The format of the bank account number. 
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setFormat = function(format) {
        this.request.Format = format;
        return this;
    };

    /**
     * Sets the AccountNumber field for the request.
     * @param accountNumber {String} The bank account number itself.
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setAccountNumber = function(accountNumber) {
        this.request.AccountNumber = accountNumber;
        return this;
    };

    /**
     * Sets the Address field for the request.
     * @param address {String} The address of the recipient.
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setAddress = function(address) {
        this.request.Address = address;
        return this;
    };

    /**
     * Sets the BankName field for the request.
     * @param bankName {String} The name of the recipient's bank.
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setBankName = function(bankName) {
        this.request.BankName = bankName;
        return this;
    };

    /**
     * Sets the BankAddress field for the request.
     * @param bankAddress {String} The address of the recipient's bank.
     * @returns {BarionBankAccountBuilder} The BarionBankAccountBuilder object
     */
    this.setBankAddress = function(bankAddress) {
        this.request.BankAddress = bankAddress;
        return this;
    };

    /**
     * Build and returns the BarionBankAccount object
     * @returns {BarionBankAccount} The result object
     */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionBankAccountBuilder;