import { baseApi } from '../../../shared/services/baseApi'
import type { RegisterRequestDto, RegisterResponseDto } from './register.types'

export const registerService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterRequestDto>({
      query: (body) => ({
        url: '/Auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation } = registerService
