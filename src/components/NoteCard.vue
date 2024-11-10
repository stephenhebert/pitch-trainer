<script setup lang="ts">
import NoteEngraving from './NoteEngraving.vue'
defineProps({
  note: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white p-2">
    <div class="flex justify-center items-center gap-1">
      <div class="text-100pt line-height-100pt fw-600">{{ note.solfege }}</div>
      <div class="text-48pt text-gray-500">({{ note.name }})</div>
    </div>
    <NoteEngraving :note="note.abc" :key="note.abc" />
  </div>
</template>