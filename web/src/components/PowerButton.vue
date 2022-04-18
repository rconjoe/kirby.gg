<script setup>
import { ref, computed } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc } from 'firebase/firestore'

const props = defineProps({
  on: Boolean,
})

const powerClass = computed(() => props.on ? 'bg-green-700' : 'bg-red-700' )
const buttonClass = 'py-4 px-7 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300'

async function toggleGlobalPower() {
  await updateDoc(doc(firestore, 'cfg', 'core'), {
    power: !props.on
  })
}
</script>

<template>
  <button :class="[ powerClass, buttonClass ]" @click="toggleGlobalPower">{{ on ? 'On' : 'Off' }}</button>
</template>
