"use strict";

var express = require('express');

var viewsController = require('./../controllers/viewsController');

var authController = require('./../controllers/authController');

var bookingController = require('./../controllers/bookingController');

var router = express.Router(); // router.use(authController.isLoggedIn)

router.get('/', bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.post('/submit-user-data', viewsController.updateUserData);
module.exports = router;