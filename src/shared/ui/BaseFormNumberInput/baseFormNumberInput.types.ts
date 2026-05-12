import { Form, InputNumber } from 'antd'
import type { ComponentProps } from 'react'

type FormItemProps = ComponentProps<typeof Form.Item>
type InputNumberProps = ComponentProps<typeof InputNumber>

export interface BaseFormNumberInputProps extends Omit<InputNumberProps, 'name'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  rules?: FormItemProps['rules']
}
