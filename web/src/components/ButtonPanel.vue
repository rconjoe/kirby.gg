<script setup> 
import PowerButton from './PowerButton.vue'
import ResetButton from './ResetButton.vue'
import TestButton from './TestButton.vue'
import GreetButton from './GreetButton.vue'
import SayAsBot from './SayAsBot.vue'
import { firestore } from '../firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { ref, onMounted } from 'vue'

const power = ref(false)
const devsOnly = ref(false)
const devs = ref([])

onMounted(() => {
  onSnapshot(doc(firestore, 'cfg', 'core'), (doc) => {
    const data = doc.data()
    power.value = data.power
    devsOnly.value = data.devsOnly
    devs.value = []
    doc.data().devs.forEach(dev => devs.value.push(dev))
  })
})


</script>

<template>

  <div class="grid grid-rows-2 grid-cols-4 lg:grid-rows-1 lg:grid-cols-8 gap-2 mb-6 justify-center items-center text-center bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 p-2 rounded-xl mx-8">
    <!-- <p class="col-start-1 col-span-2 row-span-1">Controls</p> -->
    <PowerButton :on="power" />
    <GreetButton />
    <TestButton :devsOnly="devsOnly" />
    <ResetButton />
    <SayAsBot />
  </div>

</template>
