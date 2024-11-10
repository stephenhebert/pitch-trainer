<script setup lang="ts">
import { ref, computed, toRef, watch, onMounted } from 'vue'
import NoteCard from './NoteCard.vue'
import { stopAll, playSample } from '../utils/audio'
import { useStatsBus, statsBusEvent } from '../composables/useStatsBus'
import { useRandomSelectedNote } from '../composables/useRandomSelectedNote'

// TODO: some of this should move to AppGame for use in both AppGameSingIt and AppGameNameIt

const { settings } = defineProps({
  settings: {
    type: Object,
    required: true,
  }
})

const { selectedNote, selectNote } = useRandomSelectedNote(settings.selectedNotes)
const wasPlayed = ref(false)

async function playIt() {
  stopAll()
  // playFrequencyAllOctaves(selectedNote.value.referenceFrequency)
  const sample = (await selectedNote.value.sample()).default
  playSample(sample)
  wasPlayed.value = true
}

const statsBus = useStatsBus()

function nailedIt() {
  statsBus.emit(statsBusEvent.RIGHT, selectedNote.value)
}

function failedIt() {
  statsBus.emit(statsBusEvent.WRONG, selectedNote.value)
}

onMounted(() => {
  selectNote()
})
</script>

<template>
  <div 
    v-if="selectedNote"
    class="flex flex-col justify-center gap-4"
  >
    <NoteCard :note="selectedNote" />
    <button
      type="button"
      @click="playIt"
      class="bg-blue-500 text-white rounded-md p-2 text-lg"
    >{{ !wasPlayed ? 'Play it!' : 'Play it again!' }}</button>
    <template v-if="wasPlayed">
      <div class="flex flex-row gap-4">
        <button
          type="button"
          class="flex flex-1 bg-green-500 text-white rounded-md p-2 text-lg justify-center"
          @click="nailedIt"
        >Nailed It!</button>
        <button
          type="button"
          class="flex flex-1 bg-red-500 text-white rounded-md p-2 text-lg justify-center"
          @click="failedIt"
        >Failed It!</button>
      </div>
    </template>

  </div>

</template>