"use strict";

// Related to express
var mongoose = require('mongoose');

var dotenv = require('dotenv');

process.on('uncaughtException', function (err) {
  console.log("\u25B6\uFE0F ".concat(err, " \u25C0\uFE0F"));
  console.log("UNCAUGHT REJECTION! \uD83D\uDCA5 Shutting down...");
  process.exit(1); // 0 success, 1 failure
});
dotenv.config({
  path: './config.env'
});

var app = require('./app'); // DB is to connect to atlas.


var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); // DB || process.env.DATABASE_LOCAL

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function (con) {
  console.log("DB Connection Successfully! \uD83D\uDE01");
}); // console.log(process.env)

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log("App running on port ".concat(port, "... \uD83D\uDE0A"));
});
process.on('unhandledRejection', function (err) {
  console.log("\u25B6\uFE0F ".concat(err.name, ": ").concat(err.message, " \u25C0\uFE0F"));
  console.log("UNHANDLED REJECTION! \uD83D\uDCA5 Shutting down...");
  server.close(function () {
    process.exit(1); // 0 success, 1 failure
  });
});