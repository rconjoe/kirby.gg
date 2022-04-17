<script setup>
import { ref, onMounted } from 'vue'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach';

const xterm = ref(null)

function bindTerminal(term, socket) {
  term.socket = socket
}

onMounted(() => {
  const terminal = new Terminal();
  const socket = new WebSocket('ws://localhost:8080/websocket')
  const attachAddOn = new AttachAddon(socket)
  terminal.open(xterm.value, true)
  socket.onmessage = (message) => terminal.write(message.data)
  terminal.onData(data => {
    socket.send(data)
  })
})

</script>

<template>
  <div ref="xterm" />
</template>
