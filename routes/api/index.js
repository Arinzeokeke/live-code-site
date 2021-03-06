const Router = require('express').Router
const boom = require('boom')
const UserRouter = require('./user')
const ChannelRouter = require('./channel')

class Api {
  constructor(path = '/api/v1', config) {
    this.router = Router()
    this.path = path
    this.config = config
    this.services()
    this.routes()
    this.customMiddlewares()
  }

  customMiddlewares() {
    this.router.use((err, req, res, next) => {
      let data = []
      if (err.name === 'ValidationError') {
        if (err.isJoi) {
          data = err.details.map(each => each.message)
        } else {
          data = Object.keys(err.errors).map(
            key => `${key} ${err.errors[key].message}`
          )
        }

        return next(boom.badData('Invalid Attributes', data))
      }
      return next(err)
    })
  }

  services() {}

  routes() {
    const userRouter = new UserRouter('/users')

    this.router.use(userRouter.path, userRouter.router)

    const channelRouter = new ChannelRouter('/channels')
    this.router.use(channelRouter.path, channelRouter.router)
  }
}

module.exports = Api
