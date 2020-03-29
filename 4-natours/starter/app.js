const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json()) // it's like bodyParser (body-parser)
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log(`Hello from middleware 🤙!`)
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 2) ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
