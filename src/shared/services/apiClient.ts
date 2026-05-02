import { env } from '../../config/env'
import type { ApiErrorResponse } from '../types/api.types'
import { tokenStorage } from './tokenStorage'

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
}

const buildUrl = (path: string) => {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${baseUrl}${normalizedPath}`
}

const parseResponse = async <TResponse>(response: Response) => {
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    return (await response.text()) as TResponse
  }

  return (await response.json()) as TResponse
}

export const apiClient = {
  async request<TResponse>(path: string, options: RequestOptions = {}) {
    const token = tokenStorage.getAccessToken()
    const headers = new Headers(options.headers)

    headers.set('Accept', 'application/json')

    if (options.body !== undefined) {
      headers.set('Content-Type', 'application/json')
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(buildUrl(path), {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })

    if (!response.ok) {
      const errorBody = await parseResponse<string | { message?: string }>(response)
      const message =
        typeof errorBody === 'string'
          ? errorBody
          : errorBody.message ?? 'Request failed'
      const error: ApiErrorResponse = {
        message,
        status: response.status,
      }

      throw error
    }

    return parseResponse<TResponse>(response)
  },
}
