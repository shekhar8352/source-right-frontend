import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import { FormikProvider, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { FormikPasswordInput } from '../../../components/forms/FormikPasswordInput'
import { FormikTextInput } from '../../../components/forms/FormikTextInput'
import { useAppDispatch } from '../../../store/hooks'
import { loginSuccess } from '../../../store/slices/authSlice'
import { setActiveOrganization, setOrganizations } from '../../../store/slices/orgSlice'
import type { UserRole } from '../../../types/auth'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {}

      if (!values.email.trim()) {
        errors.email = 'Email is required'
      }

      if (!values.password.trim()) {
        errors.password = 'Password is required'
      }

      return errors
    },
    onSubmit: (values, helpers) => {
      const normalizedEmail = values.email.trim().toLowerCase()
      const tenantKey = normalizedEmail.split('@')[1]?.split('.')[0] ?? 'global'
      const role: UserRole = normalizedEmail.startsWith('admin') ? 'ORG_ADMIN' : 'EMPLOYEE'
      const activeOrganizationId = `${tenantKey}-hq`

      dispatch(
        loginSuccess({
          token: `demo-${Date.now()}`,
          user: {
            id: 'u-demo',
            name: normalizedEmail.split('@')[0] ?? 'ERP User',
            email: normalizedEmail,
            roles: [role],
            orgId: activeOrganizationId,
          },
        }),
      )

      dispatch(
        setOrganizations([
          { id: activeOrganizationId, name: `${tenantKey.toUpperCase()} HQ` },
          { id: `${tenantKey}-ops`, name: `${tenantKey.toUpperCase()} Operations` },
        ]),
      )
      dispatch(setActiveOrganization(activeOrganizationId))

      helpers.setSubmitting(false)
      navigate('/dashboard', { replace: true })
    },
  })

  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Paper radius="md" p="xl" withBorder miw={360}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Stack gap={0}>
                <Title order={2}>ERP Login</Title>
                <Text c="dimmed" fz="sm">
                  Use any email. Prefix with `admin` to test admin routes.
                </Text>
              </Stack>

              <FormikTextInput name="email" label="Work email" placeholder="admin@tenant.com" />
              <FormikPasswordInput name="password" label="Password" placeholder="••••••••" />

              <Button type="submit" fullWidth loading={formik.isSubmitting}>
                Sign in
              </Button>
            </Stack>
          </form>
        </FormikProvider>
      </Paper>
    </Stack>
  )
}
