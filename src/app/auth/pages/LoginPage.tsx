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
  email: string
  password: string
}

const getOrganizationName = (orgId: string) => {
  const suffix = orgId.split('_').at(-1)?.slice(0, 6).toUpperCase() ?? 'ERP'
  return `Organization ${suffix}`
}

const getLoginErrorMessage = (error: unknown) => {
  const rawMessage =
    error instanceof Error ? error.message : 'Unable to login. Please try again later.'
  const normalizedMessage = rawMessage.toLowerCase()

  if (
    normalizedMessage.includes('inactive') ||
    normalizedMessage.includes('disabled') ||
    normalizedMessage.includes('deactivated')
  ) {
    return 'Inactive user. Please contact your administrator.'
  }

  if (
    normalizedMessage.includes('invalid') ||
    normalizedMessage.includes('unauthorized') ||
    normalizedMessage.includes('incorrect') ||
    normalizedMessage.includes('401')
  ) {
    return 'Invalid credentials. Please check your email and password.'
  }

  return rawMessage
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const { authApi } = useApi()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

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
    onSubmit: async (values, helpers) => {
      try {
        const response = await authApi.login({
          email: values.email.trim(),
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
          error: getLoginErrorMessage(error),
        })
      } finally {
        helpers.setSubmitting(false)
      }
    },
  })
  const isLoginDisabled = !formik.values.email.trim() || !formik.values.password.trim()

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

              <FormikTextInput
                name="email"
                type="email"
                label="Email"
                placeholder="you@organization.com"
              />
              <FormikPasswordInput name="password" label="Password" placeholder="••••••••" />

              <Button
                type="submit"
                fullWidth
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || isLoginDisabled}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </FormikProvider>
      </Paper>
    </Stack>
  )
}
