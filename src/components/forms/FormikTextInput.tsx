import { TextInput, type TextInputProps } from '@mantine/core'
import { useField } from 'formik'

type FormikTextInputProps = Omit<TextInputProps, 'name'> & {
  name: string
}

export function FormikTextInput({ name, ...props }: FormikTextInputProps) {
  const [field, meta] = useField<string>(name)
  const hasError = meta.touched && Boolean(meta.error)

  return <TextInput {...field} {...props} error={hasError ? meta.error : undefined} />
}
