import { API_ENDPOINTS } from '../api/endpoints'
import { httpClient } from '../api/httpClient'
import type { LoginPayload, LoginResponse } from '../../types/auth'

export const authService = {
  login: (payload: LoginPayload) =>
    httpClient.request<LoginResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      // Send both keys to support APIs that still expect `username` while UI uses email.
      body: { email: payload.email, username: payload.email, password: payload.password },
    }),
}
