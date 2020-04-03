// Related to express
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' })
const app = require('./app')

// DB is to connect to atlas.
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

// || process.env.DATABASE_LOCAL
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log(`DB Connection Successfully! 😁`)
  })

// console.log(process.env)
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})

process.on('unhandledRejection', err => {
  console.log(`▶️ ${err.name}: ${err.message} ◀️`)
  console.log(`UNHANDLED REJECTION! 💥 Shutting down...`)
  server.close(() => {
    process.exit(1) // 0 success, 1 failure
  })
})

process.on('uncaughtException', err => {
  console.log(`▶️ ${err} ◀️`)
  console.log(`UNCAUGHT REJECTION! 💥 Shutting down...`)
  server.close(() => {
    process.exit(1) // 0 success, 1 failure
  })
})
