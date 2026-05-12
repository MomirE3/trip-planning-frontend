import type { ReactNode } from 'react'
import {
  BaseButton,
  BaseDataTable,
  BaseTableFilters,
} from '../../../shared/ui'
import type { EntityTableSectionProps } from './entityTableSection.types'

export function EntityTableSection<TRecord extends object, TFilters extends object>({
  addButtonLabel,
  columns,
  dataSource,
  filterFields,
  filters,
  onAdd,
  onFilterChange,
  onResetFilters,
  resetFiltersLabel,
  rowKey,
  summary,
}: EntityTableSectionProps<TRecord, TFilters>) {
  return (
    <div className="entity-section">
      <div className="entity-section-heading">
        <BaseTableFilters<TFilters>
          fields={filterFields}
          onChange={onFilterChange}
          onReset={onResetFilters}
          resetLabel={resetFiltersLabel}
          values={filters}
        />
        <BaseButton onClick={onAdd} type="primary">
          {addButtonLabel}
        </BaseButton>
      </div>

      {summary ? <div className="entity-total">{summary}</div> : null}

      <BaseDataTable<TRecord> columns={columns} dataSource={dataSource} rowKey={rowKey} />
    </div>
  )
}

export type EntityTableSummary = ReactNode
