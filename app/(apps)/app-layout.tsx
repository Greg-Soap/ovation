'use client'
import { Suspense, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from 'easy-peasy'
import { toast } from 'sonner'
import TimelineHeader from './_sections/_timeline/timeline-header'
import { NotificationService } from '@/lib/notificationService'
import type { NotificationMessage } from '@/lib/helper-func'
import MiniLoader from '@/components/mini-loader'
import Aside from './aside'
import store from '@/store/store'
import { FeedbackPopup } from './_feedback/feedback-popup'
import FirebaseLayout from './firebase-layout'

const queryClient = new QueryClient()

export const notificationServices = new NotificationService()

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])

  useEffect(() => {
    connectSignalR()

    notificationServices.onMessage(
      'ReceivedNotification',
      (notification: NotificationMessage) => {
        toast.success(`${notification.title}\n${notification.message}`)
        setNotifications((prev) => [...prev, notification])
      },
    )

    notificationServices.onMessage(
      'MessageNotification',
      (notification: string) => {
        toast.success(`${notification}`)
      },
    )

    return () => {
      notificationServices.stopConnection()
    }
  }, [])

  const connectSignalR = async () => {
    await notificationServices.startConnection()
  }

  return (
    <StoreProvider store={store}>
      <FirebaseLayout>
        <div className="px-0 container flex flex-col items-center justify-center relative">
          <QueryClientProvider client={queryClient}>
            <TimelineHeader />
            <FeedbackPopup />
            <div className="flex flex-col lg:flex-row lg:flex-nowrap w-full other-link overflow-y-scroll">
              <Aside />
              <div id="empty space" className="min-w-[310px]" />
              <Suspense fallback={<MiniLoader size="huge" />}>
                <div className="w-full px-0 pb-[65px] lg:pb-0">{children}</div>
              </Suspense>
            </div>
          </QueryClientProvider>
        </div>
      </FirebaseLayout>
    </StoreProvider>
  )
}
