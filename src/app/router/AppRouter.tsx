import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import { DashboardPage } from '../dashboard/pages/DashboardPage'
import { OrganizationPage } from '../org/pages/OrganizationPage'
import { UsersPage } from '../users/pages/UsersPage'
import { AppLayout } from '../../components/layout/AppLayout'
import { AuthGuard } from '../../guards/AuthGuard'
import { RoleGuard } from '../../guards/RoleGuard'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />

      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/org" element={<OrganizationPage />} />
          <Route
            path="/users"
            element={
              <RoleGuard allowedRoles={['SUPER_ADMIN', 'ORG_ADMIN']}>
                <UsersPage />
              </RoleGuard>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
