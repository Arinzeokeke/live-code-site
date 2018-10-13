const express = require('express'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  boom = require('boom'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  compression = require('compression'),
  debug = require('debug'),
  config = require('./config')

class App {
  constructor(config = config) {
    this.config = config
    this.isProduction = this.config.environment === 'production'
    this.isDevelopment = this.config.environment === 'development'
    this.express = express()
    this.setupDatabase()

    this.models()
    this.middleware()
    this.customMiddlewares()
  }

  registerRoutes() {
    this.routes()
    this.errorHandlers()
  }

  errorHandlers() {
    /// catch 404 and forward to error handler
    this.express.use(function(req, res, next) {
      const err = boom.notFound('Not Found')
      return next(err)
    })

    //Boom errors
    this.express.use(function(err, req, res, next) {
      if (err.isBoom) {
        const payload = err.output.payload
        const data = err.data === null ? [] : err.data
        console.error(err)
        res.headersSent
          ? null
          : res.status(payload.statusCode).json({ ...payload, data })
      }
      return next(err)
    })

    /// error handlers

    // development error handler
    // will print stacktraces
    if (!this.isProduction) {
      this.express.use(function(
        err,
        req,
        res,
        next // eslint-disable-line no-unused-vars
      ) {
        console.error(err)

        const boomError = boom.boomify(err, {
          statusCode: err.status || err.statusCode || 500
        })
        res.headersSent
          ? null
          : res.status(boomError.output.payload.statusCode).json({
              ...boomError.output.payload,
              data: err
            })
      })
    }

    // production error handler
    // no stacktraces leaked to user
    this.express.use(function(
      err,
      req,
      res,
      next // eslint-disable-line no-unused-vars
    ) {
      const boomError = boom.boomify(err, {
        statusCode: err.status || err.statusCode || 500
      })
      res.headersSent
        ? null
        : res
            .status(boomError.output.payload.statusCode)
            .json(boomError.output.payload)
    })
  }

  middleware() {
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(require('method-override')())

    this.express.use(helmet())
    this.express.use(compression())

    if (this.isDevelopment) {
      this.express.use(errorhandler())
    }
  }

  customMiddlewares() {
    this.express.use((req, res, next) => {
      req.store = {
        config: this.config
      }
      return next()
    })
  }

  models() {
    require('./models')
  }

  setupDatabase() {
    mongoose.connect(this.config.mongoUri)
    if (this.isDevelopment) {
      mongoose.set('debug', true)
    }
  }

  routes() {
    const ApiRouter = require('./routes/api')

    const apiRouter = new ApiRouter('/api/v1', this.config)
    this.express.use(apiRouter.path, apiRouter.router)
  }
}

module.exports = App
