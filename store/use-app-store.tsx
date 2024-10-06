import { useGlobalAction, useGlobalStore } from './store-hooks'

export function useAppStore() {
  // User-related state and actions
  const { user, isAuthenticated } = useGlobalStore((state) => state?.auth)
  const { setUser, clearUser } = useGlobalAction((actions) => actions?.auth)

  return {
    user,
    setUser,
    clearUser,
    isAuthenticated,
  }
}
