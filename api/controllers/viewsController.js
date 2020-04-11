const Tour = require('./../models/tourModel')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')


exports.getOverview = catchAsync(async (req, res) => {
    // 1) Get tour data from collection
    const tours = await Tour.find()

    // 2)Build template

    // 3) Render that template using data



  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  })
})

exports.getTour = (req, res) => {
  res.status(200).render('overview', {
    title: 'The Forest Hiker Tour'
  })
}
