const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const secret = require('../config').secret

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    hash: String,
    salt: String,
    channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
  },
  { timestamps: true }
)

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.statics.loginUser = function({ username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await this.findOne({ username })
      if (!user || !user.validPassword(password)) {
        return reject(boom.unauthorized('username or password is invalid'))
      }
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

UserSchema.statics.createUser = function(body) {
  const _this = this
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(_this.model)
      const user = _this.model('User')({ ...body })
      user.setPassword(body.password)

      await user.save()
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  )
}

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  }
}

UserSchema.methods.toJSON = function() {
  return {
    username: this.username,
    email: this.email
  }
}

module.exports = mongoose.model('User', UserSchema)
