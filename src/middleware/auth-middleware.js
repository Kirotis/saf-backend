const jwt = require('jsonwebtoken')
const { secretCode } = require('../secret-token');

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    const token = !!req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!token) {
        return next()
    }
    const userData = jwt.verify(token, secretCode)
    req.user = userData
    return next()
}