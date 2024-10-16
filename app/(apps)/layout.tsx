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
import { logOut, signIn } from '@/lib/firebaseAuthService'
import { useLocalStorage } from '@/lib/use-local-storage'
import type { UserData } from '@/models/all.model'
import { listenForUserMessages } from '@/lib/firebaseChatService'
import { AuthMiddleware } from './auth-middleware'
import { StoreProvider } from 'easy-peasy'
import store from '@/store/store'
import { FeedbackPopup } from './_feedback/feedback-popup'
import { useParams } from 'next/navigation'
// import ProfileMetadata from './[profile]/metadata'
// import PopUp from '../..'

const queryClient = new QueryClient()

export const notificationServices = new NotificationService()

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const isProfilePage = params.profile !== undefined
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])
  const { storedValue } = useLocalStorage<UserData | null>('userData', null)
  const user = storedValue

  useEffect(() => {
    connectSignalR()
    firebaseSignIn()
    // // const unsubscribe = listenForUserMessages((newMessages) => {
    //   // toast.success(`You have ${newMessages.length} new messages`);
    // // })

    // Listen for incoming notifications
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
      firebaseSignOut()
      // if (unsubscribe != null) unsubscribe()
    }
  }, [])

  const connectSignalR = async () => {
    await notificationServices.startConnection()
  }

  const firebaseSignIn = async () => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    await signIn(user!.userId, user!.googleId)
  }

  const firebaseSignOut = async () => {
    await logOut()
  }

  return (
    <>
      {/* {isProfilePage && <ProfileMetadata profile={params.profile as string} />} */}
      {/* // <AuthMiddleware> */}
      <StoreProvider store={store}>
        <div className="px-0  container flex flex-col items-center justify-center relative">
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
          {/* <PopUp /> */}
        </div>
      </StoreProvider>
      {/* // </AuthMiddleware> */}
    </>
  )
}
