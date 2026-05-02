import { apiClient } from '../../../shared/services/apiClient'
import type { LoginRequestDto, LoginResponseDto } from './login.types'

export const loginService = {
  login(payload: LoginRequestDto) {
    return apiClient.request<LoginResponseDto>('/Auth/login', {
      method: 'POST',
      body: payload,
    })
  },
}
