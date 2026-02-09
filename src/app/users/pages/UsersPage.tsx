import { Alert, Loader, Stack, Table, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useApi } from '../../../hooks/useApi'
import type { PlatformUser } from '../../../types/user'

const fallbackUsers: PlatformUser[] = [
  {
    id: 'u-001',
    name: 'Anika Bose',
    email: 'anika.bose@tenant.com',
    role: 'ORG_ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'u-002',
    name: 'Owen Park',
    email: 'owen.park@tenant.com',
    role: 'MANAGER',
    status: 'INVITED',
  },
]

export function UsersPage() {
  const { userApi } = useApi()
  const [users, setUsers] = useState<PlatformUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await userApi.listUsers()
        if (!cancelled) {
          setUsers(result)
        }
      } catch (requestError) {
        if (!cancelled) {
          const message =
            requestError instanceof Error ? requestError.message : 'Could not load users'
          setError(message)
          setUsers(fallbackUsers)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      cancelled = true
    }
  }, [userApi])

  return (
    <Stack gap="lg">
      <Stack gap={2}>
        <Title order={2}>Users</Title>
        <Text c="dimmed">
          Scoped by tenant using `X-Tenant-Id` from the selected organization.
        </Text>
      </Stack>

      {error ? (
        <Alert color="yellow" title="Using fallback dataset">
          {error}
        </Alert>
      ) : null}

      {isLoading ? (
        <Loader />
      ) : (
        <Table
          striped
          highlightOnHover
          withTableBorder
          style={{ width: '100%', tableLayout: 'fixed' }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w="24%">Name</Table.Th>
              <Table.Th w="36%">Email</Table.Th>
              <Table.Th w="20%">Role</Table.Th>
              <Table.Th w="20%">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>
                  <Text size="sm" truncate>
                    {user.name}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" style={{ overflowWrap: 'anywhere' }}>
                    {user.email}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" style={{ overflowWrap: 'anywhere' }}>
                    {user.role}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{user.status}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Stack>
  )
}
