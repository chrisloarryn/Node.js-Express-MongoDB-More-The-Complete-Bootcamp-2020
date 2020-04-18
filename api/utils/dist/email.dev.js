"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nodemailer = require('nodemailer');

var pug = require('pug');

var htmlToText = require('html-to-text'); // new Email(user, url).sendWelcome()


module.exports =
/*#__PURE__*/
function () {
  function Email(user, url) {
    _classCallCheck(this, Email);

    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = "Crist\xF3bal Contreras <".concat(process.env.EMAIL_FROM, ">");
  }

  _createClass(Email, [{
    key: "newTransport",
    value: function newTransport() {
      if (process.env.NODE_ENV === 'production') {
        // Sendgrid
        return 1;
      }

      return nodemailer.createTransport({
        // service: 'Gmail', // Gmail, Yahoo, etc could be spam  (sendgrid better)
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        } // Activate in gmail "less secure app" options

      });
    } // Send the actual email

  }, {
    key: "send",
    value: function send(template, subject) {
      var html, mailOptions;
      return regeneratorRuntime.async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 1) Render HTML based on pug template
              html = pug.renderFile("".concat(__dirname, "/../views/email/").concat(template, ".pug"), {
                firstName: this.firstName,
                url: this.url,
                subject: subject
              }); // 2) Define the email options

              mailOptions = {
                from: this.from,
                to: this.to,
                subject: subject,
                html: html,
                text: htmlToText.fromString(html)
              }; // 3) Create a transport and send email

              _context.next = 4;
              return regeneratorRuntime.awrap(this.newTransport().sendMail(mailOptions));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendWelcome",
    value: function sendWelcome() {
      return regeneratorRuntime.async(function sendWelcome$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.send('welcome', 'Welcome to the Natours Family!'));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "sendPasswordReset",
    value: function sendPasswordReset() {
      return regeneratorRuntime.async(function sendPasswordReset$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.send('passwordReset', 'Your password reset token (valid for only 10 min)'));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Email;
}();