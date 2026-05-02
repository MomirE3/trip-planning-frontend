import { Button } from 'antd'
import type { BaseButtonProps } from './baseButton.types'

export function BaseButton(props: BaseButtonProps) {
  return <Button {...props} />
}
