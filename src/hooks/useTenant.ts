import { useAppSelector } from '../store/hooks'
import { selectActiveOrganization } from '../store/slices/orgSlice'

export function useTenant(): string | null {
  return useAppSelector(selectActiveOrganization)
}
