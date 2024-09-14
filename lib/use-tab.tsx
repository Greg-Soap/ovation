'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function useTabUrlSync(defaultTab: string) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setTab = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('tab', tab)
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const currentTab = searchParams.get('tab') || defaultTab

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setTab(defaultTab)
    }
  }, [defaultTab, searchParams, setTab])

  return { currentTab, setTab }
}
