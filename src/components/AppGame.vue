<script setup lang="ts">
import { ref } from 'vue'
import AppGameSingIt from './AppGameSingIt.vue'
import AppStreakBar from './AppStreakBar.vue'
import AppScoreCard from './AppScoreCard.vue'
import { useStats } from '../composables/useStats'

defineProps({
  settings: {
    type: Object,
    required: true,
  }
})

const isStarted = ref(false)
const { round } = useStats()


// function playNote 

/*
 outline:
  round:
    if mode is 'sing' randomly select a note and display it,
    if mode is 'name' randomly select a note and play it and use the keyboard to select the note

*/


</script>

<template>

  <div class="flex flex-col">
    <div v-if="!isStarted">
      <button 
        @click="isStarted = true"
        type="button"
        class="flex flex-1 bg-green-500 text-white rounded p-2 text-lg w-full justify-center"
      >Start!</button>
    </div>
    <div v-else class="flex flex-col flex-gap-4">

      <AppStreakBar />

      <div class="text-center text-lg fw-600">Round {{ round }}</div>


      <AppGameSingIt 
        v-if="settings.selectedMode === 'sing'"
        :key="round"
        :settings="settings"
        @complete-round="round += 1"
      />
        
      <div v-if="settings.selectedMode === 'name'">
        name it
      </div>

      <AppScoreCard 
        :settings="settings"
      />


    </div>
  </div>
</template>