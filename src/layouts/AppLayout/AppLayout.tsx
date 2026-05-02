import { Button, Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/storeHooks'
import { routes } from '../../config/routes'
import { clearToken } from '../../features/auth/Login'
import { tokenStorage } from '../../shared/services/tokenStorage'
import type { AppLayoutNavItem } from './appLayout.types'

const { Header, Content } = Layout
const { Text } = Typography

const navItems: AppLayoutNavItem[] = [
  {
    labelKey: 'layout.trips',
    path: routes.trips,
  },
]

export function AppLayout() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    tokenStorage.clearAccessToken()
    dispatch(clearToken())
    navigate(routes.login, { replace: true })
  }

  return (
    <Layout className="app-shell">
      <Header className="app-header">
        <Link className="app-logo" to={routes.trips}>
          {t('app.name')}
        </Link>

        <nav className="app-nav" aria-label={t('layout.navigationLabel')}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <Button onClick={logout}>{t('layout.logout')}</Button>
      </Header>

      <Content className="app-content">
        <Text type="secondary">{t('layout.protectedArea')}</Text>
        <Outlet />
      </Content>
    </Layout>
  )
}
