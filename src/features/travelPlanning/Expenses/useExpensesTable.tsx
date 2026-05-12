import { Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableFilters } from '../../../shared/hooks'
import { BaseButton, BaseSpace, baseMessage } from '../../../shared/ui'
import type { BaseTableFilterField } from '../../../shared/ui'
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage'
import { decimalFormatter } from '../../../shared/utils/number'
import {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from './expenses.service'
import type { ExpenseDto, ExpenseFilters, ExpenseFormValues } from './expenses.types'
import { buildExpenseDto, emptyExpenseFilters, filterExpenses, sumExpenses } from './expenses.utils'

export function useExpensesTable(expenses: ExpenseDto[], travelPlanId: number) {
  const { t } = useTranslation()
  const { filters, resetFilters, updateFilter } = useTableFilters(emptyExpenseFilters)
  const [editingExpense, setEditingExpense] = useState<ExpenseDto | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation()
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation()
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation()

  const filterFields: BaseTableFilterField<ExpenseFilters>[] = [
    {
      label: t('travelPlanning.expenses.filters.description'),
      name: 'description',
      placeholder: t('travelPlanning.expenses.filters.descriptionPlaceholder'),
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
      const body = buildExpenseDto(values, travelPlanId, editingExpense?.id)

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
      dataIndex: 'description',
      key: 'description',
      title: t('travelPlanning.expenses.fields.description'),
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => decimalFormatter.format(value),
      title: t('travelPlanning.expenses.fields.amount'),
    },
    {
      key: 'actions',
      render: (_, expense) => (
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

  return {
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
