import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { routes } from '../../config/routes'
import { BaseLayout, BaseLayoutContent, BaseLayoutHeader, BaseText } from '../../shared/ui'

export function SharedTripLayout({ children }: PropsWithChildren) {
  const { t } = useTranslation()

  return (
    <BaseLayout className="app-shell">
      <BaseLayoutHeader className="app-header">
        <Link className="app-logo" to={routes.login}>
          {t('app.name')}
        </Link>
        <BaseText className="shared-trip-badge" type="secondary">
          {t('travelPlanning.sharedTrip.badge')}
        </BaseText>
      </BaseLayoutHeader>

      <BaseLayoutContent className="app-content shared-trip-content">{children}</BaseLayoutContent>
    </BaseLayout>
  )
}
