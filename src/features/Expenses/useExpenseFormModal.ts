import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toDateInputValue } from '../../shared/utils/date'
import type { ExpenseDto, ExpenseFormValues } from './expenses.types'

export function useExpenseFormModal(open: boolean, initialValues?: ExpenseDto | null) {
  const { t } = useTranslation()
  const [form] = Form.useForm<ExpenseFormValues>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      amount: initialValues?.amount ?? 0,
      date: toDateInputValue(initialValues?.date),
      name: initialValues?.name ?? '',
      ...(initialValues ? { category: initialValues.category } : {}),
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      amount: [
        { required: true, message: t('travelPlanning.expenses.validation.amount') },
        {
          type: 'number' as const,
          min: 0,
          message: t('travelPlanning.expenses.validation.amountPositive'),
        },
      ],
      category: [{ required: true, message: t('travelPlanning.expenses.validation.category') }],
      date: [{ required: true, message: t('travelPlanning.expenses.validation.date') }],
      name: [{ required: true, message: t('travelPlanning.expenses.validation.name') }],
    },
  }
}
