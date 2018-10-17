module.exports = server => {
  const io = require('socket.io')(server)
  const mongoose = require('mongoose')
  const User = mongoose.model('User')
  const Channel = mongoose.model('Channel')

  io.sockets.on('connection', async function(socket) {
    let currentUser = await User.findOne({
      username: socket.handshake.query.username
    })

    console.log(`${currentUser.username} connected`)

    socket.on('join:channel', function({ channelId }) {
      console.log(`${currentUser.username} joins channel ${channelId}`)
      if (currentUser) {
        Channel.addParticipant({ user: currentUser, channelId }).then(
          participants => {
            socket.join(channelId)
            console.log(`${currentUser.username} joins channel ${channelId}`)
            socket.in(channelId).emit('joined:channel', {
              message: `${currentUser.username} joined the channel`,
              data: {
                participants
              }
            })
          }
        )
      }
    })

    socket.on('leave:channel', async function({ channelId }) {
      console.log('=========>')
      console.log(`${currentUser.username} leaves channel ${channelId}`)
      if (currentUser) {
        const participants = await Channel.removeParticipant({
          user: currentUser,
          channelId
        })

        socket.leave(channelId)
        console.log(`${currentUser.username} leaves channel ${channelId}`)
        socket.in(channelId).emit('left:channel', {
          message: `${currentUser.username} left the channel`,
          data: {
            participants
          }
        })
      }
    })

    socket.on('disconnect', async function() {
      console.log('ff=========>', currentUser)
      if (currentUser) {
        const rooms = Object.keys(socket.rooms)
        console.log(socket.rooms)

        const channels = await Channel.find({
          participants: currentUser._id
        }).select('id')

        channels.map(c => {
          Channel.removeParticipant({
            user: currentUser,
            channelId: c.id
          }).then(participants => {
            console.log(`${currentUser.username} leaves channel ${c.id}`)
            socket.in(c.id).emit('left:channel', {
              message: `${currentUser.username} left the channel`,
              data: {
                participants
              }
            })
          })
        })

        rooms.forEach(room => {
          socket.leave(room)
        })
      }
    })
  })
  return io
}
