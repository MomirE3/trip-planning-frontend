import { Form, Input } from 'antd'
import type { BaseFormPasswordInputProps } from './baseFormPasswordInput.types'

export function BaseFormPasswordInput({
  formItemProps,
  label,
  name,
  rules,
  ...inputProps
}: BaseFormPasswordInputProps) {
  return (
    <Form.Item {...formItemProps} label={label} name={name} rules={rules}>
      <Input.Password {...inputProps} />
    </Form.Item>
  )
}
