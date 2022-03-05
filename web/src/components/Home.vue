<script setup>
import PowerButton from './PowerButton.vue'
import TwitchPlayer from './TwitchPlayer.vue'
import Hero from './Hero.vue'
import Chat from './Chat.vue'
</script>


<template>

  <!-- Grid div -->
  <div class="grid grid-flow-col-dense row-span-2 justify-center items-start">

    <div>
      <Hero />
    </div>
    <div>
      <div class="mb-6">
        <TwitchPlayer />
      </div>
        <Chat />
      </div>
  </div>
</template>
