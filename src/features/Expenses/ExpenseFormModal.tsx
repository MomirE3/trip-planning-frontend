import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormNumberInput, BaseFormTextInput } from '../../shared/ui'
import { useExpenseFormModal } from './useExpenseFormModal'
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
        <BaseFormNumberInput
          label={t('travelPlanning.expenses.fields.amount')}
          min={0}
          name="amount"
          precision={2}
          rules={rules.amount}
          style={{ width: '100%' }}
        />

        <BaseFormTextInput
          label={t('travelPlanning.expenses.fields.description')}
          name="description"
          placeholder={t('travelPlanning.expenses.placeholders.description')}
          rules={rules.description}
        />
      </BaseForm>
    </Modal>
  )
}
