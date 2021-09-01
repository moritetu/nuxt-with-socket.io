import http from 'http'
import attachSocketIO from '../server/io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)

    attachSocketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise((resolve) =>
        server.listen(port || 3000, host || 'localhost', resolve)
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))
  })
}
