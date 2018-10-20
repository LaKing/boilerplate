/*jshint esnext: true */

const nodemailer = require('nodemailer');

ß.transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25
});