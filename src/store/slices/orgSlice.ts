import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import type { Organization, OrgState } from '../../types/org'

const initialState: OrgState = {
  organizations: [],
  activeOrganizationId: null,
}

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload
    },
    setActiveOrganization: (state, action: PayloadAction<string>) => {
      state.activeOrganizationId = action.payload
    },
    clearOrganizations: () => initialState,
  },
})

export const { setOrganizations, setActiveOrganization, clearOrganizations } = orgSlice.actions

export const selectOrganizations = (state: RootState) => state.org.organizations
export const selectActiveOrganization = (state: RootState) => state.org.activeOrganizationId
export const selectActiveOrganizationEntity = (state: RootState) =>
  state.org.organizations.find((organization) => organization.id === state.org.activeOrganizationId) ??
  null

export default orgSlice.reducer
