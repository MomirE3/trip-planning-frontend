export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  trips: '/trips',
  tripDetails: '/trips/:tripId',
}

export const buildRoutes = {
  tripDetails: (tripId: number | string) => `/trips/${tripId}`,
}
