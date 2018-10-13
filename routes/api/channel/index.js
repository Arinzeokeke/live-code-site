const boom = require('boom')
const Router = require('express').Router

const User = require('../../../models/user')
const Channel = require('../../../models/channel')
const Post = require('../../../models/post')

const { validate, auth, getCurrentUser } = require('../../../middlewares')

class ChannelRouter {
  constructor(path = '/channel') {
    this.router = Router()
    this.path = path
    this.routes()
  }

  async index(req, res, next) {}

  async create(req, res, next) {}

  async show(req, res, next) {}

  async giveWriteAccess(req, res, next) {}

  async revokeWriteAccess(req, res, next) {}

  async writeToPost(req, res, next) {}

  async get(req, res, next) {
    try {
      console.log(req.io)
      res.status(200).send({ hello: 'there' })
    } catch (err) {
      return next(err)
    }
  }

  routes() {
    this.router.param('id', this.get.bind(this))
    this.router.get('', auth.required, getCurrentUser, this.index.bind(this))
    this.router.post('', auth.required, getCurrentUser, this.create.bind(this))
    this.router.get('/:id', auth.required, getCurrentUser, this.show.bind(this))
    this.router.post(
      '/:id/write',
      auth.required,
      getCurrentUser,
      this.writeToPost.bind(this)
    )
    this.router.post(
      '/:id/write-access',
      auth.required,
      getCurrentUser,
      this.giveWriteAccess.bind(this)
    )
    this.router.delete(
      '/:id/write-access',
      auth.required,
      getCurrentUser,
      this.revokeWriteAccess.bind(this)
    )
  }
}

module.exports = UserRouter
