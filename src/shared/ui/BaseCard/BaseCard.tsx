import { Card } from 'antd'
import type { BaseCardProps } from './baseCard.types'

export function BaseCard(props: BaseCardProps) {
  return <Card {...props} />
}
