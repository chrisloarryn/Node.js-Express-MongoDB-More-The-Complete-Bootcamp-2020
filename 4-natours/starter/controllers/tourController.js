const Tour = require('./../models/tourModel')
const APIFeatures = require('./../utils/apiFeatures')

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY

    // 4) Pagination
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 100
    // const skip = (page - 1) * limit

    // query = query.skip(skip).limit(limit)

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments()
    //   if (skip >= numTours) throwError('This page does not exist 😏')
    // }

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await features.query

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          // _id: '$ratingsAverage',
          // _id: '$difficulty',
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ])
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1 // 2021
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      }
      // {
      //   $limit: 6
      // }
    ])
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
