import logger from './logger.js'

const requestLogger = (request, response, next) => {
  console.log(`${request.method} ${request.path} ${response.statusCode}`)
  console.log(request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
}