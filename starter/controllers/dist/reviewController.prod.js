"use strict";var Review=require("./../models/reviewModel"),factory=require("./handlerFactory");exports.setTourUserIds=function(e,r,t){e.body.tour||(e.body.tour=e.params.tourId),e.body.user||(e.body.user=e.user.id),t()},exports.getAllReviews=factory.getAll(Review),exports.getReview=factory.getOne(Review),exports.createReview=factory.createOne(Review),exports.updateReview=factory.updateOne(Review),exports.deleteReview=factory.deleteOne(Review);