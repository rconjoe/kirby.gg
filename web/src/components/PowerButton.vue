<script setup>
import { ref, computed } from 'vue'

const on = ref(true)

const powerClass = computed(() => on.value ? 'bg-green-700' : 'bg-red-700' )
const buttonClass = 'py-4 px-8 m-1 rounded-lg border-2 border-gray-700 text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:duration-300'

function togglePower() {
  on.value = !on.value
}
</script>

<template>
  <button :class="[ powerClass, buttonClass ]" @click="togglePower">{{ on ? 'On' : 'Off' }}</button>
</template>
