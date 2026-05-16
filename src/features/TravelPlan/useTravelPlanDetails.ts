import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { routes } from '../../config/routes'
import { useGetTravelPlanFullQuery } from './travelPlan.service'

export function useTravelPlanDetails(overrideTravelPlanId?: number) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { tripId } = useParams<{ tripId: string }>()
  const travelPlanId = overrideTravelPlanId ?? Number(tripId)
  const isValidTravelPlanId = Number.isFinite(travelPlanId)
  const query = useGetTravelPlanFullQuery(travelPlanId, {
    skip: !isValidTravelPlanId,
  })

  const goBack = () => {
    navigate(routes.trips)
  }

  return {
    ...query,
    goBack,
    isValidTravelPlanId,
    t,
    travelPlanId,
  }
}
