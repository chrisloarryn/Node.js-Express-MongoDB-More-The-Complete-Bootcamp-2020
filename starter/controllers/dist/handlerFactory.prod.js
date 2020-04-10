"use strict";var catchAsync=require("./../utils/catchAsync"),AppError=require("./../utils/appError"),APIFeatures=require("./../utils/apiFeatures");exports.deleteOne=function(a){return catchAsync(function(t,r,n){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(a.findByIdAndDelete(t.params.id));case 2:if(e.sent){e.next=5;break}return e.abrupt("return",n(new AppError("No document found with that ID",404)));case 5:r.status(204).json({status:"success",requestedAt:t.requestTime,data:null});case 6:case"end":return e.stop()}})})},exports.updateOne=function(s){return catchAsync(function(t,r,n){var a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(s.findByIdAndUpdate(t.params.id,t.body,{new:!0,runValidators:!0}));case 2:if(a=e.sent){e.next=5;break}return e.abrupt("return",n(new AppError("No document found with that ID",404)));case 5:r.status(200).json({status:"success",data:{data:a}});case 6:case"end":return e.stop()}})})},exports.createOne=function(a){return catchAsync(function(t,r){var n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(a.create(t.body));case 2:n=e.sent,r.status(201).json({status:"success",requestedAt:t.requestTime,data:{data:n}});case 4:case"end":return e.stop()}})})},exports.getOne=function(u,c){return catchAsync(function(t,r,n){var a,s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.findById(t.params.id),c&&(a=a.populate(c)),e.next=4,regeneratorRuntime.awrap(a);case 4:if(s=e.sent){e.next=7;break}return e.abrupt("return",n(new AppError("No document found with that ID",404)));case 7:r.status(200).json({status:"success",data:{data:s}});case 8:case"end":return e.stop()}})})},exports.getAll=function(u){return catchAsync(function(t,r){var n,a,s;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return n={},t.params.tourId&&(n={tour:t.params.tourId}),a=new APIFeatures(u.find(n),t.query).filter().sort().limitFields().paginate(),e.next=5,regeneratorRuntime.awrap(a.query);case 5:s=e.sent,r.status(200).json({status:"success",requestedAt:t.requestTime,results:s.length,data:{data:s}});case 7:case"end":return e.stop()}})})};