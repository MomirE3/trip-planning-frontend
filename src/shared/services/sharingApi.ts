import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '../../config/env'
import { tokenStorage } from './tokenStorage'

export const sharingApi = createApi({
  reducerPath: 'sharingApi',
  tagTypes: ['ShareToken'],
  baseQuery: fetchBaseQuery({
    baseUrl: env.sharingApiBaseUrl,
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
