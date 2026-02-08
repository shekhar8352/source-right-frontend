import { API_ENDPOINTS } from '../api/endpoints'
import { httpClient } from '../api/httpClient'
import type { AuthUser, LoginPayload, LoginResponse } from '../../types/auth'

export const authService = {
  login: (payload: LoginPayload) =>
    httpClient.request<LoginResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: payload,
    }),

  getCurrentSession: (token: string) =>
    httpClient.request<AuthUser>(API_ENDPOINTS.auth.me, {}, { token }),
}
