import { getToken } from '@/lib/cookies'
import { useGlobalAction, useGlobalStore } from './store-hooks'
import { useParams } from 'next/navigation'

export function useAppStore() {
  const token = getToken()

  // User-related state and actions
  const { user, isAuthenticated } = useGlobalStore((state) => state?.auth)
  const { setUser, clearUser } = useGlobalAction((actions) => actions?.auth)
  const userId = user?.userId

  // Get the username from the URL params
  const params = useParams()
  const urlUsername = params.profile as string

  // Check if the current user is the profile owner
  const isUser = user?.username === urlUsername || urlUsername === 'profile'

  const notUser = !user || !token

  return {
    user,
    userId,
    setUser,
    clearUser,
    isAuthenticated,
    isUser,
    notUser,
  }
}
