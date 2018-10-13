const http = require('http')
require('dotenv').config()
const App = require('./app')
const config = require('./config')

const app = new App(config)

const DEFAULT_PORT = 3000
const port = normalizePort(config.port)

const server = http.Server(app.express)

const io = require('./socket')(server)

app.express.use((req, res, next) => {
  req.io = io
  return next()
})

app.registerRoutes()

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = typeof val === 'string' ? parseInt(val, 10) : val

  if (port && isNaN(port)) return port
  else if (port >= 0) return port
  return DEFAULT_PORT
}

function onError(error) {
  if (error.syscall !== 'listen') throw error
  const bind =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${port.toString()}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
}
