import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AccessType } from '../../shared/constants/accessType'
import { buildRoutes } from '../../config/routes'
import { baseMessage } from '../../shared/ui'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import { buildCreateShareTokenRequest } from './sharing.utils'
import {
  useCreateShareTokenMutation,
  useGetShareTokensQuery,
  useRevokeShareTokenMutation,
} from './sharing.service'
import { useAccessTypeLabel } from './useAccessTypeOptions'

export function useSharingPanel(travelPlanId: number) {
  const { t } = useTranslation()
  const getAccessTypeLabel = useAccessTypeLabel()
  const [accessType, setAccessType] = useState<AccessType>('View')
  const [expiresAt, setExpiresAt] = useState('')
  const { data: tokens = [], isFetching } = useGetShareTokensQuery(travelPlanId)
  const [createToken, { isLoading: isCreating }] = useCreateShareTokenMutation()
  const [revokeToken, { isLoading: isRevoking }] = useRevokeShareTokenMutation()

  const createShareLink = async () => {
    try {
      const created = await createToken(
        buildCreateShareTokenRequest(travelPlanId, accessType, expiresAt),
      ).unwrap()

      const shareUrl = `${window.location.origin}${buildRoutes.sharedTrip(created.token)}`
      await navigator.clipboard.writeText(shareUrl)
      setExpiresAt('')
      baseMessage.success(t('travelPlanning.sharing.messages.created'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.sharing.messages.error')))
    }
  }

  const copyShareLink = async (token: string) => {
    const shareUrl = `${window.location.origin}${buildRoutes.sharedTrip(token)}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      baseMessage.success(t('travelPlanning.sharing.messages.copied'))
    } catch {
      baseMessage.error(t('travelPlanning.sharing.messages.copyError'))
    }
  }

  const revokeShareLink = async (tokenId: string) => {
    try {
      await revokeToken(tokenId).unwrap()
      baseMessage.success(t('travelPlanning.sharing.messages.revoked'))
    } catch (error) {
      baseMessage.error(getApiErrorMessage(error, t('travelPlanning.sharing.messages.error')))
    }
  }

  return {
    accessType,
    copyShareLink,
    createShareLink,
    expiresAt,
    getAccessTypeLabel,
    isCreating,
    isFetching,
    isRevoking,
    revokeShareLink,
    setAccessType,
    setExpiresAt,
    t,
    tokens,
  }
}
