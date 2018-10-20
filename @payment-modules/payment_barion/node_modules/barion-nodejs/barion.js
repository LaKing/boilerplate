/**
 * @file Barion API nodejs library
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

var http = require('https');
var bl = require('bl');
var request = require('request');
var BarionError = require('./barion-error.js');
var BarionRequestBuilderFactory = require('./barion-request-builders.js');

/** @global */
global.BarionProd = "BarionProd";
/** @global */
global.BarionTest = "BarionTest";

function createUrl(suffix) {
     return (environment === BarionProd ? "https://api.barion.com" : "https://api.test.barion.com") + suffix;
}

function post(url, options, callback) {
    request.post(url, { json : options}, responseHandler(callback));
}

function get(url, options, callback) {
    request({url : url, qs: options}, responseHandler(callback));
}

function responseHandler(callback) {
    return function(err, response, body) {
        if(err) callback(err, null);
        else {
            var parsedBody = (typeof response.body) === "string" ? JSON.parse(response.body) : response.body;
            if(response.statusCode == 200) {
                callback(null, parsedBody);
            } else if (response.statusCode >= 400 && response.statusCode < 500) {
                var errors = parsedBody.Errors ? parsedBody.Errors : parsedBody.ErrorList;
                callback(new BarionError(errors));
            } else {
                callback(new Error("Fatal Barion server error"));
            }
        } 
    };
}

/**
 * Callback type for Barion API method calls.
 * @callback BarionCallback
 * @param err {Error|BarionError} The error object produced by the API call.
 * @param data {Object} The result of the API call.
 * {@link BarionError}
 */

/**
* Creates a Barion object.
* @constructor
* @param env {String} Specifies the Barion environment ({@link BarionProd}/{@link BarionTest}).
*/
function Barion(env) {
    environment = env || BarionProd;
}

/**
* Initiates a payment creation in the Barion system.
* @param options {BarionPaymentStartRequest} POST JSON params for the Payment/Start API method.
* @param callback {BarionCallback} Callback for the API call.
*/
Barion.prototype.startPayment = function(options, callback) {
    post(createUrl("/v2/payment/start"), options, callback);
};

/**
* Get the state of a payment from the Barion system.
* @param options {BarionGetPaymentStateRequest} POST JSON params for the Payment/Start API method.
* @param callback {BarionCallback} Callback for the API call.
*/
Barion.prototype.getPaymentState = function(options, callback) {
    get(createUrl("/v2/payment/getpaymentstate"), options, callback);
};

/**
* Initiates a refund in the Barion system.
* @param options {Object} POST JSON params for the Payment/Start API method.
* @param callback {BarionCallback} Callback for the API call.
*/
Barion.prototype.refund = function(options, callback) {
    post(createUrl("/v2/payment/refund"), options, callback);
};

/**
* Initiates a withdraw in the Barion system.
* @param options {Object} POST JSON params for the Payment/Start API method.
* @param callback {BarionCallback} Callback for the API call.
*/
Barion.prototype.withdraw = function(options, callback) {
    post(createUrl("/v2/withdraw/banktransfer"), options, callback);
};

/**
* Initiates an e-money transfer in the Barion system.
* @param options {BarionTransferSendRequest} POST JSON params for the Payment/Start API method.
* @param callback {BarionCallback} Callback for the API call.
*/
Barion.prototype.sendMoney = function(options, callback) {
    post(createUrl("/v1/transfer/send"), options, callback);
};

Barion.prototype.BarionError = BarionError;
Barion.prototype.BarionRequestBuilderFactory = BarionRequestBuilderFactory;

module.exports = Barion;