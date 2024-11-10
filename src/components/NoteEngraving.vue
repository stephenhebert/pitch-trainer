<script setup lang="ts">
import abcjs from 'abcjs'
import { onMounted } from 'vue';

const { note } = defineProps({
  note: {
    type: String,
    required: true,
  },
})


function render() {
  abcjs.renderAbc('output', `L: 1\n${note}`, {
    responsive: 'resize',
    add_classes: true,
    staffwidth: 100,
    paddingtop: 0,
    paddingbottom: 1,
    paddingright: 0,
    paddingleft: 0,
  })
}

onMounted(() => {
  render()
})
</script>

<template>
  <div id="output"></div>
</template>