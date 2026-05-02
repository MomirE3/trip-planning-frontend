import { Form } from 'antd'
import type { ComponentProps } from 'react'
import type { BaseFormProps } from './baseForm.types'

export function BaseForm<TValues = Record<string, unknown>>(props: BaseFormProps<TValues>) {
  return <Form {...(props as unknown as ComponentProps<typeof Form>)} />
}
