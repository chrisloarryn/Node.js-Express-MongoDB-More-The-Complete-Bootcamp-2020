// Related to express
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')
dotenv.config({ path: './config.env' })

// DB is to connect to atlas.
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
mongoose
  .connect(DB || process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log(`DB Connection Successfully 😁`)
  })

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})
const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
  name: 'The Park Camper2',
  price: 997
})

testTour
  .save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.log(`ERROR 💥:`, err.message)
  })

// console.log(process.env)
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}... 😊`)
})
