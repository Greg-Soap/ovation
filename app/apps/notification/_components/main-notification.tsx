'use client'
import type React from 'react'
import { notificationData } from './sample-data'
import { NotificationFactory } from './notification-renderer'
import type { NotificationItem } from './types'

const MainNotification: React.FC = () => {
  return (
    <section className='col-span-3 lg:col-span-2 w-full h-[100vh] flex flex-col border border-[#1A1A1A] other-link overflow-auto'>
      <h1 className='w-full py-7 px-8 text-[22px] text-[#F8F8FF] font-medium border-b border-[#1A1A1A]'>
        Notifications
      </h1>
      {notificationData.map((item: NotificationItem, index: number) => (
        <NotificationFactory key={index} {...item} />
      ))}
    </section>
  )
}

export default MainNotification