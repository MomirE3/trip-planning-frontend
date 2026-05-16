import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useShareAccess } from '../../shared/contexts/ShareAccessContext'
import { baseMessage } from '../../shared/ui'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import {
  useCreateChecklistItemMutation,
  useDeleteChecklistItemMutation,
  useUpdateChecklistItemMutation,
} from './checklist.service'
import type { ChecklistItemDto } from './checklist.types'
import { countCompletedItems, sortChecklistItems } from './checklist.utils'

export function useChecklist(items: ChecklistItemDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { canWrite } = useShareAccess()
  const [newItemContent, setNewItemContent] = useState('')
  const [createItem, { isLoading: isCreating }] = useCreateChecklistItemMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateChecklistItemMutation()
  const [deleteItem, { isLoading: isDeleting }] = useDeleteChecklistItemMutation()

  const sortedItems = useMemo(() => sortChecklistItems(items), [items])
  const completedCount = useMemo(() => countCompletedItems(items), [items])

  const addItem = async () => {
    const content = newItemContent.trim()

    if (!content) {
      return
    }

    try {
      await createItem({ content, travelPlanId }).unwrap()
      setNewItemContent('')
      baseMessage.success(t('travelPlanning.checklist.messages.created'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.checklist.messages.error')))
    }
  }

  const toggleItem = async (item: ChecklistItemDto) => {
    if (!canWrite) {
      return
    }

    try {
      await updateItem({
        id: item.id,
        body: {
          ...item,
          isCompleted: !item.isCompleted,
        },
      }).unwrap()
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.checklist.messages.error')))
    }
  }

  const removeItem = async (id: number) => {
    try {
      await deleteItem(id).unwrap()
      baseMessage.success(t('travelPlanning.checklist.messages.deleted'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.checklist.messages.error')))
    }
  }

  return {
    addItem,
    canWrite,
    completedCount,
    isCreating,
    isDeleting,
    isUpdating,
    newItemContent,
    removeItem,
    setNewItemContent,
    sortedItems,
    t,
    totalCount: items.length,
    toggleItem,
  }
}
