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

ChannelSchema.statics.addParticipant = function({ user, channelId }) {
  let _this = this
  return new Promise(async (resolve, reject) => {
    try {
      const channel = _this.findOne({ _id: channelId })
      channel.participants.push(user)
      await channel.save()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

ChannelSchema.statics.removeParticipant = function({ user, channelId }) {
  let _this = this
  return new Promise(async (resolve, reject) => {
    try {
      const channel = _this.findOne({ _id: channelId })
      channel.participants.pull(user)
      await channel.save()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

ChannelSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    owner: this.owner,
    participants: this.participants,
    online: this.online,
    post: this.post,
    writers: this.writers
  }
}

module.exports = mongoose.model('Channel', ChannelSchema)
