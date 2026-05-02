import { ConfigProvider } from 'antd'
import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2563eb',
            borderRadius: 8,
            fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </Provider>
  )
}
