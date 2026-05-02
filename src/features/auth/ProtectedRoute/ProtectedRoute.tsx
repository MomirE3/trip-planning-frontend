import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '../../../app/storeHooks'
import { routes } from '../../../config/routes'
import type { ProtectedRouteState } from './protectedRoute.types'

export function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    const state: ProtectedRouteState = {
      from: location.pathname,
    }

    return <Navigate to={routes.login} replace state={state} />
  }

  return <Outlet />
}
