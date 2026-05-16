const shareTokenKey = 'trip-planning.share-token'

export const shareTokenStorage = {
  getShareToken() {
    return sessionStorage.getItem(shareTokenKey)
  },

  setShareToken(token: string) {
    sessionStorage.setItem(shareTokenKey, token)
  },

  clearShareToken() {
    sessionStorage.removeItem(shareTokenKey)
  },
}
