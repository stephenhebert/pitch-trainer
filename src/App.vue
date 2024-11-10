<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppControls from './components/AppControls.vue'
import AppGame from './components/AppGame.vue'
import notes from './data/notes'

const settings = ref({
  selectedNotes: [
    notes.do,
    // notes.di,
    // notes.re,
    // notes.ri,
    // notes.mi,
    // notes.fa,
    notes.fi,
    // notes.sol,
    // notes.si,
    // notes.la,
    // notes.li,
    // notes.ti,
  ],
  selectedMode: 'sing',
})
</script>

<template>
  <div class="w-full">

    <div class="m-auto flex flex-col flex-gap-4 max-w-320px min-h-100vh bg-white px-8 py-4 border-x-1 border-gray-400 shadow-sm">

      <AppHeader />

      <AppControls
        v-model="settings"
      />

      <AppGame 
        :settings="settings"
      />


    </div>

</div>



</template>

<style>
  body {
    @apply bg-gray-300;
  }
</style>