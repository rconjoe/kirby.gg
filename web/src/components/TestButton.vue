<script setup>
import { ref, computed } from 'vue'
import { firestore } from '../firebase.js'
import { doc, updateDoc } from 'firebase/firestore'

const props = defineProps({
  devsOnly: Boolean,
})


async function toggleGlobalDevMode() {
  await updateDoc(doc(firestore, 'cfg', 'core'), {
    devsOnly: !props.devsOnly
  })
}

const devModeClass = computed(() => props.devsOnly ? 'bg-green-700' : 'bg-red-700' )
const buttonClass = 'py-4 px-8 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300'
</script>

<template>
  <button :class="[ devModeClass, buttonClass ]" @click="toggleGlobalDevMode">Devs Only!</button>
</template>
