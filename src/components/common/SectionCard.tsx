import { Card, Stack, Text, Title } from '@mantine/core'
import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <Card withBorder radius="md" padding="lg" shadow="xs">
      <Stack gap="md">
        <Stack gap={4}>
          <Title order={4}>{title}</Title>
          {subtitle ? <Text c="dimmed">{subtitle}</Text> : null}
        </Stack>
        {children}
      </Stack>
    </Card>
  )
}
