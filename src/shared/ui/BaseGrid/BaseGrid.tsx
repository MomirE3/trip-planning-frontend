import { Col, Row } from 'antd'
import type { BaseColProps, BaseRowProps } from './baseGrid.types'

export function BaseRow(props: BaseRowProps) {
  return <Row {...props} />
}

export function BaseCol(props: BaseColProps) {
  return <Col {...props} />
}
