<script setup>
import { ref } from 'vue'
import { firestore } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore'

const textToSay = ref("")

// this function writes the text to a document in firestore, triggering a serverless function that does the bot.Say()
// in other words, this is a whole other bot instance lol
function sayAsKassandra() {
  setDoc(doc(firestore, 'say-as-bot', 'text-to-say'), {
    value: textToSay.value
  })
    .then(() => {
      textToSay.value = ""
    })
  .catch((err) => {
    alert('There was an error sending your message')
  })
}

</script>

<template>
  <div class="flex flex-row m-1 col-span-4 justify-center lg:ml-4">
    <input type="text" v-model="textToSay" placeholder="Say something (as Kassandra)!" class="bg-gray-200 border-2 w-full p-2 text-lg rounded-lg xl:row-span-2 shadow-lg" />
    <button @click="sayAsKassandra" class="px-4 ml-4 bg-pink-800 rounded-lg text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300 hover:shadow-xl">Send</button>
  </div>
</template>

