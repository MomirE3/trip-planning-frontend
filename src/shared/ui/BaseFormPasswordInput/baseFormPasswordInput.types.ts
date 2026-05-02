import { Form, Input } from 'antd'
import type { ComponentProps } from 'react'

type FormItemProps = ComponentProps<typeof Form.Item>
type PasswordInputProps = ComponentProps<typeof Input.Password>

export interface BaseFormPasswordInputProps extends Omit<PasswordInputProps, 'name'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  rules?: FormItemProps['rules']
}
