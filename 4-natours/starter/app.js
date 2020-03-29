const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// 1) Middleware
app.use(morgan('dev'))
app.use(express.json()) // it's like bodyParser (body-parser)
app.use((req, res, next) => {
  console.log(`Hello from middleware 🤙!`)
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})
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

// 3) ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4) START SERVER
const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})
