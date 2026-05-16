import { Form, Select } from 'antd'
import type { ComponentProps } from 'react'
import type { EnumOption } from '../../utils/enumOptions'

type FormItemProps = ComponentProps<typeof Form.Item>
type SelectProps = ComponentProps<typeof Select>

export interface BaseFormSelectProps<T extends string = string>
  extends Omit<SelectProps, 'name' | 'options'> {
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'name' | 'rules'>
  label?: FormItemProps['label']
  name: FormItemProps['name']
  options: EnumOption<T>[]
  rules?: FormItemProps['rules']
}
