'use client'
import TimelineHeader from './_sections/_timeline/timeline-header'
import Aside from './_sections/Aside'
import { NotificationService } from '@/lib/notificationService'
import type { NotificationMessage } from '@/lib/helper-func'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])

  useEffect(() => {
    const notificationService = new NotificationService() // Initialize SignalR service

    const baseUrl = process.env.NEXT_PUBLIC_API_URL as string
    const connectSignalR = async () => {
      await notificationService.startConnection(`${baseUrl}/notification`, 'user_access_token_here')

      // Listen for incoming notifications
      notificationService.onMessage('ReceiveNotification', (notification: NotificationMessage) => {
        console.log('New notification received:', notification.title)

        // Update notifications state
        setNotifications((prev) => [...prev, notification])
      })
    }

    connectSignalR()

    // Cleanup function to stop the SignalR connection when component unmounts
    return () => {
      notificationService.stopConnection()
    }
  }, [])

  return (
    <div className='px-0  container flex flex-col items-center justify-center relative'>
      <TimelineHeader />
      <div className='flex flex-col lg:flex-row lg:flex-nowrap w-full other-link overflow-y-scroll'>
        <Aside />
        <div id='empty space' className='min-w-[310px]' />
        <QueryClientProvider client={queryClient}>
          <div className=' px-0 pb-[65px] lg:pb-0'>{children}</div>
        </QueryClientProvider>
      </div>
    </div>
  )
}
