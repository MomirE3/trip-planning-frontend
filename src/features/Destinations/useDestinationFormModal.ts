import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toDateInputValue } from '../../shared/utils/date'
import type { DestinationDto, DestinationFormValues } from './destinations.types'

interface FormFieldReader {
  getFieldValue: (name: string) => string | undefined
}

export function useDestinationFormModal(open: boolean, initialValues?: DestinationDto | null) {
  const { t } = useTranslation()
  const [form] = Form.useForm<DestinationFormValues>()

  useEffect(() => {
    if (!open) {
      form.resetFields()
      return
    }

    form.setFieldsValue({
      arrivalDate: toDateInputValue(initialValues?.arrivalDate),
      departureDate: toDateInputValue(initialValues?.departureDate),
      description: initialValues?.description ?? '',
      location: initialValues?.location ?? '',
      name: initialValues?.name ?? '',
      notes: initialValues?.notes ?? '',
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      arrivalDate: [
        { required: true, message: t('travelPlanning.destinations.validation.arrivalDate') },
      ],
      departureDate: [
        { required: true, message: t('travelPlanning.destinations.validation.departureDate') },
        ({ getFieldValue }: FormFieldReader) => ({
          validator(_: unknown, value: string) {
            const arrivalDate = getFieldValue('arrivalDate')

            if (!arrivalDate || !value || value >= arrivalDate) {
              return Promise.resolve()
            }

            return Promise.reject(
              new Error(t('travelPlanning.destinations.validation.departureDateAfterArrival')),
            )
          },
        }),
      ],
      description: [
        { required: true, message: t('travelPlanning.destinations.validation.description') },
      ],
      location: [{ required: true, message: t('travelPlanning.destinations.validation.location') }],
      name: [{ required: true, message: t('travelPlanning.destinations.validation.name') }],
      notes: [{ required: true, message: t('travelPlanning.destinations.validation.notes') }],
    },
  }
}
