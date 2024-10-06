'use client'
import FollowersFollowing from '../../_components/sections/followers-following'
import { useParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'

export default function FollowingPage() {
  const { username } = useParams()

  const { data: profileData } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username as string),
    enabled: !!username,
  })

  return (
    <FollowersFollowing
      userId={profileData?.userId as string}
      secondaryProfile={true}
      username={username as string}
    />
  )
}
