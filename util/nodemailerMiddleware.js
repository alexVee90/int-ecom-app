const nodemailer = require('nodemailer');
const dotenv     = require('dotenv').config();

module.exports = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.TEST_EMAIL_USERNAME,
    pass: process.env.TEST_EMAIL_PASSWORD
  }
});