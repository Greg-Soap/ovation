'use client'
import TimelineHeader from './_sections/_timeline/timeline-header'
import { NotificationService } from '@/lib/notificationService'
import type { NotificationMessage } from '@/lib/helper-func'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'
import { toast } from 'sonner'
import Aside from './aside'

const queryClient = new QueryClient()

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])

  useEffect(() => {
    connectSignalR()

    // Cleanup function to stop the SignalR connection when component unmounts
    return () => {
      notificationService.stopConnection()
    }
  }, [])

  const notificationService = new NotificationService()

  const connectSignalR = async () => {
    await notificationService.startConnection()

    // Listen for incoming notifications
    notificationService.onMessage('ReceiveNotification', (notification: NotificationMessage) => {
      console.log('New notification received:', notification.title)
      toast.success(`${notification.title}\n${notification.message}`)

      setNotifications((prev) => [...prev, notification])
    })
  }

  return (
    <div className='px-0  container flex flex-col items-center justify-center relative'>
      <TimelineHeader />
      <QueryClientProvider client={queryClient}>
        <div className='flex flex-col lg:flex-row lg:flex-nowrap w-full other-link overflow-y-scroll'>
          <Aside />
          <div id='empty space' className='min-w-[310px]' />
          <Suspense fallback={<MiniLoader size='huge' />}>
            <div className='w-full px-0 pb-[65px] lg:pb-0'>{children}</div>
          </Suspense>
        </div>
      </QueryClientProvider>
    </div>
  )
}
