# szamlazz.js

A Node.JS Client for Szamlazz.hu

## Require the library

```javascript
const szamlazz = require('szamlazz.js')
```

## Create a client

```javascript
const szamlazzClient = new szamlazz.Client({
  user: 'USERNAME',
  password: 'PASSWORD',
  eInvoice: false, // create e-invoice. optional, default: false
  passpharase: '', // passpharase for e-invoice. optional
  requestInvoiceDownload: true, // downloads the issued pdf invoice. optional, default: false
  downloadedInvoiceCount: 1, // optional, default: 1
  responseVersion: 1 // optional, default: 1
})
```

## Create a seller

```javascript
let seller = new szamlazz.Seller({ // everyting is optional
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

```

## Create a buyer

```javascript
let buyer = new szamlazz.Buyer({
  name: 'Some Buyer Name ' + Math.random(),
  country: '',
  zip: '1234',
  city: 'City',
  address: 'Some street address',
  taxNumber: '12345678-1-42',
  postAddress: {
    name: 'Some Buyer Name',
    zip: '1234',
    city: 'City',
    address: 'Some street address'
  },
  issuerName: '',
  identifier: 1,
  phone: '',
  comment: ''
})
```

## Create an invoice item

With net unit price:
```javascript
let soldItem1 = new szamlazz.Item({
  label: 'First item',
  quantity: 2,
  unit: 'qt',
  vat: 27, // can be a number or a special string
  netUnitPrice: 100.55, // calculates gross and net values from per item net
  comment: 'Ez egy árvíztűrő tükörfúrógép'
})
```

With gross unit price:

```javascript
let solidItem2 = new szamlazz.Item({
  label: 'Second item',
  quantity: 5,
  unit: 'qt',
  vat: 27,
  grossUnitPrice: 1270 // calculates net and total values from per item gross
})
```

## Create an invoice

You can create an invoice with the instances created above:

```javascript
let invoice = new szamlazz.Invoice({
  paymentMethod: szamlazz.PaymentMethod.BankTransfer, // optional, default: BankTransfer
  currency: szamlazz.Currency.Ft, // optional, default: Ft
  language: szamlazz.Language.Hungarian, // optional, default: Hungarian
  seller: seller, // the seller, required
  buyer: buyer, // the buyer, required
  items: [ soldItem1, solidItem2 ] // the sold items, required
})
```

To issue the invoice with szamlazz.hu:

```javascript
szamlazzClient.issueInvoice(invoice, (e, result) =>
{
  if (e) {
    console.error(e.message, e.code) // handle errors
    throw e;
  }

  if (result.pdf) {
    // a Buffer with the pdf data is available if requestInvoiceDownload === true
  }
})
```

## Constants

### PaymentMethod

The following payment methods are supported by szamlazz.hu:

```
szamlazz.PaymentMethod.Cash
szamlazz.PaymentMethod.BankTransfer
szamlazz.PaymentMethod.CreditCard
```

### Currency

The following currencies are recognized by szamlazz.hu:

```
szamlazz.Currency.Ft
szamlazz.Currency.HUF
szamlazz.Currency.EUR
szamlazz.Currency.CHF
szamlazz.Currency.USD
szamlazz.Currency.AUD
szamlazz.Currency.AED
szamlazz.Currency.BGN
szamlazz.Currency.CAD
szamlazz.Currency.CNY
szamlazz.Currency.CZK
szamlazz.Currency.DKK
szamlazz.Currency.EEK
szamlazz.Currency.GBP
szamlazz.Currency.HRK
szamlazz.Currency.ISK
szamlazz.Currency.JPY
szamlazz.Currency.LTL
szamlazz.Currency.LVL
szamlazz.Currency.NOK
szamlazz.Currency.NZD
szamlazz.Currency.PLN
szamlazz.Currency.RON
szamlazz.Currency.RUB
szamlazz.Currency.SEK
szamlazz.Currency.SKK
szamlazz.Currency.UAH
```

### Language

The accepted languages are:

```
szamlazz.Currency.Hungarian
szamlazz.Currency.English
szamlazz.Currency.German
szamlazz.Currency.Italian
szamlazz.Currency.Romanian
szamlazz.Currency.Slovak
```
