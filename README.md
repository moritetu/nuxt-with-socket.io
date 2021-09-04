# sample

This sample program is based on https://github.com/nuxt/nuxt.js/tree/dev/examples/with-sockets

## Use render:before hook

```
// nuxt.config.js
  modules: [
    '~/modules/socket.io.js',
  ],
```

## Use listen hook

```
// nuxt.config.js
  modules: [
    '~/modules/socket.io-hook.js',
  ],
```

## Use nuxt prgram

```bash
npm run dev:serve
```
