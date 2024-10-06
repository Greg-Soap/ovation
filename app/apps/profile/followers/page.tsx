'use client'
import { useAppStore } from '@/store/use-app-store'
import FollowersFollowing from '../_components/sections/followers-following'

export default function FollowersPage() {
  const { user } = useAppStore()
  return (
    <FollowersFollowing
      userId={user?.userId as string}
      secondaryProfile={false}
    />
  )
}
