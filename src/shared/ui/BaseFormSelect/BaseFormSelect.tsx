import { Form, Select } from 'antd'
import type { BaseFormSelectProps } from './baseFormSelect.types'

export function BaseFormSelect<T extends string>({
  formItemProps,
  label,
  name,
  options,
  rules,
  placeholder,
  style,
  ...selectProps
}: BaseFormSelectProps<T>) {
  return (
    <Form.Item {...formItemProps} label={label} name={name} rules={rules}>
      <Select
        options={options}
        placeholder={placeholder}
        style={{ width: '100%', ...style }}
        {...selectProps}
      />
    </Form.Item>
  )
}
