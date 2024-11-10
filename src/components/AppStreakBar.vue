<script setup lang="ts">
import { useStats } from '../composables/useStats'
import { computed } from 'vue'

const { streak, best } = useStats()

const streakBarWidth = computed(() => {
  const percent = Math.min(10, streak.value) * 10
  return `${percent}%`
})

const streakBackgroundColor = computed(() => {
  const hue = 30 * (10 - Math.min(10, streak.value))
  return `hsl(${hue}, 90%, 50%)`
})
</script>

<template>
  <div class="flex flex-col">
    <div class="relative">
      <div class="bg-gray-200 h-4 w-full rounded-full"/>
      <div 
        class="absolute top-0 h-4 rounded-full duration-300 shadow-sm"
        :style="{ 
          width: streakBarWidth,
          backgroundColor: streakBackgroundColor
        }"
      /></div>
    <div class="flex gap-2 justify-between text-xs">
      <div>Current: {{ streak }}</div>
      <div>Best: {{ best }}</div>
    </div>
  </div>
</template>