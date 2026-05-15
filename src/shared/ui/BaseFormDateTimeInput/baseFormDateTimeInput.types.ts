import { DatePicker, Form } from 'antd'
import type { ComponentProps } from 'react'

type FormItemProps = ComponentProps<typeof Form.Item>
type DatePickerProps = ComponentProps<typeof DatePicker>

export interface BaseFormDateTimeInputProps
  extends Omit<DatePickerProps, 'name' | 'format' | 'showTime' | 'use12Hours'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules' | 'getValueProps' | 'normalize'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  rules?: FormItemProps['rules']
}
