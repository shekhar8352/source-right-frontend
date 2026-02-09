import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure, useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout, selectAuthUser } from '../../store/slices/authSlice'
import { clearOrganizations, selectActiveOrganizationEntity } from '../../store/slices/orgSlice'
import { env } from '../../config/env'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Organization', to: '/org' },
  { label: 'Users', to: '/users' },
]

export function AppLayout() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)
  const activeOrganization = useAppSelector(selectActiveOrganizationEntity)
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage<boolean>({
    key: 'erp-sidebar-collapsed',
    defaultValue: false,
  })
  const shouldAutoCollapseSidebar = useMediaQuery('(max-width: 64em)')
  const wasSmallScreenRef = useRef(false)

  useEffect(() => {
    if (shouldAutoCollapseSidebar && !wasSmallScreenRef.current) {
      setSidebarCollapsed(true)
    }
    wasSmallScreenRef.current = shouldAutoCollapseSidebar
  }, [setSidebarCollapsed, shouldAutoCollapseSidebar])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearOrganizations())
  }

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 272,
        breakpoint: 'sm',
        collapsed: {
          mobile: !mobileOpened,
          desktop: sidebarCollapsed,
        },
      }}
      padding="md"
      withBorder
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md" wrap="nowrap" gap="xs">
          <Group wrap="nowrap" gap="xs" style={{ flex: 1, minWidth: 0 }}>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle sidebar"
            />
            <ActionIcon
              variant="subtle"
              visibleFrom="sm"
              aria-label="Collapse sidebar"
              onClick={() => setSidebarCollapsed((currentValue) => !currentValue)}
            >
              <Text fw={700}>{sidebarCollapsed ? '>' : '<'}</Text>
            </ActionIcon>
            <Stack gap={0} style={{ minWidth: 0 }}>
              <Text fw={700} truncate>
                {env.appName}
              </Text>
              <Text fz="xs" c="dimmed" truncate>
                {activeOrganization?.name ?? 'No organization selected'}
              </Text>
            </Stack>
          </Group>

          <Menu width={220} position="bottom-end">
            <Menu.Target>
              <UnstyledButton aria-label="Open user menu">
                <Group gap="xs" wrap="nowrap">
                  <Avatar color="teal" radius="xl">
                    U{user?.id ?? ''}
                  </Avatar>
                  <Stack gap={0} visibleFrom="md">
                    <Text size="sm" fw={600}>
                      User {user?.id ?? '-'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user?.role ?? 'Unknown role'}
                    </Text>
                  </Stack>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item disabled>Org: {activeOrganization?.id ?? 'N/A'}</Menu.Item>
              <Menu.Item color="red" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
              onClick={closeMobile}
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main style={{ overflowX: 'hidden' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
