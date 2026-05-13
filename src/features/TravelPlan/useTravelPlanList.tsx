import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { buildRoutes } from '../../config/routes'
import { useTableFilters } from '../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../shared/ui'
import type { BaseTableFilterField } from '../../shared/ui'
import { formatDate } from '../../shared/utils/date'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import {
  useCreateTravelPlanMutation,
  useDeleteTravelPlanMutation,
  useGetTravelPlansQuery,
  useUpdateTravelPlanMutation,
} from './travelPlan.service'
import type { CreateTravelPlanDto, TravelPlanDto, TravelPlanFilters } from './travelPlan.types'
import {
  countUpcomingTravelPlans,
  emptyTravelPlanFilters,
  filterTravelPlans,
} from './travelPlan.utils'

export function useTravelPlanList() {
  const { t } = useTranslation()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyTravelPlanFilters)
  const [editingPlan, setEditingPlan] = useState<TravelPlanDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { data: travelPlans = [], isFetching } = useGetTravelPlansQuery()
  const [createTravelPlan, { isLoading: isCreating }] = useCreateTravelPlanMutation()
  const [updateTravelPlan, { isLoading: isUpdating }] = useUpdateTravelPlanMutation()
  const [deleteTravelPlan, { isLoading: isDeleting }] = useDeleteTravelPlanMutation()

  const filterFields: BaseTableFilterField<TravelPlanFilters>[] = [
    {
      label: t('travelPlanning.travelPlans.filters.name'),
      name: 'name',
      placeholder: t('travelPlanning.travelPlans.filters.namePlaceholder'),
    },
    {
      label: t('travelPlanning.travelPlans.filters.startDate'),
      name: 'startDate',
      type: 'date',
    },
    {
      label: t('travelPlanning.travelPlans.filters.endDate'),
      name: 'endDate',
      type: 'date',
    },
  ]

  const filteredPlans = useMemo(
    () => filterTravelPlans(travelPlans, filters),
    [filters, travelPlans],
  )

  const upcomingPlans = useMemo(() => countUpcomingTravelPlans(travelPlans), [travelPlans])

  const openCreateForm = () => {
    setEditingPlan(null)
    setIsFormOpen(true)
  }

  const openEditForm = (plan: TravelPlanDto) => {
    setEditingPlan(plan)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingPlan(null)
  }

  const submitTravelPlan = async (values: CreateTravelPlanDto) => {
    try {
      if (editingPlan) {
        await updateTravelPlan({ id: editingPlan.id, body: values }).unwrap()
        baseMessage.success(t('travelPlanning.travelPlans.messages.updated'))
      } else {
        await createTravelPlan(values).unwrap()
        baseMessage.success(t('travelPlanning.travelPlans.messages.created'))
      }

      closeForm()
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.travelPlans.messages.error')))
    }
  }

  const removeTravelPlan = async (id: number) => {
    try {
      await deleteTravelPlan(id).unwrap()
      baseMessage.success(t('travelPlanning.travelPlans.messages.deleted'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.travelPlans.messages.error')))
    }
  }

  const columns: TableProps<TravelPlanDto>['columns'] = [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('travelPlanning.travelPlans.fields.name'),
    },
    {
      dataIndex: 'startDate',
      key: 'startDate',
      render: (value: string) => formatDate(value),
      title: t('travelPlanning.travelPlans.fields.startDate'),
    },
    {
      dataIndex: 'endDate',
      key: 'endDate',
      render: (value: string) => formatDate(value),
      title: t('travelPlanning.travelPlans.fields.endDate'),
    },
    {
      key: 'actions',
      render: (_, plan) => (
        <BaseSpace>
          <Link to={buildRoutes.tripDetails(plan.id)}>{t('travelPlanning.common.open')}</Link>
          <BaseButton onClick={() => openEditForm(plan)} type="link">
            {t('travelPlanning.common.edit')}
          </BaseButton>
          <Popconfirm
            cancelText={t('travelPlanning.common.cancel')}
            okText={t('travelPlanning.common.delete')}
            onConfirm={() => removeTravelPlan(plan.id)}
            title={t('travelPlanning.travelPlans.deleteConfirm')}
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
    editingPlan,
    filteredPlans,
    filterFields,
    filters,
    isFetching,
    isFormOpen,
    isSubmitting: isCreating || isUpdating,
    openCreateForm,
    resetFilters,
    submitTravelPlan,
    travelPlans,
    upcomingPlans,
    updateFilter,
  }
}
