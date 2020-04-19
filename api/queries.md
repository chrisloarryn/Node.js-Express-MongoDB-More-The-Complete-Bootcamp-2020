## Add to db
> use natours-test
switched to db natours-test
> show collections
tours

## Inserting data
> db.tours.insertMany([{name: "The sea explorer", price: 497, rating: 4.8}, {name: "The Snow Adventurer", price: 997, rating: 4.9, difficulty: "easy"}])
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("5e815e6c34c8dea5b2faa78e"),
		ObjectId("5e815e6c34c8dea5b2faa78f")
	]
}

## Find tours
> db.tours.find()
{ "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }

## Find tours by ({"name": "The Forest Hiker"})
> db.tours.find({"name": "The Forest Hiker"})
{ "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }

## Find tours by ({difficulty: "easy"})
> db.tours.find({difficulty: "easy"})
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }

## Find tours (lte less than equals)
> db.tours.find({price: {$lte: 500}})
{ "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
> db.tours.find({price: {$lt: 500}, rating: {$gte: 4.8}})
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }

## Find tours with or operator (lt less than, gte greater than equals)
> db.tours.find({ $or: [{price: {$lt: 500}}, {rating: {$gte: 4.8}}] })
{ "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }

## Find tours with or operator (gt greater than, gte greater than equals)
> db.tours.find({ $or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}] })
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 997, "rating" : 4.9, "difficulty" : "easy" }

## Find tours with or operator and name
> db.tours.find({ $or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}] }, {name: 1})
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer" }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer"}


## FIND EMAILS or Condition
> db.tours.find({ $or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}] }, {name: 1})
> db.tours.find({ email: { $in: ["test8@natours.io", "test9@natours.io"] } })
> db.users.find({$or: [{email: "test9@natours.io"}, {email: "test8@natours.io"}]})


## Update one tour with filter
> db.tours.updateOne({name: "The Snow Adventurer"}, {$set: {price: 597}})
> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

## So, tour has been updated
> db.tours.find()
> { "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
> { "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8 }
> { "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 597, "rating" : 4.9, "difficulty" : "easy" }

## set premium tours
> db.tours.updateMany({ $or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}] }, {$set: {premium: true}})
{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

## So, tours that has more than price>500 or rating>=4.8 has been updated
> db.tours.find()
{ "_id" : ObjectId("5e813fb45ab8747d1b83aaa9"), "name" : "The Forest Hiker", "price" : 297, "rating" : 4.7 }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The Sea Explorer", "price" : 497, "rating" : 4.8, "premium" : true }
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 597, "rating" : 4.9, "difficulty" : "easy", "premium" : true }

## find premium tour // correct mistake and put false the premium
> db.tours.find({ _id: ObjectId("5e815e6c34c8dea5b2faa78e") })
{ "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 497, "rating" : 4.8, "premium" : true }
## `update by name or _id`
> db.tours.updateOne({name: "The sea explorer"}, {$set: {premium: false}})
> db.tours.updateOne({_id : ObjectId("5e815e6c34c8dea5b2faa78e")}, {$set: {price: 597}})

## find price > 500 && rating: >= 4.8
> db.tours.find({ price: {$gt: 500}, rating: {$gte: 4.8} })
> { "_id" : ObjectId("5e815e6c34c8dea5b2faa78e"), "name" : "The sea explorer", "price" : 597, "rating" : 4.8, "premium" : false }
> { "_id" : ObjectId("5e815e6c34c8dea5b2faa78f"), "name" : "The Snow Adventurer", "price" : 597, "rating" : 4.9, "difficulty" : "easy", "premium" : true }
## updateMany
> db.tours.updateMany( { price: {$gt: 500}, rating: {$gt: 4.8}}, {$set: {premium: true}} )tu
> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 0 }
> db.tours.find()

## to replaceOne or replaceMany
> db.tours.replaceOne({})
> db.tours.replaceMany({})

## Deleting Documents
> db.tours.deleteOne({})
> db.tours.deleteOne({ rating: {$lt: 4.8}} )
> { "acknowledged" : true, "deletedCount" : 1 }
> db.tours.deleteMany({})   //delete all


## `update many to secret tour`
`example with updateOne`
> db.tours.updateOne({name: "The sea explorer"}, {$set: {premium: false}})
> db.tours.updateOne({_id : ObjectId("5e815e6c34c8dea5b2faa78e")}, {$set: {price: 597}})


## `updateMany by ObjectId("object id")`
## example
## > db.tours.updateMany({ $or: [{price: {$gt: 500}}, {rating: {$gte: 4.8}}] }, {$set: {premium: true}})
## find example to orientation
## db.tours.find({ _id: ObjectId("5e815e6c34c8dea5b2faa78e") })
> db.tours.updateMany({_id:{$in:[ObjectId("5e84a99693de32e7b83f09d6"), ObjectId("5e84a91ef73c02e7705930af")]}},{$set: { secretTour: true }})

## show
> db.tours.find({_id:{$in:[ObjectId("5e84a99693de32e7b83f09d6"), ObjectId("5e84a91ef73c02e7705930af")]}})

## updateOne({})
> db.tours.updateOne({_id: ObjectId("5e84fbf8febe04feb9c188b4")}, {$set: {ratingsAverage: 6}})
`EXAMPLE`
## `db.tours.updateOne({_id : ObjectId("5e815e6c34c8dea5b2faa78e")}, {$set: {price: 597}})`