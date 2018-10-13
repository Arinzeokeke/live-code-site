const jwt = require('express-jwt')
const secret = require('../config').secret

const getTokenFromHeader = req => {
  if (req.headers.authorization === undefined && req.headers.Authorization) {
    req.headers.authorization = req.headers.Authorization
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ').length === 2 &&
    req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

module.exports = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}
