'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = require('assert');
var merge = require('merge');
var request = require('request');
var XMLUtils = require('./XMLUtils');

var xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n' + '<xmlszamla xmlns="http://www.szamlazz.hu/xmlszamla" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.szamlazz.hu/xmlszamla xmlszamla.xsd">\n';
var xmlFooter = '</xmlszamla>';

var szamlazzURL = 'https://www.szamlazz.hu/szamla/';

var defaultOptions = {
  eInvoice: false,
  requestInvoiceDownload: false,
  downloadedInvoiceCount: 1,
  responseVersion: 1
};

var Client = function () {
  function Client(options) {
    _classCallCheck(this, Client);

    this._options = merge(defaultOptions, options || {});
    assert(typeof this._options.user === 'string' && this._options.user.trim().length > 1, 'Valid User field missing form client options');
    assert(typeof this._options.password === 'string' && this._options.password.trim().length > 1, 'Valid Password field missing form client options');

    this._cookieJar = request.jar();
  }

  _createClass(Client, [{
    key: 'issueInvoice',
    value: function issueInvoice(invoice, cb) {
      this._sendRequest('action-xmlagentxmlfile', this._generateInvoiceXML(invoice), cb);
    }
  }, {
    key: '_generateInvoiceXML',
    value: function _generateInvoiceXML(invoice) {
      return xmlHeader + XMLUtils.wrapWithElement('beallitasok', [['felhasznalo', this._options.user], ['jelszo', this._options.password], ['eszamla', this._options.eInvoice], ['kulcstartojelszo', this._options.passpharase], ['szamlaLetoltes', this._options.requestInvoiceDownload], ['szamlaLetoltesPld', this._options.downloadedInvoiceCount], ['valaszVerzio', this._options.responseVersion]], 1) + invoice._generateXML(1) + xmlFooter;
    }
  }, {
    key: '_sendRequest',
    value: function _sendRequest(fileFieldName, data, cb) {
      var _this = this;

      var formData = {};
      formData[fileFieldName] = {
        value: data,
        options: {
          filename: 'request.xml',
          contentType: 'text/xml'
        }
      };

      this._req = request.post({
        formData: formData,
        url: szamlazzURL,
        jar: this._cookieJar,
        encoding: null
      }, function (err, httpResponse, body) {

        if (err) {
          return cb(err);
        }

        if (httpResponse.headers.szlahu_error_code) {
          err = new Error(decodeURIComponent(httpResponse.headers.szlahu_error.replace(/\+/g, ' ')));
          err.code = httpResponse.headers.szlahu_error_code;
          return cb(err);
        }

        var result = {
          invoiceId: httpResponse.headers.szlahu_szamlaszam,
          netTotal: httpResponse.headers.szlahu_nettovegosszeg,
          grossTotal: httpResponse.headers.szlahu_bruttovegosszeg
        };

        if (_this._options.requestInvoiceDownload) {
          if (_this._options.responseVersion === 2) {
            XMLUtils.xml2obj(body, { 'xmlszamlavalasz.pdf': 'pdf' }, function (err2, parsed) {
              if (err2) {
                return cb(err2);
              }
              result.pdf = new Buffer(parsed.pdf, 'base64');
              cb(null, result);
            });
          } else {
            result.pdf = body;
            cb(null, result);
          }
        } else {
          cb(null, result);
        }
      });
    }
  }]);

  return Client;
}();

module.exports = Client;