'use strict'

const merge = require('merge')
const XMLUtils = require('./XMLUtils')

const defaultOptions = {
  bank: {},
  email: {}
}

class Seller
{
  constructor(options)
  {
    this._options = merge.recursive(defaultOptions, options || {})
  }

  _generateXML(indentLevel)
  {
    indentLevel = indentLevel || 0
    return XMLUtils.wrapWithElement('elado', [
      ['bank', this._options.bank.name],
      ['bankszamlaszam', this._options.bank.accountNumber],
      ['emailReplyto', this._options.email.replyToAddress],
      ['emailTargy', this._options.email.subject],
      ['emailSzoveg', this._options.email.message],
      ['alairoNeve', this._options.issuerName]
    ], indentLevel)
  }
}

module.exports = Seller
