<script setup lang="ts">
import { toRef } from 'vue'
import ToggleButton from './ToggleButton.vue'

const { value } = defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const modelValue = defineModel()

const isWhiteKey = toRef(() => value.keyColor === 'white')
</script>

<template>
  <li
    class="relative"
    :class="[
      { 'w-0 z-1': !isWhiteKey },
    ]"
  >
    <ToggleButton
      unstyled
      allow-multiple
      min="1"
      :value="value"
      v-model="modelValue"
      class="ring-1 ring-black rounded relative is-[.selected]:after:(content-[''] absolute inset-0 bg-blue-400 opacity-50)"
      :class="[
        isWhiteKey ? 'w-5 h-15 bg-white' : 'w-4 h-10 bg-black left--2',
      ]"
    />
  </li>
</template>