"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _alerts = require("./alerts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
var host = '127.0.0.1';
var port = 3000;

var login = function login(email, password) {
  var res, error;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(email, password);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            method: 'POST',
            url: "http://".concat(host, ":").concat(port, "/api/v1/users/login"),
            data: {
              email: email,
              password: password
            }
          }));

        case 4:
          res = _context.sent;

          if (res.data.status === 'success') {
            (0, _alerts.showAlert)('success', "Logged in successfully ");
            window.setTimeout(function () {
              location.assign('/');
            }, 1500);
          }

          console.log(res);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          error = {
            entireError: _context.t0,
            err: _context.t0.response.data
          };
          (0, _alerts.showAlert)('error', error.err.message);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.login = login;

var logout = function logout() {
  var res;
  return regeneratorRuntime.async(function logout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            method: 'GET',
            url: "http://".concat(host, ":").concat(port, "/api/v1/users/logout")
          }));

        case 3:
          res = _context2.sent;
          if (res.data.status === 'success') location.reload(true);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          (0, _alerts.showAlert)('error', 'Error logging out! Try again.');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.logout = logout;