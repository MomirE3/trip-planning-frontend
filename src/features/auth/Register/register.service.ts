import { apiClient } from '../../../shared/services/apiClient'
import type { RegisterRequestDto, RegisterResponseDto } from './register.types'

export const registerService = {
  register(payload: RegisterRequestDto) {
    return apiClient.request<RegisterResponseDto>('/Auth/register', {
      method: 'POST',
      body: payload,
    })
  },
}
