const ErrorApi = require('../error-api/error-api');

module.exports = (err, req, res, next) => {
    console.error(err)
    if (!(err instanceof ErrorApi)) {
        err = ErrorApi.serverError(err.message || 'server error');
    }
    return res.status(err.status).json(err.message);
}