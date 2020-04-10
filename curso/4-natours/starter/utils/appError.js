class AppError extends Error {
  constructor (message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    // types of error ['programming' or 'operational']
    this.isOperational = true

    // line in that error occurs
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
