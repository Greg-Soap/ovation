'use client'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import ovationService from '@/services/ovation.service'
import { useEffect, useRef } from 'react'
import { useAnchorNavigation } from '@/lib/use-navigation'
import { toast } from 'sonner'
import { setToken } from '@/lib/cookies'
import { useAppStore } from '@/store/use-app-store'
import MiniLoader from '@/components/mini-loader'
import { signInOrSignUp } from '@/lib/firebaseAuthService'

export default function VerifyAccountPage() {
  const searchParams = useSearchParams()
  const navigateTo = useAnchorNavigation()
  const { setUser } = useAppStore()

  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const otpVerified = useRef(false)

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: () =>
      ovationService.verifyAccount(email as string, code as string),
    onSuccess: async (data) => {
      setToken(data?.data?.token)
      setUser(data?.data?.userData)
      await signInOrSignUp(data?.data?.userData)
      toast.success('Verification successful, welcome!')
      setTimeout(() => navigateTo('/discover'), 3000)
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'An error occurred while verifying your account!',
      )
    },
  })

  useEffect(() => {
    if (code && email && !otpVerified.current) {
      verifyOtp()
      otpVerified.current = true
    }
  }, [code, email, verifyOtp])

  const handleRetryVerification = () => verifyOtp()

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-3xl mb-[30px]">Verify Your Account</h1>
      <p className="text-sm text-light text-center mb-[5px]">
        Please wait while we try to verify your account
      </p>
      <p className="mb-10">
        You will be redirected shortly immediately after verification.
      </p>

      {!isVerifying && (
        <Button onClick={handleRetryVerification} disabled={isVerifying}>
          Retry Verification
        </Button>
      )}
      {isVerifying && <MiniLoader size="average" />}
    </div>
  )
}
