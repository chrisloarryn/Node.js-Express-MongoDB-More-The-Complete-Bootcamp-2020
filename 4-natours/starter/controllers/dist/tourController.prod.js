"use strict";var Tour=require("./../models/tourModel"),APIFeatures=require("./../utils/apiFeatures"),catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),factory=require("./handlerFactory");exports.aliasTopTours=function(r,e,t){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:r.query.limit="5",r.query.sort="-ratingsAverage,price",r.query.fields="name,price,ratingsAverage,summary,difficulty",t();case 4:case"end":return e.stop()}})},exports.getAllTours=factory.getAll(Tour),exports.getTour=factory.getOne(Tour,{path:"reviews"}),exports.createTour=factory.createOne(Tour),exports.updateTour=factory.updateOne(Tour),exports.deleteTour=factory.deleteOne(Tour),exports.getTourStats=catchAsync(function(e,r){var t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Tour.aggregate([{$match:{ratingsAverage:{$gte:4.5}}},{$group:{_id:{$toUpper:"$difficulty"},num:{$sum:1},numRatings:{$sum:"$ratingsQuantity"},avgRating:{$avg:"$ratingsAverage"},avgPrice:{$avg:"$price"},minPrice:{$min:"$price"},maxPrice:{$max:"$price"}}},{$sort:{avgPrice:1}}]));case 2:t=e.sent,r.status(200).json({status:"success",data:{stats:t}});case 4:case"end":return e.stop()}})}),exports.getMonthlyPlan=catchAsync(function(r,t){var a,s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=1*r.params.year,e.next=3,regeneratorRuntime.awrap(Tour.aggregate([{$unwind:"$startDates"},{$match:{startDates:{$gte:new Date("".concat(a,"-01-01")),$lte:new Date("".concat(a,"-12-31"))}}},{$group:{_id:{$month:"$startDates"},numTourStarts:{$sum:1},tours:{$push:"$name"}}},{$addFields:{month:"$_id"}},{$project:{_id:0}},{$sort:{numTourStarts:-1}}]));case 3:s=e.sent,t.status(200).json({status:"success",data:{plan:s}});case 5:case"end":return e.stop()}})});