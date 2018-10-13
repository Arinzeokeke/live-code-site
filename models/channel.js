const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "can't be blank"] },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    online: { type: Boolean, default: false },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    writers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },

  { timestamps: true }
)

module.exports = mongoose.model('Channel', ChannelSchema)
