import { Layout } from 'antd'
import type {
  BaseLayoutContentProps,
  BaseLayoutHeaderProps,
  BaseLayoutProps,
} from './baseLayout.types'

export function BaseLayout(props: BaseLayoutProps) {
  return <Layout {...props} />
}

export function BaseLayoutHeader(props: BaseLayoutHeaderProps) {
  return <Layout.Header {...props} />
}

export function BaseLayoutContent(props: BaseLayoutContentProps) {
  return <Layout.Content {...props} />
}
