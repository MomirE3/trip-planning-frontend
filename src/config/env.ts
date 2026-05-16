export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8674/api',
  travelApiBaseUrl: import.meta.env.VITE_TRAVEL_API_BASE_URL ?? 'http://localhost:5056/api',
  sharingApiBaseUrl: import.meta.env.VITE_SHARING_API_BASE_URL ?? 'http://localhost:5124/api',
}
