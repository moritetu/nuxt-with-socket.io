import io from 'socket.io-client'

export default (ctx, inject) => {
  const runtimeConfig = Object.assign(ctx.$config, ctx.$config.io || {})
  const socket = io(runtimeConfig.WS_URL)
  inject('io', socket)
}
