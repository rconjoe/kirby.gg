<script setup>
import { ref, onMounted } from 'vue'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach';

const xterm = ref(null)

onMounted(() => {
  const wss = process.env.NODE_ENV === 'production' ? 'ws://bot.kirby.gg:3001/websocket' : 'ws://localhost:3001/websocket'
  const terminal = new Terminal();
  const socket = new WebSocket(wss)
  const attachAddon = new AttachAddon(socket)
  terminal.loadAddon(attachAddon)
  terminal.open(xterm.value, true)
  terminal.onData(value => {
    console.log(value)
  })
})

</script>

<template>
  <div ref="xterm" />
</template>
