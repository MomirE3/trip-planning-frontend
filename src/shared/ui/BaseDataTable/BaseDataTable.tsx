import { Table } from 'antd'
import type { TableProps } from 'antd'
import type { BaseDataTableProps } from './baseDataTable.types'

export function BaseDataTable<TRecord extends object>({
  pagination,
  ...props
}: BaseDataTableProps<TRecord>) {
  const defaultPagination: TableProps<TRecord>['pagination'] =
    pagination === false
      ? false
      : {
          pageSize: 8,
          showSizeChanger: true,
          ...pagination,
        }

  return <Table<TRecord> pagination={defaultPagination} scroll={{ x: 'max-content' }} {...props} />
}
