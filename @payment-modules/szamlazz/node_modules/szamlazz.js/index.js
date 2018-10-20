'use strict'

module.exports = require('esnextguardian')(
  require('path').join(__dirname, 'src', 'index.js'),
  require('path').join(__dirname, 'es5', 'index.js'),
  require
)
