const Joi = require('joi')

const newUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().required()
})

const newChannelSchema = Joi.object().keys({
  title: Joi.string().required(),
  online: Joi.boolean(),
  extension: Joi.string().required()
})

const editChannelSchema = Joi.object().keys({
  title: Joi.string(),
  online: Joi.boolean()
})

const editPost = Joi.object().keys({
  extension: Joi.string(),
  content: Joi.string()
})

const postWriteAccessSchema = Joi.object().keys({
  writers: Joi.array().items(Joi.string())
})

module.exports = {
  newUserSchema,
  newChannelSchema,
  editChannelSchema,
  editPost,
  postWriteAccessSchema
}
