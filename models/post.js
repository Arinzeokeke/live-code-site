const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.String,
      default: ''
    },
    extension: {
      type: mongoose.Schema.Types.String,
      default: ''
    },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
