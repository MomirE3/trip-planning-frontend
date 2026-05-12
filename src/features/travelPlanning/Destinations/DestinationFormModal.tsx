import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormTextInput } from '../../../shared/ui'
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
          label={t('travelPlanning.destinations.fields.country')}
          name="country"
          placeholder={t('travelPlanning.destinations.placeholders.country')}
          rules={rules.country}
        />
      </BaseForm>
    </Modal>
  )
}
