const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path, request.body)
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' });
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
        return response.status(400).json({ error: 'expected `username` to be unique' });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' });
    }

    next(error)
}

module.exports = {
    requestLogger,
    errorHandler,
}