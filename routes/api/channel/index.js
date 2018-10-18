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

  isOwner(channel, user) {
    return channel.owner.username === user.username
  }

  isWriter(channel, user) {
    return channel.writers.some(wr => wr.username === user.username)
  }

  async index(req, res, next) {
    try {
      let query = {}
      if (req.query.online) {
        query.online = true
      }
      const channels = await Channel.find({ ...query })
      await Channel.populate(channels, ['owner'])
      res.send({ channels: channels.map(u => u.toJSON()) })
    } catch (err) {
      return next(err)
    }
  }

  async create(req, res, next) {
    try {
      const channel = new Channel({ ...req.body, owner: req.currentUser })
      const post = new Post({
        extension: req.body.extension,
        channel: channel._id
      })

      channel.post = post._id
      await post.save()
      await channel.save()

      res.send({ channel: channel.toJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async show(req, res, next) {
    try {
      res.send({ channel: req.channel.toJSON() })
    } catch (err) {
      return next(err)
    }
  }

  async edit(req, res, next) {
    // is owner
    try {
      if (!this.isOwner(req.channel, req.currentUser)) {
        throw boom.unauthorized('Only owners can edit')
      }

      await req.channel.update(req.body)
      const channel = await Channel.findById(req.channel.id)
      await Channel.populate(channel, [
        'owner',
        'participants',
        'post',
        'writers'
      ])

      res.send({ channel: channel.toJSON() })

      req.io.sockets.in(req.channel._id.toString()).emit('channel:edit', {
        message: `Channel edited`,
        data: {
          channel: channel.toJSON()
        }
      })
    } catch (err) {
      return next(err)
    }
  }

  async giveWriteAccess(req, res, next) {
    // is owner
    try {
      if (!this.isOwner(req.channel, req.currentUser)) {
        throw boom.unauthorized('Only owners can give write access')
      }

      const writers = await Promise.all(
        req.body.writers.map(async w => await User.findOne({ username: w }))
      )
      writers.map(wr => {
        if (
          wr &&
          !req.channel.writers.some(
            writer => writer._id.toString() === wr._id.toString()
          )
        ) {
          req.channel.writers.push(wr)
        }
      })
      req.channel.save()

      res.send({ channel: req.channel.toJSON() })

      req.io.sockets.in(req.channel._id.toString()).emit('writer:add', {
        message: `${req.body.writers.join(', ')} given write access`,
        data: {
          channel: req.channel.toJSON()
        }
      })
    } catch (err) {
      return next(err)
    }
  }

  async revokeWriteAccess(req, res, next) {
    // is owner
    try {
      if (!this.isOwner(req.channel, req.currentUser)) {
        throw boom.unauthorized('Only owners can revoke write access')
      }

      const writers = await Promise.all(
        req.body.writers.map(async w => await User.findOne({ username: w }))
      )
      writers.map(wr => {
        if (wr) {
          req.channel.writers.pull(wr)
        }
      })
      req.channel.save()

      res.send({ channel: req.channel.toJSON() })

      req.io.sockets.in(req.channel._id.toString()).emit('writer:remove', {
        message: `${req.body.writers.join(', ')} lost write access`,
        data: {
          channel: req.channel.toJSON()
        }
      })
    } catch (err) {
      return next(err)
    }
  }

  async editPost(req, res, next) {
    // is writer or owner
    try {
      if (
        !(
          this.isOwner(req.channel, req.currentUser) ||
          this.isWriter(req.channel, req.currentUser)
        )
      ) {
        throw boom.unauthorized('Only writers can write to post')
      }

      await req.channel.post.update(req.body)
      const post = await Post.findById(req.channel.post._id)

      res.send({ post: post.toJSON() })

      req.io.sockets.in(req.channel._id.toString()).emit('edit:post', {
        message: `Post Edited`,
        data: {
          post: post.toJSON()
        }
      })
    } catch (err) {
      return next(err)
    }
  }

  async get(req, res, next) {
    try {
      const channel = await Channel.findOne({
        _id: req.params.id
      })

      if (!channel) {
        return next(boom.notFound(`Channel with id ${req.params.id} not found`))
      }

      await Channel.populate(channel, [
        'owner',
        'participants',
        'post',
        'writers'
      ])

      req.channel = channel
      return next()
    } catch (err) {
      return next(err)
    }
  }

  routes() {
    this.router.param('id', this.get.bind(this))
    this.router.get('', auth.required, getCurrentUser, this.index.bind(this))
    this.router.post('', auth.required, getCurrentUser, this.create.bind(this))
    this.router.get('/:id', auth.required, getCurrentUser, this.show.bind(this))
    this.router.put('/:id', auth.required, getCurrentUser, this.edit.bind(this))
    this.router.post(
      '/:id/post/write',
      auth.required,
      getCurrentUser,
      this.editPost.bind(this)
    )
    this.router.post(
      '/:id/write-access',
      auth.required,
      getCurrentUser,
      this.giveWriteAccess.bind(this)
    )
    this.router.post(
      '/:id/revoke-access',
      auth.required,
      getCurrentUser,
      this.revokeWriteAccess.bind(this)
    )
  }
}

module.exports = ChannelRouter
