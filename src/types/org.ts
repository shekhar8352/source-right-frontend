export interface Organization {
  id: string
  name: string
  region?: string
}

export interface OrgState {
  organizations: Organization[]
  activeOrganizationId: string | null
}
