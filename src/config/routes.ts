export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  sharedTrip: '/shared/:shareToken',
  trips: '/trips',
  tripDetails: '/trips/:tripId',
}

export const buildRoutes = {
  sharedTrip: (shareToken: string) => `/shared/${shareToken}`,
  tripDetails: (tripId: number | string) => `/trips/${tripId}`,
}
