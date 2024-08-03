'use client'

import Footer from './_sections/footer'
import { Header } from './_sections/nav'
import Promotion from './_sections/promotion'
import Preloader from './_components/preloader'
import React, { useEffect, useState } from 'react'

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>{isLoading ? <Preloader /> : <Application>{children}</Application>}</>
  )
}

function Application({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <html lang="en">
        <body>
          <Promotion />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </React.Fragment>
  )
}
