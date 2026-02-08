import { Badge, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { SectionCard } from '../../../components/common/SectionCard'
import { useAppSelector } from '../../../store/hooks'
import { selectAuthUser } from '../../../store/slices/authSlice'
import { selectActiveOrganization } from '../../../store/slices/orgSlice'

export function DashboardPage() {
  const user = useAppSelector(selectAuthUser)
  const tenantId = useAppSelector(selectActiveOrganization)

  return (
    <Stack gap="lg">
      <Stack gap={4}>
        <Group justify="space-between">
          <Title order={2}>Dashboard</Title>
          <Badge variant="light" size="lg">
            Tenant: {tenantId ?? 'Not selected'}
          </Badge>
        </Group>
        <Text c="dimmed">
          Welcome {user?.name ?? 'user'}. This layout is ready for tenant-scoped ERP modules.
        </Text>
      </Stack>

      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <SectionCard title="Auth Domain" subtitle="src/app/auth + src/guards">
            <Text fz="sm">Centralized role-based guards and auth state in Redux.</Text>
          </SectionCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <SectionCard title="API Layer" subtitle="src/services with tenant header support">
            <Text fz="sm">All requests flow through one HTTP client with org context.</Text>
          </SectionCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <SectionCard title="Forms" subtitle="Mantine + Formik components">
            <Text fz="sm">Reusable form fields keep UI and validation patterns consistent.</Text>
          </SectionCard>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
