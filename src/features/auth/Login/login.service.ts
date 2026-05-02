import { baseApi } from '../../../shared/services/baseApi'
import type { LoginRequestDto, LoginResponseDto } from './login.types'

export const loginService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: '/Auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = loginService
