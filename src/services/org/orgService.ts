import { API_ENDPOINTS } from '../api/endpoints'
import { httpClient } from '../api/httpClient'
import type { Organization } from '../../types/org'

export const orgService = {
  listOrganizations: (token: string) =>
    httpClient.request<Organization[]>(API_ENDPOINTS.organizations.list, {}, { token }),
}
