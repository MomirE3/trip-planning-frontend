import { Form, TimePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TIME_FORMAT, toTimeInputValue } from '../../utils/date'
import type { BaseFormTimeInputProps } from './baseFormTimeInput.types'

dayjs.extend(customParseFormat)

function parseTimeValue(value?: string): Dayjs | null {
  if (!value) {
    return null
  }

  const normalized = toTimeInputValue(value)
  const parsed = dayjs(normalized, TIME_FORMAT, true)

  return parsed.isValid() ? parsed : null
}

export function BaseFormTimeInput({
  formItemProps,
  label,
  name,
  rules,
  style,
  ...pickerProps
}: BaseFormTimeInputProps) {
  return (
    <Form.Item
      {...formItemProps}
      getValueProps={(value: string | undefined) => ({
        value: parseTimeValue(value),
      })}
      label={label}
      name={name}
      normalize={(value: Dayjs | null) => (value?.isValid() ? value.format(TIME_FORMAT) : '')}
      rules={rules}
    >
      <TimePicker
        format={TIME_FORMAT}
        needConfirm={false}
        style={{ width: '100%', ...style }}
        use12Hours={false}
        {...pickerProps}
      />
    </Form.Item>
  )
}
