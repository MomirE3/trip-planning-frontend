import { Form, TimePicker } from 'antd'
import type { ComponentProps } from 'react'

type FormItemProps = ComponentProps<typeof Form.Item>
type TimePickerProps = ComponentProps<typeof TimePicker>

export interface BaseFormTimeInputProps extends Omit<TimePickerProps, 'name' | 'format' | 'use12Hours'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules' | 'getValueProps' | 'normalize'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  rules?: FormItemProps['rules']
}
