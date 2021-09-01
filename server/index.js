const http = require('http')
const app = require('express')()
const { loadNuxt, build } = require('nuxt')

const isDev = process.env.NODE_ENV !== 'production'

app.get('/hello', (req, res) => {
  res.json({ message: 'hello' })
})

async function start() {
  const server = http.createServer(app)
  const socketIO = require('./io')
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  if (isDev) {
    build(nuxt)
  }

  app.use(nuxt.render)

  socketIO(server)

  const port = process.env.PORT || 3000
  const host = process.env.HOST || '0.0.0.0'
  server.listen(port, host)
  // eslint-disable-next-line no-console
  console.log('Server listening on localhost:' + port)
}

if (require.main === module) {
  start()
}

module.exports = app
