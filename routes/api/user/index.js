const boom = require('boom')
const Router = require('express').Router

const User = require('../../../models/user')
const Channel = require('../../../models/channel')

const { validate, auth, getCurrentUser } = require('../../../middlewares')

class UserRouter {
  constructor(path = '/users') {
    this.router = Router()
    this.path = path
    this.routes()
  }

  async login(req, res, next) {
    try {
      const user = await User.loginUser(req.body)
      res.send({ user: user.toAuthJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async index(req, res, next) {
    try {
      const users = await User.find({})
      res.send({ users: users.map(u => u.toJSON()) })
    } catch (err) {
      return next(err)
    }
  }

  async create(req, res, next) {
    try {
      const user = await User.createUser(req.body)
      res.send({ user: user.toAuthJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async show(req, res, next) {
    try {
      res.send({ user: req.user.toJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async current(req, res, next) {
    try {
      res.send({ user: req.currentUser.toAuthJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async channels(req, res, next) {
    try {
      let query = { owner: req.user._id }
      if (req.query.online) {
        query.online = true
      }
      const channels = await Channel.find(query)
      await Channel.populate(channels, ['owner'])

      res.send({ channels: channels.map(c => c.toJSON()) })
    } catch (err) {
      return next(err)
    }
  }

  async get(req, res, next) {
    try {
      const user = await User.findOne({
        username: req.params.username
      })
      if (!user) {
        return next(
          boom.notFound(`User with username ${req.params.username} not found`)
        )
      }
      req.user = user
      return next()
    } catch (err) {
      return next(err)
    }
  }

  routes() {
    this.router.param('username', this.get.bind(this))
    this.router.get('', auth.required, getCurrentUser, this.index.bind(this))
    this.router.post('', this.create.bind(this))
    this.router.post('/login', this.login.bind(this))
    this.router.get(
      '/current',
      auth.required,
      getCurrentUser,
      this.current.bind(this)
    )
    this.router.get(
      '/:username',
      auth.required,
      getCurrentUser,
      this.show.bind(this)
    )
    this.router.get(
      '/:username/channels',
      auth.required,
      getCurrentUser,
      this.channels.bind(this)
    )
  }
}

module.exports = UserRouter
