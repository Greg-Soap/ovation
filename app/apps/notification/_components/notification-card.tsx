import React from 'react'
import { Button } from '@/components/ui/button'
import type { NotificationItem } from './types'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import Link from 'next/link'
import { startCase } from '@/lib/helper-func'

export default function NotificationCard({
  id,
  isFollowing,
  message,
  reference,
  referenceId,
  title,
  initiator,
  refetch,
}: NotificationItem & { refetch: () => void }) {
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

  const renderNotificationContent = () => {
    switch (reference) {
      case 'Follow':
        return (
          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <Image
                src={
                  initiator?.profileImage || '/assets/images/default-user.svg'
                }
                alt="Department Icon"
                width={36}
                height={36}
                className="rounded-full w-[36px] h-[36px]"
              />
              <div className="flex flex-col gap-1">
                <Link href={`/apps/profile/${initiator?.username}`}>
                  <p className="font-semibold text-sm text-white100">{title}</p>
                </Link>
                <p className="text-sm text-gray-300">{message}</p>
              </div>
            </div>
            {isFollowing ? (
              <Button
                variant="outline"
                size="sm"
                disabled={isUnfollowingPending}
                isLoading={isUnfollowingPending}
                loadingText="Unfollowing..."
                className="mt-2 rounded-full"
                onClick={() => unfollowUser(initiator?.initiatorId as string)}
              >
                Following
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 rounded-full"
                disabled={isFollowingPending}
                isLoading={isFollowingPending}
                loadingText="Following..."
                onClick={() => followUser(initiator?.initiatorId as string)}
              >
                Follow Back
              </Button>
            )}
          </div>
        )
      case 'Badge':
        return (
          <div>
            <p className="font-semibold text-sm text-white100">{title}</p>
            <p className="text-sm text-gray-300">
              {message} - {startCase(referenceId)}
            </p>
          </div>
        )
      default:
        return (
          <div>
            <p className="text-sm text-gray-300">{message}</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full flex items-center justify-between px-5 py-4 md:py-7 md:px-8 border-b border-sectionBorder">
      <div className="flex-grow">{renderNotificationContent()}</div>
    </div>
  )
}
