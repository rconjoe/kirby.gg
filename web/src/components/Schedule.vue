<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ref, onMounted } from 'vue'
import { functions } from '../firebase.js'
import { httpsCallable } from 'firebase/functions'

dayjs.extend(utc)
dayjs.extend(timezone)

const schedule = ref([])

onMounted(async () => {
  const getSchedule = httpsCallable(functions, 'getSchedule')
  getSchedule()
    .then((resp) => {
      for (let i = 0; i < 5; i++) {
        schedule.value.push(resp.data.data.segments[i])
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
  <div v-for="stream in schedule" :key="id" class="bg-pink-200 text-pink-900 p-3 my-4 justify-items-center items-center rounded-lg shadow-lg">
    <p class="mx-2 font-bold">{{ stream.title }}</p>
    <p>{{ dayjs(stream.start_time).tz('America/New_York').format('ddd M/D h:mma') }} EST</p>
    </div>
</template>
