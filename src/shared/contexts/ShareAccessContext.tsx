import { createContext, useContext, type PropsWithChildren } from 'react'

export interface ShareAccessValue {
  canWrite: boolean
  isSharedView: boolean
}

const defaultShareAccess: ShareAccessValue = {
  canWrite: true,
  isSharedView: false,
}

const ShareAccessContext = createContext<ShareAccessValue>(defaultShareAccess)

export function ShareAccessProvider({
  canWrite,
  children,
  isSharedView,
}: PropsWithChildren<ShareAccessValue>) {
  return (
    <ShareAccessContext.Provider value={{ canWrite, isSharedView }}>
      {children}
    </ShareAccessContext.Provider>
  )
}

export function useShareAccess() {
  return useContext(ShareAccessContext)
}
