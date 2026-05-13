import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toDateInputValue } from '../../shared/utils/date'
import type { CreateTravelPlanDto, TravelPlanDto } from './travelPlan.types'

interface FormFieldReader {
  getFieldValue: (name: string) => string | undefined
}

export function useTravelPlanFormModal(open: boolean, initialValues?: TravelPlanDto | null) {
  const { t } = useTranslation()
  const [form] = Form.useForm<CreateTravelPlanDto>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      endDate: toDateInputValue(initialValues?.endDate),
      name: initialValues?.name ?? '',
      startDate: toDateInputValue(initialValues?.startDate),
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      endDate: [
        { required: true, message: t('travelPlanning.travelPlans.validation.endDate') },
        ({ getFieldValue }: FormFieldReader) => ({
          validator(_: unknown, value: string) {
            const startDate = getFieldValue('startDate')

            if (!startDate || !value || value >= startDate) {
              return Promise.resolve()
            }

            return Promise.reject(
              new Error(t('travelPlanning.travelPlans.validation.endDateAfterStart')),
            )
          },
        }),
      ],
      name: [{ required: true, message: t('travelPlanning.travelPlans.validation.name') }],
      startDate: [
        { required: true, message: t('travelPlanning.travelPlans.validation.startDate') },
      ],
    },
  }
}
