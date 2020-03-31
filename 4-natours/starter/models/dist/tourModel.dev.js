"use strict";

var mongoose = require('mongoose');

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
module.exports = Tour;