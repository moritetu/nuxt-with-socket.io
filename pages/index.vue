<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content ref="messages">
        <v-list-item-content
          v-for="(msg, index) in messages"
          :key="index"
          class="message"
        >
          <v-list-item-subtitle
            >{{ msg.date.split('T')[1].slice(0, -2) }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>{{ msg.text }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item-content>
    </v-list-item>
    <v-text-field
      v-model="message"
      placeholder="Type here..."
      @keyup.enter="sendMessage"
    />
  </div>
</template>

<script>
export default {
  asyncData({ $io }) {
    return new Promise((resolve) => {
      $io.emit('last-messages', (messages) => resolve({ messages }))
    })
  },
  data() {
    return { message: '', messages: [] }
  },
  head: {
    title: 'Nuxt.js with Socket.io',
  },
  watch: {
    messages: 'scrollToBottom',
  },
  beforeMount() {
    this.$io.on('new-message', (message) => {
      this.messages.push(message)
    })
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim(),
      }
      this.messages.push(message)
      this.message = ''
      this.$io.emit('send-message', message)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
  },
}
</script>

<style scoped></style>
