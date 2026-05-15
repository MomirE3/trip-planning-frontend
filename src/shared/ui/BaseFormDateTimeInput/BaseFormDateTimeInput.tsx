import { DatePicker, Form } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DATE_TIME_FORMAT, toDateTimeInputValue } from '../../utils/date'
import type { BaseFormDateTimeInputProps } from './baseFormDateTimeInput.types'

dayjs.extend(customParseFormat)

function parseDateTimeValue(value?: string): Dayjs | null {
  if (!value) {
    return null
  }

  const normalized = toDateTimeInputValue(value)
  const parsed = dayjs(normalized, DATE_TIME_FORMAT, true)

  return parsed.isValid() ? parsed : null
}

export function BaseFormDateTimeInput({
  formItemProps,
  label,
  name,
  rules,
  style,
  ...pickerProps
}: BaseFormDateTimeInputProps) {
  return (
    <Form.Item
      {...formItemProps}
      getValueProps={(value: string | undefined) => ({
        value: parseDateTimeValue(value),
      })}
      label={label}
      name={name}
      normalize={(value: Dayjs | null) =>
        value?.isValid() ? value.format(DATE_TIME_FORMAT) : ''
      }
      rules={rules}
    >
      <DatePicker
        format={DATE_TIME_FORMAT}
        needConfirm={false}
        showTime
        style={{ width: '100%', ...style }}
        use12Hours={false}
        {...pickerProps}
      />
    </Form.Item>
  )
}
