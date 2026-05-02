import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { DashboardStat } from './dashboard.types'

const { Paragraph, Title } = Typography

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
          <Title level={1}>{t('dashboard.title')}</Title>
          <Paragraph type="secondary">{t('dashboard.description')}</Paragraph>
        </div>
        <Button type="primary">{t('dashboard.newTrip')}</Button>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col key={stat.labelKey} md={8} xs={24}>
            <Card>
              <Space direction="vertical" size={4}>
                <Typography.Text type="secondary">{t(stat.labelKey)}</Typography.Text>
                <Typography.Title level={2}>{stat.value}</Typography.Title>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}
