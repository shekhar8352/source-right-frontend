const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const resolveApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim()

  if (!configured) {
    return '/api'
  }

  return trimTrailingSlash(configured)
}

export const env = {
  mode: import.meta.env.MODE,
  appName: import.meta.env.VITE_APP_NAME ?? 'Source Right ERP',
  apiBaseUrl: resolveApiBaseUrl(),
} as const
