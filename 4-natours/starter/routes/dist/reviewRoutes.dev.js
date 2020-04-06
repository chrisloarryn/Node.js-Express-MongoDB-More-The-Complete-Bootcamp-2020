"use strict";

var express = require('express');

var reviewController = require('./../controllers/reviewController');

var authController = require('./../controllers/authController');

var router = express.Router();
router.route('/').get(reviewController.getAllReviews).post(authController.protect, authController.restrictTo('user'), reviewController.createReview);
module.exports = router;