const mongoose = require('mongoose')
const Tour = require('./../models/tourModel')

// 2) ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = {...req.query}
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    const query = Tour.find(queryObj)
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)  // .lt(5)
    //   .where('difficulty')
    //   .equals('easy')

    // EXECUTE QUERY
    const tours = await query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    })
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `${err} 😅`
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    // delete operation
    await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
