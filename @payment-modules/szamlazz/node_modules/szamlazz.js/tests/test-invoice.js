'use strict'

const szamlazz = require('../index')
const tape = require('tape')

let szamlazzClient

tape('setup', t =>
{
  //
  // szamlazz client
  //
  szamlazzClient = new szamlazz.Client({
    user: process.env.SZAMLAZZ_USER || 'demo',
    password: process.env.SZAMLAZZ_PASSWORD || 'demo',
    requestInvoiceDownload: true
  })

  t.ok(szamlazzClient instanceof szamlazz.Client, 'is Client')
  t.end()
})

tape('Client.issueInvoice() method', t =>
{

  //
  // create a seller
  // this is optional and can be used to override the default seller data
  //
  const seller = new szamlazz.Seller({
    bank: {
      name: 'Test Bank <name>',
      accountNumber: '11111111-11111111-11111111',
    },
    email: {
      replyToAddress: 'test@email.com',
      subject: 'Invocie email subject',
      message: 'This is an email message',
    },
    issuerName: ''
  })

  //
  // buyer data, this is required
  // you should supply basic data: name, zip, city, address as a minimum. country defaults to hungary
  //
  const buyer = new szamlazz.Buyer({
    name: 'Some Buyer Name ' + Math.random(),
    country: '',
    zip: '1234',
    city: 'Budapest',
    address: 'Some street address',
    taxNumber: '12345678-1-42',
    postAddress: {
      name: 'Some Buyer Name',
      zip: '1234',
      city: 'Budapest',
      address: 'Some street address'
    },
    issuerName: '',
    identifier: 1,
    phone: '',
    comment: ''
  })

  //
  // sold items
  //
  const soldItem1 = new szamlazz.Item({
    label: 'First item',
    quantity: 2,
    unit: 'qt',
    vat: 27, // can be a number or a special string
    netUnitPrice: 100.55, // calculates gross and net values from per item net
    comment: 'Ez egy árvíztűrő tükörfúrógép'
  })

  const soldItem1 = new szamlazz.Item({
    label: 'Second item',
    quantity: 5,
    unit: 'qt',
    vat: 27,
    grossUnitPrice: 1270 // calculates net and total values from per item gross
  })

  //
  // create an invoice. buyer and seller can be shared between invoices
  // but don't reuse item objects
  //
  const invoice = new szamlazz.Invoice({
    paymentMethod: szamlazz.PaymentMethod.BankTransfer,
    currency: szamlazz.Currency.Ft,
    language: szamlazz.Language.Hungarian
    seller: seller,
    buyer: buyer,
    items: [ soldItem1, soldItem1 ]
  })

  //
  // issue an invoice
  //
  szamlazzClient.issueInvoice(invoice, (e, result) => {

    t.ok(!e, 'request should succeed', e)
    t.ok(typeof result === 'object', 'result is object')
    t.ok(result && result.pdf instanceof Buffer, 'result.pdf is Buffer')
    t.end()

  })
})
