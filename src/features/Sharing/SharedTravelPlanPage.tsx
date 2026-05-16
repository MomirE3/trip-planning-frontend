import { Alert, Spin } from 'antd'
import { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'
import { routes } from '../../config/routes'
import { SharedTripLayout } from '../../layouts/SharedTripLayout'
import { ShareAccessProvider } from '../../shared/contexts/ShareAccessContext'
import { shareTokenStorage } from '../../shared/services/shareTokenStorage'
import { BaseCard, BaseParagraph, BaseTitle } from '../../shared/ui'
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage'
import { TravelPlanDetailsContent } from '../TravelPlan/TravelPlanDetails'
import { useValidateShareTokenQuery } from './sharing.service'

function isEditAccess(accessType: string) {
  return accessType.toLowerCase() === 'edit'
}

export function SharedTravelPlanPage() {
  const { t } = useTranslation()
  const { shareToken = '' } = useParams<{ shareToken: string }>()

  useLayoutEffect(() => {
    if (!shareToken) {
      return
    }

    shareTokenStorage.setShareToken(shareToken)
  }, [shareToken])

  useEffect(() => {
    return () => {
      shareTokenStorage.clearShareToken()
    }
  }, [])

  const { data, error, isFetching, isError } = useValidateShareTokenQuery(shareToken, {
    skip: !shareToken,
  })

  if (!shareToken) {
    return <Navigate replace to={routes.login} />
  }

  if (isFetching) {
    return (
      <SharedTripLayout>
        <section className="travel-page shared-trip-page">
          <BaseCard className="table-card">
            <Spin />
            <BaseParagraph>{t('travelPlanning.sharedTrip.validating')}</BaseParagraph>
          </BaseCard>
        </section>
      </SharedTripLayout>
    )
  }

  if (isError || !data?.isValid) {
    return (
      <SharedTripLayout>
        <section className="travel-page shared-trip-page">
          <BaseCard className="table-card">
            <BaseTitle level={2}>{t('travelPlanning.sharedTrip.invalidTitle')}</BaseTitle>
            <Alert
              message={getApiErrorMessage(error, t('travelPlanning.sharedTrip.invalidDescription'))}
              showIcon
              type="error"
            />
          </BaseCard>
        </section>
      </SharedTripLayout>
    )
  }

  const canWrite = isEditAccess(data.accessType)

  return (
    <ShareAccessProvider canWrite={canWrite} isSharedView>
      <SharedTripLayout>
        <section className="travel-page shared-trip-page">
          <Alert
            className="shared-trip-alert"
            message={
              canWrite
                ? t('travelPlanning.sharedTrip.editAccess')
                : t('travelPlanning.sharedTrip.viewAccess')
            }
            showIcon
            type="info"
          />
          <TravelPlanDetailsContent travelPlanId={data.travelPlanId} />
        </section>
      </SharedTripLayout>
    </ShareAccessProvider>
  )
}
