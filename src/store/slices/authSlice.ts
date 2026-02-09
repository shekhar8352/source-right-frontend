import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import type { AuthSession, AuthState, LoginResponse, UserRole } from '../../types/auth'

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      const session: AuthSession = {
        token: action.payload.token,
        user: {
          id: action.payload.user_id,
          orgId: action.payload.org_id,
          role: action.payload.role,
        },
      }

      state.isAuthenticated = true
      state.token = session.token
      state.user = session.user
    },
    logout: () => initialState,
  },
})

export const { loginSuccess, logout } = authSlice.actions

export const selectAuthState = (state: RootState) => state.auth
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectToken = (state: RootState) => state.auth.token
export const selectAuthUser = (state: RootState) => state.auth.user
export const selectUserRoles = (state: RootState): UserRole[] =>
  state.auth.user ? [state.auth.user.role] : []

export default authSlice.reducer
