import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'

export function useForgotPassword() {
  const [userId, setUserId] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const sendEmailMutation = useMutation({
    mutationFn: (email: string) => ovationService.forgotPassword(email),
    onSuccess: (data) => {
      console.log({ data })
      setUserId(data.data.data)
    },
  })

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => ovationService.verifyOtp(userId, otp),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (password: string) =>
      ovationService.changePassword(userId, password),
  })

  const sendEmail = async (email: string) => {
    setEmail(email)
    await sendEmailMutation.mutateAsync(email)
  }

  const verifyOtp = async (otp: string) => {
    await verifyOtpMutation.mutateAsync(otp)
  }

  const resetPassword = async (password: string) => {
    await resetPasswordMutation.mutateAsync(password)
  }

  return {
    sendEmail,
    resetPassword,
    verifyOtp,
    resendOtp: () => sendEmail(email),
    isEmailSending: sendEmailMutation.isPending,
    isPasswordResetting: resetPasswordMutation.isPending,
  }
}
