import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { BaseForm, BaseFormNumberInput, BaseFormTextInput } from '../../shared/ui'
import { useTravelPlanFormModal } from './useTravelPlanFormModal'
import type { CreateTravelPlanDto, TravelPlanFormModalProps } from './travelPlan.types'

export function TravelPlanFormModal({
  initialValues,
  isSubmitting,
  onCancel,
  onSubmit,
  open,
  title,
}: TravelPlanFormModalProps) {
  const { t } = useTranslation()
  const { form, rules } = useTravelPlanFormModal(open, initialValues)

  return (
    <Modal
      confirmLoading={isSubmitting}
      okText={t('travelPlanning.common.save')}
      onCancel={onCancel}
      onOk={() => form.submit()}
      open={open}
      title={title}
    >
      <BaseForm<CreateTravelPlanDto>
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <BaseFormTextInput
          label={t('travelPlanning.travelPlans.fields.name')}
          name="name"
          placeholder={t('travelPlanning.travelPlans.placeholders.name')}
          rules={rules.name}
        />

        <BaseFormTextInput
          label={t('travelPlanning.travelPlans.fields.startDate')}
          name="startDate"
          rules={rules.startDate}
          type="date"
        />

        <BaseFormTextInput
          label={t('travelPlanning.travelPlans.fields.endDate')}
          name="endDate"
          rules={rules.endDate}
          type="date"
        />

        <BaseFormTextInput
          label={t('travelPlanning.travelPlans.fields.description')}
          name="description"
          placeholder={t('travelPlanning.travelPlans.placeholders.description')}
          rules={rules.description}
        />

        <BaseFormNumberInput
          label={t('travelPlanning.travelPlans.fields.budget')}
          min={0}
          name="budget"
          precision={2}
          rules={rules.budget}
          style={{ width: '100%' }}
        />
      </BaseForm>
    </Modal>
  )
}
