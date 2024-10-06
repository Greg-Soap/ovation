'use client'
import { useAppStore } from '@/store/use-app-store'
import FollowersFollowing from '../_components/sections/followers-following'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function FollowingPage() {
  const { user } = useAppStore()
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FollowersFollowing
        userId={user?.userId as string}
        secondaryProfile={false}
      />
    </ErrorBoundary>
  )
}
