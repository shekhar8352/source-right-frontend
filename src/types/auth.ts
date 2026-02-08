export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER' | 'EMPLOYEE'

export interface AuthUser {
  id: string
  name: string
  email: string
  roles: UserRole[]
  orgId: string
}

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: AuthUser | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: AuthUser
}
