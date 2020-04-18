const nodemailer = require('nodemailer')
const pug = require('pug')
const htmlToText = require('html-to-text')

// new Email(user, url).sendWelcome()

module.exports = class Email {
  constructor (user, url) {
    this.to = user.email
    this.firstName = user.name.split(' ')[0]
    this.url = url
    this.from = `Cristóbal Contreras <${process.env.EMAIL_FROM}>`
  }

  newTransport () {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1
    }

    return nodemailer.createTransport({
      // service: 'Gmail', // Gmail, Yahoo, etc could be spam  (sendgrid better)
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }

      // Activate in gmail "less secure app" options
    })
  }

  // Send the actual email
  async send (template, subject) {
    // 1) Render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    })

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    }

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome () {
    await this.send('welcome', 'Welcome to the Natours Family!')
  }

  async sendPasswordReset () {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 min)'
    )
  }
}
