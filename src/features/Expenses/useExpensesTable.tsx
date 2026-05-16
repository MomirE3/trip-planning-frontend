import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useShareAccess } from '../../shared/contexts/ShareAccessContext'
import { useTableFilters } from '../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../shared/ui'
import type { BaseTableFilterField } from '../../shared/ui'
import { formatDate } from '../../shared/utils/date'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import { decimalFormatter } from '../../shared/utils/number'
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from './expenses.service'
import type { ExpenseDto, ExpenseFilters, ExpenseFormValues } from './expenses.types'
import { buildExpenseDto, emptyExpenseFilters, filterExpenses, sumExpenses } from './expenses.utils'
import { useExpenseCategoryLabel, useExpenseCategoryOptions } from './useExpenseCategoryOptions'

export function useExpensesTable(expenses: ExpenseDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { canWrite } = useShareAccess()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyExpenseFilters)
  const [editingExpense, setEditingExpense] = useState<ExpenseDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation()
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation()
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation()
  const categoryOptions = useExpenseCategoryOptions()
  const getExpenseCategoryLabel = useExpenseCategoryLabel()

  const filterFields: BaseTableFilterField<ExpenseFilters>[] = [
    {
      label: t('travelPlanning.expenses.filters.name'),
      name: 'name',
      placeholder: t('travelPlanning.expenses.filters.namePlaceholder'),
    },
    {
      label: t('travelPlanning.expenses.filters.category'),
      name: 'category',
      options: categoryOptions,
      placeholder: t('travelPlanning.expenses.filters.categoryPlaceholder'),
      type: 'select',
    },
    {
      label: t('travelPlanning.expenses.filters.date'),
      name: 'date',
      type: 'date',
    },
    {
      inputMode: 'decimal',
      label: t('travelPlanning.expenses.filters.minAmount'),
      name: 'minAmount',
      type: 'number',
    },
    {
      inputMode: 'decimal',
      label: t('travelPlanning.expenses.filters.maxAmount'),
      name: 'maxAmount',
      type: 'number',
    },
  ]

  const filteredExpenses = useMemo(() => filterExpenses(expenses, filters), [expenses, filters])

  const totalAmount = useMemo(() => sumExpenses(filteredExpenses), [filteredExpenses])

  const openCreateForm = () => {
    setEditingExpense(null)
    setIsFormOpen(true)
  }

  const openEditForm = (expense: ExpenseDto) => {
    setEditingExpense(expense)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingExpense(null)
  }

  const submitExpense = async (values: ExpenseFormValues) => {
    try {
      const body = buildExpenseDto(values, travelPlanId)

      if (editingExpense) {
        await updateExpense({ id: editingExpense.id, body }).unwrap()
        baseMessage.success(t('travelPlanning.expenses.messages.updated'))
      } else {
        await createExpense(body).unwrap()
        baseMessage.success(t('travelPlanning.expenses.messages.created'))
      }

      closeForm()
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.expenses.messages.error')))
    }
  }

  const removeExpense = async (id: number) => {
    try {
      await deleteExpense(id).unwrap()
      baseMessage.success(t('travelPlanning.expenses.messages.deleted'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.expenses.messages.error')))
    }
  }

  const columns: TableProps<ExpenseDto>['columns'] = [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('travelPlanning.expenses.fields.name'),
    },
    {
      dataIndex: 'category',
      key: 'category',
      render: (value: ExpenseDto['category']) => getExpenseCategoryLabel(value),
      title: t('travelPlanning.expenses.fields.category'),
    },
    {
      dataIndex: 'date',
      key: 'date',
      render: (value: string) => formatDate(value),
      title: t('travelPlanning.expenses.fields.date'),
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => decimalFormatter.format(value),
      title: t('travelPlanning.expenses.fields.amount'),
    },
    ...(canWrite
      ? [
          {
            key: 'actions',
            render: (_: unknown, expense: ExpenseDto) => (
              <BaseSpace>
                <BaseButton onClick={() => openEditForm(expense)} type="link">
                  {t('travelPlanning.common.edit')}
                </BaseButton>
                <Popconfirm
                  cancelText={t('travelPlanning.common.cancel')}
                  okText={t('travelPlanning.common.delete')}
                  onConfirm={() => removeExpense(expense.id)}
                  title={t('travelPlanning.expenses.deleteConfirm')}
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
    editingExpense,
    filteredExpenses,
    filterFields,
    filters,
    isFormOpen,
    isSubmitting: isCreating || isUpdating,
    openCreateForm,
    resetFilters,
    submitExpense,
    summary: `${t('travelPlanning.expenses.total')}: ${decimalFormatter.format(totalAmount)}`,
    t,
    updateFilter,
  }
}
