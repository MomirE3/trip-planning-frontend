import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { DestinationDto, DestinationFormValues } from './destinations.types'

export function useDestinationFormModal(open: boolean, initialValues?: DestinationDto | null) {
  const { t } = useTranslation()
  const [form] = Form.useForm<DestinationFormValues>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      country: initialValues?.country ?? '',
      name: initialValues?.name ?? '',
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      country: [{ required: true, message: t('travelPlanning.destinations.validation.country') }],
      name: [{ required: true, message: t('travelPlanning.destinations.validation.name') }],
    },
  }
}
