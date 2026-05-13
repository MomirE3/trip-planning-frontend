import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormTextInput } from '../../shared/ui'
import { useDestinationFormModal } from './useDestinationFormModal'
import type { DestinationFormModalProps, DestinationFormValues } from './destinations.types'

export function DestinationFormModal({
  initialValues,
  isSubmitting,
  onCancel,
  onSubmit,
  open,
  title,
}: DestinationFormModalProps) {
  const { t } = useTranslation()
  const { form, rules } = useDestinationFormModal(open, initialValues)

  return (
    <Modal
      confirmLoading={isSubmitting}
      okText={t('travelPlanning.common.save')}
      onCancel={onCancel}
      onOk={() => form.submit()}
      open={open}
      title={title}
    >
      <BaseForm<DestinationFormValues>
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.name')}
          name="name"
          placeholder={t('travelPlanning.destinations.placeholders.name')}
          rules={rules.name}
        />

        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.location')}
          name="location"
          placeholder={t('travelPlanning.destinations.placeholders.location')}
          rules={rules.location}
        />

        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.arrivalDate')}
          name="arrivalDate"
          rules={rules.arrivalDate}
          type="date"
        />

        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.departureDate')}
          name="departureDate"
          rules={rules.departureDate}
          type="date"
        />

        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.description')}
          name="description"
          placeholder={t('travelPlanning.destinations.placeholders.description')}
          rules={rules.description}
        />

        <BaseFormTextInput
          label={t('travelPlanning.destinations.fields.notes')}
          name="notes"
          placeholder={t('travelPlanning.destinations.placeholders.notes')}
          rules={rules.notes}
        />
      </BaseForm>
    </Modal>
  )
}
