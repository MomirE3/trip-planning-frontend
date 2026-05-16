import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_ACTIVITY_STATUS } from '../../shared/constants/activityStatus'
import { toDateTimeInputValue } from '../../shared/utils/date'
import type { ActivityDto, ActivityFormValues } from './activities.types'

export function useActivityFormModal(open: boolean, initialValues?: ActivityDto | null) {
  const { t } = useTranslation()
  const [form] = Form.useForm<ActivityFormValues>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      description: initialValues?.description ?? '',
      estimatedCost: initialValues?.estimatedCost ?? 0,
      location: initialValues?.location ?? '',
      name: initialValues?.name ?? '',
      status: initialValues?.status ?? DEFAULT_ACTIVITY_STATUS,
      time: toDateTimeInputValue(initialValues?.time),
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      description: [
        { required: true, message: t('travelPlanning.activities.validation.description') },
      ],
      estimatedCost: [
        { required: true, message: t('travelPlanning.activities.validation.estimatedCost') },
        {
          type: 'number' as const,
          min: 0,
          message: t('travelPlanning.activities.validation.estimatedCostPositive'),
        },
      ],
      location: [{ required: true, message: t('travelPlanning.activities.validation.location') }],
      name: [{ required: true, message: t('travelPlanning.activities.validation.name') }],
      status: [{ required: true, message: t('travelPlanning.activities.validation.status') }],
      time: [{ required: true, message: t('travelPlanning.activities.validation.dateTime') }],
    },
  }
}
