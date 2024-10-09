'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getToken } from '@/lib/cookies'
import MiniLoader from '@/components/mini-loader'
import { useAnchorNavigation } from '@/lib/use-navigation'

export const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const navigateTo = useAnchorNavigation()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken()

      if (!token) {
        localStorage.setItem('intendedDestination', pathname)
        navigateTo('/login')
        // Keep isLoading true
      } else {
        setIsAuthenticated(true)
        setIsLoading(false)
      }
    }

    setIsLoading(true)
    setIsAuthenticated(false)
    checkAuth()
  }, [navigateTo, pathname])

  // This effect runs when the pathname changes
  useEffect(() => {
    const token = getToken()
    if (token) {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <MiniLoader size="huge" />
      </div>
    )
  }

  return <>{children}</>
}

export default AuthMiddleware
