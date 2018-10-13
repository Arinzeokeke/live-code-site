const Joi = require('joi')
const schema = require('../validations/schema')

module.exports = (type, isBody = true) => (req, res, next) => {
  const _schema = schema[type]
  if (!_schema) {
    return next()
  }
  const needle = isBody ? req.body : req.query
  const { error } = Joi.validate(needle, _schema, {
    abortEarly: false
    //convert: false
  })

  //if (error) console.log(error)
  error ? next(error) : next()
}
;``
