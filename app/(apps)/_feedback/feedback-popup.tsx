import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/customs/custom-modal'
import FeedbackModal from './feedback'

export function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenFeedbackPopup')
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('hasSeenFeedbackPopup', 'true')
      }, 60000) // 1 minute delay

      return () => clearTimeout(timer)
    }
  }, [])

  function handleSureClick() {
    setShowFeedbackForm(true)
  }

  function handleClose() {
    setIsOpen(false)
    setShowFeedbackForm(false)
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
