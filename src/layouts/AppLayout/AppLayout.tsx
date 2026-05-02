import { useTranslation } from 'react-i18next'
import { Link, Outlet, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/storeHooks'
import { routes } from '../../config/routes'
import { clearToken } from '../../features/auth/Login'
import { tokenStorage } from '../../shared/services/tokenStorage'
import { BaseButton, BaseLayout, BaseLayoutContent, BaseLayoutHeader, BaseText } from '../../shared/ui'
import type { AppLayoutNavItem } from './appLayout.types'

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
    <BaseLayout className="app-shell">
      <BaseLayoutHeader className="app-header">
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

        <BaseButton onClick={logout}>{t('layout.logout')}</BaseButton>
      </BaseLayoutHeader>

      <BaseLayoutContent className="app-content">
        <BaseText type="secondary">{t('layout.protectedArea')}</BaseText>
        <Outlet />
      </BaseLayoutContent>
    </BaseLayout>
  )
}
