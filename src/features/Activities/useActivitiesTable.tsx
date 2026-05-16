import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useShareAccess } from '../../shared/contexts/ShareAccessContext'
import { useTableFilters } from '../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../shared/ui'
import type { BaseTableFilterField } from '../../shared/ui'
import { formatDateTime } from '../../shared/utils/date'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import { decimalFormatter } from '../../shared/utils/number'
import {
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} from './activities.service'
import type { ActivityDto, ActivityFilters, ActivityFormValues } from './activities.types'
import { buildActivityDto, emptyActivityFilters, filterActivities } from './activities.utils'
import { useActivityStatusLabel, useActivityStatusOptions } from './useActivityStatusOptions'

export function useActivitiesTable(activities: ActivityDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { canWrite } = useShareAccess()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyActivityFilters)
  const [editingActivity, setEditingActivity] = useState<ActivityDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createActivity, { isLoading: isCreating }] = useCreateActivityMutation()
  const [updateActivity, { isLoading: isUpdating }] = useUpdateActivityMutation()
  const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation()
  const statusOptions = useActivityStatusOptions()
  const getActivityStatusLabel = useActivityStatusLabel()

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
    {
      label: t('travelPlanning.activities.filters.location'),
      name: 'location',
      placeholder: t('travelPlanning.activities.filters.locationPlaceholder'),
    },
    {
      label: t('travelPlanning.activities.filters.status'),
      name: 'status',
      options: statusOptions,
      placeholder: t('travelPlanning.activities.filters.statusPlaceholder'),
      type: 'select',
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
      const body = buildActivityDto(values, travelPlanId)

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
      dataIndex: 'description',
      key: 'description',
      title: t('travelPlanning.activities.fields.description'),
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (value: string) => formatDateTime(value),
      title: t('travelPlanning.activities.fields.time'),
    },
    {
      dataIndex: 'location',
      key: 'location',
      title: t('travelPlanning.activities.fields.location'),
    },
    {
      dataIndex: 'estimatedCost',
      key: 'estimatedCost',
      render: (value: number) => decimalFormatter.format(value),
      title: t('travelPlanning.activities.fields.estimatedCost'),
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (value: ActivityDto['status']) => getActivityStatusLabel(value),
      title: t('travelPlanning.activities.fields.status'),
    },
    ...(canWrite
      ? [
          {
            key: 'actions',
            render: (_: unknown, activity: ActivityDto) => (
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
      : []),
  ]

  return {
    canWrite,
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
