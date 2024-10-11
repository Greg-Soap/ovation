'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import MiniLoader from '@/components/mini-loader'
import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/customs/custom-dialog'
import { linkify } from '@/lib/use-link'
import CustomAvatar from '@/components/customs/custom-avatar'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { truncate } from '@/lib/helper-func'
import { useIsDesktop, useIsMobileToTablet } from '@/lib/use-breakpoints'

export default function FollowersFollowing({
  username,
  userId,
}: {
  username?: string
  userId: string
}) {
  const navigateTo = useAnchorNavigation()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(
    'followers',
  )

  useEffect(() => {
    const tab = pathname.endsWith('/following') ? 'following' : 'followers'
    setActiveTab(tab)
  }, [pathname])

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'followers' | 'following')
    navigateTo(`/${username}/${value}`)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 pt-4 pb-1 border-b rounded-none border-[#353538]">
          <div className="flex justify-center w-full">
            <TabsTrigger
              value="followers"
              className="py-2 data-[state=active]: transition-all duration-300 w-fit text-center"
            >
              Followers
            </TabsTrigger>
          </div>
          <div className="flex justify-center w-full">
            <TabsTrigger
              value="following"
              className="py-2 data-[state=active]: transition-all duration-300 w-fit"
            >
              Following
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="followers">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UserList type="followers" userId={userId} />
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="following">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UserList type="following" userId={userId} />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </ErrorBoundary>
  )
}

function UserList({
  type,
  userId,
}: {
  type: 'followers' | 'following'
  userId: string
}) {
  const isMobileToTablet = useIsMobileToTablet()
  const isDesktop = useIsDesktop()

  const truncateLength = isMobileToTablet ? 100 : 400

  const fetchUsers =
    type === 'followers'
      ? ovationService.getFollowers
      : ovationService.getFollowing

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users', type, userId],
    queryFn: () => fetchUsers(userId),
    enabled: !!userId,
  })

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

  const users = usersData?.data?.data || []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <MiniLoader />
      </div>
    )
  }

  if (!isLoading && users.length === 0) {
    return (
      <div className="text-center flex flex-col items-center justify-center py-10">
        <p className="text-foreground text-xl md:text-2xl font-semibold">
          {type === 'followers'
            ? "You don't have any followers yet."
            : "You're not following anyone yet."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4  px-4 py-4">
      {users?.map((user) => (
        <a
          href={`/${user?.username}`}
          key={user.userId}
          className="flex gap-3 justify-between items-start hover:bg-foreground/10 p-2 rounded-md w-full"
        >
          <CustomAvatar
            src={user?.profileImage}
            alt="User Display Picture"
            size="md"
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-3 items-start justify-between w-full">
              <a href={`/${user?.username}`} className="flex flex-col gap-1">
                <p className="font-semibold text-md ">{user?.displayName}</p>
                <p className="text-sm text-lighter">
                  {`@${user?.username.replace(/^@/, '')}`}
                </p>
              </a>
              {user?.isFollowing ? (
                <CustomDialog
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 rounded-full"
                      isLoading={isUnfollowingPending}
                      loadingText="Unfollowing..."
                    >
                      Following
                    </Button>
                  }
                  title="Unfollow User"
                  description={`Are you sure you want to unfollow ${user.displayName}?`}
                  confirmText="Unfollow"
                  actionVariant="destructive"
                  onConfirm={() => unfollowUser(user?.userId as string)}
                />
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 rounded-full"
                  disabled={isFollowingPending}
                  isLoading={isFollowingPending}
                  loadingText="Following..."
                  onClick={(e) => {
                    e.preventDefault()
                    followUser(user?.userId as string)
                  }}
                >
                  Follow
                </Button>
              )}
            </div>
            <p className="font-light text-sm md:text-md ">
              {linkify(
                truncate(user?.bio || 'No bio available', truncateLength),
              )}
            </p>
          </div>
        </a>
      ))}
    </div>
  )
}
