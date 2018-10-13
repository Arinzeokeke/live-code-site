const boom = require('boom')
const Router = require('express').Router

const User = require('../../../models/user')

// const { validate, isSuperAdmin } = require('../../../middlewares')

class UserRouter {
  constructor(path = '/user') {
    this.router = Router()
    this.path = path
    this.routes()
  }

  async login(req, res, next) {}

  async create(req, res, next) {}

  async show(req, res, next) {}

  async current(req, res, next) {}

  async get(req, res, next) {
    try {
      console.log(req.io)
      res.status(200).send({ hello: 'there' })
    } catch (err) {
      return next(err)
    }
  }

  routes() {
    this.router.get('', this.get.bind(this))
  }
}

module.exports = UserRouter
