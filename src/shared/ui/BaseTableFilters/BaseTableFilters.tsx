import { Button, Input } from 'antd'
import type { ChangeEvent } from 'react'
import type { BaseTableFiltersProps } from './baseTableFilters.types'

export function BaseTableFilters<TValues extends object>({
  fields,
  onChange,
  onReset,
  resetLabel = 'Reset',
  values,
}: BaseTableFiltersProps<TValues>) {
  const getValue = (name: Extract<keyof TValues, string>) => {
    const value = values[name]

    return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
  }

  const updateValue =
    (name: Extract<keyof TValues, string>) => (event: ChangeEvent<HTMLInputElement>) => {
      onChange(name, event.target.value)
    }

  return (
    <div className="table-filters">
      {fields.map((field) => (
        <label className="table-filter" key={field.name}>
          <span>{field.label}</span>
          <Input
            allowClear
            inputMode={field.inputMode}
            onChange={updateValue(field.name)}
            placeholder={field.placeholder}
            type={field.type ?? 'text'}
            value={getValue(field.name)}
          />
        </label>
      ))}

      <Button onClick={onReset}>{resetLabel}</Button>
    </div>
  )
}
