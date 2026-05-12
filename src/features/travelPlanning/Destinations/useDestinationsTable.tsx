import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableFilters } from '../../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../../shared/ui'
import type { BaseTableFilterField } from '../../../shared/ui'
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage'
import {
  useCreateDestinationMutation,
  useDeleteDestinationMutation,
  useUpdateDestinationMutation,
} from './destinations.service'
import type { DestinationDto, DestinationFilters, DestinationFormValues } from './destinations.types'
import {
  buildDestinationDto,
  emptyDestinationFilters,
  filterDestinations,
} from './destinations.utils'

export function useDestinationsTable(destinations: DestinationDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyDestinationFilters)
  const [editingDestination, setEditingDestination] = useState<DestinationDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createDestination, { isLoading: isCreating }] = useCreateDestinationMutation()
  const [updateDestination, { isLoading: isUpdating }] = useUpdateDestinationMutation()
  const [deleteDestination, { isLoading: isDeleting }] = useDeleteDestinationMutation()

  const filterFields: BaseTableFilterField<DestinationFilters>[] = [
    {
      label: t('travelPlanning.destinations.filters.name'),
      name: 'name',
      placeholder: t('travelPlanning.destinations.filters.namePlaceholder'),
    },
    {
      label: t('travelPlanning.destinations.filters.country'),
      name: 'country',
      placeholder: t('travelPlanning.destinations.filters.countryPlaceholder'),
    },
  ]

  const filteredDestinations = useMemo(
    () => filterDestinations(destinations, filters),
    [destinations, filters],
  )

  const openCreateForm = () => {
    setEditingDestination(null)
    setIsFormOpen(true)
  }

  const openEditForm = (destination: DestinationDto) => {
    setEditingDestination(destination)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingDestination(null)
  }

  const submitDestination = async (values: DestinationFormValues) => {
    try {
      const body = buildDestinationDto(values, travelPlanId, editingDestination?.id)

      if (editingDestination) {
        await updateDestination({ id: editingDestination.id, body }).unwrap()
        baseMessage.success(t('travelPlanning.destinations.messages.updated'))
      } else {
        await createDestination(body).unwrap()
        baseMessage.success(t('travelPlanning.destinations.messages.created'))
      }

      closeForm()
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.destinations.messages.error')))
    }
  }

  const removeDestination = async (id: number) => {
    try {
      await deleteDestination(id).unwrap()
      baseMessage.success(t('travelPlanning.destinations.messages.deleted'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.destinations.messages.error')))
    }
  }

  const columns: TableProps<DestinationDto>['columns'] = [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('travelPlanning.destinations.fields.name'),
    },
    {
      dataIndex: 'country',
      key: 'country',
      title: t('travelPlanning.destinations.fields.country'),
    },
    {
      key: 'actions',
      render: (_, destination) => (
        <BaseSpace>
          <BaseButton onClick={() => openEditForm(destination)} type="link">
            {t('travelPlanning.common.edit')}
          </BaseButton>
          <Popconfirm
            cancelText={t('travelPlanning.common.cancel')}
            okText={t('travelPlanning.common.delete')}
            onConfirm={() => removeDestination(destination.id)}
            title={t('travelPlanning.destinations.deleteConfirm')}
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
    editingDestination,
    filteredDestinations,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting: isCreating || isUpdating,
    openCreateForm,
    resetFilters,
    submitDestination,
    t,
    updateFilter,
  }
}
