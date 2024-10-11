'use client'
import FollowersFollowing from '../../_components/sections/followers-following'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'

export default function FollowersPage() {
  const { username } = useParams()
  const { data: profileData } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username as string),
    enabled: !!username,
  })

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <FollowersFollowing
        userId={profileData?.userId as string}
        username={username as string}
      />
    </ErrorBoundary>
  )
}
