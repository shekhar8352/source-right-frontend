import { Alert, Button, Paper, Stack, Text, Title } from '@mantine/core'
import { FormikProvider, useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
import { FormikPasswordInput } from '../../../components/forms/FormikPasswordInput'
import { FormikTextInput } from '../../../components/forms/FormikTextInput'
import { useApi } from '../../../hooks/useApi'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { loginSuccess, selectIsAuthenticated } from '../../../store/slices/authSlice'
import { setActiveOrganization, setOrganizations } from '../../../store/slices/orgSlice'

interface LoginFormValues {
  username: string
  password: string
}

const getOrganizationName = (orgId: string) => {
  const suffix = orgId.split('_').at(-1)?.slice(0, 6).toUpperCase() ?? 'ERP'
  return `Organization ${suffix}`
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const { authApi } = useApi()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {}

      if (!values.username.trim()) {
        errors.username = 'Username is required'
      }

      if (!values.password.trim()) {
        errors.password = 'Password is required'
      }

      return errors
    },
    onSubmit: async (values, helpers) => {
      try {
        const response = await authApi.login({
          username: values.username.trim(),
          password: values.password,
        })

        dispatch(loginSuccess(response))
        dispatch(
          setOrganizations([
            {
              id: response.org_id,
              name: getOrganizationName(response.org_id),
            },
          ]),
        )
        dispatch(setActiveOrganization(response.org_id))

        navigate('/dashboard', { replace: true })
      } catch (error) {
        helpers.setStatus({
          error:
            error instanceof Error
              ? error.message
              : 'Unable to login. Please check your credentials.',
        })
      } finally {
        helpers.setSubmitting(false)
      }
    },
  })

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Paper radius="md" p="xl" withBorder w="100%" maw={420}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Stack gap={0}>
                <Title order={2}>ERP Login</Title>
                <Text c="dimmed" fz="sm">
                  Sign in with your organization credentials.
                </Text>
              </Stack>

              {formik.status?.error ? (
                <Alert color="red" title="Login failed">
                  {formik.status.error}
                </Alert>
              ) : null}

              <FormikTextInput name="username" label="Username" placeholder="shekhar8352" />
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
