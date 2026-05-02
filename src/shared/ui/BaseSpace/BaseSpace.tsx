import { Space } from 'antd'
import type { BaseSpaceProps } from './baseSpace.types'

export function BaseSpace(props: BaseSpaceProps) {
  return <Space {...props} />
}
