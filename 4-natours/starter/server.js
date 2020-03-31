// Related to express
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')
dotenv.config({ path: './config.env' })

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
    console.log(`DB Connection Successfully 😁`)
  })

// console.log(process.env)
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})
