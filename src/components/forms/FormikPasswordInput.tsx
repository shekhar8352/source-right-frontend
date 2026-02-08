import { PasswordInput, type PasswordInputProps } from '@mantine/core'
import { useField } from 'formik'

type FormikPasswordInputProps = Omit<PasswordInputProps, 'name'> & {
  name: string
}

export function FormikPasswordInput({ name, ...props }: FormikPasswordInputProps) {
  const [field, meta] = useField<string>(name)
  const hasError = meta.touched && Boolean(meta.error)

  return <PasswordInput {...field} {...props} error={hasError ? meta.error : undefined} />
}
