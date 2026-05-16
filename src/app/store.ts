import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../features/auth/Login/login.slice'
import { baseApi } from '../shared/services/baseApi'
import { sharingApi } from '../shared/services/sharingApi'
import { travelApi } from '../shared/services/travelApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [travelApi.reducerPath]: travelApi.reducer,
    [sharingApi.reducerPath]: sharingApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      travelApi.middleware,
      sharingApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
