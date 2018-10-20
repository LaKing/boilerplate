'use strict'

const assert = require('assert')
const merge = require('merge')
const XMLUtils = require('./XMLUtils')

const defaultOptions = {
  postAddress: {}
}

class Buyer
{
  constructor(options)
  {
    this._options = merge.recursive(true, defaultOptions, options || {})
  }

  _generateXML(indentLevel)
  {
    indentLevel = indentLevel || 0

    assert(typeof this._options.name === 'string' && typeof this._options.name.trim() !== '', 'Valid Name field missing from buyer options')
    assert(typeof this._options.zip === 'string' && typeof this._options.zip.trim() !== '', 'Valid Zip field missing from buyer options')
    assert(typeof this._options.city === 'string' && typeof this._options.city.trim() !== '', 'Valid City field missing from buyer options')
    assert(typeof this._options.address === 'string' && typeof this._options.address.trim() !== '', 'Valid Address field missing from buyer options')

    return XMLUtils.wrapWithElement('vevo', [
      ['nev', this._options.name],
      ['orszag', this._options.country],
      ['irsz', this._options.zip],
      ['telepules', this._options.city],
      ['cim', this._options.address],
      ['email', this._options.email],
      ['sendEmail', this._options.sendEmail],
      ['adoszam', this._options.taxNumber],
      ['adoszamEU', this._options.taxNumberEU],
      ['postazasiNev', this._options.postAddress.name],
      ['postazasiOrszag', this._options.postAddress.country],
      ['postazasiIrsz', this._options.postAddress.zip],
      ['postazasiTelepules', this._options.postAddress.city],
      ['postazasiCim', this._options.postAddress.address],
      // ['vevoFokonyv', ],
      ['azonosito', this._options.identifier],
      ['alairoNeve', this._options.issuerName],
      ['telefonszam', this._options.phone],
      ['megjegyzes', this._options.comment]
    ], indentLevel)
  }

}

module.exports = Buyer
