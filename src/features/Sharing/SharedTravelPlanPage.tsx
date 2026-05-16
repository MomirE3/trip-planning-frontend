import { Alert, Spin } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'
import { routes } from '../../config/routes'
import { ShareAccessProvider } from '../../shared/contexts/ShareAccessContext'
import { shareTokenStorage } from '../../shared/services/shareTokenStorage'
import { BaseCard, BaseParagraph, BaseTitle } from '../../shared/ui'
import { TravelPlanDetailsContent } from '../TravelPlan/TravelPlanDetails'
import { useValidateShareTokenQuery } from './sharing.service'

export function SharedTravelPlanPage() {
  const { t } = useTranslation()
  const { shareToken = '' } = useParams<{ shareToken: string }>()
  const { data, isFetching, isError } = useValidateShareTokenQuery(shareToken, {
    skip: !shareToken,
  })

  useEffect(() => {
    if (!shareToken) {
      return
    }

    shareTokenStorage.setShareToken(shareToken)

    return () => {
      shareTokenStorage.clearShareToken()
    }
  }, [shareToken])

  if (!shareToken) {
    return <Navigate replace to={routes.login} />
  }

  if (isFetching) {
    return (
      <section className="travel-page shared-trip-page">
        <BaseCard className="table-card">
          <Spin />
          <BaseParagraph>{t('travelPlanning.sharedTrip.validating')}</BaseParagraph>
        </BaseCard>
      </section>
    )
  }

  if (isError || !data?.isValid) {
    return (
      <section className="travel-page shared-trip-page">
        <BaseCard className="table-card">
          <BaseTitle level={2}>{t('travelPlanning.sharedTrip.invalidTitle')}</BaseTitle>
          <Alert
            message={t('travelPlanning.sharedTrip.invalidDescription')}
            showIcon
            type="error"
          />
        </BaseCard>
      </section>
    )
  }

  const canWrite = data.accessType === 'Edit'

  return (
    <ShareAccessProvider canWrite={canWrite} isSharedView>
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
    </ShareAccessProvider>
  )
}
