import { useMemo } from 'react'
import { authService } from '../services/auth/authService'
import { orgService } from '../services/org/orgService'
import { userService } from '../services/users/userService'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/slices/authSlice'
import { useTenant } from './useTenant'
import type { LoginPayload } from '../types/auth'

export function useApi() {
  const token = useAppSelector(selectToken)
  const tenantId = useTenant()

  const authApi = useMemo(
    () => ({
      login: (payload: LoginPayload) => authService.login(payload),
    }),
    [],
  )

  const orgApi = useMemo(
    () => ({
      listOrganizations: () => {
        if (!token) {
          throw new Error('Token is missing')
        }

        return orgService.listOrganizations(token)
      },
    }),
    [token],
  )

  const userApi = useMemo(
    () => ({
      listUsers: () => {
        if (!token || !tenantId) {
          throw new Error('Token and tenant are required')
        }

        return userService.listUsers({ token, tenantId })
      },
    }),
    [token, tenantId],
  )

  return { authApi, orgApi, userApi }
}
