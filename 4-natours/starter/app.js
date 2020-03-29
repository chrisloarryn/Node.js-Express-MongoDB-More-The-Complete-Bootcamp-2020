const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())

// app.get('/', (req, res) => {
//     res.status(200).json({
//       status: 'success',
//     message: `Hello from the server side! 😙`,
//     app: 'Natours',
//     ok: true,
//     data: [{ new1: 1 }, { new2: 2 }, { new3: 3 }, { new4: 4 }]
//   })
// })

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...')
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}
const getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' })
  }
  res.status(200).json({
    status: 'success',
    data: { tour }
    // results: tours.length,
    // data: {
    //   tours
    // }
  })
}

const createTour = (req, res) => {
  // console.log(req.body)
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({ status: 'success', data: { tour: newTour } })
    }
  )
}

const updateTour = (req, res) => {
  // if (!tour) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' })
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' }
  })
}

const deleteTour = (req, res) => {
  // if (!tour) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' })
  }
  res.status(200).json({
    status: 'success',
    data: null
  })
}

// // Tours
// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})
