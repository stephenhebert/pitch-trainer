<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useStats } from '../composables/useStats'
import jsonCompare from '../utils/object/jsonCompare'
import notes from '../data/notes'

const { settings } = defineProps({
  settings: {
    type: Object,
    required: true,
  }
})

const selectedNotes = toRef(() => settings.selectedNotes)
const { scoreCard } = useStats()


const relevantScores = computed(() => {

  const allNotes = [
    notes.do,
    notes.di,
    notes.re,
    notes.ri,
    notes.mi,
    notes.fa,
    notes.fi,
    notes.sol,
    notes.si,
    notes.la,
    notes.li,
    notes.ti,
  ]

  return allNotes.reduce((acc, note) => {
    const score = scoreCard.value.get(note)
    if (score) {
      acc.push([
        note,
        score,
      ])
    }
    else if (selectedNotes.value.some(selectedNote => jsonCompare(note, selectedNote))) {
      acc.push([
        note,
        { right: 0, wrong: 0 },
      ])
    }
    return acc
  }, [])
})

const simpleScoreCard = computed(() => {
  return relevantScores.value.map(([note,score]) => {
    const label = `${note.solfege} (${note.name})`
    const right = score.right
    const total = right + score.wrong
    const percentage = (right / (total || 1) * 100).toFixed(0)

    return {
      label,
      value: `${right}/${total} (${percentage}%)`
    }
  })
})

const totals = computed(() => {
  const totalRight = relevantScores.value.reduce((acc, [_, score]) => acc + score.right, 0)
  const totalWrong = relevantScores.value.reduce((acc, [_, score]) => acc + score.wrong, 0)
  const totalTotal = totalRight + totalWrong
  const totalPercentage = (totalRight / (totalTotal || 1) * 100).toFixed(0)

  return {
    label: 'Total',
    value: `${totalRight}/${totalTotal} (${totalPercentage}%)`
  }
})
</script>

<template>
  <div class="flex flex-col gap-1 ring-1 ring-gray-300 text-xs px-4 py-2 rounded">
    <table>
      <tr
        v-for="entry in simpleScoreCard"
        class=""
      >
        <td>{{ entry.label }}</td>
        <td class="text-right">{{ entry.value }}</td>
      </tr>
      <tr class="fw-600">
        <td>{{ totals.label }}</td>
        <td class="text-right">{{ totals.value }}</td>
      </tr>

    </table>
  </div>

</template>

<style scoped>
table {
  td { @apply p-1; }
  tr:nth-child(odd) {
    td { @apply bg-gray-100; }
  }
}
</style>