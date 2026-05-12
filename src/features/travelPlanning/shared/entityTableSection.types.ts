import type { TableProps } from 'antd'
import type { ReactNode } from 'react'
import type { BaseTableFilterField } from '../../../shared/ui'

export interface EntityTableSectionProps<TRecord extends object, TFilters extends object> {
  addButtonLabel: string
  columns: TableProps<TRecord>['columns']
  dataSource: TRecord[]
  filterFields: BaseTableFilterField<TFilters>[]
  filters: TFilters
  onAdd: () => void
  onFilterChange: (name: Extract<keyof TFilters, string>, value: string) => void
  onResetFilters: () => void
  resetFiltersLabel: string
  rowKey: TableProps<TRecord>['rowKey']
  summary?: ReactNode
}
