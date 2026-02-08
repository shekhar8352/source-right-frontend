import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectUserRoles } from '../store/slices/authSlice'
import type { UserRole } from '../types/auth'
import type { ReactNode } from 'react'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: ReactNode
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const roles = useAppSelector(selectUserRoles)
  const hasPermission = allowedRoles.some((role) => roles.includes(role))

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
