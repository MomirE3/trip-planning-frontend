import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableFilters } from '../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../shared/ui'
import type { BaseTableFilterField } from '../../shared/ui'
import { formatDate } from '../../shared/utils/date'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import {
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} from './activities.service'
import type { ActivityDto, ActivityFilters, ActivityFormValues } from './activities.types'
import { buildActivityDto, emptyActivityFilters, filterActivities } from './activities.utils'

export function useActivitiesTable(activities: ActivityDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyActivityFilters)
  const [editingActivity, setEditingActivity] = useState<ActivityDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createActivity, { isLoading: isCreating }] = useCreateActivityMutation()
  const [updateActivity, { isLoading: isUpdating }] = useUpdateActivityMutation()
  const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation()

  const filterFields: BaseTableFilterField<ActivityFilters>[] = [
    {
      label: t('travelPlanning.activities.filters.name'),
      name: 'name',
      placeholder: t('travelPlanning.activities.filters.namePlaceholder'),
    },
    {
      label: t('travelPlanning.activities.filters.date'),
      name: 'date',
      type: 'date',
    },
  ]

  const filteredActivities = useMemo(
    () => filterActivities(activities, filters),
    [activities, filters],
  )

  const openCreateForm = () => {
    setEditingActivity(null)
    setIsFormOpen(true)
  }

  const openEditForm = (activity: ActivityDto) => {
    setEditingActivity(activity)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingActivity(null)
  }

  const submitActivity = async (values: ActivityFormValues) => {
    try {
      const body = buildActivityDto(values, travelPlanId, editingActivity?.id)

      if (editingActivity) {
        await updateActivity({ id: editingActivity.id, body }).unwrap()
        baseMessage.success(t('travelPlanning.activities.messages.updated'))
      } else {
        await createActivity(body).unwrap()
        baseMessage.success(t('travelPlanning.activities.messages.created'))
      }

      closeForm()
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.activities.messages.error')))
    }
  }

  const removeActivity = async (id: number) => {
    try {
      await deleteActivity(id).unwrap()
      baseMessage.success(t('travelPlanning.activities.messages.deleted'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.activities.messages.error')))
    }
  }

  const columns: TableProps<ActivityDto>['columns'] = [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('travelPlanning.activities.fields.name'),
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: (value: string) => formatDate(value),
      title: t('travelPlanning.activities.fields.date'),
    },
    {
      key: 'actions',
      render: (_, activity) => (
        <BaseSpace>
          <BaseButton onClick={() => openEditForm(activity)} type="link">
            {t('travelPlanning.common.edit')}
          </BaseButton>
          <Popconfirm
            cancelText={t('travelPlanning.common.cancel')}
            okText={t('travelPlanning.common.delete')}
            onConfirm={() => removeActivity(activity.id)}
            title={t('travelPlanning.activities.deleteConfirm')}
          >
            <BaseButton danger loading={isDeleting} type="link">
              {t('travelPlanning.common.delete')}
            </BaseButton>
          </Popconfirm>
        </BaseSpace>
      ),
      title: t('travelPlanning.common.actions'),
    },
  ]

  return {
    closeForm,
    columns,
    editingActivity,
    filteredActivities,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting: isCreating || isUpdating,
    openCreateForm,
    resetFilters,
    submitActivity,
    t,
    updateFilter,
  }
}
