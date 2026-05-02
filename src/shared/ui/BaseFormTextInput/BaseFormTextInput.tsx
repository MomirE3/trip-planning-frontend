import { Form, Input } from 'antd'
import type { BaseFormTextInputProps } from './baseFormTextInput.types'

export function BaseFormTextInput({
  formItemProps,
  label,
  name,
  rules,
  ...inputProps
}: BaseFormTextInputProps) {
  return (
    <Form.Item {...formItemProps} label={label} name={name} rules={rules}>
      <Input {...inputProps} />
    </Form.Item>
  )
}
