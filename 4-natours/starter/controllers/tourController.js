const fs = require('fs')
const Tour = require('./../models/tourModel')

// 2) ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    // const tour = await Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }

  // const tour = tours.find(el => el.id === id)

  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   data: { tour }
  // })
}
exports.createTour = async (req, res) => {
  try {
    //const newTour = newTour({})
    //newTour.save()
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { tour: newTour }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid data sent! 😅`
    })
  }
}
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' }
  })
}
exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: null
  })
}
