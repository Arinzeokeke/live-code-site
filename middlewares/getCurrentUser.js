const mongoose = require('mongoose')
const boom = require('boom')

const Customer = mongoose.model('User')

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.payload.id)
    if (!user) {
      return next(boom.notFound('User not found'))
    }

    req.currentUser = user

    return next()
  } catch (err) {
    next(err)
  }
}
