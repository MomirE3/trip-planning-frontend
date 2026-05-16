import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormNumberInput, BaseFormSelect, BaseFormTextInput } from '../../shared/ui'
import { useExpenseFormModal } from './useExpenseFormModal'
import { useExpenseCategoryOptions } from './useExpenseCategoryOptions'
import type { ExpenseFormModalProps, ExpenseFormValues } from './expenses.types'

export function ExpenseFormModal({
  initialValues,
  isSubmitting,
  onCancel,
  onSubmit,
  open,
  title,
}: ExpenseFormModalProps) {
  const { t } = useTranslation()
  const { form, rules } = useExpenseFormModal(open, initialValues)
  const categoryOptions = useExpenseCategoryOptions()

  return (
    <Modal
      confirmLoading={isSubmitting}
      okText={t('travelPlanning.common.save')}
      onCancel={onCancel}
      onOk={() => form.submit()}
      open={open}
      title={title}
    >
      <BaseForm<ExpenseFormValues>
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <BaseFormTextInput
          label={t('travelPlanning.expenses.fields.name')}
          name="name"
          placeholder={t('travelPlanning.expenses.placeholders.name')}
          rules={rules.name}
        />

        <BaseFormNumberInput
          label={t('travelPlanning.expenses.fields.amount')}
          min={0}
          name="amount"
          precision={2}
          rules={rules.amount}
          style={{ width: '100%' }}
        />

        <BaseFormSelect
          label={t('travelPlanning.expenses.fields.category')}
          name="category"
          options={categoryOptions}
          placeholder={t('travelPlanning.expenses.placeholders.category')}
          rules={rules.category}
        />

        <BaseFormTextInput
          label={t('travelPlanning.expenses.fields.date')}
          name="date"
          rules={rules.date}
          type="date"
        />
      </BaseForm>
    </Modal>
  )
}
