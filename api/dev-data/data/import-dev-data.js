const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Tour = require('./../../models/tourModel')
const User = require('./../../models/userModel')
const Review = require('./../../models/reviewModel')

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

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
)

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours)
    await User.create(users)
    await Review.create(reviews)
    console.log(`Data successfully loaded! 😁`)
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    await User.deleteMany()
    await Review.deleteMany()
    console.log(`Data successfully deleted! 😏`)
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// EXPORT DATA INTO DB
const exportData = async () => {
  try {
    const tours = await Tour.find()
    if (tours.length) {
      fs.writeFile(
        `${__dirname}./tours-simple.json`,
        JSON.stringify(tours),
        err => {
          console.log(err)
        }
      )
    }

    console.log(`Dev-data successfully updated! 😁`)
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
} else if (process.argv[2] === '--export') {
  exportData()
}
console.log(process.argv)
