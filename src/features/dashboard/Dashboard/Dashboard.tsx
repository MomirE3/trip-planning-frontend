import { Button, Card, Col, Row, Space, Typography } from 'antd'
import type { DashboardStat } from './dashboard.types'

const { Paragraph, Title } = Typography

const stats: DashboardStat[] = [
  {
    label: 'Planovi',
    value: '0',
  },
  {
    label: 'Destinacije',
    value: '0',
  },
  {
    label: 'Aktivnosti',
    value: '0',
  },
]

export function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <Title level={1}>Planovi putovanja</Title>
          <Paragraph type="secondary">
            Ova ruta je zasticena. Sledeci korak je povezivanje liste putovanja sa backendom.
          </Paragraph>
        </div>
        <Button type="primary">Novo putovanje</Button>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat) => (
          <Col key={stat.label} md={8} xs={24}>
            <Card>
              <Space direction="vertical" size={4}>
                <Typography.Text type="secondary">{stat.label}</Typography.Text>
                <Typography.Title level={2}>{stat.value}</Typography.Title>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  )
}
