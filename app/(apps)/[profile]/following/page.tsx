'use client'
import { useAppStore } from '@/store/use-app-store'
import FollowersFollowing from '../_components/sections/followers-following'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'

export default function FollowingPage() {
  const { user, isUser } = useAppStore()
  const { profile } = useParams()
  const username = profile as string

  const { data: profileData } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username as string),
    enabled: !!username,
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FollowersFollowing
        userId={
          isUser ? (user?.userId as string) : (profileData?.userId as string)
        }
        username={isUser ? user?.username : profileData?.username}
      />
    </ErrorBoundary>
  )
}
