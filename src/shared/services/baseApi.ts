import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../../config/env'
import { tokenStorage } from './tokenStorage'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers) => {
      const token = tokenStorage.getAccessToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
