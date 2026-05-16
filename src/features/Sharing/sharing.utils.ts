import type { AccessType } from '../../shared/constants/accessType'
import type { CreateShareTokenRequest } from './sharing.types'

const ACCESS_TYPE_TO_API: Record<AccessType, number> = {
  Edit: 1,
  View: 0,
}

export function buildCreateShareTokenRequest(
  travelPlanId: number,
  accessType: AccessType,
  expiresAt: string,
): CreateShareTokenRequest {
  const request: CreateShareTokenRequest = {
    accessType: ACCESS_TYPE_TO_API[accessType],
    travelPlanId,
  }

  if (expiresAt) {
    request.expiresAt = new Date(expiresAt).toISOString()
  }

  return request
}
