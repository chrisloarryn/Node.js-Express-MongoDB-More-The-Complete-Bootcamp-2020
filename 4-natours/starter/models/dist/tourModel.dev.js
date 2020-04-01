"use strict";

var mongoose = require('mongoose');

var slugify = require('slugify');

var tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour must have less or more than 40 characters'],
    minlength: [10, 'A tour must have less or equal than 10 characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    "default": 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    "default": 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    "default": Date.now(),
    select: false
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    "default": false
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
}); // DOCUMENT MIDDLEWARE: runs before .save() command and .create()

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true
  });
  next();
}); // tourSchema.pre('save', function (next) {
//   console.log(`Will save document...`)
//   next()
// })
// tourSchema.post('save', function (doc, next) {
//   console.log(doc)
//   next()
// })
// QUERY MIDDLEWARE
// tourSchema.pre('find', function (next) {

tourSchema.pre(/^find/, function (next) {
  this.find({
    secretTour: {
      $ne: true
    }
  });
  this.start = Date.now();
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log("Query took ".concat(Date.now() - this.start, " milliseconds! \u23F2")); // console.log(docs)

  next();
}); // AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: {
        $ne: true
      }
    }
  }); // console.log(this.pipeline());

  next();
});
var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;