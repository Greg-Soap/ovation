'use client'
import { Suspense, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from 'easy-peasy'
import { usePathname, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { logEvent } from 'firebase/analytics'

import TimelineHeader from './_sections/_timeline/timeline-header'
import { NotificationService } from '@/lib/notificationService'
import type { NotificationMessage } from '@/lib/helper-func'
import MiniLoader from '@/components/mini-loader'
import Aside from './aside'
import { logOut, signIn } from '@/lib/firebaseAuthService'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { UserData } from '@/models/all.model'
import store from '@/store/store'
import { FeedbackPopup } from './_feedback/feedback-popup'
import { analytics } from '@/lib/firebase'

const queryClient = new QueryClient()

export const notificationServices = new NotificationService()

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])
  const { storedValue } = useLocalStorage<UserData | null>('userData', null)
  const user = storedValue
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    connectSignalR()
    firebaseSignIn()

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

    if (analytics) {
      const url = pathname + searchParams.toString()
      logEvent(analytics, 'page_view', { page_path: url })
    }

    return () => {
      notificationServices.stopConnection()
      firebaseSignOut()
    }
  }, [pathname, searchParams])

  const connectSignalR = async () => {
    await notificationServices.startConnection()
  }

  const firebaseSignIn = async () => {
    if (user?.userId && user?.googleId) {
      await signIn(user.userId, user.googleId)
    }
  }

  const firebaseSignOut = async () => {
    await logOut()
  }

  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  )
}

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<MiniLoader size="huge" />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  )
}
