export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    me: '/auth/me',
  },
  organizations: {
    list: '/organizations',
  },
  users: {
    list: '/users',
  },
} as const
