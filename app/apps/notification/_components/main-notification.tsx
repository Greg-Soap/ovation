'use client'
import type React from 'react'
import type { NotificationItem } from './types'
import { useQuery } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import MiniLoader from '@/components/mini-loader'
import NotificationCard from './notification-card'

function MainNotification() {
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => ovationService.getNotifications(),
  })

  const notifications = data?.data?.data ?? []

  return (
    <section className="col-span-3 lg:col-span-2 w-full h-[100vh] flex flex-col border border-[#1A1A1A] other-link overflow-auto">
      <h1 className="w-full py-7 px-8 text-[22px] text-[#F8F8FF] font-medium border-b border-[#1A1A1A]">
        Notifications
      </h1>
      {isLoading ? (
        <MiniLoader />
      ) : notifications.length > 0 ? (
        notifications.map((item: NotificationItem, index: number) => (
          <NotificationCard key={index} {...item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No notifications to display</p>
        </div>
      )}
    </section>
  )
}

export default MainNotification
