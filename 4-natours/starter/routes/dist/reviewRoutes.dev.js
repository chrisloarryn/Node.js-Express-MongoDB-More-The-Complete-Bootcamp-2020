"use strict";

var express = require('express');

var reviewController = require('./../controllers/reviewController');

var authController = require('./../controllers/authController');

var router = express.Router({
  mergeParams: true
}); // POST /tour/34qwres/reviews
// GET /tour/34qwres/reviews
// POST /reviewsoi9

router.route('/').get(reviewController.getAllReviews).post(authController.protect, authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview);
router.route('/:id').patch(authController.protect, reviewController.updateReview)["delete"](authController.protect, authController.restrictTo('admin'), reviewController.deleteReview);
module.exports = router;