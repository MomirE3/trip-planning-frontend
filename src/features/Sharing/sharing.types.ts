import type { AccessType } from '../../shared/constants/accessType'

export interface ShareTokenDto {
  id: string
  travelPlanId: number
  token: string
  accessType: AccessType
  createdAt: string
  expiresAt: string | null
  isActive: boolean
}

export interface CreateShareTokenRequest {
  travelPlanId: number
  accessType: number
  expiresAt?: string
}

export interface ValidateShareTokenResponse {
  isValid: boolean
  travelPlanId: number
  accessType: AccessType | ''
}

export interface SharingPanelProps {
  travelPlanId: number
}
