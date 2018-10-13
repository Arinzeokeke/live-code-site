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
      if (currentUser) {
        Channel.addParticipant({ user: currentUser, channelId }).then(() => {
          socket.join(channelId)
          socket.in(channelId).emit('join:channel', {
            message: `${currentUser.username} joined the channel`,
            data: {
              user: currentUser
            }
          })
        })
      }
    })

    socket.on('disconnect', function() {
      if (currentUser) {
        const rooms = Object.keys(socket.rooms)

        rooms.forEach(room => {
          Channel.removeParticipant({
            user: currentUser,
            channelId: room
          }).then(() => {
            socket.leave(room)
            socket.in(room).emit('leave:channel', {
              message: `${currentUser.username} left the channel`,
              data: {
                user: currentUser
              }
            })
          })
        })
      }
    })
  })
  return io
}
