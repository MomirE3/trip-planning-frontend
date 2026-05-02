import { Button, Layout, Typography } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/storeHooks'
import { routes } from '../../config/routes'
import { clearToken } from '../../features/auth/Login'
import type { AppLayoutNavItem } from './appLayout.types'

const { Header, Content } = Layout
const { Text } = Typography

const navItems: AppLayoutNavItem[] = [
  {
    label: 'Putovanja',
    path: routes.trips,
  },
]

export function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(clearToken())
    navigate(routes.login, { replace: true })
  }

  return (
    <Layout className="app-shell">
      <Header className="app-header">
        <Link className="app-logo" to={routes.trips}>
          Trip Planning
        </Link>

        <nav className="app-nav" aria-label="Glavna navigacija">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Button onClick={logout}>Odjavi se</Button>
      </Header>

      <Content className="app-content">
        <Text type="secondary">Protected area</Text>
        <Outlet />
      </Content>
    </Layout>
  )
}
