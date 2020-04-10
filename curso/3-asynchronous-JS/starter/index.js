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
    console.log(`Finding dog breed: ${data} 🤔`)

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res4Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res5Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const res6Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )

    const all = await Promise.all([
      res1Pro,
      res2Pro,
      res3Pro,
      res4Pro,
      res5Pro,
      res6Pro
    ])
    const imgs = all.map(el => el.body.message)
    console.log(imgs)

    await writeFilePro(`dog-image.txt`, imgs.join(`\n`))
    console.log('Random dog image saved to file! 🐕')
  } catch (err) {
    console.log(err.message ? err.message : err)

    throw new Error(err.message ? err.message : err)
  }
  return `2: Ready 🐶`
}

;(async () => {
  try {
    console.log(`1: Will get dog pics! 😅`)
    const x = await getDogPic()
    console.log(x)
    console.log(`3: Done getting dog pics! 🐶`)
  } catch (err) {
    console.error(`Error 🎆`)
  }
})()

/*

console.log(`1: Will get dog pics! 😅`)
getDogPic()
  .then(x => {
    console.log(x)
    console.log(`3: Done getting dog pics! 🐶`)
  })
  .catch(err => {
    console.error(`Error 🎆`)
  })

  */

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
