'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForgotPassword } from './_components/use-forgot-password'
import EmailForm from './_components/email-form'
import OtpForm from './_components/otp-form'
import PasswordResetForm from './_components/password-reset-form'
import SuccessMessage from './_components/success-message'

export default function ResetForm() {
  const [page, setPage] = useState<number>(1)
  const {
    sendEmail,
    verifyOtp,
    resetPassword,
    isEmailSending,
    isPasswordResetting,
    resendOtp,
  } = useForgotPassword()

  const handleEmailSubmit = async (email: string) => {
    try {
      await sendEmail(email)
      setPage(2)
      toast.success('OTP sent successfully!')
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  const handleOtpSubmit = async (otp: string) => {
    try {
      await verifyOtp(otp)
      setPage(3)
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    }
  }

  const handlePasswordSubmit = async (password: string) => {
    try {
      await resetPassword(password)
      setPage(4)
      toast.success('Password changed successfully!')
    } catch (error) {
      toast.error('Failed to change password. Please try again.')
    }
  }

  const renderCurrentStep = () => {
    switch (page) {
      case 1:
        return (
          <EmailForm
            onSubmit={handleEmailSubmit}
            isSendingEmail={isEmailSending}
          />
        )
      case 2:
        return <OtpForm onSubmit={handleOtpSubmit} onResendOtp={resendOtp} />
      case 3:
        return (
          <PasswordResetForm
            onSubmit={handlePasswordSubmit}
            isSubmitting={isPasswordResetting}
          />
        )
      case 4:
        return <SuccessMessage />
      default:
        return (
          <EmailForm
            onSubmit={handleEmailSubmit}
            isSendingEmail={isEmailSending}
          />
        )
    }
  }

  return <>{renderCurrentStep()}</>
}
