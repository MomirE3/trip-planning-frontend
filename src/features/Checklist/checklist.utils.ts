import type { ChecklistItemDto } from './checklist.types'

export function sortChecklistItems(items: ChecklistItemDto[]) {
  return [...items].sort((left, right) => {
    if (left.isCompleted !== right.isCompleted) {
      return Number(left.isCompleted) - Number(right.isCompleted)
    }

    return left.id - right.id
  })
}

export function countCompletedItems(items: ChecklistItemDto[]) {
  return items.filter((item) => item.isCompleted).length
}
