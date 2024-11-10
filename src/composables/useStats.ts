import { useStatsBus, statsBusEvent } from "./useStatsBus";
import { useSingleton } from "./useSingleton";

import { ref } from "vue"

interface Score {
  right: number
  wrong: number
  lastSeen?: Date
}

function createInstance() {
  const statsBus = useStatsBus()

  const round = ref(1)
  const streak = ref(0)
  const best = ref(0)

  const scoreCard = ref(new Map<Object, Object>())
  const emptyScore: Score = { right: 0, wrong: 0, lastSeen: undefined }

  const incrementStreak = () => {
    streak.value++
    if (streak.value > best.value) {
      best.value = streak.value
    }
  }

  const resetStreak = () => {
    streak.value = 0
  }

  const mark = (key: Object, right: boolean) => {
    const score = scoreCard.value.get(key) || { ...emptyScore }
    score.lastSeen = new Date()
    if (right) {
      score.right++
      incrementStreak()
    } else {
      score.wrong++
      resetStreak()
    }
    scoreCard.value.set(key, score)
    round.value++
  }

  const resetScore = () => {
    scoreCard.value = new Map()
  }

  statsBus.on(statsBusEvent.RIGHT, (note) => {
    mark(note, true)
  })

  statsBus.on(statsBusEvent.WRONG, (note) => {
    mark(note, false)
  })

  return {
    round,
    streak,
    best,
    scoreCard,
    resetScore,
  }
}

export const useStats = useSingleton(createInstance)