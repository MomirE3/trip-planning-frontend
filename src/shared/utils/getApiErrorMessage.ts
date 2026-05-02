interface ErrorWithMessage {
  message?: string
}

interface RtkQueryError {
  data?: string | ErrorWithMessage
  error?: string
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!isObject(error)) {
    return fallback
  }

  const queryError = error as RtkQueryError

  if (typeof queryError.data === 'string') {
    return queryError.data
  }

  if (isObject(queryError.data) && typeof queryError.data.message === 'string') {
    return queryError.data.message
  }

  if (typeof queryError.error === 'string') {
    return queryError.error
  }

  return fallback
}
