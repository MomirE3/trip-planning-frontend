import { Form, InputNumber } from 'antd'
import type { BaseFormNumberInputProps } from './baseFormNumberInput.types'

export function BaseFormNumberInput({
  formItemProps,
  label,
  name,
  rules,
  ...inputProps
}: BaseFormNumberInputProps) {
  return (
    <Form.Item {...formItemProps} label={label} name={name} rules={rules}>
      <InputNumber {...inputProps} />
    </Form.Item>
  )
}
