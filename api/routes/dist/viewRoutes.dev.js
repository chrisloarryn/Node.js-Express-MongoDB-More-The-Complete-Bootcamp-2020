"use strict";

var express = require('express');

var viewsController = require('./../controllers/viewsController');

var router = express.Router();
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
module.exports = router;