"use strict";

// Related to express
var dotenv = require('dotenv');

var mongoose = require('mongoose');

var app = require('./app');

dotenv.config({
  path: './config.env'
}); // DB is to connect to atlas.

var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB || process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function (con) {
  console.log("DB Connection Successfully \uD83D\uDE01");
}); // console.log(process.env)

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "... \uD83D\uDE0A"));
});