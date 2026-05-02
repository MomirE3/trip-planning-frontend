import { Form, Input } from 'antd'
import type { ComponentProps } from 'react'

type FormItemProps = ComponentProps<typeof Form.Item>
type InputProps = ComponentProps<typeof Input>

export interface BaseFormTextInputProps extends Omit<InputProps, 'name'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  rules?: FormItemProps['rules']
}
