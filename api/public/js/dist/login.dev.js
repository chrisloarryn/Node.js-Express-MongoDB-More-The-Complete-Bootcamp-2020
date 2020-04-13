"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _alerts = require("./alerts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
var login = function login(email, password) {
  var host, port, res, error;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(email, password);
          host = '127.0.0.1';
          port = 3000;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            method: 'POST',
            url: "http://".concat(host, ":").concat(port, "/api/v1/users/login"),
            data: {
              email: email,
              password: password
            }
          }));

        case 6:
          res = _context.sent;

          if (res.data.status === 'success') {
            (0, _alerts.showAlert)('success', "Logged in successfully ");
            window.setTimeout(function () {
              location.assign('/');
            }, 1500);
          }

          console.log(res);
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          error = {
            entireError: _context.t0,
            err: _context.t0.response.data
          };
          (0, _alerts.showAlert)('error', error.err.message);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 11]]);
};

exports.login = login;