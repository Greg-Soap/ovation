'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getToken } from '@/lib/cookies'

export function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      localStorage.setItem('intendedDestination', pathname)
      router.push('/login')
    }
  }, [router, pathname])

  return <>{children}</>
}
