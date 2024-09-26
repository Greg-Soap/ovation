import React from 'react'
import { Button } from '@/components/ui/button'
import type { NotificationItem } from './types'

export default function NotificationCard({
  id,
  isFollowing,
  message,
  reference,
  referenceId,
  title,
}: NotificationItem) {
  const renderNotificationContent = () => {
    switch (reference) {
      case 'Follow':
        return (
          <div>
            <p className="font-semibold text-sm text-white">{title}</p>
            <p className="text-sm text-gray-300">{message}</p>
            {isFollowing ? (
              <Button variant="outline" size="sm" className="mt-2">
                Following
              </Button>
            ) : (
              <Button variant="default" size="sm" className="mt-2">
                Follow Back
              </Button>
            )}
          </div>
        )
      case 'Badge':
        return (
          <div>
            <p className="font-semibold text-sm text-white">{title}</p>
            <p className="text-sm text-gray-300">
              {message} - {referenceId}
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
    <div className="w-full flex items-center justify-between px-5 py-4 md:py-7 md:px-8 border-b border-[#1A1A1A]">
      <div className="flex-grow">{renderNotificationContent()}</div>
    </div>
  )
}
