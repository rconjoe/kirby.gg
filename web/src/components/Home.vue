<script setup>
import PowerButton from './PowerButton.vue'
import TwitchPlayer from './TwitchPlayer.vue'
import Hero from './Hero.vue'
import Chat from './Chat.vue'
import ButtonPanel from './ButtonPanel.vue'
</script>


<template>

  <!-- Grid div -->
  <div class="grid grid-flow-row-dense row-span-2 justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <ButtonPanel />
      <div class="mb-8">
        <TwitchPlayer />
      </div>
    </div>
    <div class="mb-8 mx-12">
      <Hero />
    </div>
  </div>
</template>
