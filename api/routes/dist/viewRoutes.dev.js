"use strict";

var express = require('express');

var viewsController = require('./../controllers/viewsController');

var router = express.Router();

var authController = require('./../controllers/authController');

router.use(authController.isLoggedIn);
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);
module.exports = router;