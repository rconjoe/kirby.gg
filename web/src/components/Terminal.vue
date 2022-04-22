<script setup>
import { ref, onMounted } from 'vue'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach';

const xterm = ref(null)

onMounted(() => {
  const terminal = new Terminal();
  const socket = new WebSocket('wss://ws.kirby.gg:3001')
  const attachAddon = new AttachAddon(socket)
  terminal.loadAddon(attachAddon)
  terminal.open(xterm.value, true)
})

</script>

<template>
  <div class="mt-2 shadow-lg rounded-lg bg-pink-200 text-center">
      <p class="mt-4"> This is a fully functional bash terminal connected to your bot server.
      <br />
      Start Kassandra with <code class="bg-slate-300 px-2 py-1">npm run start</code>! 
    </p>
    <div class="mt-4 mb-4">
    </div>
    <div ref="xterm" />
  </div>
</template>
