import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { tokenStorage } from '../../../shared/services/tokenStorage'
import type { AuthState } from './login.types'

const initialState: AuthState = {
  token: tokenStorage.getAccessToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    clearToken(state) {
      state.token = null
    },
  },
})

export const { clearToken, setToken } = authSlice.actions
export const authReducer = authSlice.reducer
