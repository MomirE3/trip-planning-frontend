import { Typography } from 'antd'
import type {
  BaseParagraphProps,
  BaseTextProps,
  BaseTitleProps,
} from './baseTypography.types'

export function BaseParagraph(props: BaseParagraphProps) {
  return <Typography.Paragraph {...props} />
}

export function BaseText(props: BaseTextProps) {
  return <Typography.Text {...props} />
}

export function BaseTitle(props: BaseTitleProps) {
  return <Typography.Title {...props} />
}
