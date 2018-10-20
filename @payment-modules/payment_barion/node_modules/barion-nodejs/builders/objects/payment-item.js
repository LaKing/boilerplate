/**
 * @file Barion BarionItem object builder
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * @typedef {Object} BarionItem
 * @see https://docs.barion.com/Item
 * @property {String} Name - The short name of the item. 
 * @property {String} Description - The detailed description of the item. 
 * @property {String} ImageUrl - A URL pointing to an image that shows the item. 
 * @property {Number} Quantity - The total quantity of the item.
 * @property {String} Unit - The measurement unit of the item.
 * @property {Number} UnitPrice - The price of one measurement unit of the item.
 * @property {Number} ItemTotal - The total price of the item.
 * @property {String} SKU - The SKU value of the item in the shop's inventory system.
 */

/**
 * Creates an empty BarionItem object
 * @constructor
 * @see https://docs.barion.com/Item
 */
function BarionItemBuilder() {

    this.request = {};

    /**
     * Sets the Name field for the request.
     * @param name {String} The short name of the item.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setName = function(name) {
        this.request.Name = name;
        return this;
    };

    /**
     * Sets the Description field for the request.
     * @param description {String} The detailed description of the item. 
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setDescription = function(description) {
        this.request.Description = description;
        return this;
    };

    /**
     * Sets the ImageUrl field for the request.
     * @param imageUrl {String} A URL pointing to an image that shows the item. 
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setImageUrl = function(imageUrl) {
        this.request.ImageUrl = imageUrl;
        return this;
    };

    /**
     * Sets the Quantity field for the request.
     * @param quantity {Number} The total quantity of the item.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setQuantity = function(quantity) {
        this.request.Quantity = quantity;
        return this;
    };

    /**
     * Sets the Unit field for the request.
     * @param unit {String} The measurement unit of the item.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setUnit = function(unit) {
        this.request.Unit = unit;
        return this;
    };

    /**
     * Sets the UnitPrice field for the request.
     * @param unitPrice {Number} The price of one measurement unit of the item.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setUnitPrice = function(unitPrice) {
        this.request.UnitPrice = unitPrice;
        return this;
    };

    /**
     * Sets the ItemTotal field for the request.
     * @param itemTotal {Number} The total price of the item.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setItemTotal = function(itemTotal) {
        this.request.ItemTotal = itemTotal;
        return this;
    };

    /**
     * Sets the SKU field for the request.
     * @param sku {String} The SKU value of the item in the shop's inventory system.
     * @returns {BarionItemBuilder} The BarionItemBuilder object
     */
    this.setSKU = function(sku) {
        this.request.SKU = sku;
        return this;
    };

    /**
     * Build and returns the BarionItem object
     * @returns {BarionItemBuilder} The result object
     */
    this.build = function() {
        return this.request;
    };

}

module.exports = BarionItemBuilder;