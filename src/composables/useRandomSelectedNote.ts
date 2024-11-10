import { ref, watch } from 'vue'
import jsonCompare from '../utils/object/jsonCompare'

const selectedNotesCopy = ref([])
let prevSelectedNotes = null
const nextNotes = ref([])
const selectedNote = ref(null)

function selectNote() {
  selectedNote.value = nextNotes.value.shift()
}

function randomizeNotes() {
  nextNotes.value = [...selectedNotesCopy.value ].sort(() => Math.random() - 0.5)
}

watch( 
  nextNotes,
  (value) => {
    console.log('nextNotes', value)
    if (value.length === 0 && selectedNotesCopy.value.length > 0) {
      randomizeNotes()
    }
  },
  { immediate: true, deep: true },
)

watch(
  selectedNotesCopy,
  (value) => {
    if (prevSelectedNotes && jsonCompare(prevSelectedNotes, value)) {
      return
    }
    randomizeNotes()
    prevSelectedNotes = value
  },
)

export function useRandomSelectedNote(selectedNotes) {
  selectedNotesCopy.value = selectedNotes
  return {
    selectedNote,
    selectNote,
  }
}