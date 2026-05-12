import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormTextInput } from '../../../shared/ui'
import { useActivityFormModal } from './useActivityFormModal'
import type { ActivityFormModalProps, ActivityFormValues } from './activities.types'

export function ActivityFormModal({
  initialValues,
  isSubmitting,
  onCancel,
  onSubmit,
  open,
  title,
}: ActivityFormModalProps) {
  const { t } = useTranslation()
  const { form, rules } = useActivityFormModal(open, initialValues)

  return (
    <Modal
      confirmLoading={isSubmitting}
      okText={t('travelPlanning.common.save')}
      onCancel={onCancel}
      onOk={() => form.submit()}
      open={open}
      title={title}
    >
      <BaseForm<ActivityFormValues>
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.name')}
          name="name"
          placeholder={t('travelPlanning.activities.placeholders.name')}
          rules={rules.name}
        />

        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.date')}
          name="date"
          rules={rules.date}
          type="date"
        />
      </BaseForm>
    </Modal>
  )
}
