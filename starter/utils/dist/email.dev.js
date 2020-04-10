"use strict";

var nodemailer = require('nodemailer');

var sendEmail = function sendEmail(options) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 1) Create a transporter
          transporter = nodemailer.createTransport({
            // service: 'Gmail', // Gmail, Yahoo, etc could be spam  (sendgrid better)
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            } // Activate in gmail "less secure app" options

          }); // 2) Define the email options

          mailOptions = {
            from: 'Cristobal Contreras <chrisloarryn@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.message
          }; // 3) Actually send the email

          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = sendEmail;