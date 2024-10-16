import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/customs/custom-modal'
import FeedbackModal from './feedback'

export function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    const lastPopupTime = localStorage.getItem('lastFeedbackPopupTime')
    const currentTime = Date.now()
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
    const fiveMinutesInMs = 5 * 60 * 1000 // 5 minutes in milliseconds

    if (!lastPopupTime || currentTime - Number(lastPopupTime) >= twoDaysInMs) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('lastFeedbackPopupTime', currentTime.toString())
      }, fiveMinutesInMs) // 5 minutes delay

      return () => clearTimeout(timer)
    }
  }, [])

  function handleSureClick() {
    setShowFeedbackForm(true)
  }

  function handleClose() {
    setIsOpen(false)
    setShowFeedbackForm(false)
    // Update the last popup time when the user clicks "Maybe Later"
    localStorage.setItem('lastFeedbackPopupTime', Date.now().toString())
  }

  return (
    <>
      {!showFeedbackForm ? (
        <CustomModal open={isOpen} onOpenChange={setIsOpen} size="md">
          <div className="flex flex-col items-center justify-center p-6 gap-6">
            <h2 className="text-2xl font-bold">
              We&apos;d love your feedback!
            </h2>
            <p className="text-center text-light">
              Your input is crucial in helping us improve and drives the
              features we launch next! Would you like to fill out a quick
              feedback form?
            </p>
            <div className="flex gap-4">
              <Button onClick={handleClose} variant="outline">
                Maybe Later
              </Button>
              <Button onClick={handleSureClick}>Sure, I&apos;ll help</Button>
            </div>
          </div>
        </CustomModal>
      ) : (
        <CustomModal
          size="full"
          open={showFeedbackForm}
          onOpenChange={setShowFeedbackForm}
          className="flex flex-col items-center justify-center p-0 m-0 w-fit h-fit overflow-auto border-none"
        >
          <FeedbackModal onClose={() => setShowFeedbackForm(false)} />
        </CustomModal>
      )}
    </>
  )
}
