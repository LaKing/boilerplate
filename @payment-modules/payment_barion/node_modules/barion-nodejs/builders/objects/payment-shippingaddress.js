/**
 * @file Barion BarionShippingAddress object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionShippingAddress
 * @see https://docs.barion.com/ShippingAddress
 * @property {String} DeliveryMethod - 	The delivery method, if applicable.
 * @property {String} Country - The recipient's country code in ISO-3166-1 format.
 * @property {String} City - The complete name of the city of the recipient address.
 * @property {String} Region - The region code of the recipient address in ISO-3166-2 format.
 * @property {String} Zip - The zip code of the recipient address.
 * @property {String} Street - The shipping street address with house number and other details.
 * @property {String} Street2 - The address, continued.
 * @property {String} FullName - The full civil or official name of the recipient.
 * @property {String} Phone - The phone number of the recipient.
 */

/**
 * Creates an empty BarionShippingAddress object
 * @constructor
 * @see https://docs.barion.com/ShippingAddress
 */
function BarionShippingAddressBuilder() {

    this.request = {};

    /**
     * Sets the DeliveryMethod field for the request.
     * @param deliveryMethod {String} The delivery method, if applicable.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setDeliveryMethod = function(deliveryMethod) {
        this.request.DeliveryMethod = deliveryMethod;
        return this;
    };

    /**
     * Sets the Country field for the request.
     * @param country {String} The recipient's country code in ISO-3166-1 format.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setCountry = function(country) {
        this.request.Country = country;
        return this;
    };

    /**
     * Sets the City field for the request.
     * @param city {String} The complete name of the city of the recipient address.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setCity = function(city) {
        this.request.City = city;
        return this;
    };

    /**
     * Sets the Region field for the request.
     * @param region {String} The region code of the recipient address in ISO-3166-2 format.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setRegion = function(region) {
        this.request.Region = region;
        return this;
    };

    /**
     * Sets the Zip field for the request.
     * @param zip {String} The zip code of the recipient address.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setZip = function(zip) {
        this.request.Zip = zip;
        return this;
    };

    /**
     * Sets the Street field for the request.
     * @param street {String} The shipping street address with house number and other details.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setStreet = function(street) {
        this.request.Street = street;
        return this;
    };

    /**
     * Sets the Street2 field for the request.
     * @param street2 {String} The address, continued.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setStreet2 = function(street2) {
        this.request.Street2 = street2;
        return this;
    };

    /**
     * Sets the FullName field for the request.
     * @param fullName {String} The full civil or official name of the recipient.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setFullName = function(fullName) {
        this.request.FullName = fullName;
        return this;
    };

    /**
     * Sets the Phone field for the request.
     * @param phone {String} The phone number of the recipient.
     * @returns {BarionShippingAddressBuilder} The BarionShippingAddressBuilder object
     */
    this.setPhone = function(phone) {
        this.request.Phone = phone;
        return this;
    };

    /**
     * Build and returns the BarionShippingAddress object
     * @returns {BarionShippingAddress} The result object
     */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionShippingAddressBuilder;