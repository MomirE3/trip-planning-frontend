const accessTokenKey = 'trip-planning.access-token'

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(accessTokenKey)
  },

  setAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token)
  },

  clearAccessToken() {
    localStorage.removeItem(accessTokenKey)
  },
}
