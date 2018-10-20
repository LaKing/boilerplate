'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var merge = require('merge');
var XMLUtils = require('./XMLUtils');

var defaultOptions = {
  bank: {},
  email: {}
};

var Seller = function () {
  function Seller(options) {
    _classCallCheck(this, Seller);

    this._options = merge.recursive(defaultOptions, options || {});
  }

  _createClass(Seller, [{
    key: '_generateXML',
    value: function _generateXML(indentLevel) {
      indentLevel = indentLevel || 0;
      return XMLUtils.wrapWithElement('elado', [['bank', this._options.bank.name], ['bankszamlaszam', this._options.bank.accountNumber], ['emailReplyto', this._options.email.replyToAddress], ['emailTargy', this._options.email.subject], ['emailSzoveg', this._options.email.message], ['alairoNeve', this._options.issuerName]], indentLevel);
    }
  }]);

  return Seller;
}();

module.exports = Seller;