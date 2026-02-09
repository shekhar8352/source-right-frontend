export type UserRole = 'SUPER_ADMIN' | 'ORG_ADMIN' | 'MANAGER' | 'EMPLOYEE' | string

export interface AuthUser {
  id: number
  orgId: string
  role: UserRole
  username?: string
}

export interface AuthSession {
  token: string
  user: AuthUser
}

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: AuthUser | null
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user_id: number
  org_id: string
  role: UserRole
}
