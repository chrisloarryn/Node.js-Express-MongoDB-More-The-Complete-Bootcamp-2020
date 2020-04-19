"use strict";

require("@babel/polyfill");

var _mapbox = require("./mapbox");

var _login = require("./login");

var _updateSettings = require("./updateSettings");

var _stripe = require("./stripe");

/* eslint-disable */
var mapBox = document.getElementById('map');
var loginForm = document.querySelector('.form--login');
var logOutBtn = document.querySelector('.nav__el--logout');
var userDataForm = document.querySelector('.form-user-data');
var userPasswordForm = document.querySelector('.form-user-password');
var bookBtn = document.getElementById('book-tour'); // DELEGATION

if (mapBox) {
  var locations = JSON.parse(mapBox.dataset.locations);
  (0, _mapbox.displayMap)(locations);
}

if (loginForm) loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  (0, _login.login)(email, password);
});
if (logOutBtn) logOutBtn.addEventListener('click', _login.logout);
if (userDataForm) userDataForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  (0, _updateSettings.updateSettings)(form, 'data');
});
if (userPasswordForm) userPasswordForm.addEventListener('submit', function _callee(e) {
  var passwordCurrent, password, passwordConfirm;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          document.querySelector('.btn--save-password').textContent = 'Updating...';
          passwordCurrent = document.getElementById('password-current').value;
          password = document.getElementById('password').value;
          passwordConfirm = document.getElementById('password-confirm').value;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _updateSettings.updateSettings)({
            passwordCurrent: passwordCurrent,
            password: password,
            passwordConfirm: passwordConfirm
          }, 'password'));

        case 7:
          document.querySelector('.btn--save-password').textContent = 'Save password';
          document.getElementById('password-current').value = '';
          document.getElementById('password').value = '';
          document.getElementById('password-confirm').value = '';

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});

if (bookBtn) {
  bookBtn.addEventListener('click', function (e) {
    e.target.textContent = 'Processing...';
    var tourId = e.target.dataset.tourId;
    (0, _stripe.bookTour)(tourId);
  });
}