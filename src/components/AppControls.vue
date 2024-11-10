<script setup lang="ts">
import NoteKeyboardInput from './NoteKeyboardInput.vue'
import ToggleButton from './ToggleButton.vue'

const settings = defineModel()
</script>

<template>
  <div class="flex flex-row flex-gap-4 ring-1 p-4 rounded-lg ring-gray-300 bg-gray-100">

    <fieldset>
      <legend class="text-2xl fw-600">Notes</legend>
      <NoteKeyboardInput v-model="settings.selectedNotes" />
    </fieldset>

    <fieldset>
      <legend class="text-2xl fw-600">Mode</legend>
      <ul class="flex flex-row gap-1">
        <li><ToggleButton
          no-deselect
          v-model="settings.selectedMode"
          label="Sing it!"
          value="sing"
        /></li>
        <!-- <li><ToggleButton 
          v-model="settings.selectedMode"
          label="Name it!"
          value="name"
        /></li> -->
      </ul>
    </fieldset>

  </div>
</template>

