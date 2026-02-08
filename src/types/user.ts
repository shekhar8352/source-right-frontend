export interface PlatformUser {
  id: string
  name: string
  email: string
  role: string
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED'
}
