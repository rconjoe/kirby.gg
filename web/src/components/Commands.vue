<script setup>
import CommandManager from './CommandManager.vue'
import NewCommand from './NewCommand.vue'
import { onMounted, ref } from 'vue'
import { firestore } from '../firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'

const commands = ref([])

onMounted(async () => {
  onSnapshot(collection(firestore, 'commands'), (snapshot) => {
    commands.value = []
    snapshot.forEach(doc => {
      commands.value.push(doc.data())
    })
  })  
})
</script>

<template>
  <div class="flex flex-col bg-pink-300 border-2 shadow-xl border-x-pink-600 border-y-pink-800 rounded-xl p-6 mb-8 mx-8">
    <div v-for="command in commands" class="flex flex-row justify-center">
       <CommandManager :command="command" />
    </div>
    <div class="flex flex-row flex-auto justify-center">
      <NewCommand />
    </div>
  </div>
</template>
