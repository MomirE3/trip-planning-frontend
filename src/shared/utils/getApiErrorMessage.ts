interface ErrorWithMessage {
  message?: string
}

interface ValidationErrorResponse {
  errors?: Record<string, string[]>
  title?: string
}

interface RtkQueryError {
  data?: string | ErrorWithMessage | ValidationErrorResponse
  error?: string
  status?: number
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

  if (isObject(queryError.data)) {
    if (typeof queryError.data.message === 'string') {
      return queryError.data.message
    }

    if (typeof queryError.data.title === 'string') {
      const validationErrors = queryError.data.errors

      if (isObject(validationErrors)) {
        const firstError = Object.values(validationErrors)
          .flat()
          .find((message) => typeof message === 'string')

        if (firstError) {
          return `${queryError.data.title}: ${firstError}`
        }
      }

      return queryError.data.title
    }
  }

  if (typeof queryError.error === 'string') {
    return queryError.error
  }

  return fallback
}
