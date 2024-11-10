import { Ref } from 'vue'

import jsonCompare from '../utils/object/jsonCompare'

export function useToggle({ modelValue, allowMultiple, allowDeselect }: { modelValue: Ref<any[]> | Ref<any>, allowMultiple: boolean, allowDeselect: boolean } = { allowMultiple: false, allowDeselect: true }) {

  const isSelected = (value: any) => allowMultiple
    ? modelValue.value?.some(element => jsonCompare(element, value))
    : jsonCompare(modelValue.value, value)

  const toggle = (value: any) => {
    if (isSelected(value)) {
      if (!allowDeselect) return
      if (allowMultiple) {
        modelValue.value = modelValue.value.filter((v) => !jsonCompare(v, value))
      } else {
        modelValue.value = null
      }
    } else {
      if (allowMultiple) {
        modelValue.value = [...modelValue.value, value]
      } else {
        modelValue.value = value
      }
    }
  }

  return {
    isSelected,
    toggle,
  }
}