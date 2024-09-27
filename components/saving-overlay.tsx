'use client'

import { useEffect, useState } from 'react'
import Spinner from './ui/spinner'

interface SavingOverlayProps {
  isLoading: boolean
  loadingText?: string
}

function SavingOverlay({
  isLoading,
  loadingText = 'Saving...',
}: SavingOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1E] rounded-lg p-6 flex flex-col items-center">
        <Spinner size="average" color="#CFF073" />
        <p className="mt-4 text-[#F8F8FF] text-lg font-medium">{loadingText}</p>
      </div>
    </div>
  )
}

export default SavingOverlay
