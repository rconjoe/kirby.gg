<script setup> 
import PowerButton from './PowerButton.vue'
import ResetButton from './ResetButton.vue'
import TestButton from './TestButton.vue'
import GreetButton from './GreetButton.vue'
import SayAsBot from './SayAsBot.vue'
</script>

<template>

  <div class="grid grid-rows-8 grid-cols-2 gap-2 justify-center items-center text-center mr-6 bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 p-6 rounded-xl">
    <p class="col-start-1 col-span-2 row-span-1">Controls</p>
    <PowerButton />
    <GreetButton />
    <TestButton />
    <ResetButton />
    <SayAsBot />
  </div>

</template>
