import { Outlet } from 'react-router'
import type { AuthLayoutCopy } from './authLayout.types'

const copy: AuthLayoutCopy = {
  title: 'Trip Planning',
  description: 'Organizujte putovanja, aktivnosti i troskove na jednom mestu.',
}

export function AuthLayout() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand">
          <p className="auth-kicker">Travel planner</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </div>
        <Outlet />
      </section>
    </main>
  )
}
