import { env } from '../../config/env'

export interface RequestContext {
  token?: string
  tenantId?: string | null
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

class HttpClient {
  private readonly baseUrl: string

  constructor(baseUrl = env.apiBaseUrl) {
    this.baseUrl = baseUrl
  }

  async request<T>(
    path: string,
    config: RequestConfig = {},
    context: RequestContext = {},
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: config.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(context.token ? { Authorization: `Bearer ${context.token}` } : {}),
        ...(context.tenantId ? { 'X-Tenant-Id': context.tenantId } : {}),
        ...config.headers,
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    })

    if (!response.ok) {
      throw new Error(await this.readError(response))
    }

    if (response.status === 204) {
      return undefined as T
    }

    return (await response.json()) as T
  }

  private async readError(response: Response): Promise<string> {
    const fallbackMessage = `Request failed with status ${response.status}`

    try {
      const data = (await response.json()) as { message?: string }
      return data.message ?? fallbackMessage
    } catch {
      return fallbackMessage
    }
  }
}

export const httpClient = new HttpClient()
