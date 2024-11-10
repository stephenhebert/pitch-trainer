import { useBus } from './useBus'

const statsBus = useBus()

export const statsBusEvent = {
  RIGHT: 'right-answer',
  WRONG: 'wrong-answer',
}

export function useStatsBus() {
  return statsBus
}