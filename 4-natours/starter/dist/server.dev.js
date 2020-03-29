"use strict";

// Related to express
var dotenv = require('dotenv');

var app = require('./app');

dotenv.config({
  path: './config.env'
}); // console.log(process.env)

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "... \uD83D\uDE0A"));
});