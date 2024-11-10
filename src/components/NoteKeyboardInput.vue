<script setup lang="ts">
import NoteKeyboardInputKey from './NoteKeyboardInputKey.vue'
import notes from '../data/notes'

const modelValue = defineModel()
</script>

<template>
  <ul class="flex flex-row">
    <NoteKeyboardInputKey :value="notes.do" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.di" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.re" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.ri" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.mi" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.fa" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.fi" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.sol" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.si" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.la" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.li" v-model="modelValue" />
    <NoteKeyboardInputKey :value="notes.ti" v-model="modelValue" />
  </ul>
</template>
