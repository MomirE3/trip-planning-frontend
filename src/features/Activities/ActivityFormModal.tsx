import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormNumberInput, BaseFormTextInput } from '../../shared/ui'
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
          label={t('travelPlanning.activities.fields.description')}
          name="description"
          placeholder={t('travelPlanning.activities.placeholders.description')}
          rules={rules.description}
        />

        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.date')}
          name="date"
          rules={rules.date}
          type="date"
        />

        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.time')}
          name="time"
          rules={rules.time}
          type="time"
        />

        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.location')}
          name="location"
          placeholder={t('travelPlanning.activities.placeholders.location')}
          rules={rules.location}
        />

        <BaseFormNumberInput
          label={t('travelPlanning.activities.fields.estimatedCost')}
          min={0}
          name="estimatedCost"
          precision={2}
          rules={rules.estimatedCost}
          style={{ width: '100%' }}
        />

        <BaseFormTextInput
          label={t('travelPlanning.activities.fields.status')}
          name="status"
          placeholder={t('travelPlanning.activities.placeholders.status')}
          rules={rules.status}
        />
      </BaseForm>
    </Modal>
  )
}
