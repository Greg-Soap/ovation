'use client'
import { useAppStore } from '@/store/use-app-store'
import FollowersFollowing from '../_components/sections/followers-following'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'

export default function FollowersPage() {
  const { user, isUser } = useAppStore()
  const { username } = useParams()

  const { data: profileData } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username as string),
    enabled: !!username,
  })
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FollowersFollowing
        userId={user?.userId as string}
        username={isUser ? user?.username : profileData?.username}
      />
    </ErrorBoundary>
  )
}
