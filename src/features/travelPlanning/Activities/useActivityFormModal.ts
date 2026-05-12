import { Form } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toDateInputValue } from '../../../shared/utils/date'
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
      date: toDateInputValue(initialValues?.date),
      name: initialValues?.name ?? '',
    })
  }, [form, initialValues, open])

  return {
    form,
    rules: {
      date: [{ required: true, message: t('travelPlanning.activities.validation.date') }],
      name: [{ required: true, message: t('travelPlanning.activities.validation.name') }],
    },
  }
}
