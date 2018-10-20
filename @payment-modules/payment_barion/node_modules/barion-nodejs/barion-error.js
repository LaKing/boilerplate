/**
 * @file Barion error object
 * @author Viktor István Plézer <viktorplezer@gmail.com>
 * @version 1.0 
 */

/**
 * An Error subtype which wraps the Barion errors from the responses of the API calls.
 * @constructor
 * @param errorList {Array} Array of errors from the responses of the API calls.
 */
function BarionError(errorList) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = "Barion API error(s) happened, see the(m) in the 'errors' property!";
  console.log(errorList);
  this.errors = errorList;
}

module.exports = BarionError;

require('util').inherits(module.exports, Error);