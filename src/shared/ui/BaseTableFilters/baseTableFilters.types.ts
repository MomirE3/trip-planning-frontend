import type { HTMLInputTypeAttribute } from 'react'

export interface BaseTableFilterField<TValues extends object> {
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal'
  label: string
  name: Extract<keyof TValues, string>
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

export interface BaseTableFiltersProps<TValues extends object> {
  fields: BaseTableFilterField<TValues>[]
  onChange: (name: Extract<keyof TValues, string>, value: string) => void
  onReset: () => void
  resetLabel?: string
  values: TValues
}
