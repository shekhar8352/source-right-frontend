import { API_ENDPOINTS } from '../api/endpoints'
import { httpClient } from '../api/httpClient'
import type { PlatformUser } from '../../types/user'

interface ListUsersContext {
  token: string
  tenantId: string
}

export const userService = {
  listUsers: ({ token, tenantId }: ListUsersContext) =>
    httpClient.request<PlatformUser[]>(API_ENDPOINTS.users.list, {}, { token, tenantId }),
}
