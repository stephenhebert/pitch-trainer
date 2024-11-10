<script setup lang="ts">
import { useToggle } from '../composables/useToggle'

const { value, allowMultiple, noDeselect } = defineProps({
  label: {
    type: String,
  },
  value: {},
  unstyled: {
    type: Boolean,
  },
  allowMultiple: {
    type: Boolean,
  },
  noDeselect: {
    type: Boolean,
  },
})

const modelValue = defineModel()

const { isSelected, toggle } = useToggle({modelValue, allowMultiple, allowDeselect: !noDeselect })
</script>

<template>
  <button
    data-component="toggle-button"
    type="button"
    :aria-pressed="isSelected(value)"
    @click="toggle(value)"
    :class="{ 
      selected: isSelected(value),
      'ring-1 ring-gray-300 rounded-md px-2 py-1 bg-white is-[.selected]:(bg-blue-500 text-white)': !unstyled,
   }"
  >
    <template v-if="label">{{ label }}</template>
  </button>
</template>