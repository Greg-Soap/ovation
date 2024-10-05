'use client'
import { Button } from '@/components/ui/button'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import UserProfile from '../_components/user-profile'
import ovationService from '@/services/ovation.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import MainProfileSection from '../_components/main-profile-section'
import type { ProfileData } from '@/models/all.model'
import { Suspense, useEffect } from 'react'
import MiniLoader from '@/components/mini-loader'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { FriendProps } from '../../messages/message-container'
import { useAnchorNavigation } from '@/lib/use-navigation'

export default function SecondaryProfile() {
  const params = useParams()
  const username = params.username as string
  const navigateTo = useAnchorNavigation()
  const { setValue } = useLocalStorage<FriendProps | null>('receiver', null)

  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => ovationService.getUserProfile(username),
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience', profileData?.userId],
    queryFn: () => ovationService.getExperience(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  const { mutate: viewProfile } = useMutation({
    mutationFn: (userId: string) => ovationService.viewProfile(userId),
  })

  useEffect(() => {
    if (profileData?.userId) {
      viewProfile(profileData.userId)
    }
  }, [profileData?.userId, viewProfile])

  const { mutate: followUser, isPending: isFollowingPending } = useMutation({
    mutationFn: (userId: string) => ovationService.followUser(userId),
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: unfollowUser, isPending: isUnfollowingPending } = useMutation(
    {
      mutationFn: (userId: string) => ovationService.unfollowUser(userId),
      onSuccess: () => {
        refetch()
      },
    },
  )

  const openDM = () => {
    if (profileData) {
      const receiver: FriendProps = {
        displayName: profileData.profile?.displayName!,
        followerCount: profileData.userStats?.followers! || 0,
        followingCount: profileData.userStats?.following! || 0,
        friendDisplayPicture: profileData.profile?.profileImage!,
        isOpened: true,
        lastActive: '',
        userId: profileData.userId!,
        biography: profileData.profile?.bio!,
        userName: profileData.username!,
        lastMessage: '',
      }
      setValue(receiver)
      navigateTo('/apps/messages')
    }
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        className="relative w-full h-[262px]"
        style={{
          backgroundImage: profileData?.profile?.coverImage
            ? `url('${profileData?.profile?.coverImage}')`
            : 'url("/assets/images/profile/image8.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
            <Button
              variant="default"
              className="bg-[#333726] p-[9px] border border-[#507100]"
              onClick={openDM}
            >
              <AsideMsgIcon className="w-5 h-5 stroke-black fill-[#CFF073]" />
            </Button>
            <Button
              variant={'default'}
              disabled={isFollowingPending || isUnfollowingPending}
              isLoading={isFollowingPending || isUnfollowingPending}
              loadingText={
                isFollowingPending ? 'Following...' : 'Unfollowing...'
              }
              className={`
                py-[9px] px-[13px] text-xs font-semibold border
                ${
                  profileData?.isFollowing
                    ? 'bg-[#333726]  border-[#E6E6E64D] hover:bg-red-900 hover:text-red-200 hover:border-red-700'
                    : ' text-[#0B0A10] border-[#E6E6E64D]'
                }
                transition-colors duration-200
                ${profileData?.isFollowing ? 'group' : ''}
              `}
              onClick={() => {
                if (profileData?.isFollowing) {
                  unfollowUser(profileData?.userId as string)
                } else {
                  followUser(profileData?.userId as string)
                }
              }}
            >
              <span
                className={profileData?.isFollowing ? 'group relative' : ''}
              >
                {profileData?.isFollowing ? (
                  <>
                    <span className="group-hover:hidden">Following</span>
                    <span className="hidden group-hover:inline">Unfollow</span>
                  </>
                ) : (
                  'Follow'
                )}
              </span>
            </Button>
          </div>
        </ErrorBoundary>
      </div>

      <div className="flex flex-col lg:flex-row relative h-auto">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<MiniLoader />}>
            <UserProfile
              profileData={profileData as ProfileData}
              experienceData={experienceData?.data?.data || []}
              isLoading={isLoading}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<MiniLoader />}>
            <MainProfileSection
              profileData={profileData as ProfileData}
              secondaryProfile={true}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
