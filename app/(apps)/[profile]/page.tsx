'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserProfile from './_components/user-profile'
import MainProfileSection from './_components/main-profile-section'
import ovationService from '@/services/ovation.service'
import type { ProfileData, UserExperience } from '@/models/all.model'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import type { FriendProps } from '../messages/message-container'
import { useLocalStorage } from '@/lib/use-local-storage'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { getToken } from '@/lib/cookies'
import { useAppStore } from '@/store/use-app-store'
import ProfileHeader from './_components/sections/profile-header'
import Head from 'next/head'

export default function Page() {
  const params = useParams()
  const username = params.profile as string
  const { setValue } = useLocalStorage<FriendProps | null>('receiver', null)
  const navigateTo = useAnchorNavigation()
  const token = getToken()
  const { isUser } = useAppStore()

  const {
    data: profileData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [isUser ? 'profile' : 'profile', username],
    queryFn: () =>
      isUser
        ? ovationService.getProfile()
        : ovationService.getUserProfile(username),
  })

  const { data: experienceData } = useQuery({
    queryKey: ['experience', profileData?.userId],
    queryFn: () => ovationService.getExperience(profileData?.userId as string),
    enabled: !!profileData?.userId,
  })

  // SEO-related state
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState('')

  useEffect(() => {
    if (profileData) {
      const title = profileData.profile?.displayName || profileData.username
      const description =
        profileData.profile?.bio ||
        `Check out ${title}'s profile on our platform`

      setPageTitle(title)
      setPageDescription(description)

      // Update Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogDescription = document.querySelector(
        'meta[property="og:description"]',
      )
      const ogImage = document.querySelector('meta[property="og:image"]')

      if (ogTitle) ogTitle.setAttribute('content', title)
      if (ogDescription) ogDescription.setAttribute('content', description)
      if (ogImage)
        ogImage.setAttribute(
          'content',
          `${window.location.origin}/api/og?username=${username}`,
        )

      // Update Twitter meta tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      const twitterDescription = document.querySelector(
        'meta[name="twitter:description"]',
      )
      const twitterImage = document.querySelector('meta[name="twitter:image"]')

      if (twitterTitle) twitterTitle.setAttribute('content', title)
      if (twitterDescription)
        twitterDescription.setAttribute('content', description)
      if (twitterImage)
        twitterImage.setAttribute(
          'content',
          `${window.location.origin}/api/og?username=${username}`,
        )
    }
  }, [profileData, username])

  const [isCopying, setIsCopying] = useState(false)

  const copyProfileLinkToClipboard = async () => {
    if (!profileData?.username) return

    setIsCopying(true)
    try {
      const username = profileData.username
      const profileLink = `${window.location.origin}/${username}`
      await navigator.clipboard.writeText(profileLink)
      toast.success('Profile link copied!')
    } catch (err) {
      console.error('Failed to copy profile link:', err)
      toast.error('Copy failed')
    } finally {
      setIsCopying(false)
    }
  }

  const openDM = () => {
    if (profileData) {
      const receiver: FriendProps = {
        displayName: profileData.profile?.displayName || '',
        followerCount: profileData.userStats?.followers || 0,
        followingCount: profileData.userStats?.following || 0,
        friendDisplayPicture: profileData.profile?.profileImage || '',
        isOpened: true,
        lastActive: '',
        userId: profileData.userId as string,
        biography: profileData.profile?.bio || '',
        userName: profileData.username || '',
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
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`${typeof window !== 'undefined' ? window.location.origin : ''}/api/og?username=${username}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={`${typeof window !== 'undefined' ? window.location.origin : ''}/api/og?username=${username}`}
        />
      </Head>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProfileHeader
          profileData={profileData as ProfileData}
          isUser={isUser}
          isFollowingPending={isFollowingPending}
          isUnfollowingPending={isUnfollowingPending}
          followUser={followUser}
          unfollowUser={unfollowUser}
          copyProfileLinkToClipboard={copyProfileLinkToClipboard}
          isCopying={isCopying}
          openDM={openDM}
          navigateTo={navigateTo}
          token={token as string}
        />
      </ErrorBoundary>

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
