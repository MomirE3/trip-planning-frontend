import { Alert, Tabs } from 'antd'
import { Navigate } from 'react-router'
import { routes } from '../../config/routes'
import {
  BaseButton,
  BaseCard,
  BaseParagraph,
  BaseSpace,
  BaseText,
  BaseTitle,
} from '../../shared/ui'
import { formatDate } from '../../shared/utils/date'
import { decimalFormatter } from '../../shared/utils/number'
import { ActivitiesTable } from '../Activities'
import { DestinationsTable } from '../Destinations'
import { ExpensesTable } from '../Expenses'
import { useTravelPlanDetails } from './useTravelPlanDetails'

export function TravelPlanDetails() {
  const { data, error, goBack, isFetching, isValidTravelPlanId, t, travelPlanId } =
    useTravelPlanDetails()

  if (!isValidTravelPlanId) {
    return <Navigate replace to={routes.trips} />
  }

  const travelPlan = data

  return (
    <section className="travel-page">
      <div className="page-heading">
        <div>
          <BaseButton onClick={goBack}>{t('travelPlanning.travelPlanDetails.back')}</BaseButton>
          <BaseTitle level={1}>
            {travelPlan?.name ?? t('travelPlanning.travelPlanDetails.title')}
          </BaseTitle>
          <BaseParagraph type="secondary">
            {travelPlan
              ? `${formatDate(travelPlan.startDate)} - ${formatDate(travelPlan.endDate)}`
              : t('travelPlanning.travelPlanDetails.loading')}
          </BaseParagraph>
        </div>
      </div>

      {error ? (
        <Alert message={t('travelPlanning.travelPlanDetails.loadError')} showIcon type="error" />
      ) : (
        <BaseCard className="table-card" loading={isFetching && !data}>
          {travelPlan ? (
            <BaseSpace className="plan-summary" size={24} wrap>
              <BaseText>
                <strong>{t('travelPlanning.travelPlans.fields.startDate')}:</strong>{' '}
                {formatDate(travelPlan.startDate)}
              </BaseText>
              <BaseText>
                <strong>{t('travelPlanning.travelPlans.fields.endDate')}:</strong>{' '}
                {formatDate(travelPlan.endDate)}
              </BaseText>
              <BaseText>
                <strong>{t('travelPlanning.travelPlanDetails.user')}:</strong> {travelPlan.userId}
              </BaseText>
              <BaseText>
                <strong>{t('travelPlanning.travelPlans.fields.budget')}:</strong>{' '}
                {decimalFormatter.format(travelPlan.budget)}
              </BaseText>
              <BaseText>
                <strong>{t('travelPlanning.travelPlans.fields.description')}:</strong>{' '}
                {travelPlan.description}
              </BaseText>
            </BaseSpace>
          ) : null}

          <Tabs
            items={[
              {
                children: (
                  <DestinationsTable
                    destinations={data?.destinations ?? []}
                    travelPlanId={travelPlanId}
                  />
                ),
                key: 'destinations',
                label: t('travelPlanning.destinations.title'),
              },
              {
                children: (
                  <ActivitiesTable activities={data?.activities ?? []} travelPlanId={travelPlanId} />
                ),
                key: 'activities',
                label: t('travelPlanning.activities.title'),
              },
              {
                children: (
                  <ExpensesTable expenses={data?.expenses ?? []} travelPlanId={travelPlanId} />
                ),
                key: 'expenses',
                label: t('travelPlanning.expenses.title'),
              },
            ]}
          />
        </BaseCard>
      )}
    </section>
  )
}
