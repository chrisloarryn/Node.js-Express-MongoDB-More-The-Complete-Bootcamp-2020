"use strict";

var express = require('express');

var viewsController = require('./../controllers/viewsController');

var router = express.Router();

var authController = require('./../controllers/authController'); // router.use(authController.isLoggedIn)


router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.post('/submit-user-data', viewsController.updateUserData);
module.exports = router;