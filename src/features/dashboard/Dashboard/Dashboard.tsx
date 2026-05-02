import { useTranslation } from 'react-i18next'
import {
  BaseButton,
  BaseCard,
  BaseCol,
  BaseParagraph,
  BaseRow,
  BaseSpace,
  BaseText,
  BaseTitle,
} from '../../../shared/ui'
import type { DashboardStat } from './dashboard.types'

const stats: DashboardStat[] = [
  {
    labelKey: 'dashboard.stats.plans',
    value: '0',
  },
  {
    labelKey: 'dashboard.stats.destinations',
    value: '0',
  },
  {
    labelKey: 'dashboard.stats.activities',
    value: '0',
  },
]

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <BaseTitle level={1}>{t('dashboard.title')}</BaseTitle>
          <BaseParagraph type="secondary">{t('dashboard.description')}</BaseParagraph>
        </div>
        <BaseButton type="primary">{t('dashboard.newTrip')}</BaseButton>
      </div>

      <BaseRow gutter={[16, 16]}>
        {stats.map((stat) => (
          <BaseCol key={stat.labelKey} md={8} xs={24}>
            <BaseCard>
              <BaseSpace direction="vertical" size={4}>
                <BaseText type="secondary">{t(stat.labelKey)}</BaseText>
                <BaseTitle level={2}>{stat.value}</BaseTitle>
              </BaseSpace>
            </BaseCard>
          </BaseCol>
        ))}
      </BaseRow>
    </section>
  )
}
