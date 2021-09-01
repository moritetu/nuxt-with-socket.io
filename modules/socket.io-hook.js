import attachSocketIO from '../server/io'

export default function () {
  this.nuxt.hook('listen', (server, listener) => {
    attachSocketIO(server)
  })
}
