"use strict";

require("@babel/polyfill");

var _mapbox = require("./mapbox");

var _login = require("./login");

var mapBox = document.getElementById('map');
var loginForm = document.querySelector('.form--login');
var logOutBtn = document.querySelector('.nav__el--logout'); // VALUES
// DELEGATION

if (mapBox) {
  var locations = JSON.parse(mapBox.dataset.locations);
  (0, _mapbox.displayMap)(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    (0, _login.login)(email, password);
  });
}

if (_login.logout) logOutBtn.addEventListener('click', _login.logout);