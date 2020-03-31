"use strict";

// Related to express
var mongoose = require('mongoose');

var dotenv = require('dotenv');

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
});
var tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    "default": 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});
var Tour = mongoose.model('Tour', tourSchema);
var testTour = new Tour({
  name: 'The Park Camper2',
  price: 997
});
testTour.save().then(function (doc) {
  console.log(doc);
})["catch"](function (err) {
  console.log("ERROR \uD83D\uDCA5:", err.message);
}); // console.log(process.env)

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "... \uD83D\uDE0A"));
});