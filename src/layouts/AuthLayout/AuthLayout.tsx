import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'

export function AuthLayout() {
  const { t } = useTranslation()

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand">
          <p className="auth-kicker">{t('app.travelPlanner')}</p>
          <h1>{t('app.name')}</h1>
          <p>{t('auth.layout.description')}</p>
        </div>
        <Outlet />
      </section>
    </main>
  )
}
