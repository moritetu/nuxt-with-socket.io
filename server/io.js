const socketIO = require('socket.io')

const messages = []

function attachSocketIO(server) {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    socket.on('last-messages', function (fn) {
      fn(messages.slice(-50))
    })
    socket.on('send-message', function (message) {
      messages.push(message)
      socket.broadcast.emit('new-message', message)
    })
  })

  return io
}

module.exports = attachSocketIO
