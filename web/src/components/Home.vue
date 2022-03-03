<script setup>
import PowerButton from './PowerButton.vue'
import TwitchPlayer from './TwitchPlayer.vue'
</script>

<template>
  <div class="my-12 grid grid-cols-2 grid-rows-2 justify-items-center items-start">
    <div class="bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 rounded-xl p-12 flex flex-row">
      <img src="../assets/kassandra.png" class="max-w-sm"/>
      <div class="m-16">
        <p>Hey there, I'm <strong>Kassandra!</strong></p>
      </div>
    </div>
    <div class="bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 p-10 rounded-xl">
      <TwitchPlayer />
  </div>
      </div>
</template>
