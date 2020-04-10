const nodemailer = require('nodemailer')

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail', // Gmail, Yahoo, etc could be spam  (sendgrid better)
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }

    // Activate in gmail "less secure app" options
  })

  // 2) Define the email options
  const mailOptions = {
    from: 'Cristobal Contreras <chrisloarryn@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.message
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
