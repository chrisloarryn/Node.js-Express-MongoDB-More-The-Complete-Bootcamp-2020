const fs = require('fs')
const superagent = require('superagent')

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`I could not find that file 😐`)
      resolve(data)
    })
  })
}

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(`Could not write that file😐`)
      resolve('success')
    })
  })
}

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`)
    console.log(`Finding dog breed: ${data} 🐶`)
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    console.log(res.body.message)

    await writeFilePro(`dog-image.txt`, res.body.message)
    console.log('Random dog image saved to file! 🐕')
  } catch (err) {
    console.log(err.message ? err.message : err)
  }
}
console.log(`1: Will get dog pics! 😅`)
getDogPic()
console.log(`2: Done getting dog pics! 🐶`)

/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Finding dog breed: ${data} 🐶`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then(res => {
    console.log(res.body.message)
    return writeFilePro(`dog-image.txt`, res.body.message)
  })
  .then(() => {
    console.log('Random dog image saved to file! 🐕')
  })
  .catch(err => {
    console.log(err.message)
  })

  */
