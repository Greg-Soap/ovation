'use client'
import { useAppStore } from '@/store/use-app-store'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { analytics } from '@/lib/firebase'
import { logOut, signIn } from '@/lib/firebaseAuthService'
import { logEvent } from 'firebase/analytics'

export default function FirebaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAppStore()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    firebaseSignIn()

    if (analytics) {
      const url = pathname + searchParams.toString()
      logEvent(analytics, 'page_view', { page_path: url })
    }

    return () => {
      firebaseSignOut()
    }
  }, [pathname, searchParams])

  const firebaseSignIn = async () => {
    if (user?.userId && user?.googleId) {
      await signIn(user.userId, user.googleId)
    }
  }

  const firebaseSignOut = async () => {
    await logOut()
  }

  return <>{children}</>
}
