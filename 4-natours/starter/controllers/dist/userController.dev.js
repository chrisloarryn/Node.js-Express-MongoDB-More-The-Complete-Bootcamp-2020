"use strict";

var fs = require('fs'); // 1) READ FILE


var tours = JSON.parse(fs.readFileSync("".concat(__dirname, "/../dev-data/data/tours-simple.json")));

exports.getAllUsers = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! 😏'
  });
};

exports.getUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! 😏'
  });
};

exports.createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! 😏'
  });
};

exports.updateUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! 😏'
  });
};

exports.deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! 😏'
  });
};