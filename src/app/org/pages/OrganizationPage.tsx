import { Badge, Button, Group, List, Stack, Text, Title } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectActiveOrganization, selectOrganizations, setActiveOrganization } from '../../../store/slices/orgSlice'

export function OrganizationPage() {
  const dispatch = useAppDispatch()
  const organizations = useAppSelector(selectOrganizations)
  const activeOrganization = useAppSelector(selectActiveOrganization)

  return (
    <Stack gap="lg">
      <Stack gap={2}>
        <Title order={2}>Organization Context</Title>
        <Text c="dimmed">Switch active tenant to test API and UI boundaries per organization.</Text>
      </Stack>

      {organizations.length === 0 ? (
        <Text c="dimmed">No organizations loaded yet. Sign in to initialize tenant data.</Text>
      ) : (
        <List spacing="sm">
          {organizations.map((organization) => (
            <List.Item key={organization.id}>
              <Group justify="space-between" wrap="wrap" gap="xs">
                <Group gap="sm" style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={500} truncate>
                    {organization.name}
                  </Text>
                  {activeOrganization === organization.id ? (
                    <Badge variant="light" color="teal">
                      Active
                    </Badge>
                  ) : null}
                </Group>
                <Button
                  size="xs"
                  variant={activeOrganization === organization.id ? 'light' : 'default'}
                  onClick={() => dispatch(setActiveOrganization(organization.id))}
                >
                  Switch
                </Button>
              </Group>
            </List.Item>
          ))}
        </List>
      )}
    </Stack>
  )
}
