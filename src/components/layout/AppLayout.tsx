import { AppShell, Button, Group, NavLink, Stack, Text } from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import { clearOrganizations } from '../../store/slices/orgSlice'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Organization', to: '/org' },
  { label: 'Users', to: '/users' },
]

export function AppLayout() {
  const location = useLocation()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearOrganizations())
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: 'sm' }}
      padding="md"
      withBorder
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Stack gap={0}>
            <Text fw={700}>Source Right ERP</Text>
            <Text fz="xs" c="dimmed">
              Multi-tenant control center
            </Text>
          </Stack>
          <Button size="xs" variant="light" color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <Stack gap="xs">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              label={item.label}
              component={Link}
              to={item.to}
              active={location.pathname.startsWith(item.to)}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
