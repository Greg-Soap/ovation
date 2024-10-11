'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import UserProfile from './_components/user-profile'
import MainProfileSection from './_components/main-profile-section'
import ovationService from '@/services/ovation.service'
import type { ProfileData, UserExperience } from '@/models/all.model'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { useEffect, useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { toast } from 'sonner'
import AsideMsgIcon from '@/components/icons/asideMsgIcon'
import { FriendProps } from '../messages/message-container'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { getToken } from '@/lib/cookies'

export default function Page() {
  const params = useParams()
  const username = params.profile as string
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const { setValue } = useLocalStorage<FriendProps | null>('receiver', null)
  const navigateTo = useAnchorNavigation()
  const token = getToken()

  const { storedValue: draft, setValue: setDraft } = useLocalStorage(
    'userInformation',
    {},
  )
  const isUser = draft?.user?.username == username || username === 'profile'

  console.log(draft)
  const {
    data: _profileData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [isUser ? 'profile' : 'profile', username],
    queryFn: () =>
      isUser
        ? ovationService.getProfile()
        : ovationService.getUserProfile(username),
  })

  useEffect(() => {
    if (isUser) {
      setProfileData(_profileData?.data)
    } else {
      setProfileData(_profileData)
    }
  }, [_profileData])

  const { data: experienceData } = useQuery({
    queryKey: ['experience', profileData?.userId],
    queryFn: () => ovationService.getExperience(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  const [isCopying, setIsCopying] = useState(false)
  const pathname = usePathname()

  const copyProfileLinkToClipboard = async () => {
    if (!profileData?.username) return

    setIsCopying(true)
    try {
      const username = profileData.username
      const profileLink = `${window.location.origin}/${username}`
      await navigator.clipboard.writeText(profileLink)
      toast.success('Profile link copied!')
    } catch (err) {
      8
      console.error('Failed to copy profile link:', err)
      toast.error('Copy failed')
    } finally {
      setIsCopying(false)
    }
  }

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
      navigateTo('/messages')
    }
  }

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
        {!token ? (
          <div className="flex items-end justify-end gap-3 h-[inherit] w-full pr-10 pb-10">
            <Button
              variant={'default'}
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
              onClick={() => navigateTo('/create-account')}
            >
              <span
                className={profileData?.isFollowing ? 'group relative' : ''}
              >
                Create an account
              </span>
            </Button>
          </div>
        ) : isUser ? (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="flex flex-col-reverse sm:flex-row items-end justify-start sm:justify-end gap-3 h-[inherit] w-full pb-4 pr-4 md:pr-10 md:pb-10">
              <Button
                variant="secondary"
                onClick={copyProfileLinkToClipboard}
                disabled={isCopying}
                className=" rounded-full py-[11px] px-4 border border-[#E6E6E64D] text-[#333333] text-xs"
              >
                {isCopying ? 'Copying...' : 'Copy Profile Link'}
              </Button>
              <Button
                variant="default"
                className="py-[11px] px-4 border border-[#E6E6E64D]  text-xs"
              >
                <a href="/settings">Edit Profile</a>
              </Button>
            </div>
          </ErrorBoundary>
        ) : (
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
                      <span className="hidden group-hover:inline">
                        Unfollow
                      </span>
                    </>
                  ) : (
                    'Follow'
                  )}
                </span>
              </Button>
            </div>
          </ErrorBoundary>
        )}
      </div>

      <div className="flex flex-col lg:flex-row relative h-auto">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UserProfile
            profileData={profileData as ProfileData}
            experienceData={experienceData?.data?.data as UserExperience[]}
            isLoading={isLoading}
            isUser={isUser}
          />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <MainProfileSection profileData={profileData as ProfileData} />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}
